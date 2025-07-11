import React from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface BorderButtonProps extends TouchableOpacityProps {
    title: string;
    onPress: () => void;
}

export default function BorderButton({ title, onPress, style, ...props }: BorderButtonProps) {
    return (
        <TouchableOpacity 
            style={[styles.button, style]} 
            onPress={onPress}
            {...props}
        >
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 6,
        backgroundColor: '#fff',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    buttonText: {
        fontSize: 16,
        color: '#666',
        fontWeight: '600',
    },
}); 