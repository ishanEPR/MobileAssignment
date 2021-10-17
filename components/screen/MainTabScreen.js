import React,{useState,useEffect} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();

import { Ionicons,MaterialCommunityIcons,Entypo } from '@expo/vector-icons';
import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';
import DeliveryAccept from './DeliveryAccept';
import ProfileScreen from './ProfileScreen';
import ExploreScreen from './ExploreScreen';
import ModalScreen from './ModalScreen';

import axios from 'axios';

const HomeStack = createStackNavigator();
const DetailsStack = createStackNavigator();

import {
  View,
  Text,
  StyleSheet,
  Button
} from "react-native";


// useEffect(()=>{
//   const deliveryAgentPhoneNumber="+94768610084";
//   axios.get("http://192.168.1.12:4000/deliveryAgent/newOrders/"+deliveryAgentPhoneNumber).then((response)=>{
//    // console.log(response.data);
//     setLen(response.data);
//   })


// },[])

const MainTabScreen = ()=>(

  
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#000"
      barStyle={{ backgroundColor: '#fff' }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarColor:'#fff',
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" color={color} size={26} />
          ),
        }}
      />

{/* <Tab.Screen
        name="DeliveryAccept"
        component={DeliveryAccept}
        options={{
          tabBarLabel: 'New Orders',
          tabBarColor:'#fff',
          tabBarIcon: ({ color }) => (
            
            <Entypo name="back-in-time" size={26} color="black" />
          ),
        }}
      /> */}

      {/* <Tab.Screen
        name="Details"
        component={}
        options={{
          tabBarLabel: 'Today',
          tabBarColor:'#fff',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="truck-delivery" color={color} size={30} />
          ),
        }}
      /> */}
      {/* <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarColor:'#694fad',
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" color={color} size={26} />
          ),
        }}
      /> */}

    {/* <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarLabel: 'Explore',
          tabBarColor:'#d02868',
          tabBarIcon: ({ color }) => (
            <Ionicons name="aperture" color={color} size={26} />
          ),
        }}
      /> */}
    </Tab.Navigator>

);

// function ModalScreen(){
//   return (
//     <View>
//       <Text style={{fontSize:24}}>Hey am a model</Text>
//     </View>
//   );
// }

export default MainTabScreen;
const HomeStackScreen= ({navigation})=>(

    <HomeStack.Navigator screenOptions={{
     
      headerStyle:{
            backgroundColor:'#B7F785',
            
            
            
           
          },
          headerTitleAlign:'center',
          headerTintColor:'#217756',
          headerTitleStyle:{
            fontWeight:'bold'
          }
  
    }}>
      <HomeStack.Screen name="Home" component={HomeScreen} 
      options={{
        // headerLeft: ()=>(
        //   <Ionicons name="menu" size={25} color='#217756' backgroundColor='#009387' style={{marginLeft:10}}
          
        //   onPress={()=>navigation.openDrawer()} />
        // )
        headerShown:false
      }}
        
      />



    {/* <HomeStack.Screen name="ModalScreen" component={ModalScreen} 
      
        
      /> */}
     
    </HomeStack.Navigator>
  
  
  )
  
  
  // const DetailsStackScreen= ({navigation})=>(
  
  //   <DetailsStack.Navigator screenOptions={{
  //     headerStyle:{
  //           backgroundColor:'#B7F785',
            
            
           
  //         },
  //         headerTitleAlign:'center',
  //         headerTintColor:'#217756',
  //         headerTitleStyle:{
  //           fontWeight:'bold'
  //         }
  
  //   }}>
  //     <DetailsStack.Screen name="Today Delivery" component={DetailsScreen} 
      
  
  //     options={{
  //       headerLeft: ()=>(
  //         <Ionicons name="menu" size={25} color='#217756' backgroundColor='#1f65ff' style={{marginLeft:5}}
  //         onPress={()=>navigation.openDrawer()} />
  //       ),
  //       headerShown:false
       
      

  //     }}
        
  //     />
      
     
  //   </DetailsStack.Navigator>
  
  
  // )
  