import React,{useState,useEffect, useContext} from 'react';
import { StyleSheet, 
   
    View, 
   Alert
  } from 'react-native';
  import {
      DrawerContentScrollView,
      DrawerItem
  } from '@react-navigation/drawer';
  import {  
    Avatar, 
    Title, 
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch 
  } from 'react-native-paper';

  import { AuthContext } from '../context/context';
  //import { AuthContext } from '../context';
  import  Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import firebase from "../config/FirebaseConfig";
  

   
  export function DrawerContent(props)
  {
     
  

       


       const {signOut}=useContext(AuthContext);
     
      return(
          <View style={{flex:1}}>

              <DrawerContentScrollView {...props}>
                    <View style={styles.drawerContent}>
                       <View style={styles.userInfoSection}>
                            <View style={{flexDirection:'row',marginTop:15}}>
                                <Avatar.Image
                                     source={
                                         require('../../assets/ishan.png')
                                      //  {
                                    //     uri:'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
                                    // }
                                    
                                    }
                                    size={50}
                                />
                                <View style={{marginLeft:15,flexDirection:'column'}}>
                                    <Title style={styles.title}>Ishan Reshmika</Title>
                                 
                                </View>
                            </View>
                           
                            

                       </View>

                       <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                            icon={
                                ({color,size})=>(
                                    <Icon
                                        name="home-outline"
                                        color={color}
                                        size={size}
                                    />
                                )
                            }
                            label="Home"
                            onPress={()=>{
                                props.navigation.navigate('Home')

                            }}

                        />

                        <DrawerItem
                            icon={
                                ({color,size})=>(
                                    <Icon
                                        name="account-outline"
                                        color={color}
                                        size={size}
                                    />
                                )
                            }
                            label="Profile"
                            onPress={()=>{
                                props.navigation.navigate("ProfileScreen")

                            }}

                        />
                     

                      
                      
                             
                                    

                       </Drawer.Section>

                      

                        {/* <View style={{marginRight:40,}}>
                            <Text style={{color:'#217756',marginLeft:20,marginTop:20,fontSize:14}}>{isAvailable}</Text>
                            <View
                            style={{
                                marginTop:-18,
                                // marginLeft:30,
                            }}
                            >
                                    <Switch
                                    trackColor={{ false: "#767577", true: "#73CEAB" }}
                                    thumbColor={isEnabled ? "#217756" : "#f4f3f4"}
                                    ios_backgroundColor="#3e3e3e"
                                    onValueChange={toggleSwitch}
                                    value={isEnabled}
                                    
                                />
                        </View>
                    </View>*/}
                       
                    </View> 

              </DrawerContentScrollView>
              <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={
                        ({color,size})=>(
                            <Icon
                                name="exit-to-app"
                                color={color}
                                size={size}
                            />
                        )
                    }
                    label="Sign Out"
                    
                    onPress={()=>{
                        
                       signOut()
                    }}

                />


              </Drawer.Section>
          </View>
      );
  }

  const styles=StyleSheet.create({
      drawerContent:{
          flex:1,
      },
      userInfoSection:{

        paddingLeft:20,
      },
      title:{
          fontSize:14,
          marginTop:3,
          fontWeight:"bold",
      },
      caption:{
          fontSize:14,
          lineHeight:14,
          color:'#217756'
      },
      row:{
          marginTop:20,
          flexDirection:'row',
          alignItems:'center',
      },
      section:{
          flexDirection:'row',
          alignItems:'center',
          marginRight:15,
      },
      paragarph:{
          fontWeight:'bold',
          marginRight:3,

      },
      drawerSection:{
          marginTop:15,
      },
      bottomDrawerSection:{
          marginBottom:15,
          borderTopColor:'#f4f4f4',
          borderTopWidth:1,
          marginLeft:5,
      },
      preference:{
          flexDirection:'row',
          justifyContent:'space-between',
          paddingVertical:12,
          paddingHorizontal:16,
      }

  })