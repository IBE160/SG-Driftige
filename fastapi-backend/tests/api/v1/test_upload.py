from fastapi.testclient import TestClient
from app.main import app
from app.db.prisma_client import disconnect_from_db, connect_to_db # Import from your prisma_client.py
import pytest
import asyncio

# Create a TestClient instance for your FastAPI app
client = TestClient(app)

# Use a pytest fixture for setting up and tearing down the database connection
@pytest.fixture(scope="module")
def event_loop():
    loop = asyncio.get_event_loop()
    yield loop
    loop.close()

@pytest.fixture(scope="module", autouse=True)
async def setup_db():
    await connect_to_db()
    yield
    await disconnect_from_db()

def test_upload_text():
    response = client.post(
        "/api/v1/upload/text",
        json={"text_content": "This is a test text content."},
    )
    assert response.status_code == 200
    assert response.json()["status"] == "success"
    assert "content_id" in response.json()["data"]

def test_upload_text_validation_min_length():
    response = client.post(
        "/api/v1/upload/text",
        json={"text_content": "short"},
    )
    assert response.status_code == 422 # Unprocessable Entity for validation errors

def test_upload_text_validation_max_length():
    long_text = "a" * 5001
    response = client.post(
        "/api/v1/upload/text",
        json={"text_content": long_text},
    )
    assert response.status_code == 422 # Unprocessable Entity for validation errors

def test_upload_pdf():
    # Create a dummy PDF file for testing
    # In a real scenario, you'd use a more robust way to create a dummy PDF or a fixture
    # For simplicity, we'll just create a minimal valid PDF content
    dummy_pdf_content = b"%PDF-1.4\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj 2 0 obj<</Type/Pages/Count 0>>endobj\nxref\n0 3\n0000000000 65535 f\n0000000009 00000 n\n0000000074 00000 n\ntrailer<</Size 3/Root 1 0 R>>startxref\n106\n%%EOF"
    
    response = client.post(
        "/api/v1/upload/pdf",
        files={"file": ("dummy.pdf", dummy_pdf_content, "application/pdf")},
    )
    assert response.status_code == 200
    assert response.json()["status"] == "success"
    assert "content_id" in response.json()["data"]

def test_upload_pdf_invalid_type():
    response = client.post(
        "/api/v1/upload/pdf",
        files={"file": ("dummy.txt", b"some text", "text/plain")},
    )
    assert response.status_code == 400
    assert response.json()["detail"] == "Only PDF files are allowed."

def test_upload_pdf_oversize():
    # Create a dummy PDF content larger than MAX_PDF_SIZE (10MB)
    oversize_pdf_content = b"A" * (10 * 1024 * 1024 + 1)
    response = client.post(
        "/api/v1/upload/pdf",
        files={"file": ("oversize.pdf", oversize_pdf_content, "application/pdf")},
    )
    assert response.status_code == 413
    assert response.json()["detail"].startswith("File size exceeds the limit")
