import {useContext, useState} from "react";

import { TextInput } from "@react-native-material/core";

import {
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    View,
    Text,
    Image,
    TouchableOpacity,
    ImageBackground,
} from "react-native";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../server/firebase";
import { AuthContext } from "../../contexts/AuthContext";

import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

const RegistrationScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //const [confirmPassword, setConfirmPassword] = useState('');
    const [isPasswordSecure, setIsPasswordSecure] = useState(true);
    //const [isConfirmPasswordSecure, setIsConfirmPasswordSecure] = useState(true);
    const [iconPassword, setIconPassword] = useState('eye-off');
    // const [iconConfirmPassword, setIconConfirmPassword] = useState('eye-off');
    const [accessType, setAccessType] = useState('Experiencing');

    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isEmailExisting, setIsEmailExisting] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    //const [isConfirmPasswordMatching, setIsConfirmPasswordMatching] = useState(true);

    const context = useContext(AuthContext);

    const checkIsPasswordSecure = () => {
        setIsPasswordSecure(!isPasswordSecure);
        setIconPassword(isPasswordSecure ? 'eye' : 'eye-off');
    };

    // const checkIsConfirmPasswordSecure = () => {
    //     setIsConfirmPasswordSecure(!isConfirmPasswordSecure);
    //     setIconConfirmPassword(isConfirmPasswordSecure ? 'eye' : 'eye-off');
    // };

    const handleRegister = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                context.method.setUser({
                    credential: userCredential.user,
                    password: password
                });
            })
            .catch(error => {
                console.info('Registration failed:', error.message);
                if (error.code === 'auth/invalid-email') {
                    setIsEmailValid(false);
                }
                else {
                    setIsEmailValid(true);
                }

                if (error.code === 'auth/email-already-in-use') {
                    setIsEmailExisting(true);
                }
                else {
                    setIsEmailExisting(false);
                }

                if (error.code === 'auth/weak-password') {
                    setIsPasswordValid(false);
                }
                else {
                    setIsPasswordValid(true);
                }
                // if (error.code === 'auth/invalid-email') {
                //     setIsEmailValid(false);
                // }
                // else if (error.code === 'auth/weak-password') {
                //     setIsEmailValid(true);
                //     setIsPasswordValid(false);
                // }
                // else if (error.code === 'auth/email-already-in-use') {
                //     setIsPasswordValid(true)
                //     setIsEmailExisting(true);
                // }
                // else {
                //     setIsEmailExisting(false);
                // }
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
                        >Sign up</Text>
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
                            placeholder="abc123@gmail.com"
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
                            )) ||
                            (isEmailExisting && (
                                <View style={styles.error}>
                                    <Text style={styles.error_text}>This email has already existed</Text>
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
                            placeholder="123456"
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
                            !isPasswordValid && (
                                <View style={styles.error}>
                                    <Text style={styles.error_text}>Password must be at least 6 characters</Text>
                                    <MaterialIcons
                                        name="error"
                                        size={24}
                                        color='red'
                                    />
                                </View>
                            )
                        }
                    </View>
                    {/* <View style={styles.form_input}>
                        <TextInput
                            variant="outlined"
                            label="Confirm password"
                            placeholder="123456"
                            secureTextEntry={isConfirmPasswordSecure}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            trailing={() => 
                                <MaterialCommunityIcon
                                    name={iconConfirmPassword}
                                    size={24}
                                    onPress={checkIsConfirmPasswordSecure}
                                />
                            }
                        />
                        {
                            !isConfirmPasswordMatching && (
                                <View style={styles.error}>
                                    <Text style={styles.error_text}>Password does not match</Text>
                                    <MaterialIcon name="error" size={24} color='red'/>
                                </View>
                            )
                        }
                    </View> */}
                    <TouchableOpacity
                    	style={styles.form_button}
                    	onPress={handleRegister}
                    >
                    	<Text style={styles.buttonTitle}>CREATE ACCOUNT</Text>
                    </TouchableOpacity>
                    <Text style={styles.loginOption}>
                        <Text style={{color: '#A9A9A9'}}>Already have an account?</Text>
                        &nbsp;
                        <Text
                            style={{color: '#00008B', textDecorationLine: 'underline'}}
                            onPress={() => navigation.goBack()}
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
        rowGap: 32,
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

    form_type: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    pickerContainer: {
        borderWidth: 0.8,
        borderColor: 'gray',
        borderRadius: 4
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

    loginOption: {
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

export default RegistrationScreen;