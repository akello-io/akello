

To run locally:
uvicorn main:app --reload


ECR Push PROD:
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 440667844220.dkr.ecr.us-east-1.amazonaws.com
docker build --build-arg settings_env=PROD -t akello.io .
docker tag akello.io:latest 440667844220.dkr.ecr.us-east-1.amazonaws.com/akello.io:latest
docker push 440667844220.dkr.ecr.us-east-1.amazonaws.com/akello.io:latest


aws lambda update-function-code \
           --function-name akello-io-api \
           --image-uri 440667844220.dkr.ecr.us-east-1.amazonaws.com/akello.io:latest


ECR PUSH DEMO:
aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin 440667844220.dkr.ecr.us-east-1.amazonaws.com
docker build -t demo-akello-io .
docker tag demo-akello-io:latest 440667844220.dkr.ecr.us-east-1.amazonaws.com/demo-akello-io:latest
docker push 440667844220.dkr.ecr.us-east-1.amazonaws.com/demo-akello-io:latest

aws lambda update-function-code \
           --function-name demo-akello-io \
           --image-uri 440667844220.dkr.ecr.us-east-1.amazonaws.com/demo-akello-io:latest