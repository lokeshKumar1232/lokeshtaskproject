import React from "react";
import { View, Text, TextInput, StyleSheet, Image } from 'react-native'
const CustomTextInput = ({
    value,
    onChangeText,
    placeholder,
    type,

}) => {
    return (
        <View
        
        >
            <View style={{
                width: 200,
                height: 40,
                borderWidth: 0.5,
                borderRadius: 10,
            }}>
                <TextInput
                    placeholder={placeholder}
                    secureTextEntry={type ? true : false}
                    style={{ marginLeft: 10 }}
                    onChangeText={onChangeText}
                    placeholderTextColor={'#000000'}
                />

            </View>
        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    TextInputstyle: {
        alignSelf: 'center',
        paddingLeft: 20,
        width: "100%",
        height: 50,
        borderRadius: 10,
        borderWidth: 0.5,
        marginTop: 50,
    }
})
export default CustomTextInput