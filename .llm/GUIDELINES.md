# General Development Rules
@project_directory = project root directory
@memory = @project_directory/.llm/MEMORY.md
@brief = @project_directory/.llm/BRIEF.md
@review = @project_directory/.llm/REVIEW.md
@TODO = @project_directory/.llm/TODO.md
 

You are a master software engineer and should do task-based development. For every task, you should write the tests, implement the code, and run the tests to make sure everything works.

This project should follow semantic versioning and any version strings in files should be updated upon task completion. Add a script to the todo list near the beginning of the project to create this script and have it take a bump type as a parameter (major, minnor, patch).

Once a testing structure exists, keep commands in a Makefile and outline the common commands for testing, linting, and version bumping so that future runs don't have to guess how to run tests or linting and can be done consistently. Document these in this dev guidelines file. If you are running playwright tests, use reporter line always so it doesn't open a browser window with report.

Follow best practices for each language you develop in, keep code clean, try to keep files small, follow SOLID principles and prioritize code readability and maintainability over clever one-liners and such. Security is always a top priority, make sure to think about edge cases when developing tests and solve problems with implementations that cover these edge cases and common security issues. If there is a document inside the .llm/.templates/ folder for the language or framework you are developing in, refer to it and add any helpful guidelines (succinctly) to this document under a heading for that language/framework. If you can't find it, look it up on context7 or awesomew-copilot mcp.

When the tests pass:
* Update the todo list to reflect the task being completed
* Update the memory file to reflect the current state of the project
* Fix any warnings or errors in the code
* Bump the version accordingly
* Commit the changes to the repository with a descriptive commit message
* Update the development guidelines to reflect anything that you've learned while working on the project
* Stop and we will open a new chat for the next task

## Running tests
When running tests, try to be mindful of the run-length of the tests. Unit tests should always be run, but some integration and e2e tests can be filtered to things that only touch the domain that we are working on. I will personally run the fullsuite of any e2e tests (either manually or with ci) before merging to main, so your focus should be on the task at hand. If there is a problem with our current task that causes tests to fail elsewhere I will catch them and create a todo item to address this in a later session.

You should run tests using the npm scripts we have created so that we can run them consistently without guessing at paths and commands. The available commands are:

### Available Commands
- `npm test` - Run the test suite
- `npm run version:patch` - Bump patch version (bug fixes, minor improvements)
- `npm run version:minor` - Bump minor version (new features, framework additions)
- `npm run version:major` - Bump major version (breaking changes, architectural changes)
- `npm run validate` - Validate template integrity (when validation script exists)
- `npm run init` - Initialize project using the initialization script

### Version Management
This project uses semantic versioning with automated version management. The version bump script will:
- Update version numbers in all relevant files
- Update CHANGELOG.md with new version information
- Update documentation timestamps
- Validate that all files were updated correctly
- Generate appropriate git commands for the release

To use: `npm run version:patch|minor|major`

### Template Validation
When the validation script is implemented, use `npm run validate` to check:
- Template structure integrity
- Documentation completeness
- Version consistency across files
- Link validation in documentation
- Security best practices compliance

### Testing Guidelines
- Focus on unit tests for the current task domain
- Integration tests should cover cross-component interactions
- E2E tests are run manually before main branch merges
- Test files should be co-located with source files
- Use descriptive test names and clear assertions
- Mock external dependencies appropriately

## Retain Memory

There will be a memory file for every project.

The memory file will contain the state of the project, and any notes or relevant details you'd need to remember between chats.

Keep it up to date based on the project's current state. 

Do not annotate task completion in the memory file. It will be tracked in the to-do list.

## Update development guidelines

If necessary, update the development guidelines to reflect anything you've learned while working on the project.

## Memory and Todo Pruning
After a while memory and todo will need to be archived into an older file, and summarized in the new memory and todo files. 500-700 lines for each seems to be a good value to look for in practice.
For the todo, take the headers of completed phases and place them in the new file and note that any details can be looked up using that header in the todo archive
For the memory, copy the most important project information in the memory file to a new one and keep any important details and summarize anything else with some instructions on how to search the memory archive if needed.
