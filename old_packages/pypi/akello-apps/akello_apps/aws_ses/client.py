import boto3

# If necessary, replace us-west-2 with the AWS Region you're using for Amazon SES.
AWS_REGION = "us-west-2"

# Create a new SES resource and specify a region.
client = boto3.client('ses',region_name=AWS_REGION)