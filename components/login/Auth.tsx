import React, { useState } from 'react';
import { AppState, StyleSheet, View } from 'react-native';
import { supabase } from '../../app/utils/supabase';
import ForgotPassword from './ForgotPassword';
import Login from './Login';
import SignUp from './SignUp';

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener('change', (state) => {
    if (state === 'active') {
        supabase.auth.startAutoRefresh();
    } else {
        supabase.auth.stopAutoRefresh();
    }
});

type AuthView = 'login' | 'signup' | 'forgot-password';

export default function Auth() {
    const [currentView, setCurrentView] = useState<AuthView>('login');

    const switchToLogin = () => setCurrentView('login');
    const switchToSignUp = () => setCurrentView('signup');
    const switchToForgotPassword = () => setCurrentView('forgot-password');

    const renderCurrentView = () => {
        switch (currentView) {
            case 'login':
                return (
                    <Login
                        onSwitchToSignUp={switchToSignUp}
                        onSwitchToForgotPassword={switchToForgotPassword}
                    />
                );
            case 'signup':
                return (
                    <SignUp
                        onSwitchToLogin={switchToLogin}
                    />
                );
            case 'forgot-password':
                return (
                    <ForgotPassword
                        onSwitchToLogin={switchToLogin}
                    />
                );
            default:
                return (
                    <Login
                        onSwitchToSignUp={switchToSignUp}
                        onSwitchToForgotPassword={switchToForgotPassword}
                    />
                );
        }
    };

    return (
        <View style={styles.container}>
            {renderCurrentView()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
});