import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import { supabase } from '../../app/utils/supabase';
import SolidButton from '../buttons/SolidButton';
import AuthHeader from './AuthHeader';
import { translateAuthError } from './authUtils';

interface LoginProps {
    onSwitchToSignUp: () => void;
    onSwitchToForgotPassword: () => void;
}

export default function Login({ onSwitchToSignUp, onSwitchToForgotPassword }: LoginProps) {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    async function signInWithEmail() {
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });
        if (error) {
            const translatedError = translateAuthError(error.message, t);
            Alert.alert(t('auth.loginError'), translatedError);
        }
        setLoading(false);
    }

    return (
        <View style={styles.container}>
            <AuthHeader subtitle={t('auth.signInSubtitle')} />

            <View style={styles.inputContainer}>
                <Text style={styles.label}>{t('auth.email')}</Text>
                <TextInput
                    style={styles.input}
                    placeholder={t('auth.emailPlaceholder')}
                    placeholderTextColor="#aaa"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    autoComplete="email"
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>{t('auth.password')}</Text>
                <TextInput
                    style={styles.input}
                    placeholder={t('auth.passwordPlaceholder')}
                    placeholderTextColor="#aaa"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    autoCapitalize="none"
                    autoComplete="password"
                />
            </View>

            <View style={styles.buttonContainer}>
                <SolidButton
                    title={t('auth.signIn')}
                    onPress={signInWithEmail}
                    disabled={loading}
                />
            </View>

            <View style={styles.linkContainer}>
                <Text 
                    style={styles.linkText} 
                    onPress={onSwitchToForgotPassword}
                >
                    {t('auth.forgotPassword')}
                </Text>
            </View>

            <View style={styles.switchContainer}>
                <Text style={styles.switchText}>{t('auth.noAccount')} </Text>
                <Text style={styles.switchLink} onPress={onSwitchToSignUp}>
                    {t('auth.signUp')}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 15,
        fontWeight: '600',
        color: '#222',
        marginBottom: 6,
    },
    input: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 12,
        fontSize: 15,
        color: '#222',
        backgroundColor: '#fafafa',
    },
    buttonContainer: {
        marginTop: 8,
        marginBottom: 24,
        alignItems: 'center',
    },
    linkContainer: {
        alignItems: 'center',
        marginBottom: 32,
    },
    linkText: {
        fontSize: 15,
        color: '#8B0000',
        fontWeight: '500',
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    switchText: {
        fontSize: 15,
        color: '#666',
    },
    switchLink: {
        fontSize: 15,
        color: '#8B0000',
        fontWeight: '600',
    },
}); 