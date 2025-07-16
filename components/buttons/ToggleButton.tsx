import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface ToggleButtonProps {
    title: string;
    selected: boolean;
    onPress: () => void;
}

export default function ToggleButton({ title, selected, onPress }: ToggleButtonProps) {
    return (
        <TouchableOpacity 
            style={[styles.button, selected && styles.selected]} 
            onPress={onPress}
            activeOpacity={0.7}
        >
            <Text style={[styles.text, selected && styles.selectedText]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        backgroundColor: '#fff',
        marginBottom: 8,
        alignItems: 'center',
    },
    selected: {
        backgroundColor: '#3a5d47',
        borderColor: '#3a5d47',
    },
    text: {
        fontSize: 16,
        color: '#666',
        fontWeight: '500',
    },
    selectedText: {
        color: '#fff',
    },
}); 