import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type SettingsCheckButtonProps = {
    flag: string; // Emoji flag
    label: string;
    isSelected: boolean;
    onPress: () => void;
}

export const SettingsCheckButton: React.FC<SettingsCheckButtonProps> = ({ 
    flag, 
    label, 
    isSelected, 
    onPress 
}) => (
    <TouchableOpacity style={styles.button} onPress={onPress}>
        <View style={styles.buttonContent}>
            <Text style={styles.flag}>{flag}</Text>
            <Text style={styles.buttonText}>{label}</Text>
        </View>
        {isSelected && (
            <Ionicons name="checkmark-circle" size={24} color="#8B0000" />
        )}
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    flag: {
        fontSize: 24,
        marginRight: 16,
    },
    buttonText: {
        color: '#333',
        fontSize: 16,
    },
}); 