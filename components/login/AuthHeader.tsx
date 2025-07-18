import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

interface AuthHeaderProps {
    subtitle: string;
}

export default function AuthHeader({ subtitle }: AuthHeaderProps) {
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    source={require('../../assets/images/auth_icons.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <Text style={styles.appTitle}>Rent</Text>
            </View>
            
            <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 32,
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 16,
    },
    logo: {
        width: 80,
        height: 80,
        marginBottom: 16,
    },
    appTitle: {
        fontSize: 32,
        fontWeight: '700',
        color: '#8B0000',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        lineHeight: 22,
    },
}); 