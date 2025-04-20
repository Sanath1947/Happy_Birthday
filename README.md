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

### Comprehensive AWS Deployment Guide

This section provides a detailed guide for deploying the Happy Birthday Application using various AWS services.

#### 1. Setting Up IAM Roles and Policies

1. Sign in to the [AWS Management Console](https://aws.amazon.com/console/)
2. Navigate to IAM service
3. Create the following roles:
   - **HappyBirthdayAppRole**: For the application to access AWS services
   - **HappyBirthdayDeployRole**: For CI/CD pipelines to deploy the application
4. Attach the following policies to the roles:
   - **HappyBirthdayAppRole**:
     - AmazonS3FullAccess
     - AmazonDynamoDBFullAccess
     - AWSLambdaFullAccess
     - AmazonAPIGatewayAdministrator
   - **HappyBirthdayDeployRole**:
     - AWSCodeDeployFullAccess
     - AWSCodeBuildAdminAccess
     - AmazonS3FullAccess
     - AmazonEC2FullAccess
     - ElasticLoadBalancingFullAccess
     - AutoScalingFullAccess

#### 2. Setting Up VPC

1. Sign in to the [AWS Management Console](https://aws.amazon.com/console/)
2. Navigate to VPC service
3. Click "Create VPC"
4. Configure the VPC:
   - Name: "HappyBirthdayVPC"
   - IPv4 CIDR block: "10.0.0.0/16"
   - Tenancy: Default
5. Create subnets:
   - Public subnet: "HappyBirthdayPublicSubnet" (10.0.1.0/24)
   - Private subnet: "HappyBirthdayPrivateSubnet" (10.0.2.0/24)
6. Create an Internet Gateway and attach it to the VPC
7. Create a NAT Gateway in the public subnet
8. Create route tables:
   - Public route table: Route internet traffic (0.0.0.0/0) to the Internet Gateway
   - Private route table: Route internet traffic (0.0.0.0/0) to the NAT Gateway
9. Associate the route tables with the respective subnets

#### 3. Setting Up S3 Buckets

1. Sign in to the [AWS Management Console](https://aws.amazon.com/console/)
2. Navigate to S3 service
3. Create the following buckets:
   - **happy-birthday-media**: For storing user-uploaded media files
   - **happy-birthday-artifacts**: For storing deployment artifacts
   - **happy-birthday-logs**: For storing application logs
4. Configure bucket settings:
   - Enable versioning
   - Configure lifecycle rules (e.g., move old versions to Glacier after 90 days)
   - Configure CORS for the media bucket as described earlier

#### 4. Setting Up EC2 Instances

1. Sign in to the [AWS Management Console](https://aws.amazon.com/console/)
2. Navigate to EC2 service
3. Click "Launch Instance"
4. Configure the instance:
   - Name: "HappyBirthdayAppServer"
   - AMI: Amazon Linux 2
   - Instance type: t3.medium (or appropriate size)
   - Key pair: Create a new key pair
   - Network settings: Select the VPC and public subnet
   - Security group: Create a new security group with the following rules:
     - Inbound: HTTP (80), HTTPS (443), SSH (22)
     - Outbound: All traffic
5. Launch the instance
6. Connect to the instance via SSH and install the required software:
   ```bash
   sudo yum update -y
   sudo yum install -y nodejs npm git nginx
   ```

#### 5. Setting Up Elastic Load Balancer (ELB)

1. Sign in to the [AWS Management Console](https://aws.amazon.com/console/)
2. Navigate to EC2 service → Load Balancers
3. Click "Create Load Balancer"
4. Configure the load balancer:
   - Name: "HappyBirthdayELB"
   - Scheme: internet-facing
   - IP address type: ipv4
   - VPC: Select the HappyBirthdayVPC
   - Mappings: Select at least two Availability Zones
   - Security groups: Create a new security group with HTTP and HTTPS access
5. Configure routing:
   - Create a target group: "HappyBirthdayTG"
   - Protocol: HTTP
   - Port: 80
   - Target type: Instance
   - Health check path: "/"
6. Register the EC2 instance with the target group
7. Create a listener:
   - Protocol: HTTP
   - Port: 80
   - Default action: Forward to HappyBirthdayTG

#### 6. Setting Up Auto Scaling Group (ASG)

1. Sign in to the [AWS Management Console](https://aws.amazon.com/console/)
2. Navigate to EC2 service → Auto Scaling Groups
3. Click "Create Auto Scaling group"
4. Configure the ASG:
   - Name: "HappyBirthdayASG"
   - Launch template: Create a new template based on the EC2 instance
   - VPC: Select the HappyBirthdayVPC
   - Subnets: Select the private subnets
   - Advanced options: Attach to the HappyBirthdayELB
5. Configure advanced options:
   - Health check type: ELB
   - Health check grace period: 300 seconds
   - Desired capacity: 2
   - Minimum capacity: 1
   - Maximum capacity: 5
6. Configure scaling policies:
   - Add policy: Scale out when CPU utilization exceeds 70%
   - Add policy: Scale in when CPU utilization is below 30%

#### 7. Setting Up Lambda Functions

1. Sign in to the [AWS Management Console](https://aws.amazon.com/console/)
2. Navigate to Lambda service
3. Create the following functions:
   - **HappyBirthdayGetMemories**: For retrieving memories
   - **HappyBirthdayCreateMemory**: For creating new memories
   - **HappyBirthdayProcessImage**: For processing uploaded images
4. Configure each function:
   - Runtime: Node.js 18.x
   - Architecture: x86_64
   - Execution role: HappyBirthdayAppRole
   - VPC: Select the HappyBirthdayVPC and private subnets
5. Upload the code for each function from the `lambda/` directory
6. Configure environment variables:
   - DYNAMODB_TABLE: "Memories"
   - S3_BUCKET: "happy-birthday-media"

#### 8. Setting Up CloudWatch

1. Sign in to the [AWS Management Console](https://aws.amazon.com/console/)
2. Navigate to CloudWatch service
3. Create the following dashboards:
   - **HappyBirthdayDashboard**: For monitoring application metrics
4. Create the following alarms:
   - **HighCPUUtilization**: Alert when CPU utilization exceeds 80%
   - **HighMemoryUtilization**: Alert when memory utilization exceeds 80%
   - **HighErrorRate**: Alert when error rate exceeds 5%
5. Configure log groups:
   - **/happy-birthday/application**: For application logs
   - **/happy-birthday/access**: For access logs
   - **/happy-birthday/error**: For error logs

#### 9. Setting Up CloudFront

1. Sign in to the [AWS Management Console](https://aws.amazon.com/console/)
2. Navigate to CloudFront service
3. Click "Create Distribution"
4. Configure the distribution:
   - Origin domain: Select the ELB
   - Origin path: Leave blank
   - Name: "HappyBirthdayDistribution"
   - Viewer protocol policy: Redirect HTTP to HTTPS
   - Allowed HTTP methods: GET, HEAD, OPTIONS, PUT, POST, PATCH, DELETE
   - Cache policy: CachingOptimized
   - Origin request policy: AllViewerExceptHostHeader
5. Create a second distribution for the S3 bucket:
   - Origin domain: Select the S3 bucket
   - Origin access: Origin access control settings
   - Viewer protocol policy: Redirect HTTP to HTTPS
   - Allowed HTTP methods: GET, HEAD, OPTIONS
   - Cache policy: CachingOptimized

#### 10. Setting Up Route 53

1. Sign in to the [AWS Management Console](https://aws.amazon.com/console/)
2. Navigate to Route 53 service
3. Create a hosted zone:
   - Domain name: "happybirthday.com" (or your domain)
   - Type: Public hosted zone
4. Create an A record:
   - Name: Leave blank (apex domain)
   - Value: Select the CloudFront distribution
   - Routing policy: Simple routing
5. Create a CNAME record:
   - Name: "www"
   - Value: Select the CloudFront distribution
   - Routing policy: Simple routing

#### 11. Setting Up CloudTrail

1. Sign in to the [AWS Management Console](https://aws.amazon.com/console/)
2. Navigate to CloudTrail service
3. Click "Create trail"
4. Configure the trail:
   - Name: "HappyBirthdayTrail"
   - Storage location: Create new S3 bucket
   - Log file SSE: Enabled
   - Logs: All
   - Data events: S3 and Lambda
   - Insights events: Enabled

#### 12. Setting Up AWS CodeCommit

1. Sign in to the [AWS Management Console](https://aws.amazon.com/console/)
2. Navigate to CodeCommit service
3. Click "Create repository"
4. Configure the repository:
   - Repository name: "HappyBirthday"
   - Description: "Happy Birthday Application Repository"
5. Clone the repository:
   ```bash
   git clone https://git-codecommit.region.amazonaws.com/v1/repos/HappyBirthday
   cd HappyBirthday
   git remote add origin https://git-codecommit.region.amazonaws.com/v1/repos/HappyBirthday
   git add .
   git commit -m "Initial commit"
   git push -u origin main
   ```

#### 13. Setting Up AWS CodeBuild

1. Sign in to the [AWS Management Console](https://aws.amazon.com/console/)
2. Navigate to CodeBuild service
3. Click "Create build project"
4. Configure the project:
   - Project name: "HappyBirthdayBuild"
   - Source: CodeCommit, HappyBirthday repository
   - Environment: Managed image, Amazon Linux 2, Standard runtime
   - Service role: HappyBirthdayDeployRole
5. Configure buildspec:
   - Create a `buildspec.yml` file in the root directory:
     ```yaml
     version: 0.2
     
     phases:
       install:
         runtime-versions:
           nodejs: 18
         commands:
           - npm install
       build:
         commands:
           - npm run build
       post_build:
         commands:
           - aws s3 sync .next s3://happy-birthday-artifacts/build
     ```

#### 14. Setting Up AWS CodeDeploy

1. Sign in to the [AWS Management Console](https://aws.amazon.com/console/)
2. Navigate to CodeDeploy service
3. Click "Create application"
4. Configure the application:
   - Application name: "HappyBirthday"
   - Compute platform: EC2/On-premises
5. Create a deployment group:
   - Deployment group name: "HappyBirthdayDeploymentGroup"
   - Service role: HappyBirthdayDeployRole
   - Deployment type: In-place
   - Environment configuration: EC2 instances with tags
   - Tag key: "Environment"
   - Tag value: "Production"
6. Create an `appspec.yml` file in the root directory:
   ```yaml
   version: 0.0
   os: linux
   files:
     - source: /
       destination: /var/www/html/happy-birthday
   hooks:
     BeforeInstall:
       - location: scripts/before_install.sh
         timeout: 300
         runas: root
     AfterInstall:
       - location: scripts/after_install.sh
         timeout: 300
         runas: root
   ```

#### 15. Setting Up Elastic Beanstalk

1. Sign in to the [AWS Management Console](https://aws.amazon.com/console/)
2. Navigate to Elastic Beanstalk service
3. Click "Create application"
4. Configure the application:
   - Application name: "HappyBirthday"
   - Platform: Node.js
   - Platform branch: Node.js 18
   - Platform version: Latest
   - Application code: Upload your code
   - VPC: Select the HappyBirthdayVPC
   - Subnets: Select the private subnets
5. Configure environment:
   - Environment name: "HappyBirthday-Prod"
   - Domain: happybirthday.region.elasticbeanstalk.com
   - Load balanced: Yes
   - Instance type: t3.medium
   - Min instances: 1
   - Max instances: 5
6. Configure environment properties:
   - NEXT_PUBLIC_API_URL: Your API Gateway URL
   - NEXT_PUBLIC_REGION: Your AWS region
   - NEXT_PUBLIC_USER_POOL_ID: Your Cognito User Pool ID
   - NEXT_PUBLIC_USER_POOL_WEB_CLIENT_ID: Your Cognito Client ID

### Deployed Application Access

1. **Access the application through the domain:**
   - Open your browser and navigate to `https://happybirthday.com` (or your custom domain)
   - Sign in with your Cognito credentials

2. **Access the application through Elastic Beanstalk:**
   - Open your browser and navigate to `https://happybirthday.region.elasticbeanstalk.com`
   - Sign in with your Cognito credentials

3. **Access the application through CloudFront:**
   - Open your browser and navigate to the CloudFront distribution URL
   - Sign in with your Cognito credentials

   **Troubleshooting deployment:**
   - **Application not accessible**: Check Route 53, CloudFront, and ELB configurations
   - **Authentication issues**: Verify Cognito User Pool configuration
   - **API Gateway issues**: Check Lambda function permissions and API Gateway settings
   - **S3 access issues**: Verify bucket permissions and CORS configuration
   - **EC2 instance issues**: Check security groups and instance health
   - **Auto Scaling issues**: Verify scaling policies and capacity settings
   - **CodeDeploy issues**: Check deployment logs and scripts
   - **CloudWatch alarms**: Review alarm history and metrics

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
├── scripts/               # Deployment scripts
├── amplify.yml           # AWS Amplify configuration
├── template.yaml         # AWS SAM template
├── buildspec.yml         # AWS CodeBuild configuration
├── appspec.yml           # AWS CodeDeploy configuration
└── package.json          # Project dependencies
```

## 🔒 Security

- Authentication handled by Amazon Cognito
- API endpoints secured with API Gateway
- S3 bucket configured with appropriate CORS and security policies
- Environment variables for sensitive information
- IAM roles and policies for least privilege access
- VPC for network isolation
- CloudTrail for audit logging
- CloudWatch for monitoring and alerting

## 🌐 Deployment

The application can be deployed using various AWS services:

1. **Simple Deployment**: AWS Amplify for frontend and backend
2. **Standard Deployment**: EC2, ELB, ASG, and S3
3. **Advanced Deployment**: Elastic Beanstalk with custom configuration
4. **Enterprise Deployment**: Multi-region deployment with Route 53 and CloudFront

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For any questions or suggestions, please open an issue in the GitHub repository. 