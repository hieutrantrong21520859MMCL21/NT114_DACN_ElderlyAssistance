import React, { useState } from "react";
import { Text, TextInput } from '@react-native-material/core';
import { Alert } from 'react-native';
import { StyleSheet, ScrollView, View, KeyboardAvoidingView, Platform, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { auth } from "../firebase";
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";

export default function ChangePasswordScreen({ navigation }) {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    // Reauthenticate the user before updating password
    const reauthenticate = (currentPassword) => {
        const user = auth.currentUser;
        const cred = EmailAuthProvider.credential(user.email, currentPassword);
        return reauthenticateWithCredential(user, cred);
    };

    const handleChangePassword = () => {
        if (newPassword !== confirmNewPassword) {
            Alert.alert("Error", "New password and confirmation do not match.");
            return;
        }

        reauthenticate(currentPassword).then(() => {
            const user = auth.currentUser;
            updatePassword(user, newPassword)
                .then(() => {
                    Alert.alert("Success", "Password has been changed successfully.");
                    navigation.navigate('Login');
                })
                .catch((error) => {
                    Alert.alert("Error", error.message);
                });
        }).catch((error) => {
            Alert.alert("Error", "Current password is incorrect.");
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
                        >Change Password</Text>
                        <Image
                            source={require('../assets/images/logo.png')}
                        />
                    </ImageBackground>
                </View>

                <View style={styles.form}>
                    <TextInput
                        variant="outlined"
                        label="Current Password"
                        placeholder="Enter current password"
                        secureTextEntry={true}
                        value={currentPassword}
                        onChangeText={setCurrentPassword}
                        style={styles.input}
                    />
                    <TextInput
                        variant="outlined"
                        label="New Password"
                        placeholder="Enter new password"
                        secureTextEntry={true}
                        value={newPassword}
                        onChangeText={setNewPassword}
                        style={styles.input}
                    />
                    <TextInput
                        variant="outlined"
                        label="Confirm New Password"
                        placeholder="Confirm new password"
                        secureTextEntry={true}
                        value={confirmNewPassword}
                        onChangeText={setConfirmNewPassword}
                        style={styles.input}
                    />

                    {/* Custom Change Password Button using TouchableOpacity */}
                    <TouchableOpacity
                        style={[styles.form_btn, styles.form_btnChangePassword]}
                        onPress={handleChangePassword}
                    >
                        <Text style={styles.form_btnText}>Change Password</Text>
                    </TouchableOpacity>
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
        rowGap: 16,
    },
    header_title: {
        fontWeight: '700',
        color: 'white',
        textTransform: 'uppercase',
    },
    form: {
        width: '100%',
        padding: 48,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        rowGap: 16,
    },
    input: {
        width: '100%',
        marginBottom: 16,
    },
    form_btn: {
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    form_btnChangePassword: {
        backgroundColor: '#0096FF',
        marginTop: 16,
    },
    form_btnText: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
    }
});
