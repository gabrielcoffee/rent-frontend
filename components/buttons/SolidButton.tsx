import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface SolidButtonProps extends TouchableOpacityProps {
    title: string;
    onPress: () => void;
    backgroundColor?: string;
    textColor?: string;
    icon?: keyof typeof Ionicons.glyphMap;
    iconColor?: string;
}

export default function SolidButton({ 
    title, 
    onPress, 
    backgroundColor = '#333',
    textColor = '#fff',
    icon,
    iconColor = '#fff',
    style,
    ...props 
}: SolidButtonProps) {
    return (
        <TouchableOpacity 
            style={[
                styles.button, 
                { backgroundColor },
                style
            ]} 
            onPress={onPress}
            {...props}
        >
            <Text style={[styles.buttonText, { color: textColor }]}>{title}</Text>
            {icon && (
                <Ionicons name={icon} size={16} color={iconColor} />
            )}
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 6,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
    },
}); 