import React, { useState, useEffect } from "react";
import { launchImageLibrary } from "react-native-image-picker";
import { View, Text, FlatList, ScrollView,TouchableOpacity,Alert } from 'react-native'
import CustomTextInput from "../component/CustomTextInput";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
const UploadingFragment = (props) => {
   
    // const tokenData =props?.route?.params?.data?.auth_token
    const [tag,setTag] = useState("")
    const [tokenData,settokenData] = useState("")
    const [uploadFiles, setUploadFile] = useState([]);
   const navigation = useNavigation()
    const options = {
        title: 'Select Image',
        type: 'library',
        options: {
            maxHeight: 200,
            maxWidth: 200,
            selectionLimit: 1,
            mediaType: 'photo',
            includeBase64: false
        },
    }

     useEffect(()=>{
        _retrieveData();
     })
     const  _retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('token');
          settokenData(value)
          console.log("12===>",value)
        } catch (error) {
          // Error retrieving data
        }
      };
    const Validation = () => {
        console.log("1332===>",uploadFiles?.uri)
        if (tag.length<1) {
            Alert.alert("Enter Select tag")
        }
        else if (uploadFiles?.uri.length<5) {
            Alert.alert("Please Select Image")
        }
        else {
            SaveImage()
        }

    }
    const documentPick = async () => {
        const images = await launchImageLibrary(options)
        setUploadFile(images?.assets[0])
        console.log("12321====>", images)
    }
    const SaveImage = () => {
        const formData = new FormData();
        formData.append("tags", tag);
        formData.append("image",
            {
                uri: uploadFiles?.uri,
                type: uploadFiles?.type,
                name: uploadFiles?.fileName
            }
        );
        axios.post("https://genuinemark.org/piccollect/picture/upload", formData, {
            headers: {
                token:tokenData,
                Accept: 'application/json',
                "Content-Type": "multipart/form-data",
            },
            
        })
            .then(response => {
                Alert.alert(response?.data?.message)
                console.log("47====>", response?.data?.message)
                
            }).catch(error => {
                console.error("20====>", error);
            });
    }

    return (
        <View style={{
            flex:1,
           
            alignItems:'center',
            justifyContent:'center'
        }}>

    
                <CustomTextInput
                placeholder={"Enter Tag"}
                onChangeText={(txt)=>setTag(txt)}
            
                />
                <TouchableOpacity
                onPress={()=>{
                    documentPick()
                }}
                style={{
                    marginTop:20,
                }}
                >
                    <Text>
                        Gallery access
                    </Text>
                </TouchableOpacity>

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
                    Post Image
                </Text>
            </TouchableOpacity>
                
               
       
        </View>
    )
}
export default UploadingFragment