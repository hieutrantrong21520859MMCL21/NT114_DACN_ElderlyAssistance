import { useState, useEffect } from "react";

import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Alert,
    Platform,
    Linking
} from "react-native";

import { Feather, FontAwesome, Ionicons } from '@expo/vector-icons';
import { TextInput } from "@react-native-material/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { da } from "date-fns/locale";

const SupportCallScreen = () => {
    const [name, setName] = useState('');
    const [phoneNum, setPhoneNum] = useState('');
    const [directory, setDirectory] = useState([]);

    useEffect(() => {
        const showDirectory = async() => {
            try {
                const directory = await AsyncStorage.getItem('directory');
                setDirectory(directory != null ? JSON.parse(directory) : []);
            } catch (err) {
                console.info('Error when loading phone numbers:', err);
            }
        }

        showDirectory();
    }, []);

    const handleSave = async() => {
        if (!name) {
            Alert.alert('Error', "Please enter owner's name!");
            return;
        }

        if (!phoneNum) {
            Alert.alert('Error', "Please enter owner's phone number!");
            return;
        }

        try {
            const data = [
                ...directory,
                {
                    name: name,
                    phoneNum: phoneNum
                }
            ];

            await AsyncStorage.setItem('directory', JSON.stringify(data));
            setName('');
            setPhoneNum('');
            setDirectory(data);
        } catch (err) {
            console.info('Error when saving phone number:', err);
        }
    };

    const handleRemove = async(item) => {
        try {
            const data = directory.filter(val => val !== item);
            await AsyncStorage.setItem('directory', JSON.stringify(data));
            setDirectory(data);
        }
        catch (err) {
            console.info('Error when deleting a phone number:', err);
        }
    }

    const handleCall = num => {
        if (!num) {
            Alert.alert('Error', "Please enter phone number!");
            return;
        }

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

    const itemView = ({item}) => {
        return (
            <View style={styles.item}>
                <View style={styles.wrapper}>
                    <Text style={styles.name}>
                        Name: {item.name}
                    </Text>
                    <Text style={styles.phone}>
                        Tel: {item.phoneNum}
                    </Text>
                </View>
                <TouchableOpacity
                    style={styles.circularButton}
                    activeOpacity={0.8}
                    onPress={() => handleCall(item.phoneNum)}
                >
                    <Feather
                        name='phone-call'
                        size={18}
                        color='white'
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => handleRemove(item)}
                >
                    <Text style={styles.deleteText}>DELETE</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Phone Dial</Text>
            <View style={styles.dial}>
                <View style={styles.inputs}>
                    <TextInput
                        style={{width: '48%'}}
                        variant="outlined"
                        label="Name"
                        trailing={() => (
                            <FontAwesome
                                name="user"
                                size={24}
                                color='black'
                            />
                        )}
                        value={name}
                        onChangeText={setName}
                    />
                    <TextInput
                        style={{width: '48%'}}
                        variant="outlined"
                        label="Phone Number"
                        keyboardType='phone-pad'
                        trailing={() => (
                            <FontAwesome
                                name="phone"
                                size={24}
                                color='black'
                            />
                        )}
                        value={phoneNum}
                        onChangeText={setPhoneNum}
                    />
                </View>
                <View style={styles.buttons}>
                    <TouchableOpacity
                        style={styles.button}
                        activeOpacity={0.8}
                        onPress={handleSave}
                    >
                        <Ionicons
                            name="save-outline"
                            size={24}
                            color="#FFF"
                        />
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        activeOpacity={0.8}
                        onPress={() => handleCall(phoneNum)}
                    >
                        <FontAwesome
                            name="phone"
                            size={24}
                            color='white'
                        />
                        <Text style={styles.buttonText}>Call</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Text style={styles.title}>Directory</Text>
            <View style={{height: 300}}>
                {
                    directory.length ?
                    (
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={directory}
                            renderItem={itemView}
                        />
                    ) :
                    (
                        <Text style={styles.message}>No phone numbers saved!</Text>
                    )
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        rowGap: 16
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    dial: {
        rowGap: 8
    },
    inputs: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between'
    },
    buttons: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        columnGap: 16
    },
    button: {
        width: '40%',
        height: 50,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        columnGap: 8,
        borderRadius: 25,
        backgroundColor: '#1D8CF8'
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold'
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
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    },
    wrapper: {
        rowGap: 8
    },
    name: {
        fontSize: 18,
        color: '#1D8CF8',
        fontWeight: 'bold'
    },
    phone: {
        fontSize: 18,
        color: '#333',
        fontWeight: 'bold',
        textTransform: 'capitalize'
    },
    circularButton: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#1D8CF8',
        justifyContent: 'center',
        alignItems:'center'
    },
    deleteButton: {
        width: '100%'
    },
    deleteText: {
        textAlign: 'right',
        fontSize: 16,
        fontWeight: 'bold',
        color: 'red'
    },
    message: {
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 18,
        fontWeight: 'semibold'
    }
});

export default SupportCallScreen;