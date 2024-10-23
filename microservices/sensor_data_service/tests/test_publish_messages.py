import paho.mqtt.client as mqtt
import time
import random

# MQTT Broker details
broker = 'localhost'  # Replace with your broker address (EMQX broker address)
port = 1883  # Default MQTT port for EMQX
topic = "sensors/temperature/device1"  # Topic the sensor will send data to

# Create a client instance
client = mqtt.Client()

# Connect to the broker
client.connect(broker, port, 60)

# Function to simulate temperature data and publish it to the topic
def publish_sensor_data():
    while True:
        temperature = round(random.uniform(20.0, 30.0), 2)  # Generate random temperature
        message = f"{{'temperature': {temperature}, 'device_id': 'device1'}}"
        
        # Publish the message to the MQTT topic
        client.publish(topic, message)
        print(f"Published: {message} to topic: {topic}")
        
        time.sleep(5)  # Simulate a delay between sensor readings

if __name__ == "__main__":
    try:
        publish_sensor_data()
    except KeyboardInterrupt:
        print("Sensor simulation stopped.")
