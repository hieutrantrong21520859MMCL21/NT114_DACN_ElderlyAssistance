import { useCallback, useState, useEffect } from 'react';

import {
    StyleSheet,
    View,
    ActivityIndicator
} from 'react-native';

import uuid from 'react-native-uuid';
import chatbot_dataset from '../../../../assets/dataset/chatbot_dataset';
import {
    preprocessDataset,
    tokenizeText,
    encodeText,
    trainModel,
    predictIntent
} from './chatbot_preprocessing';
import '@tensorflow/tfjs-react-native'; // TensorFlow.js for React Native
import * as tf from '@tensorflow/tfjs';

import { GiftedChat, InputToolbar, Message, Bubble } from 'react-native-gifted-chat';

const ChatbotScreen = ({navigation}) => {
    const [model, setModel] = useState(null);
    const [vocabulary, setVocabulary] = useState([]);
    const [intents, setIntents] = useState([]);
    const [messages, setMessages] = useState([{
		_id: uuid.v4(),
		text: "Hello!, how can I help you?",
		createdAt: new Date(),
		user: {
            _id: 2,
            name: "Chatbot"
        },
    }]);

    useEffect(() => {
        const initializeTf = async () => {
            try {
                await tf.setBackend('cpu'); // Use the CPU backend for compatibility
                await tf.ready(); // Ensure TensorFlow is ready
                console.log('TensorFlow.js is ready');
            } catch (error) {
                console.error('Error initializing TensorFlow.js:', error);
            }
        };

        const initModel = async() => {
            const { sentences, labels, intents } = preprocessDataset(chatbot_dataset);
            const vocabulary = tokenizeText(sentences);
            const encodedSentences = encodeText(sentences, vocabulary);
            const model = await trainModel(encodedSentences, labels, intents.length);
            setModel(model);
            setVocabulary(vocabulary);
            setIntents(intents);
            // const userInput = "hello";
            // const intent = predictIntent(model, userInput, vocabulary, intents);
            // console.log(intent.responses); // ["Hello! How are you doing today?", ...]
        };
        
        initializeTf();
        initModel();
    }, []);

	const handleSend = useCallback((newMessages = []) => {
		setMessages(currentMessages =>
			GiftedChat.append(currentMessages, newMessages)
		);

		const userMessage = newMessages[0].text;
        const intent = predictIntent(model, userMessage, vocabulary, intents);
        const botResponse = intent.responses[Math.floor(Math.random() * intent.responses.length)];
        // const botResponse = predictIntent(model, userMessage, vocabulary, intents);

		setMessages(currentMessages =>
			GiftedChat.append(currentMessages, [{
                _id: uuid.v4(),
				text: botResponse,
				createdAt: new Date(),
				user: {
                    _id: 2,
                    name: "Chatbot"
                },
            }])
		);
	}, [model, vocabulary, intents]);

	return (
        <View style={styles.container}>
            {
                (model && vocabulary.length && intents.length) ?
                (
                    <GiftedChat
                        messages={messages}
                        onSend={newMessages => handleSend(newMessages)}
                        user={{
                            _id: 1,
                            name: "User"
                        }}
                    />
                ) :
                (
                    <ActivityIndicator
                        size='large'
                        color='green'
                        style={styles.loader}
                    />
                )
            }
        </View>
	);
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    loader: {
        position: 'absolute',
        margin: 'auto',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    }
});

export default ChatbotScreen;