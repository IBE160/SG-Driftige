from pdfminer.high_level import extract_text
from io import BytesIO

async def extract_text_from_pdf(file_content: bytes) -> str:
    try:
        # pdfminer.six expects a file-like object
        # We can use BytesIO to treat the bytes content as a file
        file_like_object = BytesIO(file_content)
        text = extract_text(file_like_object)
        print("PDFParser: Successfully extracted text from PDF.")
        return text
    except Exception as e:
        print(f"PDFParser: Error extracting text from PDF: {e}")
        # Depending on the desired error handling, you might want to raise the exception
        # or return an empty string/specific error message. For now, returning empty string.
        return ""

