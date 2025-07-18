import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import { supabase } from '../../app/utils/supabase';
import SolidButton from '../buttons/SolidButton';
import AuthHeader from './AuthHeader';
import { translateAuthError } from './authUtils';

interface SignUpProps {
    onSwitchToLogin: () => void;
}

export default function SignUp({ onSwitchToLogin }: SignUpProps) {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    async function signUpWithEmail() {
        if (password !== confirmPassword) {
            Alert.alert(t('common.error'), t('auth.passwordMismatch'));
            return;
        }

        if (password.length < 6) {
            Alert.alert(t('common.error'), t('auth.passwordTooShort'));
            return;
        }

        setLoading(true);
        const {
            data: { session },
            error,
        } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (error) {
            const translatedError = translateAuthError(error.message, t);
            Alert.alert(t('auth.signUpError'), translatedError);
        } else if (!session) {
            Alert.alert(t('common.success'), t('auth.checkInboxVerification'));
        }
        setLoading(false);
    }

    return (
        <View style={styles.container}>
            <AuthHeader subtitle={t('auth.signUpSubtitle')} />

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
                    placeholder={t('auth.passwordCreatePlaceholder')}
                    placeholderTextColor="#aaa"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    autoCapitalize="none"
                    autoComplete="password-new"
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>{t('auth.confirmPassword')}</Text>
                <TextInput
                    style={styles.input}
                    placeholder={t('auth.confirmPasswordPlaceholder')}
                    placeholderTextColor="#aaa"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                    autoCapitalize="none"
                />
            </View>

            <View style={styles.buttonContainer}>
                <SolidButton
                    title={t('auth.signUp')}
                    onPress={signUpWithEmail}
                    disabled={loading}
                />
            </View>

            <View style={styles.switchContainer}>
                <Text style={styles.switchText}>{t('auth.haveAccount')} </Text>
                <Text style={styles.switchLink} onPress={onSwitchToLogin}>
                    {t('auth.signIn')}
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