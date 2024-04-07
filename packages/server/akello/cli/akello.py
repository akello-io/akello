import click
from akello.cli.commands.build import build
from akello.cli.commands.setup import setup
from akello.cli.commands.start import start, mock_server
from akello.cli.commands.analytics import analytics

@click.group()
def local_commands():
    pass

local_commands.add_command(build)
local_commands.add_command(setup)
local_commands.add_command(mock_server)
local_commands.add_command(start)
local_commands.add_command(analytics)

def cli():
    local_commands()

if __name__ == '__main__':
    local_commands()