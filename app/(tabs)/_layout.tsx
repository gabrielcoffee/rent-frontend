import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";


export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#ffd33d",
                headerStyle: {
                    backgroundColor: '#25292e',
                },
                headerShadowVisible: true,
                headerTintColor: '#fff',
                tabBarStyle: {
                    backgroundColor: '#25292e',
                },
                headerShown: false
            }}
        >
            <Tabs.Screen 
                name="index"
                options={{
                    title: "Start",
                    tabBarIcon: ({color, focused}) => (
                        <Ionicons name={focused ? "grid" : "grid-outline"} color={color} size={24}></Ionicons>
                    )
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
    );
}