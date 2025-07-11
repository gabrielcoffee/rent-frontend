import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
    emoji: string;
    label: string;
    isSelected: boolean;
    onPress: () => void;
};

export default function CategoryButton({ emoji, label, isSelected, onPress }: Props) {
    return (
        <TouchableOpacity 
            style={[styles.container, isSelected && styles.selectedContainer]} 
            onPress={onPress}
        >
            <View style={[styles.emojiContainer, isSelected && styles.selectedEmojiContainer]}>
                <Text style={styles.emoji}>{emoji}</Text>
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
    emojiContainer: {
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
    selectedEmojiContainer: {
        backgroundColor: '#ffebee', // Light red background
        borderWidth: 2,
        borderColor: '#8B0000', // Dark red border
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 8, // For Android shadow
    },
    emoji: {
        fontSize: 24,
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