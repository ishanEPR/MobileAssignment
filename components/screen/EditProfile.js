import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  FlatList,
  StatusBar,
  TextInput,
} from "react-native";
import axios from "axios";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import firebase from "../config/FirebaseConfig";

import { icons, COLORS, SIZES } from '../../constants'

export default function EditProfile({ navigation }) {
  const [profiledata, setProfiledata] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    getUser();

    var username = firebase.auth().currentUser;
    console.log(username);
  }, []);

  const getUser = async () => {
    await firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        console.log("User is signed in.");
        console.log(user.uid);
        setId(user.uid);
        getData(user.uid);
      } else {
        console.log("No user is signed in.");
        // No user is signed in.
      }
    });
  };

  const getData = (id) => {
    axios
      .get(
        `https://expoproject-6fe2c-default-rtdb.firebaseio.com/users/${id}.json`
      )
      .then((res) => {
        console.log("ishan");
        console.log(res.data);
        setProfiledata(res.data);
        !res.data.name ? setName("") : setName(res.data.name);
        !res.data.email ? setEmail("") : setEmail(res.data.email);
        !res.data.phonenumber
          ? setPhonenumber("")
          : setPhonenumber(res.data.phonenumber);
        !res.data.address ? setAddress("") : setAddress(res.data.address);
      })
      .catch((err) => console.log(err));
  };

  const onUpdate = () => {
    const data = {
      name: name,
      email: email,
      phonenumber: phonenumber,
      address: address,
    };
    console.log(data);

    axios
      .patch(
        `https://expoproject-6fe2c-default-rtdb.firebaseio.com/users/${id}.json`,
        data
      )
      .then((res) => {
        console.log(res);
        navigation.navigate("ProfileScreen");
      })
      .catch((err) => {
        console.log(err);
      });
  };


  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#89b963" barStyle="light-content" />
      <View style={styles.header}>
            <View style={{ flexDirection: 'row' }}>
           
                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingLeft: SIZES.padding * 2,
                        justifyContent: 'center',
                        marginLeft:-25
                    }}
                    onPress={() => navigation.goBack()}
                >
                  <Ionicons
            name="ios-arrow-back"
            size={24}
            color="#006400"
            style={{ marginLeft: 10, marginTop: 5 }}
          //  onPress={() =>navigation.goBack()}
          />
                    
                </TouchableOpacity>

              
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
                        }}>Edit Profile</Text>
                    </View>
                </View>

               
            </View>

{/* 
        <View style={styles.titleBar}>
          <Ionicons
            name="ios-arrow-back"
            size={24}
            color="#006400"
            style={{ marginLeft: 10, marginTop: 5 }}
            onPress={() => navigation.navigate("Home")}
          />
        </View> */}
        <View style={styles.headerContent}>
          <Image
            style={styles.avatar}
            source={require("../../assets/ishan.png")}
          />
         
        </View>
      </View>

      <View
        style={{
          marginLeft: 15,
          marginRight: 15,
          marginTop: 15,
          backgroundColor: "#fff",
          borderRadius: 15,
          padding: 15,
          flexDirection: "row",
        }}
      >
        <Text style={{ fontSize: 16, width: 100, color: "#006400" }}>
          Name:
        </Text>
        <TextInput
          style={styles.detailtextInput}
          name="name"
          onChangeText={setName}
          value={name}
        />
        {/* <Text style={{fontSize:16,color:'#006400'}}>{name}</Text> */}
        {/* <TextInput placeholder="enter name" /> */}
      </View>

      <View style={styles.body}>
        <View
          style={{
            margin: 15,
            backgroundColor: "#fff",
            borderRadius: 15,
            padding: 15,
            flexDirection: "row",
          }}
        >
          <Text style={{ fontSize: 16, width: 100, color: "#006400" }}>
            Telephone:
          </Text>
          <TextInput
            style={styles.detailtextInput}
            name="phonenumber"
            onChangeText={setPhonenumber}
            value={phonenumber}
            placeholder="add phone number here!"
          />
          {/* <Text style={{fontSize:16,color:'#006400'}}>Add your phone number</Text> */}
        </View>
        <View
          style={{
            marginLeft: 15,
            marginRight: 15,
            marginTop: 0,
            backgroundColor: "#fff",
            borderRadius: 15,
            padding: 15,
            flexDirection: "row",
          }}
        >
          <Text style={{ fontSize: 16, width: 100, color: "#006400" }}>
            Address:
          </Text>
          <TextInput
            style={styles.detailtextInput}
            name="address"
            onChangeText={setAddress}
            value={address}
            placeholder="add your address here!"
          />
          {/* <Text style={{fontSize:12,color:'#006400'}}>{address}</Text> */}
          {/* <TextInput placeholder="enter name" /> */}
        </View>
        <View
          style={{
            marginLeft: 15,
            marginRight: 15,
            marginTop: 15,
            backgroundColor: "#fff",
            borderRadius: 15,
            padding: 15,
            flexDirection: "row",
          }}
        >
          <Text style={{ fontSize: 16, width: 100, color: "#006400" }}>
            Email:
          </Text>
          <TextInput
            style={styles.detailtextInput}
            name="email"
            onChangeText={setEmail}
            value={email}
          />
          {/* <Text style={{fontSize:13,color:'#006400'}}>{email}</Text> */}
          {/* <TextInput placeholder="enter name" /> */}
        </View>

        <LinearGradient
          colors={["#80B953", "#2C9984"]}
         
          style={styles.orderbtn}
        >
          <TouchableOpacity onPress={onUpdate}>
            <Text style={{ color: "#fff" }}>Update</Text>
          </TouchableOpacity>
        </LinearGradient>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "#89b963",
    flex: 2,
  },
  headerContent: {
    padding: 30,
    alignItems: "center",
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "#217756",
    marginBottom: 10,
  },
  body: {
    flex: 3,
  },
  icon: {
    width: 40,
    height: 40,
  },
  title: {
    fontSize: 18,
    color: "#EE82EE",
    marginLeft: 4,
  },
  orderbtn: {
    borderRadius: 20,
    width: 150,
    padding: 10,
    alignItems: "center",
    marginLeft: 247,
    marginTop: 25,
    marginBottom: 10,
  },
  btn: {
    marginLeft: "auto",
    width: 40,
    height: 40,
  },
  //   body: {
  //     backgroundColor :"#E6E6FA",
  //   },
  box: {
    padding: 5,
    marginBottom: 2,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 1,
      width: -2,
    },
    elevation: 2,
  },
  username: {
    color: "#20B2AA",
    fontSize: 22,
    alignSelf: "center",
    marginLeft: 10,
  },
  detailtextInput: {
    marginLeft: 15,
    fontSize: 15,
    borderBottomWidth: 2,
    borderBottomColor: "#006400",
    width: 200,
    backgroundColor: "rgba(222, 85, 85, 0.02)",
    padding: 3,
  },
});
