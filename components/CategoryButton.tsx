import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    isSelected: boolean;
    onPress: () => void;
};

export default function CategoryButton({ icon, label, isSelected, onPress }: Props) {
    return (
        <TouchableOpacity 
            style={[styles.container, isSelected && styles.selectedContainer]} 
            onPress={onPress}
        >
            <View style={[styles.iconContainer, isSelected && styles.selectedIconContainer]}>
                <Ionicons 
                    name={icon} 
                    size={24} 
                    color={isSelected ? '#fff' : '#333'} 
                />
            </View>
            <Text style={[styles.label, isSelected && styles.selectedLabel]}>
                {label}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginHorizontal: 8,
        width: 80,
    },
    selectedContainer: {
        // No additional styles needed for selected container
    },
    iconContainer: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 4,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    selectedIconContainer: {
        backgroundColor: '#8B0000', // Dark red
        borderColor: '#8B0000',
    },
    label: {
        fontSize: 12,
        color: '#333',
        textAlign: 'center',
    },
    selectedLabel: {
        color: '#8B0000', // Dark red
        fontWeight: '500',
    },
}); 