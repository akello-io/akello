import Foundation
import SwiftMQTT

public class AkelloClient: MQTTSessionDelegate {
    private var session: MQTTSession!

    public init(clientID: String, host: String, port: UInt16, username: String?, password: String?) {
        session = MQTTSession(
            host: host,
            port: port,
            clientID: clientID,
            cleanSession: true,
            keepAlive: 60,
            useSSL: false
        )
        session.username = username
        session.password = password
        session.delegate = self
    }

    public func connect(completion: @escaping (Bool) -> Void) {
        session.connect { error in
            if error == .none {
                print("Connected successfully")
                completion(true)
            } else {
                print("Connection failed: \(error)")
                completion(false)
            }
        }
    }

    public func sendMessage(topic: String, message: String) {
        let data = message.data(using: .utf8)!
        session.publish(data, in: topic, delivering: .atLeastOnce, retain: false) { error in
            if error == .none {
                print("Message sent successfully to topic: \(topic)")
            } else {
                print("Failed to send message: \(error)")
            }
        }
    }

    public func subscribe(to topic: String) {
        session.subscribe(to: topic, delivering: .atLeastOnce) { error in
            if error == .none {
                print("Subscribed successfully to topic: \(topic)")
            } else {
                print("Failed to subscribe: \(error)")
            }
        }
    }

    // Correct implementation of the method to receive messages
    public func mqttDidReceive(message: MQTTMessage, from session: MQTTSession) {
        let messageString = String(data: message.payload, encoding: .utf8) ?? "Invalid message"
        print("Received message: \(messageString) on topic: \(message.topic)")
    }

    public func mqttDidDisconnect(session: MQTTSession, error: MQTTSessionError) {
        print("Disconnected with error: \(error)")
    }

    public func mqttSocketErrorOccurred(session: MQTTSession) {
        print("Socket error occurred")
    }

    public func mqttDidAcknowledgePing(from session: MQTTSession) {
        print("Ping acknowledged")
    }
}
