import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import { supabase } from '../../app/utils/supabase';
import SolidButton from '../buttons/SolidButton';
import AuthHeader from './AuthHeader';

interface ForgotPasswordProps {
    onSwitchToLogin: () => void;
}

export default function ForgotPassword({ onSwitchToLogin }: ForgotPasswordProps) {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    async function resetPassword() {
        if (!email) {
            Alert.alert(t('common.error'), t('auth.emailRequired'));
            return;
        }

        setLoading(true);
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: 'com.yourapp://reset-password', // You'll need to configure this URL
        });

        if (error) {
            Alert.alert(t('common.error'), error.message);
        } else {
            setEmailSent(true);
            Alert.alert(
                t('auth.resetSuccess'),
                t('auth.resetEmailMessage')
            );
        }
        setLoading(false);
    }

    if (emailSent) {
        return (
            <View style={styles.container}>
                <AuthHeader subtitle={`${t('auth.resetEmailSent')} ${email}`} />

                <View style={styles.messageContainer}>
                    <Text style={styles.messageText}>
                        {t('auth.resetEmailMessage')}
                    </Text>
                </View>

                <View style={styles.buttonContainer}>
                    <SolidButton
                        title={t('auth.backToSignIn')}
                        onPress={onSwitchToLogin}
                    />
                </View>

                <View style={styles.linkContainer}>
                    <Text 
                        style={styles.linkText} 
                        onPress={() => setEmailSent(false)}
                    >
                        {t('auth.tryDifferentEmail')}
                    </Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <AuthHeader subtitle={t('auth.forgotSubtitle')} />

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

            <View style={styles.buttonContainer}>
                <SolidButton
                    title={t('auth.resetPassword')}
                    onPress={resetPassword}
                    disabled={loading}
                />
            </View>

            <View style={styles.switchContainer}>
                <Text style={styles.switchText}>{t('auth.rememberPassword')} </Text>
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
    messageContainer: {
        backgroundColor: '#f8f9fa',
        padding: 16,
        borderRadius: 8,
        marginBottom: 24,
        borderLeftWidth: 4,
        borderLeftColor: '#8B0000',
    },
    messageText: {
        fontSize: 15,
        color: '#666',
        lineHeight: 20,
    },
    linkContainer: {
        alignItems: 'center',
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