import React, {useState} from "react";
import { TextInput, Text, Button, IconButton } from "@react-native-material/core";

import { ScrollView, KeyboardAvoidingView, View, StyleSheet, Image, ImageBackground, Platform} from "react-native";

import Icon from "@expo/vector-icons/MaterialCommunityIcons";

import SkyBackground from "../assets/images/sky_bg";

export default function RegistrationScreen({navigation}) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordSecure, setIsPasswordSecure] = useState(true);
    const [isConfirmPasswordSecure, setIsConfirmPasswordSecure] = useState(true);
    const [iconPassword, setIconPassword] = useState('eye-off');
    const [iconConfirmPassword, setIconConfirmPassword] = useState('eye-off');

    const checkIsPasswordSecure = () => {

        if (iconPassword === 'eye') {

            setIsPasswordSecure(true);
            setIconPassword('eye-off');
        }
        else {

            setIsPasswordSecure(false);
            setIconPassword('eye');
        }
    };

    const checkIsConfirmPasswordSecure = () => {

        if (iconConfirmPassword === 'eye') {

            setIsConfirmPasswordSecure(true);
            setIconConfirmPassword('eye-off');
        }
        else {

            setIsConfirmPasswordSecure(false);
            setIconConfirmPassword('eye');
        }
    };

    return (

        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >

            <ScrollView style={{width: '100%'}}>

                <View style={styles.header}>

                <ImageBackground
                    style={styles.header_background}
                    source={require('../assets/images/sky_bg.png')}
                >

                    <Text
                        style={styles.header_title}
                        variant="h3"
                    >Sign up</Text>

                    <Image
                        source={require('../assets/images/logo.png')}
                    />

                </ImageBackground>

                </View>

                <View style={styles.form}>

 
                    <TextInput
                        variant="outlined"
                        label="Email"
                        placeholder="abc123@gmail.com"
                        onChangeText={string => setEmail(string)}
                        value={email}
                    />

                    <TextInput
                        variant="outlined"
                        label="Password"
                        placeholder="123"
                        secureTextEntry={isPasswordSecure}
                        value={password}
                        onChangeText={string => setPassword(string)}
                        trailing={() => 
                            <Icon
                                name={iconPassword}
                                size={24}
                                onPress={() => checkIsPasswordSecure()}
                            />
                        }
                    />

                    <TextInput
                        variant="outlined"
                        label="Confirm password"
                        placeholder="123"
                        secureTextEntry={isConfirmPasswordSecure}
                        value={confirmPassword}
                        onChangeText={string => setConfirmPassword(string)}
                        trailing={() => 
                            <Icon
                                name={iconConfirmPassword}
                                size={24}
                                onPress={() => checkIsConfirmPasswordSecure()}
                            />
                        }
                    />

                    <Button
                        style={styles.form_btnRegister}
                        title='create account'
                        titleStyle={{fontSize: 24}}
                    />

                    <View style={styles.lineBreak}>
                        <Text>OR</Text>
                    </View>

                    <Button
                        style={styles.form_btnLogin}
                        title='sign in'
                        titleStyle={{fontSize: 24}}
                        onPress={() => navigation.navigate('Login')}
                    />

                </View>

            </ScrollView>

        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },

    header: {
        width: '100%',

        flex: 1,
    },

    header_background: {
        width:'100%',
        paddingTop: 80,

        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        rowGap: 32,
    },

    header_title: {
        fontFamily: 'Sofadi One',
        fontWeight: '700',
        color: 'white',
        textTransform: 'uppercase'
    },

    form: {
        width: '100%',
        padding: 48,

        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        rowGap: 16,
    },

    form_btnRegister: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: '#0096FF'
    },

    lineBreak: {
        width: 180,
        borderTopWidth: 1,
        borderTopColor: 'gray',

        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },

    form_btnLogin: {
        width: '80%',
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: '#0096FF',

        alignSelf: 'center'
    }
});