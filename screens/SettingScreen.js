﻿import React from 'react';
import { StyleSheet, Text, View, Button, ImageBackground, Image } from 'react-native';

export default function SettingScreen({ navigation }) {

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../assets/images/sky_bg.png')}
                style={styles.background}
            >
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Welcome to Elder Assistance</Text>
                    <Image
                        source={require('../assets/images/logo.png')}
                        style={styles.logo}
                    />
                </View>

                <View style={styles.body}>
                    <Text style={styles.welcomeText}>This is your home screen.</Text>
                    <Button
                        title="Log out"
                        onPress={() => navigation.navigate('Login')}
                        color="#0096FF"
                    />
                    <Button
                        title="Change Password"
                        onPress={() => navigation.navigate('ChangePassword')}
                        color="#0096FF"
                    />
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        alignItems: 'center',
        marginBottom: 30,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
    },
    logo: {
        width: 100,
        height: 100,
    },
    body: {
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: 18,
        color: '#fff',
        marginBottom: 20,
    },
});