import click
import os, json
import pathlib
current_file_path = pathlib.Path(__file__).parent.resolve()

@click.command()
def build():
   resp = os.popen(f"sh {current_file_path}/../dev-build-single.sh ").read()