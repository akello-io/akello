
# AWS Cognito Tokens

You need two tokens to setup and run akello from cognito.

1. cognito pool id => AWS_COGNITO_USERPOOL_ID
2. cognito app client id => AWS_COGNITO_APP_CLIENT_ID

You can find the pool_id from the cognito pool overview section, and for the app client id you will need to navigate to the 'App Integration' tab of the cognito pool and scroll all the way down to the App client list. Over there you should see the app you created along with it's ID.  



# Setting up AWS Cognito for Authentication

Navigate to the Amazon Cognito section of your AWS account

## Step 1: Configure sign-in experience

**Config Section: Cognito user pool sign-in options**
- Enable **username** and **email**

## Step 2: Configure security requirements

**Config Section: Multi-factor authentication**
- Set to No MFA, keeps it simple for local dev

**Config Section: User account recovery**
- Set delivery method for user account recivery messages to **Email only** (will work in your free tier)

## Step 3: Configure security requirements

**Config Section: Required attributes**
- Make sure to also add 'given name' and 'family name'

## Step 4: Configure message delivery

- Select email with Cognito. For local development you won't need to setup SES.

## Integrate your app

**Config Section: User pool name**
- Set the name of the user pool (e.g., local-akello-dev-pool)

**Config Section: Initial app client**
- Set the app client name (e.g., local-dev-akello-app)

