import click
from akello.cli.commands.build import build
from akello.cli.commands.setup import setup
from akello.cli.commands.start import start, mock_server
from akello.cli.commands.analytics import analytics
from akello.cli.commands.prompt import prompt
from akello.cli.commands.text2speech import text2speech


@click.group()
def local_commands():
    pass


local_commands.add_command(build)
local_commands.add_command(setup)
local_commands.add_command(mock_server)
local_commands.add_command(start)
local_commands.add_command(analytics)
local_commands.add_command(prompt)
local_commands.add_command(text2speech)


def cli():
    local_commands()


if __name__ == '__main__':
    local_commands()
