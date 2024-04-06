import click
import os
import pathlib
import uvicorn

current_file_path = pathlib.Path(__file__).parent.resolve()

@click.command()
@click.argument('name')
def start(name):
    if name=='server':
        uvicorn.run("akello.main:app", host="0.0.0.0", port=8000, reload=True, log_level="debug", proxy_headers=True)
    elif name=='cocm':
        cmd = """sh packages/cli/akellocli/dev-build-single.sh"""
        os.system(cmd)

