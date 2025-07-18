import { Stack } from "expo-router";
import React from "react";
import { ActivityIndicator, StatusBar, View } from "react-native";
import Auth from "../components/login/Auth";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import { LanguageProvider } from "../contexts/LanguageContext";
import "../i18n"; // Initialize i18n

function AppContent() {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#007AFF" />
            </View>
        );
    }

    if (!user) {
        return <Auth />;
    }

    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
            <Stack.Screen name="(item)" options={{ headerShown: false }}/>
            <Stack.Screen name="settings" options={{ headerShown: false }}/>
        </Stack>
    );
}

export default function RootLayout() {
    return (
        <React.Fragment>
            <StatusBar barStyle="dark-content" />
            <LanguageProvider>
                <AuthProvider>
                    <AppContent />
                </AuthProvider>
            </LanguageProvider>
        </React.Fragment>
    );
}
