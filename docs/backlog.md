# Engineering Backlog

This backlog collects cross-cutting or future action items that emerge from reviews and planning.

Routing guidance:

- Use this file for non-urgent optimizations, refactors, or follow-ups that span multiple stories/epics.
- Must-fix items to ship a story belong in that story’s `Tasks / Subtasks`.
- Same-epic improvements may also be captured under the epic Tech Spec `Post-Review Follow-ups` section.

| Date | Story | Epic | Type | Severity | Owner | Status | Notes |
| ---- | ----- | ---- | ---- | -------- | ----- | ------ | ----- |
| 2025-12-12 | 1.4 | epic-1 | Tech Debt | High | TBD | Closed | Re-implement content metadata storage using Prisma ORM and PostgreSQL to fulfill AC3 and the architectural mandate. This requires resolving Docker build issues related to Prisma client generation. (files: `fastapi-backend/app/services/content_service.py`, `fastapi-backend/app/db/prisma_client.py`, `fastapi-backend/app/db/models.py`) |
| 2025-12-12 | 1.4 | epic-1 | Bug | Medium | TBD | Closed | Verify and ensure `pdfminer.six` is fully integrated for PDF text extraction, replacing any placeholder implementation as specified in Task 2. (file: `fastapi-backend/app/llm_integrations/pdf_parser.py`) |
| 2025-12-12 | 1.4 | epic-1 | Tech Debt | High | TBD | Closed | Update integration tests in `fastapi-backend/tests/api/v1/test_upload.py` to validate the correct interaction with Prisma ORM and PostgreSQL for content metadata persistence, once the Prisma integration is restored. (file: `fastapi-backend/tests/api/v1/test_upload.py`) |
| 2025-12-12 | 1.4 | epic-1 | Improvement | Low | TBD | Closed | Review `fastapi-backend/app/api/v1/upload.py` and `fastapi-backend/app/db/schemas.py` to ensure input validation and sanitization are sufficiently comprehensive to meet "strict input validation" security best practices. (files: `fastapi-backend/app/api/v1/upload.py`, `fastapi-backend/app/db/schemas.py`) |
| 2025-12-12 | 1.4 | epic-1 | Documentation | Low | TBD | Closed | The `architecture.md` document should be updated to include specific version numbers for all technologies and a defined caching strategy to address existing critical findings. (file: `architecture.md`) |
| 2025-12-12 | 1.4 | epic-1 | Tech Debt | Low | TBD | Open | For future sprints, consider replacing `print()` statements with a structured logging approach using Python's `logging` module to align with architectural guidelines. |