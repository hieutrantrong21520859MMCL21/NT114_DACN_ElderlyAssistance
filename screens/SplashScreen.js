import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { StyleSheet, KeyboardAvoidingView, View, ImageBackground, Image, Platform } from 'react-native';
import DashIcon from '@expo/vector-icons/Octicons';
import DotIcon from '@expo/vector-icons/Entypo';

export default function SplashScreen({ navigation }) {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <View style={styles.header}>
                    <ImageBackground
                        style={styles.header_background}
                        source={require('../assets/images/sky_bg.png')}
                    >
                        <Image
                            source={require('../assets/images/logo.png')}
                            style={styles.header_background_logo}
                        />
                    </ImageBackground>
                </View>

                <View style={styles.intro}>
                    <Text style={{ fontSize: 32, fontWeight: 'bold' }}>Elder's Assistance</Text>
                    <Text style={{ textAlign: 'center' }}>
                        Empowering seniors to live independently with personalized care and support
                    </Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <DotIcon name="dot-single" size={24} />
                        <DashIcon name="dash" size={32} />
                        <DotIcon name="dot-single" size={24} />
                    </View>

                    <View style={styles.buttons_container}>
                        {/* Skip Button */}
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => navigation.navigate('Login')}
                        >
                            <Text style={styles.buttonText}>Skip</Text>
                        </TouchableOpacity>

                        {/* Next Button */}
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => console.log('Next button pressed')} // Handle next button press
                        >
                            <Text style={styles.buttonText}>Next</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flex: 1,
    },
    header_background: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
    header_background_logo: {
        width: '75%',
        height: '75%',
        alignSelf: 'center',
    },
    intro: {
        paddingHorizontal: 24,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',  // Align content to the top
        alignItems: 'center',
        rowGap: 16,
        marginTop: 60,  // Small margin to move the intro section upwards
    },
    buttons_container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 60, // Added some space between the buttons and text
    },
    button: {
        width: '45%',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#2196F3', // Blue color for the button
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 20,
        color: '#fff',
    },
});
