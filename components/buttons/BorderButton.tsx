import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

interface BorderButtonProps extends TouchableOpacityProps {
    title: string;
    onPress: () => void;
    icon?: keyof typeof Ionicons.glyphMap;
    iconColor?: string;
    compact?: boolean;
}

export default function BorderButton({ title, onPress, style, icon, iconColor = '#333', compact = false, ...props }: BorderButtonProps) {
    return (
        <TouchableOpacity 
            style={[styles.button, compact && styles.compact, style]} 
            onPress={onPress}
            {...props}
        >
            {icon && (
                <Ionicons name={icon} size={18} color={iconColor} style={styles.icon} />
            )}
            <Text style={[styles.buttonText, compact && styles.compactText]}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        paddingVertical: 14,
        borderRadius: 6,
        backgroundColor: '#fff',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#e0e0e0',
        minWidth: 0,
        minHeight: 0,
    },
    compact: {
        paddingVertical: 8,
        paddingHorizontal: 10,
        flex: undefined,
        minWidth: 0,
        minHeight: 0,
    },
    icon: {
        marginRight: 6,
    },
    buttonText: {
        fontSize: 16,
        color: '#333',
        fontWeight: '600',
    },
    compactText: {
        fontSize: 14,
        fontWeight: '500',
    },
}); 