# Happy Birthday Application 🎉

A beautiful, interactive birthday celebration web application built with Next.js and AWS services.

## 🌟 Features

- Interactive 3D animations and particles
- Memory sharing and photo gallery
- Real-time collaboration features
- Multi-language support
- Responsive design
- Secure authentication
- Cloud storage for media files

## 🛠 Tech Stack

- **Frontend:**
  - Next.js 14
  - React 18
  - Three.js for 3D animations
  - TailwindCSS for styling
  - TypeScript

- **Backend (AWS):**
  - AWS Lambda for serverless functions
  - Amazon API Gateway for REST APIs
  - Amazon DynamoDB for database
  - Amazon S3 for file storage
  - Amazon CloudFront for CDN
  - Amazon Cognito for authentication
  - AWS Amplify for hosting and CI/CD

## 🚀 Access Instructions

### Prerequisites

Before accessing the application, ensure you have the following installed:

- [Node.js 18+](https://nodejs.org/) - JavaScript runtime
- [AWS CLI](https://aws.amazon.com/cli/) - Command-line interface for AWS
- [AWS SAM CLI](https://aws.amazon.com/serverless-sam-cli-install/) - Serverless Application Model CLI
- npm or yarn package manager

### Local Development Access

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Sanath1947/Happy_Birthday.git
   cd Happy_Birthday
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory with the following variables:
   ```
   NEXT_PUBLIC_API_URL=your-api-gateway-url
   NEXT_PUBLIC_REGION=your-aws-region
   NEXT_PUBLIC_USER_POOL_ID=your-cognito-user-pool-id
   NEXT_PUBLIC_USER_POOL_WEB_CLIENT_ID=your-cognito-client-id
   ```

   **How to obtain these values:**
   
   - **NEXT_PUBLIC_REGION**: Your AWS region (e.g., `us-east-1`, `ap-south-1`)
     - Run `aws configure get region` or check your AWS Console region
   
   - **NEXT_PUBLIC_USER_POOL_ID and NEXT_PUBLIC_USER_POOL_WEB_CLIENT_ID**:
     - Deploy the Cognito User Pool using the provided script:
       ```bash
       chmod +x setup-aws.sh
       ./setup-aws.sh
       ```
     - Or manually:
       1. Go to AWS Console → Cognito
       2. Create a new User Pool or select existing one
       3. Note the User Pool ID from the top of the page
       4. Go to "App integration" → "App client list"
       5. Note the Client ID
   
   - **NEXT_PUBLIC_API_URL**:
     - After deploying with SAM, the URL will be in the outputs
     - Or find it in API Gateway console

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Access the application:**
   Open your browser and navigate to `http://localhost:3000`

   **Troubleshooting local development:**
   - **CORS issues**: Ensure your API Gateway has CORS enabled
   - **Authentication failures**: Verify Cognito credentials are correct
   - **Environment variables not loading**: Restart the development server

### Deployed Application Access

1. **Deploy backend services:**
   ```bash
   sam build
   sam deploy --guided
   ```
   - Follow the prompts to complete deployment
   - Note the API Gateway URL from the output

2. **Deploy frontend using AWS Amplify:**
   - Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/home)
   - Click "New app" → "Host web app"
   - Connect your GitHub repository: `https://github.com/Sanath1947/Happy_Birthday.git`
   - Select the main branch
   - Use the provided `amplify.yml` configuration
   - Deploy through the Amplify Console
   - Note the Amplify app URL (e.g., `https://main.d123xyz.amplifyapp.com`)

3. **Access the live application:**
   - Open your browser and navigate to the Amplify app URL
   - Sign in with your Cognito credentials

   **Troubleshooting deployment:**
   - **Amplify build failures**: Check build logs in Amplify Console
   - **SAM deployment errors**: Review CloudFormation stack events
   - **API Gateway issues**: Verify Lambda function permissions

## 📁 Project Structure

```
happy-birthday/
├── app/                    # Next.js app directory
│   ├── components/         # React components
│   ├── contexts/          # React contexts
│   ├── hooks/             # Custom hooks
│   ├── lib/               # Utility functions
│   └── i18n/              # Internationalization
├── lambda/                # AWS Lambda functions
├── public/                # Static files
├── amplify.yml           # AWS Amplify configuration
├── template.yaml         # AWS SAM template
└── package.json          # Project dependencies
```

## 🔒 Security

- Authentication handled by Amazon Cognito
- API endpoints secured with API Gateway
- S3 bucket configured with appropriate CORS and security policies
- Environment variables for sensitive information

## 🌐 Deployment

The application is deployed using AWS Amplify for the frontend and AWS SAM for the backend services. The deployment process includes:

1. Frontend deployment through AWS Amplify
2. Backend services deployment using AWS SAM
3. Database setup in DynamoDB
4. S3 bucket configuration for media storage
5. CloudFront distribution setup

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For any questions or suggestions, please open an issue in the GitHub repository. 