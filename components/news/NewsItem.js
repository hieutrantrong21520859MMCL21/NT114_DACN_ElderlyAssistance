import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';

import { memo } from 'react';

const NewsItem = ({item, onPress}) => {
    const formatDate = isoDate => {
        const options = {
            weekday: "short",
            day: "2-digit",
            month: "short",
            year: "numeric",
        };

        return new Date(isoDate).toLocaleDateString(undefined, options);
    }

    return (
        <TouchableOpacity
            style={styles.container}
            activeOpacity={0.8}
            onPress={() => onPress(item)}
        >
            <View style={styles.imageWrapper}>
                <Image
                    style={styles.image}
                    src={item.urlToImage || 'https://tinyurl.com/5msshbtu'}
                    resizeMode='cover'
                />
            </View>
            <View style={styles.contentWrapper}>
                <Text style={styles.author}>
                {
                    item.author?.length > 20 ?
                    item.author.slice(0, 20) + "...":
                    item.author
                }
                </Text>
                <Text style={styles.title}>
                    {
                        item.title.length > 50 ?
                        item.title.slice(0, 50) + "..." :
                        item.title
                    }
                </Text>
                <Text style={styles.date}>{formatDate(item.publishedAt)}</Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },

    imageWrapper: {
        flex: 1
    },

    image: {
        width: '100%',
        height: 100,
        borderRadius: 12
    },

    contentWrapper: {
        paddingLeft: 8,

        flex: 2,
        rowGap: 4
    },

    author: {
        fontSize: 14,
        fontWeight: 'semibold',
        lineHeight: 24
    },

    title: {
        fontSize: 16,
        fontWeight: 'bold',
        lineHeight: 24
    },

    date: {
        fontSize: 14,
        fontWeight: 'medium'
    }
});

export default memo(NewsItem);