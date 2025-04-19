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
- npm or yarn package manager
- Git for version control

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

   **Detailed Guide to Obtain Environment Variables:**

   #### 1. Setting Up AWS Cognito for Authentication
   
   **Option A: Using the AWS Management Console (Recommended for beginners)**
   
   1. Sign in to the [AWS Management Console](https://aws.amazon.com/console/)
   2. Navigate to Amazon Cognito service
   3. Click "Create user pool"
   4. Configure sign-in experience:
      - Choose "Cognito User Pool"
      - Select "Email" as the sign-in option
      - Click "Next"
   5. Configure security requirements:
      - Set password policy (minimum length, character types)
      - Configure MFA if desired
      - Click "Next"
   6. Configure sign-up experience:
      - Select required attributes (email is recommended)
      - Click "Next"
   7. Configure message delivery:
      - Choose "Send email with Cognito"
      - Click "Next"
   8. Integrate your app:
      - Enter a name for your user pool (e.g., "HappyBirthdayUserPool")
      - Under "Initial app client":
        - Enter a name (e.g., "HappyBirthdayWebClient")
        - Select "Public client"
        - Don't generate a client secret
      - Click "Next"
   9. Review and create
   10. After creation, note down:
       - User Pool ID (looks like: `ap-south-1_xxxxxxxx`)
       - App client ID (looks like: `xxxxxxxxxxxxxxxxxxxxxxxxxx`)
   
   **Option B: Using CloudFormation Template**
   
   1. Sign in to the [AWS Management Console](https://aws.amazon.com/console/)
   2. Navigate to CloudFormation service
   3. Click "Create stack" → "With new resources (standard)"
   4. Upload the `cognito-config.yaml` template from this repository
   5. Click "Next"
   6. Enter a stack name (e.g., "happy-birthday-cognito")
   7. Click "Next" through the remaining options
   8. Click "Create stack"
   9. Once deployment is complete, go to "Outputs" tab
   10. Note down the User Pool ID and Client ID values

   #### 2. Setting Up API Gateway and Lambda Functions
   
   **Option A: Using the AWS Management Console**
   
   1. Sign in to the [AWS Management Console](https://aws.amazon.com/console/)
   2. Navigate to API Gateway service
   3. Click "Create API"
   4. Choose "REST API" and click "Build"
   5. Enter API name (e.g., "HappyBirthdayAPI")
   6. Create resources and methods as needed
   7. Deploy the API to a stage (e.g., "prod")
   8. Note the Invoke URL (e.g., `https://xxxxx.execute-api.region.amazonaws.com/prod/`)
   
   **Option B: Using AWS Amplify**
   
   1. Sign in to the [AWS Management Console](https://aws.amazon.com/console/)
   2. Navigate to AWS Amplify service
   3. Click "New app" → "Host web app"
   4. Connect your GitHub repository: `https://github.com/Sanath1947/Happy_Birthday.git`
   5. Select the main branch
   6. Use the provided `amplify.yml` configuration
   7. Deploy through the Amplify Console
   8. Note the Amplify app URL (e.g., `https://main.d123xyz.amplifyapp.com`)
   9. The API URL will be available in the Amplify Console under "Backend environments"

   #### 3. Setting Up S3 for Media Storage
   
   1. Sign in to the [AWS Management Console](https://aws.amazon.com/console/)
   2. Navigate to S3 service
   3. Click "Create bucket"
   4. Enter a globally unique bucket name (e.g., "happy-birthday-media")
   5. Select your region
   6. Configure bucket settings:
      - Block all public access (recommended for production)
      - Enable versioning if needed
   7. Click "Create bucket"
   8. Configure CORS for the bucket:
      - Select your bucket
      - Go to "Permissions" tab
      - Scroll down to "Cross-origin resource sharing (CORS)"
      - Click "Edit" and add the following configuration:
        ```json
        [
          {
            "AllowedHeaders": ["*"],
            "AllowedMethods": ["GET", "PUT", "POST", "DELETE", "HEAD"],
            "AllowedOrigins": ["*"],
            "ExposeHeaders": []
          }
        ]
        ```

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
   - **S3 access denied**: Check bucket permissions and CORS configuration

### Deployed Application Access

1. **Deploy the application using AWS Amplify:**
   - Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/home)
   - Click "New app" → "Host web app"
   - Connect your GitHub repository: `https://github.com/Sanath1947/Happy_Birthday.git`
   - Select the main branch
   - Use the provided `amplify.yml` configuration
   - Deploy through the Amplify Console
   - Note the Amplify app URL (e.g., `https://main.d123xyz.amplifyapp.com`)

2. **Access the live application:**
   - Open your browser and navigate to the Amplify app URL
   - Sign in with your Cognito credentials

   **Troubleshooting deployment:**
   - **Amplify build failures**: Check build logs in Amplify Console
   - **Authentication issues**: Verify Cognito User Pool configuration
   - **API Gateway issues**: Check Lambda function permissions and API Gateway settings
   - **S3 access issues**: Verify bucket permissions and CORS configuration

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

The application is deployed using AWS Amplify for the frontend and backend services. The deployment process includes:

1. Frontend deployment through AWS Amplify
2. Backend services deployment using AWS Amplify
3. Database setup in DynamoDB
4. S3 bucket configuration for media storage
5. CloudFront distribution setup

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For any questions or suggestions, please open an issue in the GitHub repository. 