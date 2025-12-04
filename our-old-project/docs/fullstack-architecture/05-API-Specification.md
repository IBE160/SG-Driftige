## API Specification
### REST API Specification
```yaml
openapi: 3.0.0
info:
  title: QuizZum Summarization API
  version: 1.0.0
  description: API for generating multi-level summaries from text input.
servers:
  - url: http://localhost:8000
    description: Local Development Server
paths:
  /api/summarize:
    post:
      summary: Generate multi-level summaries
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                text:
                  type: string
                  description: The text to be summarized.
                  example: "Biology is the natural science that studies life..."
      responses:
        '200':
          description: Successfully generated summaries for all levels.
          content:
            application/json:
              schema:
                type: object
                properties:
                  summaries:
                    type: object
                    properties:
                      easy:
                        type: string
                        example: "Life is studied in biology."
                      medium:
                        type: string
                        example: "Biology is the scientific study of living organisms, including their structure, function, growth, origin, evolution, and distribution."
                      hard:
                        type: string
                        example: "Biology, as a natural science, systematically investigates the multifaceted phenomena associated with living organisms, encompassing molecular to ecosystem-level analysis. Its core tenets include cell theory, evolution through natural selection, genetics, homeostasis, and energy utilization, underpinning the understanding of biological diversity and interconnectedness."
        '400':
          description: Bad Request - Missing or invalid text input.
        '500':
          description: Internal Server Error - Failed to generate summaries due to backend or LLM issues.
```