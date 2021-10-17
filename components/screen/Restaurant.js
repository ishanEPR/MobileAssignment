import React from "react";
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    Image,
    Animated
} from "react-native";
import { isIphoneX } from 'react-native-iphone-x-helper'

import { icons, COLORS, SIZES } from '../../constants'

const Restaurant = ({ route, navigation }) => {

    const scrollX = new Animated.Value(0);
    const [restaurant, setRestaurant] = React.useState(null);
    const [currentLocation, setCurrentLocation] = React.useState(null);
    const [orderItems, setOrderItems] = React.useState([]);

    React.useEffect(() => {
        let { item } = route.params;

        setRestaurant(item)
     //   setCurrentLocation(currentLocation)
    })

    function editOrder(action, menuId, price) {
        let orderList = orderItems.slice()
        let item = orderList.filter(a => a.menuId == menuId)

        if (action == "+") {
            if (item.length > 0) {
                let newQty = item[0].qty + 1
                item[0].qty = newQty
                item[0].total = item[0].qty * price
            } else {
                const newItem = {
                    menuId: menuId,
                    qty: 1,
                    price: price,
                    total: price
                }
                orderList.push(newItem)
            }

            setOrderItems(orderList)
        } else {
            if (item.length > 0) {
                if (item[0]?.qty > 0) {
                    let newQty = item[0].qty - 1
                    item[0].qty = newQty
                    item[0].total = newQty * price
                }
            }

            setOrderItems(orderList)
        }
    }

    function getOrderQty(menuId) {
        let orderItem = orderItems.filter(a => a.menuId == menuId)

        if (orderItem.length > 0) {
            return orderItem[0].qty
        }

        return 0
    }

    function getBasketItemCount() {
        let itemCount = orderItems.reduce((a, b) => a + (b.qty || 0), 0)

        return itemCount
    }

    function sumOrder() {
        let total = orderItems.reduce((a, b) => a + (b.total || 0), 0)

        return total.toFixed(2)
    }

    function renderHeader() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingLeft: SIZES.padding * 2,
                        justifyContent: 'center'
                    }}
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        source={icons.back}
                        resizeMode="contain"
                        style={{
                            width: 30,
                            height: 30
                        }}
                    />
                </TouchableOpacity>

                {/* Restaurant Name Section */}
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <View
                        style={{
                            height: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingHorizontal: SIZES.padding * 3,
                            borderRadius: SIZES.radius,
                            backgroundColor: COLORS.lightGray3
                        }}
                    >
                        <Text style={{
                            fontSize:18,
                            fontWeight:"bold"
                        }}>Order Page</Text>
                    </View>
                </View>

               
            </View>
        )
    }

    function renderFoodInfo() {
        return (
            <Animated.ScrollView
                horizontal
                pagingEnabled
                scrollEventThrottle={16}
                snapToAlignment="center"
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event([
                    { nativeEvent: { contentOffset: { x: scrollX } } }
                ], { useNativeDriver: false })}
            >
                {
                    restaurant?.menu.map((item, index) => (
                        <View
                            key={`menu-${index}`}
                            style={{ alignItems: 'center' }}
                        >
                            <View style={{ height: SIZES.height * 0.35 }}>
                                {/* Food Image */}
                                <Image
                                    source={item.photo}
                                    resizeMode="cover"
                                    style={{
                                        width: SIZES.width,
                                        height: "100%"
                                    }}
                                />

                                {/* Quantity */}
                                <View
                                    style={{
                                        position: 'absolute',
                                        bottom: - 20,
                                        width: SIZES.width,
                                        height: 50,
                                        justifyContent: 'center',
                                        flexDirection: 'row'
                                    }}
                                >
                                    <TouchableOpacity
                                        style={{
                                            width: 50,
                                            backgroundColor: COLORS.white,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderTopLeftRadius: 25,
                                            borderBottomLeftRadius: 25,
                                        }}
                                        onPress={() => editOrder("-", item.menuId, item.price)}
                                    >
                                        <Text style={{
                                        fontSize:45,
                                        fontWeight:"bold"
                                    }}>-</Text>
                                    </TouchableOpacity>

                                    <View
                                        style={{
                                            width: 50,
                                            backgroundColor: COLORS.white,
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <Text style={{
                                        fontSize:22,
                                        fontWeight:"bold"
                                    }}>{getOrderQty(item.menuId)}</Text>
                                    </View>

                                    <TouchableOpacity
                                        style={{
                                            width: 50,
                                            backgroundColor: COLORS.white,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderTopRightRadius: 25,
                                            borderBottomRightRadius: 25
                                        }}
                                        onPress={() => editOrder("+", item.menuId, item.price)}
                                    >
                                        <Text style={{
                                        fontSize:35,
                                        fontWeight:"bold"
                                    }}>+</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* Name & Description */}
                            <View
                                style={{
                                    width: SIZES.width,
                                    alignItems: 'center',
                                    marginTop: 15,
                                    paddingHorizontal: SIZES.padding * 2
                                }}
                            >
                                <Text style={{ marginVertical: 10, textAlign: 'center' ,fontSize:22, fontWeight:"bold" }}>{item.name} - {item.price.toFixed(2)}</Text>
                                <Text style={{
                                        fontSize:18,
                                        marginTop:30,
                                        textAlign: 'center'
                                       
                                    }} >{item.description}</Text>
                            </View>

                            {/* Calories */}
                            <View
                                style={{
                                    flexDirection: 'row',
                                    marginTop: 10
                                }}
                            >
                                <Image
                                    source={icons.fire}
                                    style={{
                                        width: 20,
                                        height: 20,
                                        marginRight: 10
                                    }}
                                />

                                {/* <Text style={{
                                     color: COLORS.darygray
                                }}>{item.calories.toFixed(2)} cal</Text> */}
                            </View>
                        </View>
                    ))
                }
            </Animated.ScrollView>
        )
    }

    

    function renderOrder() {
        return (
            <View>
                
                <View
                    style={{
                        backgroundColor: COLORS.white,
                        borderTopLeftRadius: 40,
                        borderTopRightRadius: 40,
                        marginTop:-20
                    }}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            paddingVertical: SIZES.padding * 2,
                            paddingHorizontal: SIZES.padding * 3,
                            borderBottomColor: COLORS.lightGray2,
                            borderBottomWidth: 1
                        }}
                    >
                        <Text 
                        style={{
                            fontSize:18,
                            fontWeight:'bold'
                        }}
                        >{getBasketItemCount()} items in Cart</Text>
                        <Text 
                         style={{
                            fontSize:18,
                            fontWeight:'bold'
                        }}
                         >Rs. {sumOrder()}</Text>
                    </View>

                 {/* expo build:android -t apk */}
 
                    {/* Order Button */}
                    <View
                        style={{
                            padding: SIZES.padding * 2,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <TouchableOpacity
                            style={{
                                width: SIZES.width * 0.9,
                                padding: SIZES.padding,
                                backgroundColor: COLORS.primary,
                                alignItems: 'center',
                                borderRadius: SIZES.radius,
                                height:60
                            }}
                            onPress={() => navigation.navigate("DeliveryAccept", {
                                restaurant: restaurant,
                               // currentLocation: currentLocation
                            })}
                        >
                            <Text style={{ color: COLORS.white,fontSize:22,paddingTop:5 }}>Next</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {isIphoneX() &&
                    <View
                        style={{
                            position: 'absolute',
                            bottom: -34,
                            left: 0,
                            right: 0,
                            height: 34,
                            backgroundColor: COLORS.white
                        }}
                    >
                    </View>
                }
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {renderHeader()}
            {renderFoodInfo()}
            {renderOrder()}
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray2
    }
})

export default Restaurant;