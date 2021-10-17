import  React,{useState,useEffect,useRef} from 'react';
import MapView, { Callout, Circle, Marker,PROVIDER_GOOGLE } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions,TouchableOpacity,Image } from 'react-native';
import MapViewDirections from 'react-native-maps-directions'; 

import{car}from './../../assets/car.png';
import{pin}from './../../assets/pin.png';


import {GOOGLE_API_KEY} from './../../Important';

export default function Map() {

  const mapView = useRef();

  const [restaurent,setRestaurent]=useState(null);
  const [streetName,setStreetName]=useState("");
  const [fromLocation,setFromLocation]=useState(null);
  const [toLocation,setToLocation]=useState(null);
  const [region,setRegion]=useState(null);


  const [duration, setDuration] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [angle, setAngle] = useState(0);


  // useEffect(() => {
  //   const initialCurrentLocation = {
  //     streetName: "Kuching",
  //     gps: {
  //       latitude: 1.5496614931250685,
  //       longitude: 110.36381866919922,
  //     },
  //     location1: {
  //       latitude: 1.5347282806345879,
  //       longitude: 110.35632207358996,
  //     },
  //     location2: {
  //       latitude: 1.556306570595712,
  //       longitude: 110.35504616746915,
  //     },
  //     markers: [{
  //       title: 'narammala',
  //       coordinates: {
  //         latitude: 3.148561,
  //         longitude: 101.652778
  //       },
  //     },
  //     {
  //       title: 'Katupotha',
  //       coordinates: {
  //         latitude: 3.149771,
  //         longitude: 101.655449
  //       },  
  //     }]

  //   };

  //   let fromLoc = initialCurrentLocation.gps;
  //   let toLoc = initialCurrentLocation.location1;
  //   let street = initialCurrentLocation.streetName;
  //   // let loc2 = initialCurrentLocation.location2;

  //   let mapRegion = {
  //     latitude: (fromLoc.latitude + toLoc.latitude) / 2,
  //     longitude: (fromLoc.longitude + toLoc.longitude) / 2,
  //     latitudeDelta: Math.abs(fromLoc.latitude - toLoc.latitude) * 2,
  //     longitudeDelta: Math.abs(fromLoc.longitude - toLoc.longitude) * 2,
  //   };

  //   setStreetName(street);
  //   setFromLocation(fromLoc);
  //   setToLocation(toLoc);
  //   setRegion(mapRegion);
  //   console.log(streetName);
  // }, []);



  const initialCurrentLocation = {
    streetName: "Kuching",
    gps: {
      latitude: 1.5496614931250685,
      longitude: 110.36381866919922,
    },
    location1: {
      latitude: 1.5347282806345879,
      longitude: 110.35632207358996,
    },
    location2: {
      latitude: 1.556306570595712,
      longitude: 110.35504616746915,
    },
    markers: [{
      title: 'narammala',
      coordinates: {
        latitude: 3.148561,
        longitude: 101.652778
      },
    },
    {
      title: 'Katupotha',
      coordinates: {
        latitude: 3.149771,
        longitude: 101.655449
      },  
    }]

  };




  useEffect(()=>{

    

    let currenLocation="ganna one";

    let fromLoc=initialCurrentLocation.gps
   // let toLoc=restaurent.location
   let toLoc=initialCurrentLocation.location1
    let street=initialCurrentLocation.streetName

    let mapRegion={
      latitude: (fromLoc.latitude+toLoc.latitude)/2,
      longitude:(fromLoc.longitude+toLoc.longitude)/2,
      latitudeDelta: Math.abs(fromLoc.latitude-toLoc.latitude)*2,
      longitudeDelta: Math.abs(fromLoc.longitude-toLoc.longitude)*2

    }

    setRestaurent(restaurent)
    setStreetName(street)
    setFromLocation(fromLoc)
    setToLocation(toLoc)
    setRegion(mapRegion)




     
  },[])

  const calculateAngle=(coordinates)=>
  {

    let startLat=coordinates[0]['latitude']
    let startLon=coordinates[0]['longitude']
    let endLat=coordinates[1]['latitude']
    let endLng=coordinates[1]['longitude']

    let dx=endLat- startLat
    let dy=endLng-startLon

    return Math.atan2(dy,dx)*180/Math.PI
  }

  const renderMap=()=>{ 
    const destinationMarker= ()=>{

      <Marker coordinate={toLocation}>
        <View
        style={{
          height:40,
          width:40,
          borderRadius:20,
          alignItems:'center',
          justifyContent:"center",
          backgroundColor:"white"
        }}
        >
          <View  style={{
          height:30,
          width:30,
          borderRadius:15,
          alignItems:'center',
          justifyContent:"center",
          backgroundColor:"red"
        }}>
        <Image
          source={pin}
          style={{
            width:25,
            height:25,
            tintColor:'white'
          }}
        />


          </View>


        </View>

      </Marker>
    }
    const carIcon = ()=>{
      <Marker 
      coordinate={fromLocation}
      anchor={{x: 0.5, y:0.5}}
      flat={true}
      //rotation
      rotation={angle}




      >
      <Image
        source={car}
        style={{
          width:40,
          height:40
        }}


      />

      </Marker>
    }
    return (
      <View style={{flex:1}}>
              <MapView style={styles.map} 
              ref={mapView}
              provider={PROVIDER_GOOGLE}
              initialRegion={region}



  >
<MapViewDirections
            origin={fromLocation}
            destination={toLocation}
            apikey=""
            strokeWidth={5}
            strokeColor="red"
            optimizeWaypoints={true}

            
    onReady={result=>{
     setDuration( result.duration)

     if(!isReady){
       //fit route into maps
       mapView.current.fitToCoordinates(result.coordinates,{
         edgePadding:{
           right:(300/20),
           bottom: (300/4),
           left:(300/20),
           top: (300/8)
         }
       })

       //repostion the car

       let nextLoc={
         latitude: result.coordinates[0]['latitude'],
         longitude: result.coordinates[0]['longitude']
       }

       if(result.coordinates.length>=2){
         let angle=calculateAngle(result.coordinates)
         setAngle(angle)
       }
       setFromLocation(nextLoc)
       setIsReady(true)


     }
    }}


          />


  {/* <MapViewDirections
    origin={fromLocation}
    destination={toLocation}
    apikey={GOOGLE_API_KEY}
    strokeWidth={5}
    strokeColor="red"
    optimizeWaypoints={true}
    onReady={result=>{
     setDuration( result.duration)

     if(!isReady){
       //fit route into maps
       mapView.current.fitToCoordinates(result.coordinates,{
         edgePadding:{
           right:(300/20),
           bottom: (300/4),
           left:(300/20),
           top: (300/8)
         }
       })

       //repostion the car

       let nextLoc={
         latitude: result.coordinates[0]['latitude'],
         longitude: result.coordinates[0]['longitude']
       }

       if(result.coordinates.length>=2){
         let angle=calculateAngle(result.coordinates)
         setAngle(angle)
       }
       setFromLocation(nextLoc)
       setIsReady(true)


     }
    }}

  /> */}


  {destinationMarker()}
  {carIcon()}
    
  </MapView>

      </View>
    )
  }


const renderDestinationHeader=()=>{
  return(
    <View 
        style={{
          position:'absolute',
          top:50,
          left:0,
          right:0,
          height:50,
          alignItems:"center",
          justifyContent:'center'
        }}
    >
    <View  style={{
      flexDirection:"row",
      alignItems:'center',
      width:300,
      paddingVertical: 10,
      paddingHorizontal:20,
      borderRadius: 30,
      backgroundColor:'white'
    }}>
    {/* <Image
      source={icons.red_pin}
      style={{
        width:30,
        height:30,
        marginRight:SIZES.padding
      }}
    /> */}
    <View style={{flex:1}}>
      <Text>{streetName}</Text>

    </View>
    <Text>{Math.ceil(duration)} mins</Text>

    </View>

    </View>
  )
}

// const renderDeliveryInfo= ()=>{
//   return(
//     <View
//       style={{
//         position:'absolute',
//         bottom:50,
//         left:0,
//         right:0,
//         alignItems:'center',
//         justifyContent:'center'
//       }}
//     >
//     <View
//     style={{
//       width:SIZES.width*0.9,
//       paddingVertical: SIZES.padding*3,
//       paddingHorizontal:SIZES.padding*2,
//       borderRadius: SIZES.radius,
//     }}
//     >

//     </View>

//     </View>
//   )
// }


  return (
    <View style={styles.container}>
      {renderMap()}
      {renderDestinationHeader()}
      {/* {renderDeliveryInfo()} */}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  map: {
   // width: Dimensions.get('window').width,
    //height: Dimensions.get('window').height,
    flex:1
  },
});


{/* <MapView style={styles.map} 

initialRegion={{
  latitude: 6.893189327190345,
  longitude: 79.917411061118,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
}}

  >
      <Marker
          coordinate={{
                latitude:6.893189327190345,
              longitude:79.917411061118
             }}
             pinColor='black'
      >
      <Callout>
          <Text>Saman's Home</Text>
      </Callout>
      <Circle center={{
       latitude:6.893189327190345,
              longitude:79.917411061118
      }}
          radius={1000}
      />

      </Marker>
  </MapView> */}