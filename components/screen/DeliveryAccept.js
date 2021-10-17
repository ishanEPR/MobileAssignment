
import React, { useState } from "react";
import { Text, StyleSheet, View, TextInput, Button,TouchableOpacity,Image } from "react-native";
import axios from "axios";

import { icons, images, SIZES, COLORS } from '../../constants'

export default function DeliveryAccept({navigation,route}) {

  
const {restaurant}=route.params;

console.log(restaurant)

  const [name, setName] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [address, setaddress] = useState("");
  
  const onPressSubmitform = () => {

    const data = {
      name: name,
      phoneNumber: phoneNumber,
      address: address, 
      restaurant:restaurant
    };
    console.log("Submitted", data);


    axios
      .post(
       `https://expoproject-6fe2c-default-rtdb.firebaseio.com/orders.json`,
        data
      )
      .then((res) => {
        console.log("resss", res);
        setName("");
        setphoneNumber("");
        setaddress("");
        alert("Ordered Successfully")
      
        
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <View style={styles.container}>


            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                    style={{
                        width: 50,
                        paddingLeft: SIZES.padding * 2,
                        justifyContent: 'center'
                    }}
                    onPress={() => navigation.goBack()}
                >
                    <Image
                        source={icons.back}
                        resizeMode="contain"
                        style={{
                            width: 30,
                            height: 30
                        }}
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
                         <Text style={styles.topic}>Order Chechout</Text>
                    </View>
                </View>

               
            </View>
     
        <View style={styles.formbody}>
          <View>
            <Text style={styles.textinputlabel}>Name</Text>
            <View>
              <TextInput
                style={styles.textinput}
                onChangeText={setName}
                value={name}
                placeholder="Name"
              />
            </View>
          </View>
          <View>
            <Text style={styles.textinputlabel}>Phone Number </Text>
            <View>
              <TextInput
                style={styles.textinput}
                onChangeText={setphoneNumber}
                value={phoneNumber}
                placeholder="Phone Number"
              />
            </View>
          </View>
          <View>
            <Text style={styles.textinputlabel}>Address</Text>
            <View>
              <TextInput
                style={styles.textinput}
                onChangeText={setaddress}
                value={address}
                placeholder="Address"
              />
            </View>
          </View>
          
         
          <View style={styles.Buttondiv}>
            <Button
              onPress={onPressSubmitform}
              title="Order"
              color="#841584"
            />
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  topic: {
    color: "#ff0000",
    fontSize: 20,
  },
  formbody: {
    width: "80%",
    // backgroundColor: "yellow",
  },
  textinput: {
    // backgroundColor: "green",
    borderBottomWidth: 2,
    borderBottomColor: "red",
  },
  textinputlabel: {
    paddingTop: 15,
    // paddingBottom: 5,
    fontWeight: "bold",
  },
  Buttondiv: {
    marginTop: 30,
  },
});
