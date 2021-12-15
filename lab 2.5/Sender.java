package com.jms;

import javax.jms.*;
import javax.naming.InitialContext;
import javax.naming.NamingException;

public class Sender {
    TopicConnection connection;
    TopicPublisher publisher;
    TopicSession session;
    String username;

    public Sender(String topicFactory, String topicName, String username) throws NamingException, JMSException {
        InitialContext ctx = new InitialContext();
        TopicConnectionFactory connFactory = (TopicConnectionFactory) ctx.lookup(topicFactory);
        connection = connFactory.createTopicConnection();
        session = connection.createTopicSession(false, Session.AUTO_ACKNOWLEDGE);
        Topic chatTopic = (Topic) ctx.lookup(topicName);
        publisher = session.createPublisher(chatTopic);
        this.username = username;
    }

    public void close() throws JMSException {
        connection.close();
    }

    public void sendMessage(String text) throws JMSException {
        TextMessage message = session.createTextMessage(username + ": " + text);
        publisher.publish(message);
    }
}
