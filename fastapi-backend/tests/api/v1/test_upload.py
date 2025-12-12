import pytest
from httpx import AsyncClient, ASGITransport
from io import BytesIO

from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter

from app.main import app
from app.db.prisma_client import db


def create_dummy_pdf_with_text(text: str) -> bytes:
    buffer = BytesIO()
    c = canvas.Canvas(buffer, pagesize=letter)
    c.drawString(100, 750, text)
    c.showPage()
    c.save()
    buffer.seek(0)
    return buffer.getvalue()


@pytest.fixture(autouse=True)
async def setup_db():
    """
    Function-scoped autouse fixture:
    - Ensures Prisma connects/disconnects inside the SAME event loop as each test.
    - Prevents "Future attached to a different loop" issues.
    """
    await db.connect()
    try:
        # Clean before each test (isolated tests)
        await db.content.delete_many()
        yield
        # Clean after each test (optional but nice)
        await db.content.delete_many()
    finally:
        await db.disconnect()


@pytest.fixture
async def async_client():
    """
    Function-scoped async HTTP client using ASGITransport.
    """
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        yield ac


@pytest.mark.asyncio
async def test_upload_text(async_client: AsyncClient):
    test_text_content = "This is a test text content."

    response = await async_client.post(
        "/api/v1/upload/text",
        json={"text_content": test_text_content},
    )

    assert response.status_code == 201
    body = response.json()
    assert body["status"] == "success"

    content_id = body["data"]["content_id"]
    assert content_id is not None

    retrieved_content = await db.content.find_unique(where={"id": content_id})
    assert retrieved_content is not None
    assert retrieved_content.rawText == test_text_content
    assert retrieved_content.fileName is None


@pytest.mark.asyncio
async def test_upload_text_validation_min_length(async_client: AsyncClient):
    response = await async_client.post(
        "/api/v1/upload/text",
        json={"text_content": "short"},
    )
    assert response.status_code == 422


@pytest.mark.asyncio
async def test_upload_text_validation_max_length(async_client: AsyncClient):
    long_text = "a" * 5001
    response = await async_client.post(
        "/api/v1/upload/text",
        json={"text_content": long_text},
    )
    assert response.status_code == 422


@pytest.mark.asyncio
async def test_upload_pdf(async_client: AsyncClient):
    pdf_text = "This is a test PDF with some text."
    dummy_pdf_content = create_dummy_pdf_with_text(pdf_text)
    test_filename = "dummy.pdf"

    response = await async_client.post(
        "/api/v1/upload/pdf",
        files={"file": (test_filename, dummy_pdf_content, "application/pdf")},
    )

    assert response.status_code == 201
    body = response.json()
    assert body["status"] == "success"

    content_id = body["data"]["content_id"]
    assert content_id is not None

    retrieved_content = await db.content.find_unique(where={"id": content_id})
    assert retrieved_content is not None
    assert retrieved_content.fileName == test_filename

    # Depending on your PDF extraction pipeline, rawText may vary.
    # This assertion is OK if extraction is expected to include the text we generated:
    assert retrieved_content.rawText is not None
    assert pdf_text in retrieved_content.rawText


@pytest.mark.asyncio
async def test_upload_pdf_invalid_type(async_client: AsyncClient):
    response = await async_client.post(
        "/api/v1/upload/pdf",
        files={"file": ("dummy.txt", b"some text", "text/plain")},
    )
    assert response.status_code == 400
    assert response.json()["detail"] == "Only PDF files are allowed."


@pytest.mark.asyncio
async def test_upload_pdf_oversize(async_client: AsyncClient):
    # 10MB + 1 byte
    oversize_pdf = b"A" * (10 * 1024 * 1024 + 1)

    response = await async_client.post(
        "/api/v1/upload/pdf",
        files={"file": ("oversize.pdf", oversize_pdf, "application/pdf")},
    )

    assert response.status_code == 413
    assert "File size exceeds the limit" in response.json()["detail"]