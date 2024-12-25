import {
    useEffect,
    useState,
    useCallback
} from "react";

import {
    StyleSheet,
    Dimensions,
    View,
    Text,
    FlatList,
    ActivityIndicator
} from 'react-native';

import axios from "axios";
import { NEWS_API_KEY } from '@env';

import Carousel from "react-native-reanimated-carousel";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import NewsCard from "../../../../components/news/NewsCard";
import NewsItem from "../../../../components/news/NewsItem";

const CAROUSEL_ITEM_WIDTH = Dimensions.get("window").width * 0.8;
const CAROUSEL_ITEM_HEIGHT = Dimensions.get("window").width * 0.48;

const NewsHomeScreen = ({navigation}) => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        axios.get(`https://newsapi.org/v2/top-headlines`, {
            params: {
                country: 'us',
                apiKey: NEWS_API_KEY
            }
        })
        .then(resp => {
            const articles = resp.data.articles.filter(article => article.url !== 'https://removed.com');
            setArticles(articles);
        })
        .catch(err => console.log(err.message))
    }, []);

    const handleRead = useCallback(article => {
        navigation.getParent().navigate('NewsDetail', article);
    }, []);

    return (
        <>
        {
            articles.length > 0 ?
            (
                <GestureHandlerRootView style={styles.mainContainer}>
                    <View style={styles.header}>
                        <View style={styles.headerIntro}>
                            <View style={styles.introText}>
                                <Text style={styles.textOnLeft}>Powered by &nbsp;</Text>
                                <View style={styles.logo}>
                                    <Text style={styles.logoOnLeft}>News</Text>
                                    <Text style={styles.logoOnRight}>API</Text>
                                </View>
                            </View>
                            {/* <View>
                                <Text>Search bar</Text>
                            </View> */}
                        </View>
                        <View style={styles.headerNews}>
                            <Text style={styles.latestNews}>Latest News</Text>
                            <View style={styles.carouselWrapper}>
                                <Carousel
                                    style={styles.carousel}
                                    width={CAROUSEL_ITEM_WIDTH}
                                    height={CAROUSEL_ITEM_HEIGHT}
                                    data={articles.slice(0, 5)}
                                    renderItem={({item}) => (
                                        <NewsCard
                                            item={item}
                                            onPress={handleRead}
                                        />
                                    )}
                                    mode='parallax'
                                    modeConfig={{
                                        parallaxScrollingScale: 0.9,
                                        parallaxScrollingOffset: 30,
                                        parallaxAdjacentItemScale: 0.8
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.section}>
                        <Text style={styles.recommendedNews}>Recommended News</Text>
                        <FlatList
                            contentContainerStyle={styles.flatList}
                            showsVerticalScrollIndicator={false}
                            data={articles.slice(5,)}
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
                    </View>
                </GestureHandlerRootView>
            ) :
            (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator
                        size='large'
                        color='green'
                    />
                    <Text style={styles.loadingMessage}>Please waiting ...</Text>
                </View>
            )
        }
        </>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        paddingVertical: 8,

        flex: 1
    },

    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        rowGap: 16
    },

    header: {
        flex: 1,
        rowGap: 4
    },

    headerIntro: {
        paddingHorizontal: 16,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    introText: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    textOnLeft: {
        fontSize: 16,
        fontWeight: 'bold'
    },

    logo: {
        backgroundColor: '#007aff',
        padding: 4,

        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 8
    },

    logoOnLeft: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#ffffff'
    },

    logoOnRight: {
        padding: 4,
        backgroundColor: 'white',

        fontWeight: 'bold',
        fontSize: 16,
        color: '#007aff'
    },

    headerNews: {
        rowGap: 4
    },

    latestNews: {
        paddingLeft: 16,

        fontSize: 24,
        fontWeight: 'bold'
    },

    carouselWrapper: {
        height: CAROUSEL_ITEM_HEIGHT
    },

    carousel: {
        width: '100%',
        justifyContent: 'center'
    },

    section: {
        flex: 1,
        rowGap: 16
    },

    recommendedNews: {
        paddingLeft: 16,

        fontSize: 24,
        fontWeight: 'bold'
    },

    flatList: {
        paddingHorizontal: 8
    },

    loadingMessage: {
        fontSize: 24,
        fontWeight: 'semibold'
    }
});

export default NewsHomeScreen;