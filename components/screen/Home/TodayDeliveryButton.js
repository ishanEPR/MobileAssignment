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

import DetailsScreen  from "../DetailsScreen";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export default function TodayDeliveryButton({navigation}) {
    return (
        <View>
            
      
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      height: deviceHeight,
  
      backgroundColor: "#B7F785",
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
  
