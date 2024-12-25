import { useRef, useState } from 'react';

import {
    PanResponder,
    Animated,
    Linking,
    Platform,
    Alert
} from 'react-native';

import { Feather } from '@expo/vector-icons';

const CallingButton = props => {
    const position = useRef(new Animated.ValueXY()).current;
    const [dragging, setDragging] = useState(false);
    
    const num = '0825452467';

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                setDragging(true);
            },
            onPanResponderMove: Animated.event(
                [
                    null,
                    {
                        dx: position.x,
                        dy: position.y,
                    },
                ],
                { useNativeDriver: false }
            ),
            onPanResponderRelease: () => {
                setDragging(false);
            },
        })
    ).current;

    const handleCall = () => {
        const url = (
            Platform.OS === 'android' ?
            `tel:${num}` :
            `telprompt:${num}`
        );
        Linking.canOpenURL(url)
        .then((supported) => {
            if (!supported) {
                Alert.alert("Error", "Phone call is not supported on this device.");
            } else {
                return Linking.openURL(url);
            }
        })
        .catch((err) => Alert.alert("Error", "An unexpected error occurred."));
    }

    return (
        <Animated.View
            style={[
                props.style,
                {
                    transform: position.getTranslateTransform(),
                    opacity: dragging ? 0.8 : 1,
                },
            ]}
            {...panResponder.panHandlers}
        >
            <Feather
                name='phone-call'
                size={24}
                color='white'
                onPress={() => handleCall()}
            />
        </Animated.View>
    );
};

export default CallingButton;