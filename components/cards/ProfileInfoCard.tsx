import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, View } from 'react-native';

interface ProfileInfoCardProps {
    profile: {
        username: string;
        display_name: string;
        avatar_url: string;
        rating_sum: number;
        rating_count: number;
        items_rented: number;
        items_announced: number;
    };
}

export default function ProfileInfoCard({ profile }: ProfileInfoCardProps) {
    const { t } = useTranslation();

    const averageRating = profile.rating_count > 0 
        ? (profile.rating_sum / profile.rating_count).toFixed(1) 
        : "0.0";

    return (
        <View style={styles.profileSection}>
            <View style={styles.profileInfoContainer}>
                <Image
                    source={{ uri: profile.avatar_url }}
                    style={styles.profileImage}
                />
                <View style={styles.profileDetails}>
                    <Text style={styles.displayName}>{profile.display_name}</Text>
                    <Text style={styles.username}>@{profile.username}</Text>
                    <View style={styles.ratingContainer}>
                        <Ionicons name="star" size={16} color="#8B0000" />
                        <Text style={styles.ratingText}>{averageRating}</Text>
                        <Text style={styles.ratingCount}>({profile.rating_count} {t('item.reviews')})</Text>
                    </View>
                </View>
            </View>
            
            <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                    <Text style={styles.statValue}>{profile.items_rented}</Text>
                    <Text style={styles.statLabel}>{t('profile.rentedItems')}</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={styles.statValue}>{profile.items_announced}</Text>
                    <Text style={styles.statLabel}>{t('items.myItems')}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    profileSection: {
        padding: 24,
        backgroundColor: '#f5f5f5',
        marginBottom: 16,
    },
    profileInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 12,
        marginRight: 16,
    },
    profileDetails: {
        flex: 1,
    },
    displayName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    username: {
        fontSize: 16,
        color: '#666',
        marginBottom: 8,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        color: '#333',
        marginLeft: 4,
        fontWeight: '600',
    },
    ratingCount: {
        color: '#666',
        marginLeft: 4,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingTop: 16,
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    statItem: {
        alignItems: 'center',
    },
    statValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    statLabel: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
}); 