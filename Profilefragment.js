import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ScrollView,TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
const Profilefragment = (props) => {
    const data = props?.route?.params?.data
    const navigation = useNavigation()
    const [token , setToken] = useState("")
    const [name , setName] = useState("")
    const [email , setEmail] = useState("")
    

    useEffect(()=>{
        _retrieveData();
    },[])

   const  _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('token');
          const name = await AsyncStorage.getItem('name');
          const email = await AsyncStorage.getItem('email');
          setToken(value)
          setName(name)
          setEmail(email)
          console.log("12===>",value)
        } catch (error) {
          // Error retrieving data
        }
      };
      const  _removeData = async () => {
        try {
          const value = await AsyncStorage.removeItem('token');
          const name = await AsyncStorage.removeItem('name');
          const email = await AsyncStorage.removeItem('email');
          navigation.navigate("Sighin")
          console.log("12===>",value)
        } catch (error) {
          // Error retrieving data
        }
      };
    
    return (
        <View
         style={{
            flex:1,
            alignItems:'center',
            justifyContent:'center'
        }}
        >
               <Text>
                    {name}
                </Text>
         
                <Text
                style={{
                    marginTop:20
                }}
                >
               
                    {email}
                </Text>
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
            onPress={()=>
                _removeData()
            }
            
            >
                <Text
                style={{
                    color:'#ffffff'
                }}
                >
                   Logout
                </Text>
            </TouchableOpacity>

       
        </View>
    )
}
export default Profilefragment