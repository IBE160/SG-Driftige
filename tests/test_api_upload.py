from fastapi.testclient import TestClient
from backend.app.main import app

client = TestClient(app)

def test_upload_text():
    response = client.post("/api/upload_text", json={"text": "This is a test text."})
    assert response.status_code == 200
    assert response.json() == {"message": "Text received successfully"}

def test_upload_pdf():
    # Create a dummy PDF file for testing
    with open("test.pdf", "wb") as f:
        f.write(b"%PDF-1.4\n%EOF")

    with open("test.pdf", "rb") as f:
        response = client.post("/api/upload_pdf", files={"file": ("test.pdf", f, "application/pdf")})
    
    assert response.status_code == 200
    assert response.json() == {"message": "PDF 'test.pdf' received successfully"}

    # Clean up the dummy file
    import os
    os.remove("test.pdf")
