
import click
import pathlib
from boto3 import Session
from boto3.dynamodb.conditions import Key
from datetime import datetime

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

@click.command()
@click.option('--region', required=True, help='AWS region.')
@click.option('--profile', required=True, help='AWS profile to use.')
@click.option('--dynamodb-table', required=True, help='DynamoDB Table used to analyze.')
def analytics(region, profile, dynamodb_table):    
    """Export analytics from the accounts to trak engagement and product metrics."""
    session = Session(profile_name=profile)
    db = session.resource('dynamodb', region_name=region)
    tables = list(db.tables.all())
    
    print(bcolors.OKCYAN + "------------------------------" + bcolors.ENDC)
    print(bcolors.OKCYAN + f"Info: List of dynamodb tables using AWS profile {profile}" + bcolors.ENDC)
    for idx, table in enumerate(tables):
        print(bcolors.OKBLUE + f"{idx + 1}. {table.table_name}" + bcolors.ENDC)    
    print(bcolors.OKCYAN + "------------------------------" + bcolors.ENDC)
    print(bcolors.OKGREEN + f"You selected to run an anlytics request on the table {dynamodb_table}" + bcolors.ENDC)        

    """
    value = click.prompt('Is this correct? (yes/no)', type=str)
    if value == 'no':
        return
    
    with click.progressbar([1, 2, 3]) as bar:
        for x in bar:
            print(f"building report({x})...")
            time.sleep(x)
    """
        
    print(bcolors.OKGREEN + f"Report generated successfully" + bcolors.ENDC)        

    registry_ids = scan_registeries(db.Table(dynamodb_table))
    for registry_id in registry_ids:        
        scan_patients(db.Table(dynamodb_table), registry_id.split(':')[1])


def scan_registeries(db_table):    
    response = db_table.scan(
        FilterExpression=Key('partition_key').begins_with('registry:') & Key('sort_key').eq('metadata')
    )
    return [item['partition_key'] for item in response['Items']]        

def get_users_in_registry(db_table, registry_id):
    partition_key = f'registry-user:{registry_id}'
    response = db_table.scan(
        FilterExpression=Key('partition_key').eq(partition_key) 
    )
    return response['Items']

def get_user(db_table, user_id):
    partition_key = f'user:{user_id}'
    response = db_table.get_item(
        Key={
            'partition_key': partition_key,
            'sort_key': 'profile'
        }
    )
    return response['Item']

def scan_patients(db_table, registry_id):
    partition_key = f'registry-patient:{registry_id}'

    response = db_table.scan(
        FilterExpression=Key('partition_key').eq(partition_key) 
    )
    users = get_users_in_registry(db_table, registry_id)    
    emails = [get_user(db_table, user['user_id'])['email'] for user in users]

    patient_created_stats = {}
    for patient in response['Items']:
        date_created = datetime.strftime(datetime.fromtimestamp(int(patient['date_created'])), '%d/%b/%y')         
        if date_created in patient_created_stats:
            patient_created_stats[date_created] += 1
        else:
            patient_created_stats[date_created] = 1

    print ({
        'registry_id': registry_id,
        'emails': emails,        
        'patient_created_stats': patient_created_stats
    })
        