import React,{useEffect,useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    FlatList,
    TextInput

}from 'react-native';
import * as Animatable from "react-native-animatable";
import Modal from "react-native-modal";
import {FontAwesome,AntDesign,Entypo} from "@expo/vector-icons";
import axios from 'axios';
import Collapsible from "react-native-collapsible";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
import {HTTP_URL} from '../context/Common';


export default function OrderHistory() {
    const [openModal1, setOpenModal1] = useState(false);
    const [historyDelivery, sethistoryDelivery] = useState([]);
    const [searchData,setSearchData]=useState([]);

    const [searchText,setSearchText]=useState('');
    const [collapsed, setCollapsed] = useState(true);


    useEffect(()=>{

      const deliveryAgentPhoneNumber="+94768610084"

      
    axios
    .get("http://192.168.1.11:4000/deliveryAgent/history/"+deliveryAgentPhoneNumber)
    .then((response) => {
      // if (response) {
        // console.log(response.data);
        sethistoryDelivery(response.data);
        setSearchData(response.data);
      // } else {
      //   console.log("error");
      // }
    });
    },[]);
    //historyDelivery
    const toggleExpanded = () => {
        setCollapsed(!collapsed);
        //  this.setState({ collapsed: !this.state.collapsed });
        console.log(collapsed);
      };

    const filterData= value =>{
        const lowerCaseValue=value.toLowerCase().trim();
        if(!lowerCaseValue){
            setSearchData(historyDelivery);
        }else{
            const filterData=historyDelivery.filter(item=>{
                return Object.keys(item).some(key=>{
                    return item[key].toString().toLowerCase().includes(lowerCaseValue);
                })
            });
            setSearchData(filterData);



        }
    }  
    
      const {content } = styles;

    //   const searchFilter = (text)=>{
    //       if(text)
    //       {
    //           const newData=searchData.filter((item)=>{
    //               const itemData=item.city?
    //               item.city.toUpperCase()
    //               :''.toUpperCase();

    //               const textData=text.toUpperCase();
    //               return itemData.indexOf(textData)> -1;
    //           });
    //           sethistoryDelivery(newData);
    //           setSearch(text);
    //       }else{
    //           sethistoryDelivery(searchData);
    //           setSearch(text);
    //       }
    //   }

    //   const ItemSeparatorView= ()=>{
    //       return(
    //           <View
    //           style={{height:0.5,width:'100%',backgroundColor:'#cBcBcB'}}
    //           >

    //           </View>
    //       )
    //   }

      const handleChange =(text)=>{
          setSearchText(text);
          filterData(text);

      }

    return (
        <View>
            <TouchableOpacity onPress={() => setOpenModal1(true)}>
            <View
              style={[
                styles.DeliveryItemWrapper,
                {
                  backgroundColor: "#f9f9fb",
                },
              ]}
            >
              <Text style={styles.DeliveryItemWrapperTitle2}>HISTORY</Text>
              <FontAwesome
                name="history"
                size={44}
                color="#217756"
                style={styles.DeliveryItemWrapperIcon2}
              />
              <Text style={styles.DeliveryItemWrappersunTitle2}>
                Previous Deliveries
              </Text>
            </View>
          </TouchableOpacity>

          
          <Modal
          visible={openModal1}
          onBackdropPress={() => setOpenModal1(false)}
        >
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
                  marginTop: 5,
                }}
              >
                HISTORY
              </Text>

              <AntDesign
                name="close"
                size={24}
                color="black"
                onPress={() => setOpenModal1(false)}
                style={{
                  marginTop: -15,
                  marginLeft: 90,
                }}
              />

              <Text
                style={{
                  color: "#217756",
                  fontSize: 14,
                  marginStart: 80,
                  marginTop: 5,
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
                  marginTop: 7,
                  borderRadius: 21,
                }}
              >
                <Text>{historyDelivery.length}</Text>
              </View>
            </View>

            <View>
            <TextInput
                style={styles.textInputStyle}
                // value={searchText}
                placeholder="search here"
                underlineColorAndroid="transparent"
                onChangeText={(e)=>{handleChange(e)}}
            /> 
            </View>

            {/* <View
              style={{
                flexDirection: "row",
                marginLeft: 20,
                marginRight: 90,
                marginTop: 10,
                height: 40,
                borderRadius: 40,
                backgroundColor: "#F4F4F4",
                shadow: 5,
                alignItems: "center",
                justifyContent: "center",
                width: deviceWidth * 0.5,
              }}
            >
            
              <Text
                style={{
                  marginLeft: -30,
                }}
              >
                Sort By
              </Text>
              <FontAwesome
                name="sort-desc"
                size={24}
                color="black"
                style={{
                  marginTop: -7,
                  marginLeft: 90,
                }}
              />
            </View> */}
             
            {/* <FlatList

                data={historyDelivery}
                keyExtractor={(item,index)=> index.toString()}
                ItemSeparatorComponent={ItemSeparatorView}
                renderItem={({item})=>{
                    return <View>
                        <Text>{item.city}</Text>
                    </View>
                }}

            /> */}

            <ScrollView style={{ marginTop: 20 }}>

            

           

           {searchData.map((item)=>(
            

            <Animatable.View
               key={item.orderId}
                animation="fadeInUpBig"
                style={{ marginBottom: 5 }}
              >


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
                    <Text style={styles.historyTText}>
                    {item.city} - {item.receiverName}
                     
                    </Text>

                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={{
                          color: "#8C8C8C",
                          fontSize: 13,
                          marginLeft: 10,
                          marginTop: 0,
                          width: 110,
                        }}
                      >
                        Total Amount(Rs):
                      </Text>
                      <Text
                        style={{ color: "#000", fontSize: 13, marginTop: 0 }}
                      >
                       {item.amount}
                      </Text>
                    </View>

                    <View style={{ flexDirection: "row" }}>
                      <Text
                        style={{
                          color: "#8C8C8C",
                          fontSize: 13,
                          marginLeft: 10,
                          marginTop: 0,
                          width: 110,
                        }}
                      >
                        Delivery Date:
                      </Text>
                      <Text
                        style={{ color: "#000", fontSize: 13, marginTop: 0 }}
                      >
                        {item.newdateTime}
                     
                      </Text>
                    </View>
                  </View>
                </View>
              </Animatable.View>



          ))



              











              } 
              {searchData.length===0 && <Text style={styles.noRecordText}>No records found to display</Text>}
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
    DeliveryItemWrapperTitle2: {
        color: "#217756",
        fontSize: 18,
        fontWeight: "bold",
    
        marginLeft: 30,
      },
      textInputStyle:{

        height:40,
        borderWidth:1,
        paddingLeft:20,
        margin:5,
        borderColor:'#009688',
        backgroundColor:'white',
        borderRadius:20,
        marginLeft:10,
        marginRight:20,
        marginTop:10,
      },
      DeliveryItemWrapperIcon2: {
        marginTop: 2,
        marginLeft: 47,
      },
      DeliveryItemWrappersunTitle2: {
        fontSize: 12,
        color: "#C4C4C4",
        marginLeft: 20,
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
          noRecordText:{
              marginLeft:20,
              marginTop:5,
            
              color:'black',
              fontSize:16,
          }



});