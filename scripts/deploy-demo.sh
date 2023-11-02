# ARGS
# - AWS_ACCOUNT
# - ECR tag
# - S3
# - CloudFront Distribution ID

# Deploy Server
cd ../packages/server
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin $1.dkr.ecr.us-east-1.amazonaws.com
docker build -t $2 .
docker tag $2:latest 440667844220.dkr.ecr.us-east-1.amazonaws.com/$2:latest
docker push 440667844220.dkr.ecr.us-east-1.amazonaws.com/demo-akello-io:latest


# Deploy Web
cd ../apps/cocm-registry
npm run build
aws s3 cp ./build s3://$3 --recursive
aws cloudfront create-invalidation --distribution-id $4 --paths '/*'