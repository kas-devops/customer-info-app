# AWS branch strategy

Use the same branch flow as the Databricks app:

- develop -> dev environment (auto-deploy)
- release -> qa environment (auto-deploy)
- main -> prod environment (manual approval before deploy)

Recommended pipeline mapping:

1. Create one CodePipeline per branch/environment.
2. Point each pipeline to the matching branch.
3. Use the same buildspec and deployment script for all environments.
4. Add a manual approval action before the prod deploy stage.
