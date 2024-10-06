import click
from openai import OpenAI

client = OpenAI()


@click.command()
@click.argument('text')
def text2speech(text: str):
    # speech_file_path = Path(__file__).parent / "speech.mp3"
    response = client.audio.speech.create(model="tts-1", voice="alloy", input=text, )
    response.stream_to_file('test.mp3')
