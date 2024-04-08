import click
import ollama



@click.command()
@click.argument('input')
def prompt(input: str):

    stream = ollama.chat(
        model='llama2',
        messages=[{'role': 'user', 'content': input}],
        stream=True,
    )

    for chunk in stream:
        print(chunk['message']['content'], end='', flush=True)

