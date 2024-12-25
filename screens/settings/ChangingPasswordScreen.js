import React, { useContext, useState } from "react";
import { Text, TextInput, Button } from '@react-native-material/core';
import { Alert } from 'react-native';
import { StyleSheet, ScrollView, View, KeyboardAvoidingView, Platform, Image, ImageBackground } from 'react-native';
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { AuthContext } from "../../contexts/AuthContext";

const ChangingPasswordScreen = ({ navigation }) => {
    const context = useContext(AuthContext);
    const credential = context.data.user.credential;
    const currPassword = context.data.user.password;

    // const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    // const [confirmNewPassword, setConfirmNewPassword] = useState('');

    // Reauthenticate the user before updating password
    const reauthenticate = (currPassword) => {
        const email = credential.email;
        const cred = EmailAuthProvider.credential(email, currPassword);
        return reauthenticateWithCredential(credential, cred);
    };

    const handleChangePassword = () => {
        // if (newPassword !== confirmNewPassword) {
            // Alert.alert("Error", "New password and confirmation do not match.");
            // return;
        // }

        reauthenticate(currPassword)
            .then(() => {
                updatePassword(credential, newPassword)
                    .then(() => {
                        Alert.alert("Success", "Password has been changed successfully.");
                        context.method.setUser({
                            ...context.data.user,
                            password: newPassword
                        });
                    })
                    .catch((error) => {
                        Alert.alert("Error", error.message);
                    });
            })
            .catch((error) => {
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
                        source={require('../../assets/images/sky_bg.png')}
                    >
                        <Text
                            style={styles.header_title}
                            variant="h3"
                        >Change Password</Text>
                        <Image
                            source={require('../../assets/images/logo.png')}
                        />
                    </ImageBackground>
                </View>

                <View style={styles.form}>
                    {/* <TextInput
                        variant="outlined"
                        label="Current Password"
                        placeholder="Enter current password"
                        secureTextEntry={true}
                        value={currentPassword}
                        onChangeText={setCurrentPassword}
                    /> */}
                    <TextInput
                        variant="outlined"
                        editable={false}
                        value={credential.email}
                    />
                    <TextInput
                        variant="outlined"
                        label="New Password"
                        placeholder="Enter new password"
                        secureTextEntry={true}
                        value={newPassword}
                        onChangeText={setNewPassword}
                    />
                    {/* <TextInput
                        variant="outlined"
                        label="Confirm New Password"
                        placeholder="Confirm new password"
                        secureTextEntry={true}
                        value={confirmNewPassword}
                        onChangeText={setConfirmNewPassword}
                    /> */}
                    <Button
                        style={styles.form_btnChangePassword}
                        title="Change Password"
                        onPress={handleChangePassword}
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
    form_btnChangePassword: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: '#0096FF',
    },
});

export default ChangingPasswordScreen;