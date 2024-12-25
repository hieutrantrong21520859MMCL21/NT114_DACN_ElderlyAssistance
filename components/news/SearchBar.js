import { useState } from 'react';
import {
    StyleSheet,
    TextInput,
    View,
    TouchableOpacity,
    Text
} from 'react-native';

import { Ionicons} from '@expo/vector-icons'; // For search icon (Install: expo install @expo/vector-icons)

const SearchBar = ({onSearch}) => {
    const [query, setQuery] = useState('');

    const handleSearching = () => {
        if (onSearch) {
            onSearch(query);
        }
    };

    return (
        <View style={styles.container}>
            <Ionicons
                name="search"
                size={24}
                color="#888"
            />
            <TextInput
                style={styles.input}
                placeholder="Search for articles..."
                value={query}
                onChangeText={setQuery}
                onSubmitEditing={handleSearching}
            />
            {
                query.length > 0 && (
                    <TouchableOpacity
                        style={styles.clearButton}
                        activeOpacity={0.8}
                        onPress={() => setQuery('')}
                    >
                        <Ionicons
                            name="close-circle"
                            size={24}
                            color="#888"
                        />
                    </TouchableOpacity>
                )
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f0f0f0',
        padding: 8,
        borderRadius: 8,

        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 16
    },

    input: {
        flex: 1,

        fontSize: 16,
        color: '#333',
    },

    clearButton: {
        alignSelf: 'flex-end'
    }
});

export default SearchBar;
