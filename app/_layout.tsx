import { Stack } from "expo-router";
import React from "react";
import { StatusBar } from "react-native";

export default function RootLayout() {
    return (
        <React.Fragment>
            <StatusBar barStyle="dark-content" />
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
                <Stack.Screen name="(item)" options={{ headerShown: false }}/>
            </Stack>
        </React.Fragment>
    );
}
