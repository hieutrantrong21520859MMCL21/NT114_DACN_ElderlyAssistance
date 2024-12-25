import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Platform,
    Linking,
    Alert
} from "react-native";

import { Feather } from '@expo/vector-icons';
import emergency_numbers from '../../../../assets/dataset/emergency_numbers';

const EmergencyCallScreen = () => {
    const handleCall = num => {
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
        .catch(() => Alert.alert("Error", "An unexpected error occurred."));
    }

    return (
        <View style={styles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={emergency_numbers}
                renderItem={({item}) => (
                    <View style={styles.item}>
                        <View style={styles.wrapper}>
                            <Text style={styles.icon}>{item.icon}</Text>
                            <Text style={styles.name}>
                                {item.name} ({item.phoneNum})
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={styles.button}
                            activeOpacity={0.8}
                            onPress={() => handleCall(item.phoneNum)}
                        >
                            <Feather
                                name='phone-call'
                                size={24}
                                color='white'
                            />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        flex: 1
    },

    item: {
        padding: 16,
        marginBottom: 8,
        backgroundColor: '#FFF',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 16
    },

    icon: {
        fontSize: 24,
        color: '#1D8CF8',
    },
    
    name: {
        fontSize: 18,
        color: '#333',
        fontWeight: 'bold',
        textTransform: 'capitalize'
    },

    button: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#1D8CF8',
        justifyContent: 'center',
        alignItems:'center'
    }
});

export default EmergencyCallScreen;