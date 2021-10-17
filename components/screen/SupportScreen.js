import React, { useState,useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  StatusBar,
  TextInput
} from 'react-native';
import axios  from 'axios';
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign ,Entypo} from '@expo/vector-icons';


export default function ProfileScreen({navigation}){

    const [firstName,setFirstName]=useState('');
    const [lastName,setlastName]=useState('');
    const [email,setemail]=useState('');
    const [profileimage,setprofileimage]=useState('');
    const [phoneNumber,setPhoneNumber]=useState('');
    const [address,setAddress]=useState('');
    const [data,setData]=useState([]);

    useEffect(()=>{

      const deliveryAgentPhoneNumber="+94768610084";

      axios.get("http://192.168.1.10:4000/deliveryAgent/displayProfile/"+deliveryAgentPhoneNumber).then((response)=>{

        setData(response.data);

       setAddress(response.data[0].address);
       setFirstName(response.data[0].firstName)
       setlastName(response.data[0].lastName)
       setemail(response.data[0].email)
       setPhoneNumber(response.data[0].phoneNumber)
       setprofileimage(response.data[0].profileimage)
        


      })



    },[])


    return (
      <View style={styles.container}>
       <StatusBar backgroundColor="#89b963" barStyle="light-content" />
          <View style={styles.header}>
            <View style={styles.titleBar}>
                        <Ionicons name="ios-arrow-back" size={24} color="#006400" style={{marginLeft:10,marginTop:5}}
                           onPress={() => navigation.navigate("Home")}
                        />
                    
            </View>
            <View style={styles.headerContent}>
            
                <Image style={styles.avatar} source={require('../../assets/logo.png')}/>
                <Text style={styles.name}>Sashreeka Organic Fertilizer Company</Text>
            </View>
          </View>

          <View style={styles.body}>
            <View style={{
                margin:15,
                backgroundColor:'#fff',
                borderRadius:15,
                padding:15,
                flexDirection:'row',

            }}>
                <AntDesign name="mobile1" size={28} color="#006400" style={{width:35}}/>
               {/* <Text style={{fontSize:16,width:130,color:'#006400'}}>Telephone:</Text> */}
               <Text style={{fontSize:15,color:'#006400',marginTop:5,}}>0715822454 / 0768610084 </Text>
                {/* <TextInput placeholder="enter name" /> */}
            </View>
            <View style={{
                marginLeft:15,
                marginRight:15,
                marginTop:0,
                backgroundColor:'#fff',
                borderRadius:15,
                padding:15,
                flexDirection:'row',

            }}>
             
               <Entypo name="old-phone" size={28} color="#006400" style={{width:35}} />
               <Text style={{fontSize:14,color:'#006400',marginTop:5}}>011-2233456</Text>
                {/* <TextInput placeholder="enter name" /> */}
            </View>
            <View style={{
                marginLeft:15,
                marginRight:15,
                marginTop:15,
                backgroundColor:'#fff',
                borderRadius:15,
                padding:15,
                flexDirection:'row',

            }}>
              <MaterialIcons name="email" size={28} color="#006400" style={{width:35}}  />
              
               <Text style={{fontSize:14,color:'#006400',marginTop:5}}>{email}</Text>
            
            </View>
            <View style={{
                marginLeft:15,
                marginRight:15,
                marginTop:15,
                backgroundColor:'#fff',
                borderRadius:15,
                padding:15,
                flexDirection:'row',

            }}>
              <Entypo name="address" size={28} color="#006400" style={{width:35}} />
              
               <Text style={{fontSize:14,color:'#006400'}}>Sashreeka organization,Read avenue, Colombo 07</Text>
                {/* <TextInput placeholder="enter name" /> */}
            </View>

           
        
          </View>
      </View>
    );
 
}

const styles = StyleSheet.create({
    container:{

        flex:1,
    },
  header:{
    backgroundColor: "#89b963",
    flex:2,
  },
  headerContent:{
    padding:30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    // borderRadius: 63,
    // borderWidth: 4,
    // borderColor: "#217756",
    marginBottom:10,
  },
  body:{

    flex:3,
  },
  icon:{
    width: 40,
    height: 40,
  },
  title:{
    fontSize:18,
    color:"#EE82EE",
    marginLeft:4
  },
  orderbtn:{

    
    borderRadius:20,
   width:150,
    padding:10,
    alignItems:'center',
    marginLeft:247,
    marginTop:25,
    marginBottom:10,


  },
  btn:{
    marginLeft: 'auto',
     width: 40,
    height: 40,
  },
//   body: {
//     backgroundColor :"#E6E6FA",
//   },
  box: {
    padding:5,
    marginBottom:2,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOpacity: .2,
    shadowOffset: {
      height:1,
      width:-2
    },
    elevation:2
  },
  username:{
    color: "#20B2AA",
    fontSize:22,
    alignSelf:'center',
    marginLeft:10
  }
});









