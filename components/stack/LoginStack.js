import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from '../screen/SplashScreen';
import SigninScreen from '../screen/SigninScreen';
import ForgetPassword from '../screen/ForgetPassword';
import Signup from '../screen/Signup';
import HomeScreen from '../screen/HomeScreen';



const RootStack=createStackNavigator();
export default function LoginStack({navigation}) {
    return (
        // header none means didn't display the header bar
        <RootStack.Navigator headerMode="none">
            <RootStack.Screen name="SplashScreen" component={SplashScreen}/>
            <RootStack.Screen name="SigninScreen" component={SigninScreen}/>
            <RootStack.Screen name="ForgetPassword" component={ForgetPassword}/>
             <RootStack.Screen name="Signup" component={Signup}/>
            <RootStack.Screen name="HomeScreen" component={HomeScreen}/>

             
            

        </RootStack.Navigator>
    ); 
}
