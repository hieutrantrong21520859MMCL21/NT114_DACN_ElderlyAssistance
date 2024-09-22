import React, {useState} from 'react';
import { Text, FAB } from '@react-native-material/core';

import { StyleSheet, KeyboardAvoidingView, ScrollView, View, ImageBackground, Image, Platform } from 'react-native';

import DashIcon from '@expo/vector-icons/Octicons';
import DotIcon from '@expo/vector-icons/Entypo';

export default function SplashScreen({navigation}) {

    return (

        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >

            <View style={{flex: 1, display: 'flex', flexDirection: 'column'}}>

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

                    <Text style={{fontSize: 32, fontWeight: 'bold'}}>Elder's Assistance</Text>
                    <Text
                        style={{textAlign: 'center'}}
                    >Empowering seniors to live independently with personalized care and support</Text>
                    
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>

                        <DotIcon name='dot-single' size={24}/>
                        <DashIcon name='dash' size={32}/>
                        <DotIcon name='dot-single' size={24}/>

                    </View>

                    <View style={styles.buttons_container}>

                        <FAB
                            label='skip'
                            labelStyle={{fontSize: 20}}
                            variant='extended'
                            tintColor='blue'
                            color='#fff'
                            pressEffect='none'
                            style={styles.button}
                            onPress={() => navigation.navigate('Login')}
                        />
                        <FAB
                            label='next'
                            labelStyle={{fontSize: 20}}
                            variant='extended'
                            tintColor='blue'
                            color='#fff'
                            pressEffect='none'
                            style={styles.button}
                        />

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
        flexDirection:'column',
        justifyContent: 'flex-end'
    },

    header_background_logo: {
        width: '75%',
        height: '75%',

        alignSelf: 'center'
    },

    intro: {
        paddingHorizontal: 24,

        flex: 1,

        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        rowGap: 16,
    },

    buttons_container: {
        width: '100%',

        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    button: {
        width: '45%',
        flexDirection: 'row',
        justifyContent: 'center'
    }
});