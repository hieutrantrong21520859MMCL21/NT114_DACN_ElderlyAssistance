import {
    View,
    TouchableOpacity,
    Text,
    StyleSheet,
    SectionList
} from 'react-native';

import main_features from '../assets/dataset/main_features';
import audio_books from '../assets/dataset/audio_books';
import music from '../assets/dataset/music';

const HomeScreen = ({navigation}) => {
    const itemView = ({item}) => {
        const handlePress = () => {
            switch (item.name) {
                case 'Scheduling':
                    navigation.navigate('SchedulingStack');
                    break;
                case 'Exercising':
                    navigation.navigate('ExercisingStack');
                    break;
                case 'Music':
                    navigation.navigate('Audio', {
                        name: item.name,
                        data: music
                    });
                    break;
                case 'Audio Books':
                    navigation.navigate('Audio', {
                        name: item.name,
                        data: audio_books
                    });
                    break;
                case 'News':
                    navigation.navigate('NewsStack');
                    break;
                case 'Music':
                    alert('Music screen not implemented yet');
                    break;
                case 'Chatbot':
                    navigation.navigate('Chatbot');
                    break;
                case 'Emergency':
                    navigation.navigate('Emergency');
                    break;
                case 'Support':
                    navigation.navigate('Support');
                    break;
            }
        };

        return (
            <TouchableOpacity
                activeOpacity={0.8}
                style={styles.featureItem}
                onPress={handlePress}
            >
                <Text style={styles.icon}>{item.icon}</Text>
                <Text style={styles.featureName}>{item.name}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <SectionList
                showsVerticalScrollIndicator={false}
                sections={main_features}
                keyExtractor={(_, index) => index.toString()}
                renderItem={itemView}
                renderSectionHeader={({section}) => (
                    <Text style={styles.sectionTitle}>{section.title}</Text>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        flex: 1,
        position: 'relative'
    },

    sectionTitle: {
        marginTop: 16,
        marginBottom: 8,
        
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },

    featureItem: {
        padding: 16,
        marginBottom: 8,
        backgroundColor: '#FFF',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 5,
        elevation: 2,
        
        flexDirection: 'row',
        alignItems: 'center',
    },

    icon: {
        marginRight: 15,
        
        fontSize: 24,
        color: '#1D8CF8',
    },
    
    featureName: {
        fontSize: 18,
        color: '#333',
    },

    callingButton: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: 'blue',
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default HomeScreen;