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
import { useIsFocused } from "@react-navigation/core";

export default function ProfileScreen({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setemail] = useState("");
  const [profileimage, setprofileimage] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [data, setData] = useState([]);
  const isFocus = useIsFocused();

  const [profiledata, setProfiledata] = useState([]);
  const [id, setId] = useState("");

  useEffect(() => {
    var username = firebase.auth().currentUser;
    console.log(username.uid, "new");

    try {
      const getUser = () => {
        firebase.auth().onAuthStateChanged(function (user) {
          if (user) {
            // User is signed in.

            console.log(user.uid);
            setId(user.uid);
            getUserData(user.uid);
          } else {
            console.log("No user is profile in.");
          }
        });
      };

      getUser();
    } catch (error) {
      console.log(error);
    }
  }, [isFocus]);

  const getUserData = (id) => {
    axios
      .get(
        `https://expoproject-6fe2c-default-rtdb.firebaseio.com/users/${id}.json`
      )
      .then((res) => {
        console.log(res.data);
        setProfiledata(res.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#89b963" barStyle="light-content" />
      <View style={styles.header}>
        <View style={styles.titleBar}>
          <Ionicons
            name="ios-arrow-back"
            size={24}
            color="#006400"
            style={{ marginLeft: 10, marginTop: 5 }}
            onPress={() => navigation.navigate("Home")}
          />
        </View>
        <View style={styles.headerContent}>
          <Image
            style={styles.avatar}
            source={require("../../assets/ishan.png")}
          />
          <Text style={{ fontSize: 16, color: "#006400" }}>{profiledata.name}</Text>
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
        <Text style={{ fontSize: 16, color: "#006400" }}>
          {profiledata.name}
        </Text>
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
          <Text  style={{ fontSize: 16, color: "#006400" }}>
            {!profiledata.phonenumber
              ? "No phone number added"
              : profiledata.phonenumber}
          </Text>
          {/* <TextInput placeholder="enter name" /> */}
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
          <Text  style={{ fontSize: 16, color: "#006400" }}>
            {!profiledata.address ? "No address" : profiledata.address}
          </Text>
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
          <Text style={{ fontSize: 16, color: "#006400" }}>
            {profiledata.email}
          </Text>
          {/* <TextInput placeholder="enter name" /> */}
        </View>

        <LinearGradient
          colors={["#80B953", "#2C9984"]}
          // colors={['#217756','#FFFFFF']}
          style={styles.orderbtn}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("EditProfile");
            }}
          >
            <Text style={{ color: "#fff" }}>Edit Profile</Text>
          </TouchableOpacity>
        </LinearGradient>

        {/* <CardView
                cardElevation={2}
                cardMaxElevation={2}
                cornerRadius={5}>
                <Text>
                    Elevation 0
                </Text>
        </CardView> */}
        {/* <FlatList 
              style={styles.container} 
              enableEmptySections={true}
              data={this.state.data}
              keyExtractor= {(item) => {
                return item.id;
              }}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity>
                    <View style={styles.box}>
                      <Image style={styles.icon} source={{uri: item.image}}/>
                      <Text style={styles.title}>{item.title}</Text>
                      <Image style={styles.btn} source={{uri: "https://img.icons8.com/customer/office/40"}}/>
                    </View>
                  </TouchableOpacity>
                )
            }}/> */}
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
});
