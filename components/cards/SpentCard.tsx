import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface SpentCardProps {
    totalSpent: number;
    activeRentals: number;
}

export default function SpentCard({ totalSpent, activeRentals }: SpentCardProps) {
    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <Ionicons name="trending-down" size={16} color="#ff6b6b" />
            </View>
            <Text style={styles.label}>Total Spent</Text>
            <Text style={styles.amount}>${totalSpent}</Text>
            <Text style={styles.activeText}>{activeRentals} active</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        flex: 1,
        marginHorizontal: 4,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },
    iconContainer: {
        marginBottom: 8,
    },
    label: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    amount: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ff6b6b',
        marginBottom: 4,
    },
    activeText: {
        fontSize: 12,
        color: '#666',
    },
}); 