import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

type Owner = {
    name: string;
    image: string;
    rating: number;
    reviewCount: number;
    rentingSince: string;
    isVerified: boolean;
};

type Props = {
    owner: Owner;
};

export default function OwnerCard({ owner }: Props) {
    return (
        <View style={styles.container}>
            <View style={styles.statsContainer}>
                <View style={styles.stat}>
                    <Text style={styles.statValue}>{owner.reviewCount}</Text>
                    <Text style={styles.statLabel}>Reviews</Text>
                </View>
                <View style={styles.stat}>
                    <Text style={styles.statValue}>{owner.rating}</Text>
                    <Text style={styles.statLabel}>Rating</Text>
                </View>
                <View style={styles.stat}>
                    <Text style={styles.statValue}>{owner.rentingSince}</Text>
                    <Text style={styles.statLabel}>Renting</Text>
                </View>
            </View>
            <View style={styles.profileContainer}>
                <Image 
                    source={{ uri: owner.image }}
                    style={styles.profileImage}
                />
                <View style={styles.nameContainer}>
                    <Text style={styles.name}>{owner.name}</Text>
                    {owner.isVerified && (
                        <View style={styles.verifiedContainer}>
                            <Ionicons name="shield-checkmark" size={16} color="#8B0000" />
                            <Text style={styles.verifiedText}>Verified</Text>
                        </View>
                    )}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },
    statsContainer: {
        justifyContent: 'space-between',
        marginRight: 16,
    },
    stat: {
        alignItems: 'center',
    },
    statValue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    statLabel: {
        fontSize: 12,
        color: '#666',
        marginTop: 2,
    },
    profileContainer: {
        flex: 1,
        alignItems: 'center',
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 12,
    },
    nameContainer: {
        alignItems: 'center',
    },
    name: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    verifiedContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    verifiedText: {
        fontSize: 14,
        color: '#8B0000',
    },
}); 