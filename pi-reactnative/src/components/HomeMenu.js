import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { auth } from "../firebase/config";
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import NewPostScreen from '../screens/NewPostScreen';
import SearchUserScreen from '../screens/SearchUserScreen'; 

const Tab = createBottomTabNavigator();

class HomeMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        auth.onAuthStateChanged(user => {
            if (!user) {
                this.props.navigation.navigate("Login");
            }
        });
    }

    render() {
        return (
            <Tab.Navigator screenOptions={{ tabBarShowLabel: false, headerShown: false }}>
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        tabBarIcon: ({ focused }) => ( <Entypo name="home" size={28} color={focused ? '#D4C6E7' : '#A9A9A9'} /> ),
                    }}
                />
                <Tab.Screen
                    name="NewPost"
                    component={NewPostScreen}
                    options={{
                        tabBarIcon: ({ focused }) => ( <MaterialIcons name="add-circle" size={28} color={focused ? '#D4C6E7' : '#A9A9A9'} /> ),
                    }}
                />
                <Tab.Screen
                    name="SearchUser"
                    component={SearchUserScreen} 
                    options={{
                        tabBarIcon: ({ focused }) => ( <MaterialIcons name="search" size={28} color={focused ? '#D4C6E7' : '#A9A9A9'} /> ),
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{
                        tabBarIcon: ({ focused }) => ( <MaterialIcons name="person" size={28} color={focused ? '#D4C6E7' : '#A9A9A9'} /> ),
                    }}
                />
            </Tab.Navigator>
        );
    }
}

export default HomeMenu;
