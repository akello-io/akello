
FROM python:3.9

ARG env
COPY ./ ./
RUN python -m pip install --upgrade pip
RUN pip install -r ./requirements.txt

CMD ["uvicorn", "akello.main:app", "--host", "0.0.0.0", "--port", "8000"]

EXPOSE 8000