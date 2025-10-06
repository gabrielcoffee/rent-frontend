import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface EarnedCardProps {
    totalEarned: number;
    activeListings: number;
}

export default function EarnedCard({ totalEarned, activeListings }: EarnedCardProps) {
    return (
        <View style={styles.container}>
            <View style={styles.lined}>
                <View style={styles.iconContainer}>
                    <Ionicons name="trending-up" size={32} color="#2ea682" />
                </View>
                <View style={styles.contentContainer}>
                    <Text style={styles.label}>Total Earned</Text>
                    <Text style={styles.amount}>${totalEarned}</Text>
                    <Text style={styles.activeText}>{activeListings} active</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginHorizontal: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
        flex: 1,
    },
    lined: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 32,
        marginLeft: 18
    },
    iconContainer: {
        marginBottom: 8,
    },
    contentContainer: {
        display: 'flex',
    },
    label: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    amount: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2ea682',
        marginBottom: 4,
    },
    activeText: {
        fontSize: 12,
        color: '#666',
    },
}); 