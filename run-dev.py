#!/usr/bin/env python3

import os, json


def run_docker():
    resp = os.popen("docker-compose down").read()
    resp = os.popen("docker-compose up -d").read()
    
def build_code():
    resp = os.popen("sh dev-build.sh").read()

def create_user_pool():
    resp = os.popen("aws --endpoint http://localhost:9229 cognito-idp create-user-pool --pool-name akello --no-cli-pager --output json").read()
    user_pool_id = json.loads(resp)['UserPool']['Id']
    return user_pool_id

def create_user_pool_client(user_pool_id):
    resp = os.popen(f"aws --endpoint http://localhost:9229 cognito-idp create-user-pool-client --user-pool-id {user_pool_id} --client-name client --output json --no-cli-pager").read()
    client_id = json.loads(resp)['UserPoolClient']['ClientId']
    return client_id    

def get_saved_client():
    # Opening JSON file
    f = open('.cognito/db/clients.json')        
    clients = json.load(f) 
    return list(clients['Clients'].keys())[0]
    
def get_saved_user_pool():
    for file in os.listdir('.cognito/db'):
        if file.endswith(".json") and file.startswith("local"):            
            return file.split('.')[0]


def main():
    try:
        client_id = get_saved_client()
        user_pool_id = get_saved_user_pool()
        print("using saved client and user pool")
    except:
        print("creating new client and user pool")
        user_pool_id = create_user_pool()
        client_id = create_user_pool_client(user_pool_id)

    run_docker()
    build_code()

    print("\n\n")
    print("Add the following to your .env file")
    print("-----------------------------------")  
    print(f"export AWS_COGNITO_USERPOOL_ID={user_pool_id}")        
    print(f"export AWS_COGNITO_APP_CLIENT_ID={client_id}")     
    print(f"export AWS_DYNAMODB_TABLE='akello-local'")
    print(f"export AKELLO_API_URL=http://127.0.0.1:8000/v1")
    print(f"AKELLO_COGNITO_LOCAL=TRUE")
    print(f"AKELLO_COGNITO_URL=http://localhost:9229")
    print(f"AKELLO_DYNAMODB_LOCAL=TRUE")
    print(f"AKELLO_DYNAMODB_LOCAL_URL=http://localhost:8001")
    print("\n\n")



if __name__ == '__main__':
    main()


os.environ["DEBUSSY"] = "1"