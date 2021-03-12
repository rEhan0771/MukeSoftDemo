import React, { useEffect, useRef, useState } from 'react';
import {
    View, Text, FlatList,
    Animated, Dimensions, ActivityIndicator
} from 'react-native';
import APIStrings from '../webservice/APIStrings';
import MainScreenStyles from './MainScreenStyles';
import Header from '../component/Header';

const hWidth = Dimensions.get("window").width;
const WIDTH = 300;
const MARGIN = 10;
const CARD_WIDTH = WIDTH + MARGIN * 1;
const wt = hWidth - 50;

const MainScreen = () => {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const animatedValue = useRef(new Animated.Value(0)).current
    const isDisappearing = - CARD_WIDTH;
    const isTop = 0;
    const isBottom = wt - CARD_WIDTH;
    const isAppearing = wt;
    useEffect(() => {
        fetchApi();

    }, []);
    const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
    const fetchApi = () => {
        setLoading(true);
        fetch(APIStrings.fakeApi)
            .then((response) => response.json())
            .then((json) => {
                setData(json)
                setLoading(false);
                console.log("data", data)
            })
            .catch((error) => console.error(error))
    }
    const getItemLayout = (data, index) => (
        { length: CARD_WIDTH, offset: 100 * index, index, }
    )

    const renderList = (item, index) => {
        const position = Animated.subtract(index * CARD_WIDTH, animatedValue)
        let translateX =
            Animated.add(animatedValue,
                animatedValue.interpolate({
                    inputRange: [0, 0.00001 + index * CARD_WIDTH],
                    outputRange: [0, -index * CARD_WIDTH],
                    extrapolateRight: 'clamp',
                }),

            )
        const scale = position.interpolate({
            inputRange: [isDisappearing, isTop, isBottom, isAppearing],
            outputRange: [0.5, 1, 1, 0.5],
            extrapolate: 'clamp'
        })
        const opacity = position.interpolate({
            inputRange: [isDisappearing, isTop, isBottom, isAppearing],
            outputRange: [0.5, 1, 1, 0.5],
            extrapolate: 'clamp'
        })
        return (
            <Animated.View style={[MainScreenStyles.card, { opacity, transform: [{ translateX }, { scale }] }]}>
                <Text style={{ margin: 7, fontSize: 16 }}>ID: {item.userId}</Text>
                <Text style={MainScreenStyles.txtTitle}>{item.title}</Text>
                <Text style={MainScreenStyles.txtBody}>{item.body}</Text>
            </Animated.View>
        )
    }
    return (
        <View style={MainScreenStyles.container}>
            <Header />
            <View style={{ marginLeft: 50 }}>
                {isLoading && <ActivityIndicator size={50} color={'green'} />}
                <AnimatedFlatList
                    data={data}
                    horizontal
                    scrollEventThrottle={16} // <-- Use 1 here to make sure no events are ever missed
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: animatedValue } } }],
                        { useNativeDriver: true } // <-- Add this
                    )}
                    getItemLayout={(item, index) => getItemLayout(item, index)}
                    keyExtractor={item => String(item.id)}
                    renderItem={({ item, index }) =>
                        renderList(item, index)
                    }
                />
            </View>
        </View>
    )
}

export default MainScreen;