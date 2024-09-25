# Use a slim version of the Python image to reduce size
FROM python:3.11.2-slim

# Set an argument for the environment
ARG env

# Install system dependencies and create a non-root user
RUN apt-get update && apt-get install -y --no-install-recommends curl \
    && groupadd -r appuser && useradd --no-log-init -r -g appuser appuser \
    && rm -rf /var/lib/apt/lists/*

# Upgrade pip and install Poetry
RUN python -m pip install --upgrade pip \
    && pip install poetry

# Set the working directory
WORKDIR /app

# Copy Poetry files first to take advantage of Docker layer caching
COPY poetry.lock pyproject.toml ./

# Install Python dependencies using Poetry, without creating a virtual environment
RUN poetry config virtualenvs.create false \
    && poetry install --no-dev --no-interaction --no-ansi

# Clear Poetry's cache to reduce image size
RUN rm -rf $POETRY_CACHE_DIR

# Copy the rest of the application code
COPY ./account ./

# Change ownership of the /app directory to the non-root user
RUN chown -R appuser:appuser /app

# Switch to the non-root user
USER appuser

# Expose the application port
EXPOSE 8000

# Start the application using Poetry
CMD ["poetry", "run", "uvicorn", "account.entrypoints.api.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]