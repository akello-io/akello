import click
import os
import pathlib
current_file_path = pathlib.Path(__file__).parent.resolve()

@click.command()
@click.argument('name')
def start(name):
    if name=='server':
        cmd = """
                cd packages/server &&
                source .venv/bin/activate &&
                pip install -r requirements.txt &&
                uvicorn akello.main:app --reload
        """
        os.system(cmd)
    elif name=='cocm':
        cmd = """sh packages/cli/akellocli/dev-build-single.sh"""
        os.system(cmd)

