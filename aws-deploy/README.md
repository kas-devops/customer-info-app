# AWS deployment notes

This folder contains the AWS-friendly frontend build and deployment assets for the customer info app.

## What is included

- Buildspec for CodeBuild
- Frontend build assets under aws-deploy/frontend
- A deployment script for S3 + CloudFront

## Required environment variables

Set these in the CodeBuild/CodePipeline environment:

- AWS_S3_BUCKET
- AWS_CLOUDFRONT_DISTRIBUTION_ID
- VITE_DATA_URL

## Branch mapping

- develop -> dev environment
- release -> qa environment
- main -> prod environment with manual approval
