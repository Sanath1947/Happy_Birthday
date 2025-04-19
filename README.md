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

## 🚀 Getting Started

### Prerequisites

- Node.js 18 or later
- AWS CLI configured with appropriate credentials
- AWS SAM CLI installed
- npm or yarn package manager

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/happy-birthday.git
   cd happy-birthday
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env.local` file with the following variables:
   ```
   NEXT_PUBLIC_API_URL=your-api-gateway-url
   NEXT_PUBLIC_REGION=your-aws-region
   NEXT_PUBLIC_USER_POOL_ID=your-cognito-user-pool-id
   NEXT_PUBLIC_USER_POOL_WEB_CLIENT_ID=your-cognito-client-id
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

### AWS Deployment

1. Deploy the backend services:
   ```bash
   sam build
   sam deploy --guided
   ```

2. Deploy the frontend using AWS Amplify:
   - Connect your GitHub repository to AWS Amplify
   - Use the provided `amplify.yml` configuration
   - Deploy through the Amplify Console

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