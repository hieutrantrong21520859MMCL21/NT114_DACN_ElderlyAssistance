import { useCallback, useState } from 'react';

import {
    StyleSheet,
    View,
    Text,
    Platform,
    KeyboardAvoidingView
} from 'react-native';

import uuid from 'react-native-uuid';
import chatbot_dataset from '../assets/dataset/chatbot_dataset';
import { findBestMatch } from 'string-similarity';

import { GiftedChat, InputToolbar, Message, Bubble } from 'react-native-gifted-chat';

const ChatbotScreen = ({navigation}) => {
    const [messages, setMessages] = useState([
        // {
		//     _id: uuid.v4(),
		//     text: "Hello!, how can I help you?",
		//     createdAt: new Date(),
		//     user: {
        //         _id: 2,
        //         name: "Chatbot"
        //     },
        // }
    ]);

	const handleSend = useCallback((newMessages = []) => {
		setMessages(currentMessages =>
			GiftedChat.append(currentMessages, newMessages)
		);

		const userMessage = newMessages[0].text;
        show(userMessage);
        // const botResponse = getChatbotResponse(userMessage);

		// setMessages(currentMessages =>
		// 	GiftedChat.append(currentMessages, [{
        //         _id: uuid.v4(),
		// 		text: botResponse,
		// 		createdAt: new Date(),
		// 		user: {
        //             _id: 2,
        //             name: "Chatbot"
        //         },
        //     }])
		// );
	}, []);

    const getChatbotResponse = (userMessage = '') => {
        const standardizedInput = `${
            userMessage.split(' ')
            .filter(word => word)
            .join(' ')
        }`
        .toLowerCase();

        chatbot_dataset.forEach(data => {
            data.conversations.forEach(conversation => {
                const matches = findBestMatch(
                    standardizedInput,
                    conversation.user_inputs.map(sample => sample.toLowerCase())
                );

                if (matches.bestMatch.rating > 0.7) {
                    return conversation.responses[
                        Math.floor(Math.random() * conversation.responses.length)
                    ];
                }
            });
        });

        return '';
    }
    
    const show = (userMessage = '') => {
        const standardizedInput = `${
            userMessage.split(' ')
            .filter(word => word)
            .join(' ')
        }`
        .toLowerCase();

        chatbot_dataset.forEach(data => {
            data.conversations.forEach(conversation => {
                const matches = findBestMatch(
                    standardizedInput,
                    conversation.user_inputs.map(sample => sample.toLowerCase())
                );

                if (matches.bestMatch.rating > 0.7) {
                    console.log(conversation.responses[
                        Math.floor(Math.random() * conversation.responses.length)
                    ])
                }
            });
        });
        // console.log(standardizedInput);
    }

	return (
        <View style={styles.container}>
            <GiftedChat
		    	messages={messages}
		    	onSend={newMessages => handleSend(newMessages)}
		    	user={{
                    _id: 1,
                    name: "User"
                }}
		    />
        </View>
		// <GiftedChat
		// 	messages={messages}
		// 	onSend={newMessages => handleSend(newMessages)}
		// 	user={{
        //         _id: 1,
        //         name: "User"
        //     }}
		// />
	);
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});

export default ChatbotScreen;