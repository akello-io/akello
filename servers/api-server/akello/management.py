import typer
from akello.commands.generate_mock_demo_registry import generate_registry
from akello.dynamodb import drop_tables
from akello.services.admin import AdminService
from datetime import datetime
app = typer.Typer()


@app.command()
def mock_registry(name: str, patient_count: int = 100):
    generate_registry(name, patient_count=patient_count)

@app.command()
def drop_db_tables():
    drop_tables()

@app.command()
def scan_akello_stats():
    users = AdminService.scan_users()
    registries = AdminService.scan_registry()
    user_registries = AdminService.scan_user_registeries()

    user_registeries_stat = {}
    for user_registry in user_registries:
        if user_registry['user_id'] not in user_registeries_stat:
            user_registeries_stat[user_registry['user_id']] = 0
        user_registeries_stat[user_registry['user_id']] += 1

    print('-------------Akello Stats-----------------')
    print('total users: %s' % len(users))
    print('total registries: %s' % len(registries))
    print('Email,Registries,Last Login')
    for user in users:

        date = datetime.fromtimestamp(int(user['last_login']))
        # user_registeries_stat[user['user_id']]
        date_str = '%s-%s-%s' % (date.month, date.day, date.year)
        print('%s,%s,%s' % (user['email'], user_registeries_stat[user['partition_key'].split('user:')[1]],  date_str))


if __name__ == "__main__":
    app()