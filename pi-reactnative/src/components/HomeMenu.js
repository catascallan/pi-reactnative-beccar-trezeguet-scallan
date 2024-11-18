import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { auth } from "../firebase/config";
import HomeScreen from '../screens/HomeScreen'; //importamos las screens de tab navigation
import ProfileScreen from '../screens/ProfileScreen';
import NewPostScreen from '../screens/NewPostScreen';

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
            <Tab.Navigator screenOptions={{ tabBarShowLabel: false, headerShown: false }} >
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <Entypo name="home" size={28} color={color} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="NewPost"
                    component={NewPostScreen}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <MaterialIcons name="add-circle" size={28} color={color} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Profile"
                    component={ProfileScreen}
                    options={{
                        tabBarIcon: ({ color }) => (
                            <MaterialIcons name="person" size={28} color={color} />
                        ),
                    }}
                />
            </Tab.Navigator>
        );
    }
}

export default HomeMenu;
