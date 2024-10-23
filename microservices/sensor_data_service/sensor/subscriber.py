import paho.mqtt.client as mqtt

# MQTT Broker details
broker = 'localhost'  # Replace with your broker address (EMQX broker address)
port = 1883  # Default MQTT port for EMQX
topic = "sensors/temperature/device1"  # Topic to subscribe to

# Callback function when a message is received
def on_message(client, userdata, message):
    print(f"Received message: {message.payload.decode()} on topic: {message.topic}")

# Callback function when the client connects to the broker
def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("Connected to broker")
        # Subscribe to the topic
        client.subscribe(topic)
    else:
        print("Connection failed with code", rc)

# Create a client instance
client = mqtt.Client()

# Assign the callbacks
client.on_connect = on_connect
client.on_message = on_message

# Connect to the broker
client.connect(broker, port, 60)

# Start the loop to process network traffic and dispatch callbacks
client.loop_start()

# Run the service indefinitely
try:
    while True:
        pass  # Keep the script running
except KeyboardInterrupt:
    print("Microservice stopped.")
finally:
    client.loop_stop()
    client.disconnect()
