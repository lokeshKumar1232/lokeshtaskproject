import React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from "./BottomTabNavigator";
import Login from "../Screen/Login";
import Sighin from "../Screen/Signin";
const Stack = createNativeStackNavigator()
const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
            <Stack.Screen  options={{headerShown:false}} name="Sighin" component={Sighin} />
            <Stack.Screen  options={{headerShown:false}} name="Login" component={Login} />
            <Stack.Screen  options={{headerShown:false}} name="BottomTabNavigator" component={BottomTabNavigator} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default AppNavigator