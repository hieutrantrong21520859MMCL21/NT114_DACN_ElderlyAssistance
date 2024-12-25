import { useContext } from 'react';

import {
    StyleSheet,
    View,
    Text,
    Button
} from 'react-native';

import { AuthContext } from '../../contexts/AuthContext';

const SettingsScreen = ({navigation}) => {
    const context = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <Button
                title='logout'
                onPress={() => context.method.setUser({})}
            />
            <Button
                title='change password'
                onPress={() => navigation.navigate('ChangingPassword')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        alignItems: 'center',
        justifyContent: 'center',
        rowGap: 16
    }
});

export default SettingsScreen;