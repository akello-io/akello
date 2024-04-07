import click
import os, json
import pathlib
import subprocess

current_file_path = pathlib.Path(__file__).parent.resolve()

class bcolors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKCYAN = '\033[96m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'

def run_docker():
    print("starting docker")
    resp = os.popen(f"docker-compose down").read()
    resp = os.popen(f"COGNITO_PATH={os.getcwd()}/.cognito docker-compose -f {current_file_path}/../docker-compose.yml up -d ").read()
    print("running docker")


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


def is_docker_running():
    try:
        subprocess.check_output('docker ps', shell=True)
        print("Verified Docker is running")
        return True
    except:
        print("Docker is not running")
        return False

def is_aws_cli_installed():
    try:
        subprocess.check_output('aws', shell=True)
        return True
    except:
        print("AWS cli is not installed")
        return False

def run_setup():
    if not is_docker_running():
        print(bcolors.FAIL + "Error: Docker isn't installed or running?" + bcolors.ENDC)
        raise Exception("Docker is not running")

    if not is_aws_cli_installed():
        print(bcolors.FAIL + "Error: AWS CLI isn't installed" + bcolors.ENDC)
        raise Exception("AWS CLI is not installed")

    run_docker() # setup and run docker

    try:
        # Check if a user pool already exists if so exit
        client_id = get_saved_client()
        user_pool_id = get_saved_user_pool()
        print("user pool already exists")
        return
    except:
        print("User pool does not exist")

    print("creating new client and user pool")
    user_pool_id = create_user_pool()
    client_id = create_user_pool_client(user_pool_id)
    print(f"created user pool and client successfully: userpool:{user_pool_id} client:{client_id}")


def run_setup_env():
    try:
        client_id = get_saved_client()
        user_pool_id = get_saved_user_pool()
        print("using saved client and user pool")
    except:
        print("Make sure you have run akello setup")
        return

    os.environ["AWS_COGNITO_USERPOOL_ID"] = user_pool_id
    os.environ["AWS_COGNITO_APP_CLIENT_ID"] = client_id
    os.environ["AWS_DYNAMODB_TABLE"] = "akello-local"
    os.environ["AWS_REGION"] = "us-east-1"
    os.environ["AKELLO_API_URL"] = "http://127.0.0.1:8000/v1"
    os.environ["AKELLO_COGNITO_URL"] = "http://localhost:9229"
    os.environ["AKELLO_DYNAMODB_LOCAL_URL"] = "http://localhost:8001"

    akello_ascii = """
                              ██████                                      ████        ████
                        ████████                                 █████████  ██████████
                           █████                                    ██████      ██████
                           █████                                     █████      ██████
                           █████                                     █████      ██████
                           █████                                     █████      ██████
       ██████████████      █████       █████████   ███████████       █████      ██████         ███████████
    █████     ███████      █████        ██████   ███████████████     █████      ██████      █████████████████
  █████        ██████      █████      █████    ██████      ██████    █████      ██████    ███████       ██████
 █████          █████      █████    █████     █████         ██████   █████      ██████   ███████         ██████
██████          █████      █████  █████       ████████████████████   █████      ██████   ██████           ██████
█████           █████      ███████████        ████████████████████   █████      ██████  ███████           ██████
█████           █████      █████████████      █████                  █████      ██████  ███████           ██████
██████          █████      ██████ ████████    ██████                 █████      ██████  ███████           ██████
██████          █████     ██████    ███████   ███████                █████      ██████   ██████           ██████
███████         █████   ████████      ███████  ███████          ██   █████      ██████    ██████         ██████
 █████████   ███████████████████       ████████ ██████████████████   ██████     ██████     ███████     ███████
   ████████████ ████████   ███████       ███████  ██████████████  ███████████████████████    ███████████████
      █████     █████                                 ██████                                     ███████
    """

    print(akello_ascii)
    print("\n\n")
    print("Add the following to your .env file")
    print("-----------------------------------")
    print(f"export AWS_COGNITO_USERPOOL_ID={user_pool_id}")
    print(f"export AWS_COGNITO_APP_CLIENT_ID={client_id}")
    print(f"export AWS_DYNAMODB_TABLE='akello-local'")
    print(f"export AWS_REGION=us-east-1")
    print(f"export AKELLO_API_URL=http://127.0.0.1:8000/v1")
    print(f"export AKELLO_COGNITO_URL=http://localhost:9229")
    print(f"export AKELLO_DYNAMODB_LOCAL_URL=http://localhost:8001")
    print(f"export STRIPE_API_KEY=xxxx set it manually for now xxxxx")
    print("\n\n")

@click.command()
def setup():
    # packages_path = os.path.join(current_file_path, '../../../')
    # os.system(f"cd {current_file_path}/.. && ls {packages_path}/server/akello/ -all && cp .template.api.env {packages_path}/server/akello/.env")
    run_setup()

@click.command()
def setup_env():
   run_setup_env()