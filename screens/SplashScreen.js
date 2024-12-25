import {
    StyleSheet,
    View,
    ImageBackground,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';

import { Octicons, Entypo } from '@expo/vector-icons';

const SplashScreen = ({navigation}) => {

    return (
        <View style={styles.container}>
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
                <Text style={styles.appName}>Elderly Assistance</Text>
                <Text
                    style={styles.note}
                >Empowering seniors to live independently with personalized care and support</Text>
                <View style={styles.separator}>
                    <Entypo
                        name='dot-single'
                        size={24}
                        color='black'
                    />
                    <Octicons
                        name='dash'
                        size={32}
                        color='black'
                    />
                    <Entypo
                        name='dot-single'
                        size={24}
                        color='black'
                    />
                </View>
                <View style={styles.buttons_container}>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.button}
                        onPress={() => navigation.navigate('Auth')}
                    >
                        <Text style={styles.buttonTitle}>SKIP</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        style={styles.button}
                    >
                        <Text style={styles.buttonTitle}>NEXT</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    container: {
        backgroundColor: '#fff',
        
        flex: 1,
        flexDirection: 'column'
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

    appName: {
        fontSize: 32,
        fontWeight: 'bold'
    },

    note: {
        textAlign: 'center',
        fontSize: 16
    },

    separator: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    buttons_container: {
        width: '100%',

        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    button: {
        width: '45%',
        backgroundColor: '#2196F3',
        padding: 12,
        borderRadius: 8,

        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonTitle: {
        fontSize: 20,
        color: '#fff',
    }
});

export default SplashScreen;