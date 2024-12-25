import { useEffect } from "react";

import { StyleSheet, View, ActivityIndicator } from "react-native";

const NewsExitScreen = ({navigation}) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.getParent().getParent().goBack();
        }, 1000);
    }, [])

    return (
        <View style={styles.container}>
            <ActivityIndicator
                size='large'
                color='green'
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default NewsExitScreen;