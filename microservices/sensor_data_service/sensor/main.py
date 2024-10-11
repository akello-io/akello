from fastapi import FastAPI, BackgroundTasks
from aiokafka import AIOKafkaProducer, AIOKafkaConsumer
from pydantic import BaseModel
import asyncio
import logging

app = FastAPI()

# Kafka configuration
KAFKA_BOOTSTRAP_SERVERS = 'kafka:9092'
KAFKA_TOPIC = 'my_topic'

producer = None
api_consumer = None
background_consumer = None

# Logging configuration
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


async def get_kafka_producer():
    global producer
    if producer is None:
        producer = AIOKafkaProducer(bootstrap_servers=KAFKA_BOOTSTRAP_SERVERS)
        await producer.start()
        logger.info("Kafka producer started")
    return producer


async def get_kafka_consumer(group_id):
    global api_consumer, background_consumer
    if group_id == "api_consumer":
        if api_consumer is None:
            api_consumer = AIOKafkaConsumer(
                KAFKA_TOPIC,
                bootstrap_servers=KAFKA_BOOTSTRAP_SERVERS,
                group_id=group_id,
                auto_offset_reset='earliest'
            )
            await api_consumer.start()
            logger.info(f"Kafka API consumer for group '{group_id}' started")
        return api_consumer
    elif group_id == "background_consumer":
        if background_consumer is None:
            background_consumer = AIOKafkaConsumer(
                KAFKA_TOPIC,
                bootstrap_servers=KAFKA_BOOTSTRAP_SERVERS,
                group_id=group_id,
                auto_offset_reset='earliest'
            )
            await background_consumer.start()
            logger.info(f"Kafka background consumer for group '{group_id}' started")
        return background_consumer


@app.on_event("startup")
async def startup_event():
    await get_kafka_producer()
    await get_kafka_consumer("background_consumer")


@app.on_event("shutdown")
async def shutdown_event():
    global producer, api_consumer, background_consumer
    if producer:
        await producer.stop()
        producer = None
        logger.info("Kafka producer stopped")
    if api_consumer:
        await api_consumer.stop()
        api_consumer = None
        logger.info("Kafka API consumer stopped")
    if background_consumer:
        await background_consumer.stop()
        background_consumer = None
        logger.info("Kafka background consumer stopped")


@app.get("/")
async def root():
    return {"message": "Hello World!!"}


class Message(BaseModel):
    message: str


@app.post("/send-message/")
async def send_message(message: Message):
    kafka_producer = await get_kafka_producer()
    try:
        await kafka_producer.send_and_wait(KAFKA_TOPIC, message.message.encode('utf-8'))
        return {"message": f"Message sent to Kafka: {message.message}"}
    except Exception as e:
        logger.error(f"Failed to send message: {e}")
        return {"error": f"Failed to send message: {str(e)}"}


@app.get("/get-message/")
async def get_message():
    kafka_consumer = await get_kafka_consumer("api_consumer")
    try:
        msg = await kafka_consumer.getone()
        if msg:
            return {"message": msg.value.decode('utf-8')}
        else:
            return {"message": "No messages available"}
    except Exception as e:
        logger.error(f"Failed to get message: {e}")
        return {"error": str(e)}


# Background task to consume messages continuously
async def consume_kafka_messages():
    kafka_consumer = await get_kafka_consumer("background_consumer")
    async for msg in kafka_consumer:
        logger.info(f"Consumed message in background: {msg.value.decode('utf-8')}")


@app.on_event("startup")
async def start_background_consumption():
    asyncio.create_task(consume_kafka_messages())  # Run background consumer task

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
