import React, { useState, useContext } from "react";
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
  Dimensions,
  TextInput,
  StatusBar,
} from "react-native";

import * as Animatable from "react-native-animatable";

import { LinearGradient } from "expo-linear-gradient";

import { MaterialIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import HomeScreen from './HomeScreen';

import { AuthContext } from "../context/context";
import firebase from "../config/FirebaseConfig";
//import { AuthContext } from '../context';
export default function SigninScreen({ navigation }) {

 
  const [errorPassword, serErrorPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
 

  const [data, setData] = useState({
    email: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
  });

  //const { signIn } = useContext(AuthContext); 

  const textInputChange = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true,
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false,
      });
    }
  };

  const handlePasswordChange = (val) => {
    setData({
      ...data,
      password: val,
    });
  };

  const updateSecureTextEntry = (val) => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };



  const login = () => {
  
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(data.email) === false) {
      setErrorEmail("*Not valid email address");
      return;
    } else {
      setErrorEmail("");
    }
    if (data.email.length === 0) {
      setErrorEmail("*Email feild is empty");
      return;
    } else {
      setErrorEmail("");
    }
    if (data.password.length === 0) {
      serErrorPassword("*Password feild is empty");
      return;
    } else {
      serErrorPassword("");
    }

// try {
    console.log("login1"+data.email)
    
      firebase
      .auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then((response) => {
        console.log(response.user);
        Alert.alert("Successfully Log In");
        data.email="";
        data.password="";
        navigation.navigate('HomeDrawer')
     //   navigation.navigate('HomeStack', { screen: 'Home' });
      })
      .catch((error) => {
        //console.log(error);
        Alert.alert(error.message);
      });
  
// } catch (error) {
//    console.log(error);
// }
  };



  // const loginHandle = (username, password)=>{
  //   signIn(username,password);
  // }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#89b963" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>Signin</Text>
        <Animatable.Image
          animation="bounceIn"
          duration={2000}
          style={styles.headerImage}
          resizeMode="stretch"
          source={require("../../assets/iconn.png")}
        />
      </View>
      <Animatable.View style={styles.footer} animation="fadeInUpBig">
        <Text style={styles.text_footer}>Email</Text>
        <View style={styles.action}>
        <MaterialIcons name="email" color="#217756" size={24}/>
          {/* <FontAwesome name="mobile" color="#05375a" size={30} /> */}
          <TextInput
            placeholder="ishan@gmail.com"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => textInputChange(val)}
          />
          {data.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="#217756" size={20} />
            </Animatable.View>
          ) : null}
        </View>
         {errorEmail.length != 0 && <Text style={styles.error}>{errorEmail}</Text>}

        <Text style={[styles.text_footer, { marginTop: 35 }]}>Password</Text>
        <View style={styles.action}>
          <FontAwesome name="lock" color="#217756" size={24} />
          <TextInput
            placeholder="*******"
            style={styles.textInput}
            autoCapitalize="none"
            secureTextEntry={data.secureTextEntry ? true : false}
            onChangeText={(val) => handlePasswordChange(val)}
          />

          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" color="grey" size={20} />
            ) : (
              <Feather name="eye" color="grey" size={20} />
            )}
          </TouchableOpacity>
        </View>
          {errorPassword.length != 0 && (
        <Text style={styles.error}>{errorPassword}</Text>
      )}

        {/* <Text
          style={styles.forget}
          onPress={() => navigation.navigate("ForgetPassword")}
        >
          Forget Password?
        </Text> */}

        <View style={styles.button}>
          <TouchableOpacity
            style={styles.signIn}
            //  onPress={()=>{loginHandle(data.username,data.password)}}
            onPress={login}
             // signIn(data.email, data.password);
          
          >
            <LinearGradient
              colors={["#80B953", "#2C9984"]}
              // colors={['#217756','#FFFFFF']}
              style={styles.signIn}
            >
              <Text
                style={[
                  styles.textSign,
                  {
                    color: "#fff",
                  },
                ]}
              >
                Sign In
              </Text>
            </LinearGradient>
          </TouchableOpacity>

              <TouchableOpacity
                    onPress={() => navigation.navigate('Signup')}
                    style={[styles.signIn,{
                      borderColor:'#009387',
                      borderWidth:1,
                      marginTop:15,

                    }]}
                    >
                      <Text style={[styles.textSign,{
                        color:'#009387'
                      }]}>Sign Up</Text>
                    </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor:'#B7F785'
    // backgroundColor: '#009387',
    backgroundColor: "#ABE87C",
    // backgroundColor:'#05375a'
  },
  header: {
    flex: 2,
    justifyContent: "center",
    paddingHorizontal: 20,
    //paddingBottom:-40,
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  headerImage: {
    width: 200,
    height: 200,
    marginStart: 80,
    marginTop: 0,
  },
  // logo:{
  //   width:height_logo,
  //   height:height_logo,

  // },
  text_header: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 100,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    paddingLeft: 10,
    color: "#05375a",
    marginLeft: 10,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 20,
    fontWeight: "bold",
  },
  forget: {
    fontSize: 16,
    color: "#ACB3BF",
    textAlign: "right",
    marginTop: 8,
  },
});
