import { Stack } from "expo-router";
import React from "react";
import { StatusBar } from "react-native";

export default function RootLayout() {
    return (
        <React.Fragment>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
            </Stack>
            <StatusBar barStyle={'light-content'} />
        </React.Fragment>

    );
}
