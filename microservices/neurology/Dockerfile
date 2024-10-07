# Use the slim version of the Python 3.12 image to reduce size
FROM python:3.12-slim

# Set an argument for the environment
ARG env

# Install system dependencies and create a non-root user
RUN apt-get update && apt-get install -y --no-install-recommends curl \
    && groupadd -r appuser && useradd --no-log-init -r -g appuser -d /app appuser \
    && rm -rf /var/lib/apt/lists/*

# Upgrade pip and install Poetry
RUN python -m pip install --upgrade pip \
    && pip install poetry

# Set Poetry to create virtual environments inside the project directory
RUN poetry config virtualenvs.in-project true

# Set the working directory
WORKDIR /app

# Copy pyproject.toml and poetry.lock files
COPY ./microservices/neurology/pyproject.toml ./microservices/neurology/poetry.lock ./

# Change ownership of the /app directory to the non-root user
RUN chown -R appuser:appuser /app

# Switch to the non-root user
USER appuser

# Install the dependencies
RUN poetry install --no-root

# Copy the rest of the application code
COPY ./microservices/neurology .

# Expose the application port
EXPOSE 8000

# Start the application using Uvicorn directly
CMD ["poetry", "run", "uvicorn", "neurology.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]
