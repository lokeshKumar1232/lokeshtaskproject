import React, { useState,useEffect } from "react";
import {View,Text,TouchableOpacity, Alert,PermissionsAndroid} from 'react-native'
import CustomTextInput from "../component/CustomTextInput";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const Sighin = () =>{
    const [Name,setName] = useState("")
    const [Email,setEmail] = useState("")
    const [Password,setPassword] = useState("")
    
    const navigation = useNavigation()
    

    useEffect(()=>{
        _retrieveData()
    },[])
    const  _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('token');
          console.log("20===>",value)
          if(value){
            navigation.navigate("BottomTabNavigator")
          }
          else{
            navigation.navigate('Signin')
          }
        } catch (error) {
          // Error retrieving data
        }
      };
  const Validation = () => {
    
    var regName = /^[a-zA-Z]+$/
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (Name.length<4) {
        Alert.alert("Enter your  Name");
    }
    else if (!reg.test(Email)) {
        Alert.alert("Enter your Correct Email Id")
    }
    else if (Password.length<6) {
        Alert.alert("Enter your Password correct")
    }
    else {
      SigninPost()
    }

}


    const SigninPost = () =>{
        const formData = new FormData();
        formData.append("name", Name);
        formData.append("email", Email);
        formData.append("password", Password);
      axios.post("https://genuinemark.org/piccollect/user/register", formData, {
          headers: {
            Accept: 'application/json',
            "Content-Type": "multipart/form-data",
          },
        })
          .then(response => {
            if(response?.data?.status==200){
                 

                Alert.alert(response?.data?.message)
                navigation.navigate("Login")
            }
            else{
            Alert.alert(response?.data?.errors?.email)
            }
            
          }).catch(error => {
            navigation.navigate("Login")
            console.error("20====>",error);
          });
    }
    return(
        <View
        style={{
            flex:1,
            alignItems:'center',
            justifyContent:'center'
        }}
        >
            <View
            style={{
                marginTop:20
            }}
            >
            <CustomTextInput
            placeholder={"Enter User Name"}
            onChangeText={(txt)=>setName(txt)}
            />
            </View>
            <View
            style={{
                marginTop:20
            }}
            >
            <CustomTextInput
            placeholder={"Enter Email Address"}
            onChangeText={(txt)=>setEmail(txt)}
            />
            </View>
            <View
            style={{
                marginTop:20
            }}
            >
            <CustomTextInput
            placeholder={"Enter Password"}
            onChangeText={(txt)=>setPassword(txt)}
            />
            </View>

            <TouchableOpacity
            style={{
                backgroundColor:'black',
                width:200,
                height:30,
                marginTop:50,
                alignItems:'center',
                justifyContent:'center',
                borderRadius:10
            }}
            onPress={()=>{
              Validation();
                
            }}
            >
                <Text
                style={{
                    color:'#ffffff'
                }}
                >
                    SignIn
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
            style={{
                marginTop:20
            }}
            onPress={()=>{
                navigation.navigate("Login")
            }}
            >
                <Text
                style={{
                    color:'#000000'
                }}
                >
                     Sighin Already
                </Text>
            </TouchableOpacity>
            
            
        </View>
    )
}
export default Sighin