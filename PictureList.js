import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ScrollView,Image } from 'react-native'
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const PictureList = (props) => {
    // const tokenData =props?.route?.params?.data?.auth_token
    const [data,setData] = useState([])
    const [tokenData,settokenData] = useState("")
    useEffect(()=>{
        _retrieveData();
        
    },[])
     const  _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('token');
          settokenData(value)
          GetImage(value);
          console.log("12===>",value)
        } catch (error) {
          // Error retrieving data
        }
      };
    const GetImage = (value) => {
       
        axios.get("https://genuinemark.org/piccollect/picture/listAll",  {
            headers: {
                token:value,
                Accept: 'application/json',
                "Content-Type": "multipart/form-data",
            },
            
        })
            .then(response => {
                console.log("47====>123", response?.data?.data)
                setData(response?.data?.data)
                
            }).catch(error => {
                console.error("20====>", error);
            });
    }

    const renderItem=({item})=>{
        return(
            <View 
            style={{
                flex:1,
                alignItems:'center',
                margin:20
            }}>
                
                <Image
                source={{uri:item?.file_path}}
                style={{
                    width:200,
                    height:200,
                    resizeMode:'contain'
                }}
                />
    
            </View>
        )
       

    }
    return (
        <View style={{
            flex:1,
            alignItems:'center'
        }} >
            
            <FlatList
            data={data}
            renderItem={renderItem}
            />  
        </View>
    )
}
export default PictureList