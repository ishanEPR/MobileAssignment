import React,{useEffect,useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ScrollView,

}from 'react-native';
import * as Animatable from "react-native-animatable";
import Modal from "react-native-modal";
import {FontAwesome5,AntDesign,Entypo} from "@expo/vector-icons";
import axios from 'axios';
import Collapsible from "react-native-collapsible";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

import {HTTP_URL} from '../context/Common';

export default function UpcomingDelivery() {
    const [openModal, setOpenModal] = useState(false);
    const [upcomingDelivery, setupcomingDelivery] = useState([]);

    const [collapsed, setCollapsed] = useState(true);
    

    useEffect(()=>{

      const deliveryAgentPhoneNumber="+94768610084";

        axios
        .get("http://192.168.1.11:4000/deliveryAgent/upcoming/"+deliveryAgentPhoneNumber)
        .then((response) => {
          // if (response) {
            // console.log(response.data);
            setupcomingDelivery(response.data);
          // } else {
          //   console.log("error");
          // }
        }).catch((e)=>{
          console.log(e);
        });
    },[]);
    //upcomingDelivery
    const toggleExpanded = () => {
        setCollapsed(!collapsed);
        //  this.setState({ collapsed: !this.state.collapsed });
        console.log(collapsed);
      };
    
      const { headerList, headerText, content } = styles;

    return (
        <View>
            <TouchableOpacity
            onPress={() =>
              //  navigation.navigate("ModalScreen")
              setOpenModal(true)
            }
          >
            <View
              style={[
                styles.DeliveryItemWrapper,
                {
                  backgroundColor: "#f9f9fb",
                  //     marginLeft: item.id==1 ? 20 : 0,
                },
              ]}
            >
              {/* <Image source={require('../../assets/logo.png')} style={styles.categoryItemImage}/> */}
              <Text style={styles.DeliveryItemWrapperTitle1}>UPCOMING</Text>
              <FontAwesome5
                name="box-open"
                size={44}
                color="#217756"
                style={styles.DeliveryItemWrapperIcon1}
              />
              <Text style={styles.DeliveryItemWrappersunTitle1}>
                Quick Delivery
              </Text>
            </View>
          </TouchableOpacity>


          
        <Modal visible={openModal} onBackdropPress={() => setOpenModal(false)}>
          {/* <Animatable.View animation="fadeInDownBig" style={{flex:1,maxHeight:deviceHeight* 0.6, marginTop:180, justifyContent:"flex-end",borderTopLeftRadius:10,}}> */}
          <Animatable.View
            animation="fadeInUpBig"
            style={{
              flex: 1,
              maxHeight: deviceHeight * 0.7,
              marginTop: 100,
              marginBottom: -72,
              justifyContent: "flex-end",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              backgroundColor: "#f9f9fb",
              marginLeft: -16,
              // marginLeft:-17,
              // marginRight:50,
              width: deviceWidth * 0.98,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                marginTop: 18,
              }}
            >
              <Text
                style={{
                  color: "#217756",
                  fontSize: 16,
                  fontWeight: "bold",
                  marginLeft: 16,
                  marginTop: 15,
                }}
              >
                UPCOMING
              </Text>

              <AntDesign
                name="close"
                size={24}
                color="black"
                onPress={() => setOpenModal(false)}
                style={{
                  marginTop: -15,
                  marginLeft: 90,
                }}
              />

              <Text
                style={{
                  color: "#217756",
                  fontSize: 14,
                  marginStart: 70,
                  marginTop: 15,
                }}
              >
                Deliveries
              </Text>
              <View
                style={{
                  marginStart: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#F7AF93",
                  width: 25,
                  height: 21,
                  marginTop: 17,
                  borderRadius: 21,
                }}
              >
                <Text>{upcomingDelivery.length}</Text>
              </View>
            </View>

            <ScrollView style={{ marginTop: 20 }}>
              {upcomingDelivery.map((item) => (
                <Animatable.View
                  key={item.orderId}
                  animation="fadeInUpBig"
                  style={{ marginBottom: 5 }}
                >
                  <TouchableOpacity onPress={toggleExpanded}>
                    <View style={headerList}>
                      <Text style={headerText}>
                        {item.city}- {item.receiverName} 
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <Collapsible collapsed={collapsed} align="center">
                    <View style={content}>
                      <View>
                        <Entypo name="calendar" size={65} color="#217756" />
                        <Text
                          style={{
                            marginLeft: 20,
                            marginTop: -40,
                            fontSize: 14,
                            fontWeight: "bold",
                          }}
                        >
                          {item.shortMonth}
                        </Text>
                        <Text
                          style={{
                            marginLeft: 22,
                            marginTop: -5,
                            fontSize: 12,
                          }}
                        >
                         {item.dateD}
                        </Text>
                      </View>

                      <View style={{ flexDirection: "column" }}>
                        <Text
                          style={{
                            color: "#8C8C8C",
                            fontSize: 13,
                            marginLeft: 10,
                            marginTop: 10,
                          }}
                        >
                          {item.houseNumber} {item.streetName} {item.city}
                        </Text>
                        <Text
                          style={{
                            color: "#8C8C8C",
                            fontSize: 14,
                            marginLeft: 10,
                          }}
                        >
                          Tel : {item.farmerPhoneNumber }
                        </Text>
                      </View>
                    </View>
                  </Collapsible>
                </Animatable.View>
              ))}
            </ScrollView>
          </Animatable.View>
        </Modal>
        </View>
    )
}

const styles=StyleSheet.create({
    DeliveryItemWrapper: {
        //  backgroundColor:colors.secondaryT50,
        display: "flex",
        // marginRight:20,
        borderRadius: 20,
        width: 174,
        padding: 10,
        height: 115,
        marginStart: 20,
        marginTop: 40,
    
        // alignItems:"center",
        // justifyContent:"center",
        shadowColor: "black",
        shadowOffset: {
          width: 1,
          height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 20,
        elevation: 2,
    },
        DeliveryItemWrapperTitle1: {
            color: "#217756",
            fontSize: 18,
            fontWeight: "bold",
        
            marginLeft: 25,
          },
          DeliveryItemWrapperIcon1: {
            marginTop: 2,
            marginLeft: 45,
          },
          DeliveryItemWrappersunTitle1: {
            fontSize: 12,
            fontWeight: "bold",
            marginLeft: 30,
          },
          headerList: {
            backgroundColor: "#F0F0F0",
            padding: 20,
            borderRadius: 20,
            borderColor: "#000",
            margin: 10,
          },
          headerText: {
            textAlign: "center",
            fontSize: 16,
            fontWeight: "500",
            color: "#000000",
            fontWeight: "bold",
          },
          content: {
            padding: 10,
            marginLeft: 5,
            marginRight: 5,
            marginTop: 2,
            paddingTop: 10,
            backgroundColor: "#F0F0F0",
            borderRadius: 15,
        
            // borderBottomLeftRadius:20,
            // borderBottomRightRadius:20,
            flexDirection: "row",
          },



});