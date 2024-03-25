import click
from akellocli.commands.setup import setup
from akellocli.commands.start import start
from akellocli.commands.analytics import analytics

@click.group()
def local_commands():
    pass

local_commands.add_command(setup)
local_commands.add_command(start)
local_commands.add_command(analytics)


def cli():
    local_commands()

if __name__ == '__main__':
    local_commands()