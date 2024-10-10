import React, { useState } from "react";
import { Text, TextInput, Button } from '@react-native-material/core';
import { StyleSheet, ScrollView, View, KeyboardAvoidingView, Platform, Image, ImageBackground, Alert } from 'react-native';
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { signInWithEmailAndPassword } from "firebase/auth"; // Import Firebase auth function
import { auth } from "../firebase"; // Import Firebase config

export default function LoginScreen({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordSecure, setIsPasswordSecure] = useState(true);
    const [iconPassword, setIconPassword] = useState('eye-off');

    const checkIsPasswordSecure = () => {
        if (iconPassword === 'eye') {
            setIsPasswordSecure(true);
            setIconPassword('eye-off');
        } else {
            setIsPasswordSecure(false);
            setIconPassword('eye');
        }
    };

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                Alert.alert("Login successful", `Welcome back, ${user.email}!`);
                navigation.navigate('Home'); // Điều hướng người dùng tới màn hình Home sau khi đăng nhập thành công
            })
            .catch((error) => {
                Alert.alert("Login failed", error.message);
            });
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView style={{ width: '100%' }}>
                <View style={styles.header}>
                    <ImageBackground
                        style={styles.header_background}
                        source={require('../assets/images/sky_bg.png')}
                    >
                        <Text
                            style={styles.header_title}
                            variant="h3"
                        >Sign in</Text>
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

                    <Text
                        style={styles.resetPasswordOption}
                        onPress={() => navigation.navigate('ChangePassword')}
                    >Change Password</Text>


                    <Button
                        style={styles.form_btnLogin}
                        title='log in'
                        titleStyle={{ fontSize: 24 }}
                        onPress={handleLogin} // Gọi hàm đăng nhập khi nhấn nút
                    />

                    <View style={styles.registrationOption}>
                        <Text style={{ color: '#A9A9A9' }}>Do not have an account?</Text>
                        <Text
                            style={{ color: '#00008B', textDecorationLine: 'underline' }}
                            onPress={() => navigation.navigate('Registration')}
                        >Here</Text>
                    </View>

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
        width: '100%',
        paddingTop: 80,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        rowGap: 16
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
    resetPasswordOption: {
        fontWeight: 'bold'
    },
    registrationOption: {
        fontSize: 13,
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'row',
        columnGap: 8
    },
    form_btnLogin: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: '#0096FF'
    }
});
