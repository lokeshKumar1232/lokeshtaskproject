import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PictureList from "../Screen/PictureList";
import Profilefragment from "../Screen/Profilefragment";
import UploadingFragment from "../Screen/UploadingFragment";

const Tab = createBottomTabNavigator();
const BottomTabNavigator = () =>{
    // const data=props.route.params.response.data.data

    return (
        <Tab.Navigator>
            
          <Tab.Screen name="UploadingFragment" component={UploadingFragment} options={{ headerShown: false }} />
          <Tab.Screen name="PictureList" component={PictureList} options={{ headerShown: false }} />
          <Tab.Screen name="Profilefragment" component={Profilefragment} options={{ headerShown: false }} />
         
        </Tab.Navigator>
      );
}
export default BottomTabNavigator