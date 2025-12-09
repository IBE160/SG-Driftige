import os
import pytest
import json

def test_git_repository_exists():
    """
    Verify that a .git folder exists in the project root, indicating a git repository.
    """
    project_root = os.getcwd()
    git_folder = os.path.join(project_root, '.git')
    assert os.path.isdir(git_folder), "The .git folder does not exist, repository not initialized."

def test_frontend_dependencies_exist():
    """
    Verify that package.json in the frontend directory contains Next.js and React dependencies.
    """
    frontend_package_json_path = os.path.join(os.getcwd(), 'frontend', 'package.json')
    assert os.path.exists(frontend_package_json_path), "frontend/package.json not found."

    with open(frontend_package_json_path, 'r') as f:
        package_json = json.load(f)

    dependencies = package_json.get('dependencies', {})
    assert 'next' in dependencies, "'next' dependency not found in package.json."
    assert 'react' in dependencies, "'react' dependency not found in package.json."
    assert 'react-dom' in dependencies, "'react-dom' dependency not found in package.json."

@pytest.mark.skip(reason="Requires manual browser verification or E2E setup")
def test_basic_web_page_displays():
    """
    Placeholder for verifying that a basic empty web page is displayed when running the application.
    This test requires manual browser verification or a full E2E testing setup.
    """
    assert True, "Manually verify http://localhost:3000 displays 'Hello QuizZum!'."
