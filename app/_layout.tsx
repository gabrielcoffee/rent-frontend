import { Stack } from "expo-router";
import React from "react";
import { StatusBar } from "react-native";
import { LanguageProvider } from "../contexts/LanguageContext";
import "../i18n"; // Initialize i18n

export default function RootLayout() {
    return (
        <React.Fragment>
            <StatusBar barStyle="dark-content" />
            <LanguageProvider>
                <Stack>
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
                    <Stack.Screen name="(item)" options={{ headerShown: false }}/>
                    <Stack.Screen name="settings" options={{ headerShown: false }}/>
                </Stack>
            </LanguageProvider>
        </React.Fragment>
    );
}
