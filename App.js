import React, { useState, useEffect, useMemo, useReducer } from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  Button,
  ActivityIndicator,
} from "react-native";

import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeStackScreen from "./components/screen/MainTabScreen";
//import MainTabScreen from './components/screen/MainTabScreen';
import { DrawerContent } from "./components/screen/DrawnContent";
import SupportScreen from "./components/screen/SupportScreen";
import HomeScreen from "./components/screen/HomeScreen";
import { SafeAreaProvider } from "react-native-safe-area-context";



import Home from "./components/screen/Home";
import Restaurant from "./components/screen/Restaurant";

import EditProfile from "./components/screen/EditProfile";
import ProfileScreen from "./components/screen/ProfileScreen";
import Signup from "./components/screen/Signup";

import { AuthContext } from "./components/context/context";

//import AsyncStorage from '@react-native-async-storage/async-storage';

import AsyncStorage from "@react-native-async-storage/async-storage";

import LoginStack from "./components/stack/LoginStack";

import DetailsScreen from "./components/screen/DetailsScreen";
import axios from "axios";
import SigninScreen from "./components/screen/SigninScreen";
import SplashScreen from "./components/screen/SplashScreen";
import DeliveryAccept from "./components/screen/DeliveryAccept";
import MainTabScreen from "./components/screen/MainTabScreen";

import firebase from "./components/config/FirebaseConfig";

const Drawer = createDrawerNavigator();

export default function App({ navigation }) {
  const [isSignin, setIsSignin] = useState(false);
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const getUser = async () => {
      await firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          // User is signed in.
     
          // console.log(user.uid );
          setIsSignin(true);
          console.log("User is signed in app.js");
        } else {
          
          // No user is signed in.
          setIsSignin(false);
          console.log("No user is signed in app.js");
        }
      });
    };


    getUser();
  }, []);

  const authContext = useMemo(
    () => ({
           signOut: () => {
        try {
          console.log("logout");

          setIsSignin(false);
          signout();
        
        } catch (e) {
          console.log(e);
        }
      },

     
    }),
    []
  );

  const signout = () => {
    Alert.alert(
      "Sign Out",
      "Are you want to sign out ?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            firebase
              .auth()
              .signOut()
              .then(() => {
              //  navigation.navigate("SigninScreen");
              });
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
  //  <SafeAreaProvider> 
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
      {console.log(isSignin)}
       

        {isSignin ? (
          <Drawer.Navigator
            initialRouteName="HomeDrawer"
            drawerContent={(props) => <DrawerContent {...props} />}
          >
            <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
             <Drawer.Screen name="Restaurant" component={Restaurant} />
              <Drawer.Screen name="DeliveryAccept" component={DeliveryAccept} />
            <Drawer.Screen name="ProfileScreen" component={ProfileScreen} />

            <Drawer.Screen name="EditProfile" component={EditProfile} />

            <Drawer.Screen name="SplashScreen" component={SplashScreen} />
            <Drawer.Screen name="SigninScreen" component={SigninScreen} />

            <Drawer.Screen name="Signup" component={Signup} />
          </Drawer.Navigator>
        ) : (
          <Drawer.Navigator
            initialRouteName="SplashScreen"
            drawerContent={(props) => <DrawerContent {...props} />}
          >
            <Drawer.Screen name="SplashScreen" component={SplashScreen} />
            <Drawer.Screen name="SigninScreen" component={SigninScreen} />
            <Drawer.Screen name="Signup" component={Signup} />
            <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
               <Drawer.Screen name="Restaurant" component={Restaurant} />
                <Drawer.Screen name="DeliveryAccept" component={DeliveryAccept} />
            <Drawer.Screen name="ProfileScreen" component={ProfileScreen} />
            <Drawer.Screen name="EditProfile" component={EditProfile} />
          </Drawer.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
    // </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
