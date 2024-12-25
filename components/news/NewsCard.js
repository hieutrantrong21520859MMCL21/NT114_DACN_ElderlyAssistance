import {
    StyleSheet,
    Image,
    Text,
    View,
    TouchableWithoutFeedback
} from "react-native";

import { memo } from "react";

import { LinearGradient } from "expo-linear-gradient";
  
const NewsCard = ({item, onPress}) => {
    return (
        <TouchableWithoutFeedback
            onPress={() => onPress(item)}
        >
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    src={item.urlToImage || 'https://tinyurl.com/5msshbtu'}
                    resizeMode='cover'
                />
                <LinearGradient
                    style={styles.gradient}
                    colors={['transparent', 'rgba(0,0,0,0.9)']}
                    start={{x: 0.5, y: 0}}
                    end={{x: 0.5, y: 1}}
                />
                <View style={styles.contentWrapper}>
                    <Text style={styles.title}>
                        {
                            item.title.length > 60 ?
                            item.title.slice(0, 58) + "..." :
                            item.title.split("-")[0] || "N/A"
                        }
                    </Text>
                    <Text style={styles.author}>
                        {
                            item.author?.length > 20 ?
                            item.author.slice(0, 20) + "..." :
                            item.author
                        }
                    </Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',

        flex: 1
    },

    image: {
        width: '100%',
        height: '100%',
        borderRadius: 12
    },

    gradient: {
        width: '100%',
        height: '100%',
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,

        position: 'absolute'
    },

    contentWrapper: {
        maxWidth: '90%',
        height: '80%',

        position: 'absolute',
        bottom: 16,
        left: 16,

        justifyContent: 'flex-end',
        rowGap: 8
    },

    title: {
        fontSize: 18,
        fontWeight: 'bold',
        lineHeight: 24,
        color: 'white',
    },

    author: {
        fontSize: 16,
        fontWeight: 'medium',
        color: 'white'
    }
});

export default memo(NewsCard);