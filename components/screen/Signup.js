import React,{useState,useContext} from 'react';
import { StyleSheet, 
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
    ScrollView
  } from 'react-native';

  import * as Animatable from 'react-native-animatable';

  import { LinearGradient } from 'expo-linear-gradient';
  
  import { MaterialIcons } from '@expo/vector-icons';
  import { FontAwesome } from '@expo/vector-icons';
  import { Feather } from '@expo/vector-icons';
import firebase from "../config/FirebaseConfig";

import { AuthContext } from "../context/context";

import axios from "axios";
export default function SignupScreen({navigation}) {

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
  const [errorPassword, serErrorPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorName, setErrorName] = useState("");


 const [userid, setuserid] = useState(0);

  const [data,setData]=useState({
    name:'',
    email:'',
    password:'',
    
    check_textInputChange: false,
    check_textInputChaneName: false,
    
    secureTextEntry: true,
    confirm_secureTextEntry: true
  });

//  const { signup } = useContext(AuthContext);


const textInputChaneName= (val)=>{
    if(val.length!==0)
    {
      setData({
        ...data,
       
        name:val,
        check_textInputChaneName:true
      });
    }else{
      setData({
        ...data,
      
        name:val,
        check_textInputChaneName:false
      });


    }


  }


  const textInputChange= (val)=>{
    if(val.length!==0)
    {
      setData({
        ...data,
        email:val,
      
        check_textInputChange:true
      });
    }else{
      setData({
        ...data,
        email:val,
    
        check_textInputChange:false
      });


    }


  }

  const handlePasswordChange =(val) =>{
    setData({
      ...data,
      password:val
    });
  }

  
  const handleConfirmPasswordChange =(val) =>{
    setData({
      ...data,
      confirm_password:val
    });
  }



  const updateSecureTextEntry =(val) =>{
    setData({
      ...data,
      secureTextEntry:!data.secureTextEntry
    });
  }

  // const updateConfirmSecureTextEntry =(val) =>{
  //   setData({
  //     ...data,
  //     confirm_secureTextEntry:!data.confirm_secureTextEntry
  //   });
  // }


  
  const Register = async () => {


    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (data.name.length == 0) {
          setErrorName("*Name feild is empty");
          return;
         
    } 

      if (data.email.length == 0) {
      setErrorEmail("*Email feild is empty");
      return;
    } else {
      setErrorEmail("");
    }
    if (reg.test(data.email) == false) {
      setErrorEmail("*Not valid email address");
      return;
    } else {
      setErrorEmail("");
    }
  
    if (data.password.length == 0) {
      serErrorPassword("*Password feild is empty");
      return;
    } else {
      serErrorPassword("");
    }
 

  try {
        firebase
      .auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((res) => {
        console.log(res.user.uid);
        setuserid(res.user.uid);
        sumbitData(res.user.uid)
     //   
          // res.user.updateProfile({
          //     displayName: data.displayName
          // })
        //  console.log(res);


        Alert.alert("Successfully Creating Account");
       navigation.navigate('SigninScreen')
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
      
  } catch (error) {
      console.log(error);
      
  }
  };

  const  sumbitData=(id)=>{

const userData = {
       
        email:data.email,
        name: data.name,
         userid: id
   
       
      };
      axios.put(
        `https://expoproject-6fe2c-default-rtdb.firebaseio.com/users/${id}.json`,
        userData
      );
      // setName("");
      // setEmail("");
      // setPassword("");
      // setConfirmpassword("");
      // setPwderror("");
   


  }

    return (
        <View style={styles.container}>
        <StatusBar backgroundColor="#89b963" barStyle="light-content" />
          <View style={styles.header}>
              <Text style={styles.text_header}>Register Now</Text>
          </View>

<ScrollView style={{marginBottom:-190}}>

          <Animatable.View style={styles.footer}
          animation="fadeInUpBig"
          >

            <Text style={styles.text_footer}>Name</Text>
              <View style={styles.action}>
                <FontAwesome
                  name="user-o"
                  color="#05375a"
                  size={20}
                />
                <TextInput
                  placeholder="Your Name"
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={(val)=>textInputChaneName(val)}
                />
                {data.check_textInputChange ? 
                <Animatable.View
                animation='bounceIn'>
                <Feather
                  name="check-circle"
                  color="green"
                  size={20}
                />
                </Animatable.View>
                :null}
              </View>

  {errorName.length != 0 && <Text style={styles.error}>{errorName}</Text>}
              <Text style={styles.text_footer}>Email</Text>
              <View style={styles.action}>

              <MaterialIcons name="email"  color="#05375a"
                  size={20} />
                {/* <FontAwesome
                  name="user-o"
                  color="#05375a"
                  size={20}
                /> */}
                <TextInput
                  placeholder="Your Email"
                  style={styles.textInput}
                  autoCapitalize="none"
                  onChangeText={(val)=>textInputChange(val)}
                />
                {data.check_textInputChange ? 
                <Animatable.View
                animation='bounceIn'>
                <Feather
                  name="check-circle"
                  color="green"
                  size={20}
                />
                </Animatable.View>
                :null}
              </View>
               
                 {errorEmail.length != 0 && <Text style={styles.error}>{errorEmail}</Text>}


   
              <Text style={[styles.text_footer,{marginTop:35}]}>Password</Text>
              <View style={styles.action}>
                <FontAwesome
                  name="lock"
                  color="#05375a"
                  size={20}
                />
                <TextInput
                  placeholder="Your Password"
                  style={styles.textInput}
                  autoCapitalize="none"
                  secureTextEntry={data.secureTextEntry ?true: false}
                  onChangeText={(val)=>handlePasswordChange(val)}
                />

                <TouchableOpacity
                onPress={updateSecureTextEntry}>
                {data.secureTextEntry ?
                  <Feather
                    name="eye-off"
                    color="grey"
                    size={20}
                  />
                  :

                  <Feather
                    name="eye"
                    color="grey"
                    size={20}
                  />
                }
                </TouchableOpacity>

                
               
              </View>

                 {errorPassword.length != 0 && (
        <Text style={styles.error}>{errorPassword}</Text>
      )}



      {/* {errorPassword.length != 0 && (
        <Text style={styles.error}>{errorPassword}</Text>
      )}
              <Text style={[styles.text_footer,{marginTop:35}]}>Confirm Password</Text>
              <View style={styles.action}>
                <FontAwesome
                  name="lock"
                  color="#05375a"
                  size={20}
                />
                <TextInput
                  placeholder="Confirm Password"
                  style={styles.textInput}
                  autoCapitalize="none"
                  secureTextEntry={data.confirm_secureTextEntry ? true : false}
                  onChangeText={(val)=>handleConfirmPasswordChange(val)}
                />

                <TouchableOpacity
                onPress={updateConfirmSecureTextEntry}>
                {data.confirm_secureTextEntry ?
                  <Feather
                    name="eye-off"
                    color="grey"
                    size={20}
                  />
                  :

                  <Feather
                    name="eye"
                    color="grey"
                    size={20}
                  />
                }
                </TouchableOpacity>

                
               
              </View> */}


              <View style={styles.button}>
                    <TouchableOpacity
                        style={styles.signIn}
                        onPress={Register}
                    >
                            <LinearGradient
                    colors={["#80B953", "#2C9984"]}
                    style={styles.signIn}
                    >
                    <Text
                    style={[styles.textSign,{
                      color:'#fff'
                    }]}
                    >Sign Up</Text>


                    </LinearGradient>

                    </TouchableOpacity>


                    <TouchableOpacity
                    onPress={()=>navigation.goBack()}
                    style={[styles.signIn,{
                      borderColor:'#009387',
                      borderWidth:1,
                      marginTop:15,

                    }]}
                    >
                      <Text style={[styles.textSign,{
                        color:'#009387'
                      }]}>Back</Text>
                    </TouchableOpacity>

                </View>
          </Animatable.View>
            
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ABE87C",
    // backgroundColor: '#009387',
    
  },
  header:{
    flex:1,
    justifyContent:'flex-end',
   paddingHorizontal:20,
   paddingBottom:50,
  },
  footer:{
    flex:3,
    backgroundColor:'#fff',
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
  
    paddingVertical:30,
    paddingHorizontal:20,
    marginBottom:40,

  },
  // logo:{
  //   width:height_logo,
  //   height:height_logo,

  // },
  text_header:{
    color:'#fff',
    fontSize:30,
    fontWeight:'bold',
  },
  text_footer:{
    color:"#05375a",
    fontSize:18,
  },
  action:{
    flexDirection:'row',
    marginTop:10,
    borderBottomWidth:1,
    borderBottomColor:'#f2f2f2',
    paddingBottom:5,
  },
  textInput:{
    flex:1,
    paddingLeft:10,
    color:'#05375a',
    marginLeft:10,
  },
  button:{
    alignItems:'center',
    marginTop:30,
  },
  signIn:{
    width:'100%',
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
   
  },
  textSign:{
    fontSize:20,
    fontWeight:'bold',
  },
  error: {
    width: "80%",
    textAlign: "left",
    // marginBottom: -25,
    color: "red",
    fontSize: 14,
    marginTop: 10,
  },


 
});
