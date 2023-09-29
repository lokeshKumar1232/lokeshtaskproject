import React, { useEffect, useState } from "react";
import {View,Text,TouchableOpacity,Alert} from 'react-native'
import CustomTextInput from "../component/CustomTextInput";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Login = () =>{
    const [Email,setEmail] = useState("")
    const [Password,setPassword] = useState("")
    const [data,setData] = useState([])
    const navigation = useNavigation()
   

    const Validation = () => {
        const value = /^[0]?[789]\d{9}$/;
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!reg.test(Email)) {
            Alert.alert("Enter your Correct Email Id")
        }
        else if (Password.length<5) {
            Alert.alert("Enter your Password correct")
        }
        else {
            LoginPost()
        }

    }

    const LoginPost = async() =>{
        const formData = new FormData();
        formData.append("email", Email);
        formData.append("password", Password);
      axios.post("https://genuinemark.org/piccollect/user/login", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
          .then(response => {
            console.log("40===>",response)
            if(response?.data?.status==200){
                Alert.alert(response?.data?.message)
                AsyncStorage.setItem('token',response?.data?.data?.auth_token);
                AsyncStorage.setItem('name',response?.data?.data?.name);
                AsyncStorage.setItem('email',response?.data?.data?.email);
                setData(response?.data?.data)
                navigation.navigate("Login")
                navigation.navigate("BottomTabNavigator",{response})
            }
            else{
                Alert.alert(response?.data?.message)
            }
           
               
               
          }).catch(error => {
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
                    Login
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
            style={{
                marginTop:20
            }}
            onPress={()=>{
                navigation.goBack()
            }}
            >
                <Text
                style={{
                    color:'#000000'
                }}
                >
                    Please Sighin First
                </Text>
            </TouchableOpacity>
            
            
        </View>
    )
}
export default Login