import { useContext, useState } from "react";

import { TextInput } from '@react-native-material/core';

import {
    StyleSheet,
    ScrollView,
    View,
    KeyboardAvoidingView,
    Image,
    Text,
    ImageBackground,
    TouchableOpacity
} from 'react-native';

import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { AuthContext } from "../../contexts/AuthContext";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../server/firebase";

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordSecure, setIsPasswordSecure] = useState(true);
    const [iconPassword, setIconPassword] = useState('eye-off');

    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isCredentialValid, setIsCredentialValid] = useState(true);

    const context = useContext(AuthContext);

    const checkIsPasswordSecure = () => {
        setIsPasswordSecure(!isPasswordSecure);
        setIconPassword(isPasswordSecure ? 'eye' : 'eye-off');
    };

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                setIsEmailValid(true);
                setIsCredentialValid(true);
                context.method.setUser({
                    credential: userCredential.user,
                    password: password
                });
            })
            .catch(error => {
                console.info("Login failed:", error.message)
                if (error.code === 'auth/invalid-email') {
                    setIsEmailValid(false);
                }
                else {
                    setIsEmailValid(true);
                }

                if (error.code === 'auth/invalid-credential') {
                    setIsCredentialValid(false);
                }
                else {
                    setIsCredentialValid(true);
                }
            });
    };

    return (
        <KeyboardAvoidingView
            enabled
            style={styles.container}
        >
            <ScrollView>
                <View style={styles.header}>
                <ImageBackground
                    style={styles.header_background}
                    source={require('../../assets/images/sky_bg.png')}
                >
                    <Text
                        style={styles.header_title}
                    >Sign in</Text>
                    <Image
                        source={require('../../assets/images/logo.png')}
                    />
                </ImageBackground>
                </View>
                <View style={styles.form}>
                    <View style={styles.form_input}>
                        <TextInput
                            variant="outlined"
                            label="Email"
                            trailing={() => 
                                <MaterialCommunityIcons
                                    name='email'
                                    size={24}
                                    color='#FFC000'
                                />
                            }
                            inputMode="email"
                            returnKeyType="next"
                            value={email}
                            onChangeText={setEmail}
                        />
                        {
                            (!isEmailValid && (
                                <View style={styles.error}>
                                    <Text style={styles.error_text}>Invalid email</Text>
                                    <MaterialIcons
                                        name="error"
                                        size={24}
                                        color='red'
                                    />
                                </View>
                            ))
                        }
                    </View>
                    <View style={styles.form_input}>
                        <TextInput
                            variant="outlined"
                            label="Password"
                            secureTextEntry={isPasswordSecure}
                            trailing={() => 
                                <MaterialCommunityIcons
                                    name={iconPassword}
                                    size={24}
                                    onPress={checkIsPasswordSecure}
                                />
                            }
                            inputMode="text"
                            returnKeyType="done"
                            value={password}
                            onChangeText={setPassword}
                        />
                        {
                            !isCredentialValid && (
                                <View style={styles.error}>
                                    <Text style={styles.error_text}>Email or password is wrong</Text>
                                    <MaterialIcons
                                        name="error"
                                        size={24}
                                        color='red'
                                    />
                                </View>
                            )
                        }
                    </View>
                    <TouchableOpacity>
                        <Text style={styles.resetPasswordOption}>Reset password?</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.form_button}
                        activeOpacity={0.8}
                        onPress={handleLogin}
                    >
                        <Text style={styles.buttonTitle}>LOGIN</Text>
                    </TouchableOpacity>
                    <Text style={styles.registrationOption}>
                        <Text style={{color: '#A9A9A9'}}>Do not have an account?</Text>
                        &nbsp;
                        <Text
                            style={{color: '#00008B', textDecorationLine: 'underline'}}
                            onPress={() => navigation.navigate('Registration')}
                        >Here</Text>
                    </Text>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#fff',
        
        flex: 1,
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
        rowGap: 16
    },

    header_title: {
        fontSize: 32,
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

    form_input: {
        flexDirection: 'column'
    },

    resetPasswordOption: {
        fontWeight: 'bold',
        textAlign: 'right'
    },

    form_button: {
        backgroundColor: '#0096FF',
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 8,

        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonTitle: {
        fontWeight: 'bold',
        fontSize: 24,
        color: '#fff'
    },

    registrationOption: {
        fontSize: 16,
        textAlign: 'center'
    },

    error: {
        width: 'auto',

        alignSelf: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 8
    },

    error_text: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'red',
    }
});

export default LoginScreen;