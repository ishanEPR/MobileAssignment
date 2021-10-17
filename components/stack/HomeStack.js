import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';


import DetailsScreen from '../screen/DetailsScreen';
import ProfileScreen from '../screen/ProfileScreen';
import HomeScreen from '../screen/HomeScreen';
import DrawnContent from '../screen/DrawnContent';
 


const Drawer=createStackNavigator();
export default function HomeStack({navigation}) {
    return (

 <Drawer.Navigator
            drawerContent={(props) => <DrawerContent {...props} />}
          >
            <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
           
            <Drawer.Screen name="ProfileScreen" component={ProfileScreen} />
           
           
          
            <Drawer.Screen name="DetailsScreen" component={DetailsScreen} />
         
          </Drawer.Navigator>


 {/* <Drawer.Navigator
 
            drawerContent={(props) => <DrawerContent {...props} />}
          >
         
         <Drawer.Screen name="HomeScreen" component={HomeScreen}/>
            <Drawer.Screen name="ProfileScreen" component={ProfileScreen} />
         
        
           
            <Drawer.Screen name="DetailsScreen" component={DetailsScreen} />
         
         
         
          </Drawer.Navigator> */}



        // header none means didn't display the header bar
        // <RootStack.Navigator headerMode="none">
        //     <RootStack.Screen name="SplashScreen" component={SplashScreen}/>
        //     <RootStack.Screen name="SigninScreen" component={SigninScreen}/>
        //     <RootStack.Screen name="ForgetPassword" component={ForgetPassword}/>
        //      <RootStack.Screen name="Signup" component={Signup}/>
        //     <RootStack.Screen name="HomeScreen" component={HomeScreen}/>

             
            

        // </RootStack.Navigator>
    ); 
}
