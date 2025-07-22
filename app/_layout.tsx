import React from "react";
import { StatusBar } from "react-native";
import { LanguageProvider } from "../contexts/LanguageContext";
import "../i18n"; // Initialize i18n
import App from "./App";

export default function RootLayout() {
    return (
        <React.Fragment>
            <StatusBar barStyle="dark-content" />
            <LanguageProvider>
                <App />
            </LanguageProvider>
        </React.Fragment>
    );
}
