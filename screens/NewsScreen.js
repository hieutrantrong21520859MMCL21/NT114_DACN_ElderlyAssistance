import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import HTMLParser from 'advanced-html-parser'; // Advanced HTML Parser

const NewsScreen = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNews();
    }, []);

    const fetchNews = () => {
        axios
            .get('https://vnexpress.net/tin-tuc-24h')
            .then((resp) => {
                const doc = HTMLParser.parse(resp.data, { onlyBody: true });
                const articleTags = doc.documentElement.querySelectorAll('article.item-news.item-news-common.thumb-left');
                let fetchedArticles = [];

                articleTags.forEach((articleTag, index) => {
                    const nodes = articleTag.childNodes;
                    let image = '', reference = '', title = '', location = '', description = '';

                    for (let i = 0; i < nodes.length; i++) {
                        const node = nodes[i];

                        if (node.nodeType === 1) {
                            switch (node.getAttribute('class')) {
                                case 'time-count':
                                    break;

                                case 'thumb-art':
                                    image = node.querySelector('a > picture > img')?.getAttribute('src') || '';
                                    if (!image.includes('https')) {
                                        image = node.querySelector('a > picture > img')?.getAttribute('data-src') || '';
                                    }
                                    break;

                                case 'title-news':
                                    reference = node.querySelector('a').getAttribute('href');
                                    title = node.querySelector('a').getAttribute('title');
                                    break;

                                case 'description':
                                    if (node.querySelector('a').childNodes.length === 2) {
                                        location = node.querySelector('a').childNodes[0].firstChild.nodeValue.trim();
                                        description = node.querySelector('a').childNodes[1].nodeValue.trim();
                                    } else {
                                        description = node.querySelector('a').childNodes[0].nodeValue.trim();
                                    }
                                    break;
                            }
                        }
                    }

                    if (title && description) {
                        fetchedArticles.push({
                            id: index + 1,
                            title,
                            location,
                            description,
                            image,
                            reference
                        });
                    }
                });

                setArticles(fetchedArticles);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching data:', err);
                setLoading(false);
            });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => console.log('Open:', item.reference)}>
            {item.image ? (
                <Image source={{ uri: item.image }} style={styles.image} />
            ) : (
                <View style={styles.placeholder} />
            )}
            <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                {item.location ? <Text style={styles.location}>{item.location}</Text> : null}
                <Text style={styles.description}>{item.description}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#007BFF" />
            ) : (
                <FlatList
                    data={articles}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderItem}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        paddingHorizontal: 10,
        paddingTop: 10,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        marginBottom: 10,
        overflow: 'hidden',
        elevation: 3,
    },
    image: {
        width: 100,
        height: 100,
    },
    placeholder: {
        width: 100,
        height: 100,
        backgroundColor: '#E0E0E0',
    },
    textContainer: {
        flex: 1,
        padding: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#333',
    },
    location: {
        fontSize: 14,
        fontStyle: 'italic',
        marginBottom: 5,
        color: '#666',
    },
    description: {
        fontSize: 14,
        color: '#555',
    },
});

export default NewsScreen;
