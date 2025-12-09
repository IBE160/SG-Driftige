file_path = "docs/sprint-artifacts/1-4-core-backend-setup-for-content-reception.md"
model_name = "gemini-1.5-flash-latest"

with open(file_path, "r") as f:
    content = f.read()

# 1. Add agent model name
# Find the exact line and replace it
# The content from read_file shows '### Agent Model Used\n\n' (two newlines) followed by the placeholder.
# If the placeholder is already gone, it will be just '### Agent Model Used\n\n'.
# Let's target the placeholder specifically if it exists.
if '### Agent Model Used\n\n{{agent_model_name_version}}' in content:
    content = content.replace('### Agent Model Used\n\n{{agent_model_name_version}}', f'### Agent Model Used\n\n{model_name}', 1)
elif '### Agent Model Used\n\n' in content: # If placeholder is already removed (empty)
    content = content.replace('### Agent Model Used\n\n', f'### Agent Model Used\n\n{model_name}\n', 1)


# 2. Add Change Log
change_log_section = """

## Change Log

- **2025-12-09**: Initial draft created.
"""
if "## Change Log" not in content:
    content += change_log_section

with open(file_path, "w") as f:
    f.write(content)

print("Replacements complete.")
