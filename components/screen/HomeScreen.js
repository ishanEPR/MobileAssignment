import React, { createRef, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Button,
  ScrollView,
  StatusBar,
  TouchableWithoutFeedback,
  Dimensions,
  ImageBackground,
} from "react-native";

import * as Animatable from "react-native-animatable";
import Modal from "react-native-modal";

import MapView from "react-native-maps";

import axios from "axios";
import {
  Ionicons,
  Feather,
  FontAwesome,
  FontAwesome5,
  AntDesign,
} from "@expo/vector-icons";
import Slider from "@react-native-community/slider";

import Collapsible from "react-native-collapsible";
import DetailsScreen from "./DetailsScreen";

//import Animatable from 'react-native-animatable';

//import { ModalScreen } from './ModalScreen';
import { TouchableRipple, Switch } from "react-native-paper";

import { Entypo } from "@expo/vector-icons";
import OrderHistory from "./OrderHistory";
import UpcomingDelivery from "./UpcomingDelivery";
import TodayDeliveryButton from "./Home/TodayDeliveryButton";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
import AsyncStorage from "@react-native-async-storage/async-storage";
import { icons, images, SIZES, COLORS } from '../../constants'


const HomeScreen = ({navigation}) => {
  let newNumber;

  const [len,setLen]=useState([])
  const [todayData,setTodayData]=useState([])
 
  const [phoneNumber,setPhoneNumber]=useState('');

 
  useEffect(()=>{

   


  },[])
const categoryData = [
        {
            id: 1,
            name: "Rice",
            icon: icons.rice_bowl,
        },
        {
            id: 2,
            name: "Noodles",
            icon: icons.noodle,
        },
  
      
        {
            id: 3,
            name: "Pizza",
            icon: icons.pizza,
        },
       
        {
            id: 4,
            name: "Desserts",
            icon: icons.donut,
        },
          {
            id: 5,
            name: "Burgers",
            icon: icons.hamburger,
        },
        {
            id: 6,
            name: "Drinks",
            icon: icons.drink,
        },

    ]



    const restaurantData = [
        {
            id: 1,
            name: "Burger",
            categories: [5],
            photo: images.burger_restaurant_1,
            menu: [
                {
                    menuId: 1,
                    name: "Crispy Chicken Burger",
                    photo: images.crispy_chicken_burger,
                    description: "Burger with crispy chicken, cheese and lettuce",
                    price: 1000
                },
                {
                    menuId: 2,
                    name: "Crispy Chicken Burger with Honey Mustard",
                    photo: images.honey_mustard_chicken_burger,
                    description: "Crispy Chicken Burger with Honey Mustard Coleslaw",
                    price: 1500
                },
                {
                    menuId: 3,
                    name: "Crispy Baked French Fries",
                    photo: images.baked_fries,
                    description: "Crispy Baked French Fries",
                    price: 1940,
                   
                }
            ]
        },
        {
            id: 2,
            name: "Pizza",
            categories: [2,3,4],
            photo: images.pizza_restaurant,
         
            menu: [
                {
                    menuId: 4,
                    name: "Hawaiian Pizza",
                    photo: images.hawaiian_pizza,
                    description: "Canadian bacon, homemade pizza crust, pizza sauce",
                    price: 750
                  
                },
                {
                    menuId: 5,
                    name: "Tomato & Basil Pizza",
                    photo: images.pizza,
                    description: "Fresh tomatoes, aromatic basil pesto and melted bocconcini",
                    price: 250
                  
                },
                {
                    menuId: 6,
                    name: "Tomato Pasta",
                    photo: images.tomato_pasta,
                    description: "Pasta with fresh tomatoes",
                    price: 1000
                   
                },
              
            ]
        },

        {
            id: 3,
            name: "Noodles",
            categories: [1, 2],
            photo: images.noodle_shop,
           
            menu: [
                {
                    menuId: 10,
                    name: "Kolo Mee",
                    photo: images.kolo_mee,
                    description: "Noodles with char siu",
                    calories: 200,
                    price: 5
                },
                {
                    menuId: 11,
                    name: "Sarawak Laksa",
                    photo: images.sarawak_laksa,
                    description: "Vermicelli noodles, cooked prawns",
                    calories: 300,
                    price: 8
                },
                {
                    menuId: 12,
                    name: "Nasi Lemak",
                    photo: images.nasi_lemak,
                    description: "A traditional Malay rice dish",
                    calories: 300,
                    price: 8
                },
                {
                    menuId: 13,
                    name: "Nasi Briyani with Mutton",
                    photo: images.nasi_briyani_mutton,
                    description: "A traditional Indian rice dish with mutton",
                    calories: 300,
                    price: 8
                },

            ]
        },
        {

            id: 4,
            name: "Dessets",
            categories: [4, 6],
            photo: images.kek_lapis_shop,
        
            menu: [
                {
                    menuId: 12,
                    name: "Teh C Peng",
                    photo: images.teh_c_peng,
                    description: "Three Layer Teh C Peng",
                    calories: 100,
                    price: 2
                },
                {
                    menuId: 13,
                    name: "ABC Ice Kacang",
                    photo: images.ice_kacang,
                    description: "Shaved Ice with red beans",
                    calories: 100,
                    price: 3
                },
                {
                    menuId: 14,
                    name: "Kek Lapis",
                    photo: images.kek_lapis,
                    description: "Layer cakes",
                    calories: 300,
                    price: 20
                }
            ]

        }


    ]

    const [categories, setCategories] = React.useState(categoryData)
    const [selectedCategory, setSelectedCategory] = React.useState(null)
    const [restaurants, setRestaurants] = React.useState(restaurantData)
  //  const [currentLocation, setCurrentLocation] = React.useState(initialCurrentLocation)


 function onSelectCategory(category) {
        //filter restaurant
        let restaurantList = restaurantData.filter(a => a.categories.includes(category.id))

        setRestaurants(restaurantList)

        setSelectedCategory(category)
    }

 function getCategoryNameById(id) {
        let category = categories.filter(a => a.id == id)

        if (category.length > 0)
            return category[0].name

        return ""
    }
    function renderMainCategories() {
        const renderItem = ({ item }) => {
            return (
                <TouchableOpacity
                    style={{
                        padding: SIZES.padding,
                        paddingBottom: SIZES.padding * 2,
                        backgroundColor: (selectedCategory?.id == item.id) ? COLORS.primary : COLORS.white,
                        borderRadius: SIZES.radius,
                        alignItems: "center",
                        justifyContent: "center",
                        marginRight: SIZES.padding,
                        ...styles.shadow
                    }}
                    onPress={() => onSelectCategory(item)}
                >
                    <View
                        style={{
                            width: 50,
                            height: 50,
                            borderRadius: 25,
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: (selectedCategory?.id == item.id) ? COLORS.white : COLORS.lightGray
                        }}
                    >
                        <Image
                            source={item.icon}
                            resizeMode="contain"
                            style={{
                                width: 30,
                                height: 30
                            }}
                        />
                    </View>

                    <Text
                        style={{
                            marginTop: SIZES.padding,
                            color: (selectedCategory?.id == item.id) ? COLORS.white : COLORS.black
                        }}
                    >
                        {item.name}
                    </Text>
                </TouchableOpacity>
            )
        }

        return (
            <View style={{ padding: SIZES.padding * 2 }}>
               {/* <ScrollView> */}
                <FlatList
                    data={categories}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingVertical: SIZES.padding * 2 }}
                />
               
           

               
            </View>
        )
    }


function renderRestaurantList() {
        const renderItem = ({ item }) => (
            <TouchableOpacity
                style={{ marginBottom: SIZES.padding * 2 }}
                onPress={() => navigation.navigate("Restaurant", {
                    item
                })}
            >
                {/* Image */}
                <View
                    style={{
                        marginBottom: SIZES.padding
                    }}
                >
                    <Image
                        source={item.photo}
                        resizeMode="cover"
                        style={{
                            width: "100%",
                            height: 200,
                            borderRadius: SIZES.radius
                        }}
                    />

                   
                </View>

                {/* Restaurant Info */}
                <Text>{item.name}</Text>

                <View
                    style={{
                        marginTop: SIZES.padding,
                        flexDirection: 'row'
                    }}
                >
                 

                    {/* Categories */}
                    <View
                        style={{
                            flexDirection: 'row',
                            marginLeft: 10
                        }}
                    >
                        {
                            item.categories.map((categoryId) => {
                                return (
                                    <View
                                        style={{ flexDirection: 'row' }}
                                        key={categoryId}
                                    >
                                        <Text >{getCategoryNameById(categoryId)}</Text>
                                        <Text style={{color: COLORS.darkgray }}> . </Text>
                                    </View>
                                )
                            })
                        }

                    
                    </View>
                </View>
            </TouchableOpacity>
        )

        return (
          // // <ScrollView></ScrollView>
          //   <ScrollView>
                   <FlatList
                data={restaurants}
                keyExtractor={item => `${item.id}`}
                renderItem={renderItem}
                contentContainerStyle={{
                    paddingHorizontal: SIZES.padding * 2,
                    paddingBottom: 30
                }}
            />
            
            // </ScrollView>
           
        )
    }

 

  const { headerList, headerText, content } = styles;
  return (
    // <ScrollView>
     
      <View style={styles.container}>
       <StatusBar backgroundColor="#89b963" barStyle="light-content" />
        <View style={styles.header}>
          <Ionicons
            name="menu"
            size={25}
            color="#217756"
            style={{ marginLeft: 5, marginTop: 5 }}
            onPress={() => navigation.openDrawer()}
          />

 
           
          
          <Image
            style={styles.profileImage}
            source={require("../../assets/ishan.png")}
          />
        </View>

      
        

   
   

    

 
         <SafeAreaView> 

               {renderMainCategories()}

        <ScrollView>
           
            {renderRestaurantList()}

        </ScrollView>
           
        
        </SafeAreaView>
    











      </View>
    // </ScrollView>
  );
};

export default HomeScreen;




const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: deviceHeight,
     backgroundColor: COLORS.lightGray4

   // backgroundColor: "#B7F785",
  },
     shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 1,
    },
  image: {
    flex: 1,
    justifyContent: "center",
    height: 130,
    marginTop: 10,
    width: 210,
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
  },
  headerList: {
    backgroundColor: "#F0F0F0",
    padding: 20,
    borderRadius: 20,
    borderColor: "#000",
    margin: 10,
  },
  headerText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
    color: "#000000",
    fontWeight: "bold",
  },
  historyTText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000000",
    fontWeight: "bold",
    marginLeft: 10,
    marginTop: 5,
  },
  content: {
    padding: 10,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 2,
    paddingTop: 10,
    backgroundColor: "#F0F0F0",
    borderRadius: 15,

    // borderBottomLeftRadius:20,
    // borderBottomRightRadius:20,
    flexDirection: "row",
  },

  header: {
    flexDirection: "row",
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    marginStart: 5,
    borderRadius: 40,
  },
  flatItem: {
    width: "100%",
    height: 200,
    borderRadius: 20,
    // borderBottomEndRadius:20,
    // borderBottomLeftRadius:20,
    // borderTopRightRadius:20,
    // borderTopLeftRadius:20,

    backgroundColor: "#f9f9fb",
    alignItems: "center",
  },
  txtSize: {
    fontSize: 20,
  },
  categoryItemWrapper: {
    //  backgroundColor:colors.secondaryT50,
    display: "flex",
    marginRight: 10,
    borderRadius: 20,
    height: 150,
    width: 250,
    // padding:10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "black",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 2,
  },

  categoryItemImage: {
    marginTop: 25,
    alignSelf: "center",
    marginHorizontal: 27,
    width: 100,
    height: 100,
  },

  categoryItemTitle: {
    //  display:"flex",
    //  textAlign:"center",
    textAlign: "center",

    fontSize: 16,
    fontWeight: "600",
    marginBottom: -90,
    //  textTransform:'uppercase',
  },

  todayWrapper: {
    //  backgroundColor:colors.secondaryT50,
    display: "flex",
    // marginRight:20,
    borderRadius: 20,
    width: 370,
    padding: 10,
    height: 110,
    marginStart: 20,

    // alignItems:"center",
    // justifyContent:"center",
    shadowColor: "black",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 2,
  },

  todayFirstRow: {
    flexDirection: "row",
    marginTop: 7,
  },
  todayFirstRowTitle: {
    color: "#217756",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: -10,
  },
  todayFirstRowDel: {
    color: "#217756",
    fontSize: 16,
    marginStart: 180,
  },
  todayFirstRowIcon: {
    marginStart: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F7AF93",
    width: 25,
    height: 21,
    marginTop: 2,
    borderRadius: 21,
  },
  todaySecondRow: {
    flexDirection: "row",
    marginTop: 20,
  },
  todaySecondRowNew: {
    flexDirection: "column",
  },

  todaySecondRowNewText: {
    flexDirection: "row",
  },
  todaySecondRowImg1: {
    marginStart: -70,
  },
  todaySecondRowImg2: {
    marginStart: 50,
  },
  todaySecondRowNewText1: {
    marginLeft: 40,
    color: "#217756",
  },
  todaySecondRowNewText2: {
    marginLeft: 20,
    color: "#217756",
  },
  todaySecondRowNewText3: {
    marginLeft: 40,
    color: "#217756",
  },

});


