import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type MenuButtonProps = {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    onPress: () => void;
}

export const MenuButton: React.FC<MenuButtonProps> = ({ icon, label, onPress }) => (
    <TouchableOpacity style={styles.menuButton} onPress={onPress}>
        <View style={styles.menuButtonContent}>
            <Ionicons name={icon} size={24} color="#333" />
            <Text style={styles.menuButtonText}>{label}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#666" />
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    menuButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
    },
    menuButtonContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    menuButtonText: {
        color: '#333',
        fontSize: 16,
        marginLeft: 16,
    },
}); 