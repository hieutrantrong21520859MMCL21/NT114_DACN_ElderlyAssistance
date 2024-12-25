import { useEffect, useState, useCallback } from "react";

import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    FlatList,
    ActivityIndicator
} from "react-native";

import axios from "axios";
import news_categories from '../../../../assets/dataset/news_categories';
import { NEWS_API_KEY } from '@env';

import NewsItem from "../../../../components/news/NewsItem";
import SearchBar from "../../../../components/news/SearchBar";

const NewsCategoriesScreen = ({navigation}) => {
    const [category, setCategory] = useState('business');
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        axios.get(`https://newsapi.org/v2/top-headlines`, {
            params: {
                country: 'us',
                category: category,
                apiKey: NEWS_API_KEY
            }
        })
        .then(resp => {
            const articles = resp.data.articles.filter(article => article.url !== 'https://removed.com');
            setArticles(articles);
        })
        .catch(err => console.log(err.message))
    }, [category]);

    const handleRead = useCallback(article => {
        navigation.getParent().navigate('NewsDetail', article);
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.intro}>News from all around the world</Text>
                <SearchBar/>
                <FlatList
                    data={news_categories}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => (
                        <TouchableOpacity
                            style={{
                                ...styles.categoriesWrapper,
                                backgroundColor: (
                                    category === item.name ?
                                    'green' :
                                    'white'
                                )
                            }}
                            activeOpacity={0.8}
                            onPress={() => {
                                setArticles([]);
                                setCategory(item.name);
                            }}
                        >
                            <Text
                                style={{
                                    ...styles.categories,
                                    color: (
                                        category === item.name ?
                                        'white' :
                                        'black'
                                    )
                                }}
                            >
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    )}
                    ItemSeparatorComponent={() => (
                        <View style={{width: 16}}></View>
                    )}
                />
            </View>
            <View style={styles.section}>
                <Text style={styles.category}>{category}</Text>
                {
                    articles.length > 0 ?
                    (
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={articles}
                            keyExtractor={(_, index) => index.toString()}
                            renderItem={({item}) => (
                                <NewsItem
                                    item={item}
                                    onPress={handleRead}
                                />
                            )}
                            ItemSeparatorComponent={() => (
                                <View style={{height: 16}}></View>
                            )}
                        />        
                    ) :
                    (
                        <ActivityIndicator
                            size='large'
                            color='green'
                            style={styles.loader}
                        />
                    )
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,

        flex: 1
    },

    header: {
        flex: 1,
        rowGap: 24
    },

    intro: {
        fontSize: 18,
        fontWeight: 'bold'
    },

    categoriesWrapper: {
        paddingHorizontal: 16,
        height: '50%',
        borderWidth: 0.8,
        borderRadius: 24,
        justifyContent: 'center'
    },

    categories: {
        fontSize: 16,
        fontWeight: 'semibold',
        textTransform: 'capitalize'
    },

    section: {
        position: 'relative',
        
        flex: 2,
        rowGap: 16
    },

    category: {
        fontSize: 18,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },

    loader: {
        position: 'absolute',
        margin: 'auto',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    }
});

export default NewsCategoriesScreen;