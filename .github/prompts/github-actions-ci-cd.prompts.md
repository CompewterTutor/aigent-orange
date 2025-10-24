# GitHub Actions CI/CD Prompts

- "Create a GitHub Actions workflow that runs tests, builds, and publishes a Docker image to GitHub Container Registry when a PR is merged to main. Include caching for node_modules and docker layers."
- "Given this workflow YAML [paste], refactor it to use OIDC for cloud deployment and remove plaintext secrets."
- "Write a lightweight job for running unit tests in parallel across Node versions 16 and 18 using a matrix."
- "Add a pre-merge job that runs SAST (static analysis) and fails the workflow if high-severity issues are found. Include step names and a helpful failure message."
- "Produce a reusable composite action that installs dependencies and runs lint/tests, parameterize tool versions."
- "Explain how to set up branch protection rules to require this workflow to pass before merging."