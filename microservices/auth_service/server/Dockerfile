# Use an official Python runtime as a parent image
FROM python:3.12-slim

# Install curl and any required system dependencies
RUN apt-get update && apt-get install -y curl

# Install Poetry
RUN curl -sSL https://install.python-poetry.org | python3 -

# Ensure Poetry is available in the PATH
ENV PATH="/root/.local/bin:$PATH"

# Set the working directory in the container
WORKDIR /app

# Copy the pyproject.toml and poetry.lock files to install dependencies first
COPY pyproject.toml poetry.lock ./

# Install project dependencies using Poetry
RUN poetry install --no-root --no-dev

# Copy the rest of the application code into the container
COPY . .

# Expose port 80 for the FastAPI app
EXPOSE 3001

# Run the FastAPI app using Uvicorn
CMD ["poetry", "run", "uvicorn", "app:app", "--host", "0.0.0.0", "--port", "3001"]
