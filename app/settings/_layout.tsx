import { Stack } from "expo-router";
import React from "react";

export default function SettingsLayout() {
    return (
        <Stack>
            <Stack.Screen 
                name="language" 
                options={{ 
                    headerShown: false,
                    presentation: 'modal'
                }}
            />
        </Stack>
    );
} 