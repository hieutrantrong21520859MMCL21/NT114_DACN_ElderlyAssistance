import { useState } from "react";

import {
    StyleSheet,
    View,
    Alert,
    ActivityIndicator
} from "react-native";

import WebView from "react-native-webview";

const NewsDetailScreen = ({navigation, route}) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <View style={styles.container}>
            <WebView
                source={{uri: route.params.url}}
                onLoadStart={() => setIsLoaded(false)}
                onLoadEnd={() => setIsLoaded(true)}
                onError={() => {
                    navigation.goBack();
                    Alert.alert('Error!!!', 'Hmmm ... cannot reach this site!');
                }}
            />
            {
                !isLoaded &&
                (
                    <ActivityIndicator
                        size='large'
                        color='green'
                        style={styles.loader}
                    />
                )
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    loader: {
        position: 'absolute',
        margin: 'auto',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,

        rowGap: 16
    }
});

export default NewsDetailScreen;