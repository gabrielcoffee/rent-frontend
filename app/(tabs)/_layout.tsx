import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import React from 'react';


export default function TabLayout() {
    return (
        <>
            <StatusBar style="dark" />
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: '#8B0000',
                    headerStyle: {
                        backgroundColor: '#f5f5f5',
                    },
                    headerShadowVisible: true,
                    headerTintColor: '#333',
                    tabBarStyle: {
                        backgroundColor: '#f5f5f5',
                        borderTopColor: '#e0e0e0',
                    },
                    headerShown: false
                }}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        title: 'Explore',
                        tabBarIcon: ({ color, focused }) => (
                            <Ionicons name={focused ? "home" : "home-outline"} color={color} size={24}></Ionicons>
                        ),
                    }}
                />

                <Tabs.Screen 
                    name="search" 
                    options={{
                        title: "Search",
                        tabBarIcon: ({color, focused}) => (
                            <Ionicons name={focused ? 'search' : "search-outline"} color={color} size={24}></Ionicons>
                        )
                    }}

                />

                <Tabs.Screen
                    name="announce" 
                    options={{ 
                        title: "Announce",
                        tabBarIcon: ({color, focused}) => (
                            <Ionicons name={focused ? 'megaphone' : 'megaphone-outline'} color={color} size={24}></Ionicons>
                        )
                    }}
                />

                <Tabs.Screen
                    name="items" 
                    options={{ 
                        title: "Items",
                        tabBarIcon: ({color, focused}) => (
                            <Ionicons name={focused ? 'file-tray-stacked' : 'file-tray-stacked-outline'} color={color} size={24}></Ionicons>
                        )
                    }}
                />

                <Tabs.Screen
                    name="profile" 
                    options={{ 
                        title: "Profile",
                        tabBarIcon: ({color, focused}) => (
                            <Ionicons name={focused ? 'person-circle' : 'person-circle-outline'} color={color} size={24}></Ionicons>
                        )
                    }}
                />
            </Tabs>
        </>
    );
}