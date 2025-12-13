from app.llm_integrations.quiz_generator import generate_quiz_from_llm
from app.services.quiz_validator import validate_llm_quiz_response
from app.schemas.quiz import QuizData

# In a real application, this would fetch content from a database
# For now, we'll use a simple mock
MOCK_CONTENT_STORE = {
    "sample_content_id": "This is a sample text about the history of the internet..."
}


async def create_quiz(content_id: str, difficulty: str) -> QuizData:
    """
    Orchestrates the quiz generation process.
    
    1. Retrieves content based on content_id.
    2. Calls the quiz_generator to get a quiz from the LLM.
    3. Validates the LLM's response.
    4. Implements retry logic if validation fails.
    """
    # 1. Retrieve content
    content = MOCK_CONTENT_STORE.get(content_id)
    if not content:
        raise ValueError("Content not found")

    max_retries = 3
    for attempt in range(max_retries):
        try:
            # 2. Call the quiz generator
            # In a real app, the response would be a dictionary from the LLM
            llm_response_dict = await generate_quiz_from_llm(content, difficulty)
            
            # 3. Validate the response
            # The generator currently returns a QuizData object, so this validation is somewhat redundant
            # but in a real scenario, the generator would return a dict.
            quiz_data = validate_llm_quiz_response(llm_response_dict.dict())
            
            return quiz_data

        except ValueError as e:
            print(f"Attempt {attempt + 1} failed: {e}")
            if attempt + 1 == max_retries:
                raise ValueError("Failed to generate a valid quiz after multiple attempts.")
    
    # This line should not be reachable
    raise ValueError("An unexpected error occurred in quiz creation.")

