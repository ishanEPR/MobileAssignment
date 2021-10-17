// import  React,{useState,useEffect,useRef} from 'react';
// import MapView, { Callout, Circle, Marker,PROVIDER_GOOGLE } from 'react-native-maps';
// import { StyleSheet, Text, View, Dimensions,TouchableOpacity,Image } from 'react-native';
// import MapViewDirections from 'react-native-maps-directions'; 
// import { Ionicons } from '@expo/vector-icons';

// import{car}from './../../assets/car.png';
// import{pin}from './../../assets/pin.png';

// export default function MapViewNew() {

//   const [restaurent,setRestaurent]=useState(null);
//   const [streetName,setStreetName]=useState("");
//   const [fromLocation,setFromLocation]=useState(null);
//   const [toLocation,setToLocation]=useState(null);
//   const [region,setRegion]=useState(null);

//   const initialCurrentLocation = {
//     streetName: "Kuching",
//     gps: {
//         latitude: 1.5496614931250685,
//         longitude: 110.36381866919922
//     }
// }
//   const initialCurrentLocationNew = {
//     // streetName: "Kuching",
//     // gps: {
//     //   latitude: 1.5496614931250685,
//     //   longitude: 110.36381866919922,
//     // },
//     location1: {
//       latitude: 1.5347282806345879,
//       longitude: 110.35632207358996,
//     },
//     // location2: {
//     //   latitude: 1.556306570595712,
//     //   longitude: 110.35504616746915,
//     // },
//     // markers: [{
//     //   title: 'narammala',
//     //   coordinates: {
//     //     latitude: 3.148561,
//     //     longitude: 101.652778
//     //   },
//     // },
//     // {
//     //   title: 'Katupotha',
//     //   coordinates: {
//     //     latitude: 3.149771,
//     //     longitude: 101.655449
//     //   },  
//     // }]

//   };


  
//   useEffect(()=>{

   

//     let currenLocation="ganna one";

//     let fromLoc=initialCurrentLocation.gps
//    // let toLoc=restaurent.location
//    let toLoc=initialCurrentLocationNew.location1
//     let street=initialCurrentLocation.streetName

//     let mapRegion={
//       latitude: (fromLoc.latitude+toLoc.latitude)/2,
//       longitude:(fromLoc.longitude+toLoc.longitude)/2,
//       latitudeDelta: Math.abs(fromLoc.latitude-toLoc.latitude)*2,
//       longitudeDelta: Math.abs(fromLoc.longitude-toLoc.longitude)*2

//     }

//     setRestaurent(restaurent)
//     setStreetName(street)
//     setFromLocation(fromLoc)
//     setToLocation(toLoc)
//     setRegion(mapRegion)




     
//   },[])



//     const renderMap=()=>{ 
//         const destinationMarker= ()=>{
    
//           <Marker coordinate={toLocation}>
//             <View
//             style={{
//               height:40,
//               width:40,
//               borderRadius:20,
//               alignItems:'center',
//               justifyContent:"center",
//               backgroundColor:"white"
//             }}
//             >
//               <View  style={{
//               height:30,
//               width:30,
//               borderRadius:15,
//               alignItems:'center',
//               justifyContent:"center",
//               backgroundColor:"red"
//             }}>
//             {/* <Ionicons name="md-checkmark-circle" size={32} color="green" /> */}
//             <Image
//               source={pin}
//               style={{
//                 width:25,
//                 height:25,
//                 tintColor:'white'
//               }}
//             />
    
    
//               </View>
    
    
//             </View>
    
//           </Marker>
//         }
//         const carIcon = ()=>{
//           <Marker 
//           coordinate={fromLocation}
//           anchor={{x: 0.5, y:0.5}}
//           flat={true}
//           //rotation
//            rotation={angle}
    
    
    
    
//           >
//           <Image
//             source={car}
//             style={{
//               width:40,
//               height:40
//             }}
    
    
//           />
    
//           </Marker>
//         }
//         return (
//           <View style={{flex:1}}>
//                   <MapView style={styles.map} 
//                    ref={mapView}
//                   provider={PROVIDER_GOOGLE}
//                   initialRegion={region}
    
    
    
//       >
//     <MapViewDirections
//                 origin={fromLocation}
//                 destination={toLocation}
//                 apikey=""
//                 strokeWidth={5}
//                 strokeColor="red"
//                 optimizeWaypoints={true}
    
                
//         onReady={result=>{
//          setDuration( result.duration)
    
//          if(!isReady){
//            //fit route into maps
//            mapView.current.fitToCoordinates(result.coordinates,{
//              edgePadding:{
//                right:(300/20),
//                bottom: (300/4),
//                left:(300/20),
//                top: (300/8)
//              }
//            })
    
//            //repostion the car
    
//            let nextLoc={
//              latitude: result.coordinates[0]['latitude'],
//              longitude: result.coordinates[0]['longitude']
//            }
    
//            if(result.coordinates.length>=2){
//              let angle=calculateAngle(result.coordinates)
//              setAngle(angle)
//            }
//            setFromLocation(nextLoc)
//            setIsReady(true)
    
    
//          }
//         }}
    
    
//               />
    
    
//       {/* <MapViewDirections
//         origin={fromLocation}
//         destination={toLocation}
//         apikey={GOOGLE_API_KEY}
//         strokeWidth={5}
//         strokeColor="red"
//         optimizeWaypoints={true}
//         onReady={result=>{
//          setDuration( result.duration)
    
//          if(!isReady){
//            //fit route into maps
//            mapView.current.fitToCoordinates(result.coordinates,{
//              edgePadding:{
//                right:(300/20),
//                bottom: (300/4),
//                left:(300/20),
//                top: (300/8)
//              }
//            })
    
//            //repostion the car
    
//            let nextLoc={
//              latitude: result.coordinates[0]['latitude'],
//              longitude: result.coordinates[0]['longitude']
//            }
    
//            if(result.coordinates.length>=2){
//              let angle=calculateAngle(result.coordinates)
//              setAngle(angle)
//            }
//            setFromLocation(nextLoc)
//            setIsReady(true)
    
    
//          }
//         }}
    
//       /> */}
    
    
//       {destinationMarker()}
//       {carIcon()}
        
//       </MapView>
    
//           </View>
//         )
//       }
    

//       const renderDestinationHeader=()=>{
//         return(
//           <View 
//               style={{
//                 position:'absolute',
//                 top:50,
//                 left:0,
//                 right:0,
//                 height:50,
//                 alignItems:"center",
//                 justifyContent:'center'
//               }}
//           >
//           <View  style={{
//             flexDirection:"row",
//             alignItems:'center',
//             width:300,
//             paddingVertical: 10,
//             paddingHorizontal:20,
//             borderRadius: 30,
//             backgroundColor:'white'
//           }}>
//           {/* <Image
//             source={icons.red_pin}
//             style={{
//               width:30,
//               height:30,
//               marginRight:SIZES.padding
//             }}
//           /> */}
//           <View style={{flex:1}}>
//             <Text>{streetName}</Text>
      
//           </View>
//           <Text>{Math.ceil(duration)} mins</Text>
      
//           </View>
      
//           </View>
//         )
//       }

//     return (
//         <View style={styles.container}>
//           {renderMap()}
//           {renderDestinationHeader()}
//           {/* {renderDeliveryInfo()} */}
    
   
//         </View>
//       );
// }

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       // backgroundColor: '#fff',
//       // alignItems: 'center',
//       // justifyContent: 'center',
//     },
//     map: {
//      // width: Dimensions.get('window').width,
//       //height: Dimensions.get('window').height,
//       flex:1
//     },
//   });



import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";
// import {
//   COLORS,
//   FONTS,
//   icons,
//   SIZES,
//   GOOGLE_API_KEY,
//   images,
// } from "../../../../constants/index";
const { width, height } = Dimensions.get("window");

const MapViewNew = ({route }) => {
  //console.warn(route)
  let data=route.params;
  console.log(data)

  const affordable = 1;
  const restaurantt = {
    id: 1,
    name: "ByProgrammers Burger",
    rating: 4.8,
    categories: [5, 7],
    priceRating: affordable,
   // photo: images.burger_restaurant_1,
    duration: "30 - 45 min",
    location: {
      // latitude: 7.2905715,
      // longitude: 80.6337262,
      latitude: data.latitude,
      longitude: data.longitude,
    },
    courier: {
     // avatar: images.main,
      name: "Amy",
    },
    // menu: [
    //   {
    //     menuId: 1,
    //     name: "Crispy Chicken Burger",
    //     photo: images.main,
    //     description: "Burger with crispy chicken, cheese and lettuce",
    //     calories: 200,
    //     price: 10,
    //   },
    //   {
    //     menuId: 2,
    //     name: "Crispy Chicken Burger with Honey Mustard",
    //     photo: images.main,
    //     description: "Crispy Chicken Burger with Honey Mustard Coleslaw",
    //     calories: 250,
    //     price: 15,
    //   },
    //   {
    //     menuId: 3,
    //     name: "Crispy Baked French Fries",
    //     photo: images.main,
    //     description: "Crispy Baked French Fries",
    //     calories: 194,
    //     price: 8,
    //   },
    // ],
  };
  

  const currentLocation = {
    streetName: "Kuching",
    gps: {
      latitude: 6.902429167659533,
      longitude: 79.8611421685535,
    },
  };

  const mapView = React.useRef();
  const [restaurant, setRestaurant] = React.useState(null);
  const [streetName, setStreetName] = React.useState("");
  const [fromLocation, setFromLocation] = React.useState(null);
  const [toLocation, setToLocation] = React.useState(null);
  const [region, setRegion] = React.useState(null);

  const [duration, setDuration] = React.useState(0);
  const [isReady, setIsReady] = React.useState(false);
  // const [angle, setAngle] = React.useState(0);

  React.useEffect(() => {
    let fromLoc = currentLocation.gps;
    let toLoc = restaurantt.location;
   // let street = currentLocation.streetName;
    let street = data.streetName;

    let mapRegion = {
      latitude: (fromLoc.latitude + toLoc.latitude) / 2,
      longitude: (fromLoc.longitude + toLoc.longitude) / 2,
      latitudeDelta: Math.abs(fromLoc.latitude - toLoc.latitude) * 2,
      longitudeDelta: Math.abs(fromLoc.longitude - toLoc.longitude) * 2,
    };
    // calculateAngle
    setRestaurant(restaurant);
    setStreetName(street);
    setFromLocation(fromLoc);
    setToLocation(toLoc);
    setRegion(mapRegion);
  }, []);

  function zoomIn() {
    let newRegion = {
      latitude: region.latitude,
      longitude: region.longitude,
      latitudeDelta: region.latitudeDelta / 2,
      longitudeDelta: region.longitudeDelta / 2,
    };

    setRegion(newRegion);
    mapView.current.animateToRegion(newRegion, 200);
  }

  function zoomOut() {
    let newRegion = {
      latitude: region.latitude,
      longitude: region.longitude,
      latitudeDelta: region.latitudeDelta * 2,
      longitudeDelta: region.longitudeDelta * 2,
    };

    setRegion(newRegion);
    mapView.current.animateToRegion(newRegion, 200);
  }

  function renderMap() {
    const destinationMarker = () => (
      <Marker coordinate={toLocation}>
        <View
          style={{
            height: 40,
            width: 40,
            borderRadius: 20,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fff",
          }}
        >
          <View
            style={{
              height: 30,
              width: 30,
              borderRadius: 15,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#FC6D3F",
            }}
          >
            <Image
             source={require('../../assets/pin.png')}
              style={{
                width: 25,
                height: 25,
                tintColor: "#fff",
              }}
            />
          </View>
        </View>
      </Marker>
    );

    const carIcon = () => (
      <Marker
        coordinate={fromLocation}
        anchor={{ x: 0.5, y: 0.5 }}
        flat={true}
        // rotation={angle}
      >
        <Image
         source={require('../../assets/car.png')}
          style={{
            width: 30,
            height: 30,
          }}
        />
      </Marker>
    );

    return (
      <View style={{ flex: 1 }}>
        <MapView
          ref={mapView}
          provider={PROVIDER_GOOGLE}
          initialRegion={region}
          style={{ flex: 1 }}
        >
          <MapViewDirections
            origin={fromLocation}
            destination={toLocation}
            apikey=""
            strokeWidth={5}
            strokeColor="#FC6D3F"
            optimizeWaypoints={true}
            onReady={(result) => {
              setDuration(result.duration);

              if (!isReady) {
                // Fit route into maps
                mapView.current.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: width / 20,
                    bottom: height / 4,
                    left:width / 20,
                    top: height / 8,
                  },
                });

                // Reposition the car
                let nextLoc = {
                  latitude: result.coordinates[0]["latitude"],
                  longitude: result.coordinates[0]["longitude"],
                };

                setFromLocation(nextLoc);
                setIsReady(true);
              }
            }}
          />
          {destinationMarker()}
          {fromLocation ? carIcon() : null}
        </MapView>
      </View>
    );
  }

  function renderDestinationHeader() {
    return (
      <View
        style={{
          position: "absolute",
          top: 50,
          left: 0,
          right: 0,
          height: 50,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: width * 0.9,
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 15,
            backgroundColor: '#fff',
          }}
        >
          {/* <Image
            source={require('../../assets/car.png')}
            style={{
              width:40,
              height:40
            }}
    
    
          /> */}
          <Image
            source={require('../../assets/pin.png')}
            style={{
              width: 20,
              height: 20,
              marginRight: 10,
            }}
          />

          <View style={{ flex: 1 }}>
            <Text>{data.houseNumber} {data.streetName} {data.city}</Text>
          </View>

          <Text>{Math.ceil(duration)} mins</Text>
        </View>
      </View>
    );
  }

  function renderButtons() {
    return (
      <View
        style={{
          position: "absolute",
          bottom: height * 0.35,
          right: 20,
          width: 60,
          height: 130,
          justifyContent: "space-between",
        }}
      >
        {/* Zoom In */}
        <TouchableOpacity
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: '#fff',
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => zoomIn()}
        >
          <Text style={{fontSize:30}} >+</Text>
        </TouchableOpacity>

        {/* Zoom Out */}
        <TouchableOpacity
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: '#fff',
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => zoomOut()}
        >
          <Text style={{fontSize:30}} >-</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {renderMap()}
      {renderDestinationHeader()}
      {renderButtons()}
    </View>
  );
};

export default MapViewNew;