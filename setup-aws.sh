#!/bin/bash

# Deploy Cognito User Pool
echo "Deploying Cognito User Pool..."
aws cloudformation deploy \
  --template-file cognito-config.yaml \
  --stack-name happy-birthday-cognito \
  --capabilities CAPABILITY_IAM

# Get Cognito User Pool ID and Client ID
USER_POOL_ID=$(aws cloudformation describe-stacks \
  --stack-name happy-birthday-cognito \
  --query 'Stacks[0].Outputs[?OutputKey==`UserPoolId`].OutputValue' \
  --output text)

CLIENT_ID=$(aws cloudformation describe-stacks \
  --stack-name happy-birthday-cognito \
  --query 'Stacks[0].Outputs[?OutputKey==`UserPoolClientId`].OutputValue' \
  --output text)

# Deploy API Gateway and Lambda functions
echo "Deploying API Gateway and Lambda functions..."
sam build
sam deploy --guided

# Get API Gateway URL
API_URL=$(aws cloudformation describe-stacks \
  --stack-name happy-birthday-api \
  --query 'Stacks[0].Outputs[?OutputKey==`ApiEndpoint`].OutputValue' \
  --output text)

# Get AWS Region
REGION=$(aws configure get region)

# Create .env.local file
echo "Creating .env.local file..."
cat > .env.local << EOL
NEXT_PUBLIC_API_URL=${API_URL}
NEXT_PUBLIC_REGION=${REGION}
NEXT_PUBLIC_USER_POOL_ID=${USER_POOL_ID}
NEXT_PUBLIC_USER_POOL_WEB_CLIENT_ID=${CLIENT_ID}
EOL

echo "Setup complete! Your .env.local file has been created with the following values:"
echo "NEXT_PUBLIC_API_URL=${API_URL}"
echo "NEXT_PUBLIC_REGION=${REGION}"
echo "NEXT_PUBLIC_USER_POOL_ID=${USER_POOL_ID}"
echo "NEXT_PUBLIC_USER_POOL_WEB_CLIENT_ID=${CLIENT_ID}" 