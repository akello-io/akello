FROM python:3.11.2

ARG env

RUN python -m pip install --upgrade pip
RUN pip install poetry

WORKDIR /app

COPY poetry.lock pyproject.toml ./

RUN poetry config virtualenvs.create false \
    && poetry install --no-dev --no-interaction --no-ansi

RUN rm -rf $POETRY_CACHE_DIR

COPY ./auth ./

RUN poetry install

CMD ["poetry", "run", "uvicorn", "auth.entrypoints.api.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]

EXPOSE 8000