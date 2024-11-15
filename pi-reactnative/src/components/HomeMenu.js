import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from '../screens/ProfileScreen';
import HomeScreen from '../screens/HomeScreen'; 
import NewPostScreen from '../screens/NewPostScreen'; 
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

function HomeMenu() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: { backgroundColor: '#f8f8f8', height: 60 },
        tabBarInactiveTintColor: '#888',
        tabBarActiveTintColor: '#000',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={28} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="NewPost"
        component={NewPostScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="add-circle" size={28} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="person" size={28} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default HomeMenu;
