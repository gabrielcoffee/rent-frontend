import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MenuButton } from '../../components/MenuButton';
import ProfileHeader from '../../components/ProfileHeader';

type MenuButtonData = {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    onPress: () => void;
}

export default function ProfilePage() {
    const { t } = useTranslation();
    const router = useRouter();

    const profile = {
        username: "johnbopp",
        display_name: "João Bopp",
        avatar_url: "https://randomuser.me/api/portraits/men/32.jpg",
        rating_sum: 48,
        rating_count: 10,
        items_rented: 15,
        items_announced: 8
    };

    const averageRating = profile.rating_count > 0 
        ? (profile.rating_sum / profile.rating_count).toFixed(1) 
        : "0.0";

    const mainMenuButtons: MenuButtonData[] = [
        { icon: 'person-outline', label: t('profile.editProfile'), onPress: () => {} },
        { icon: 'lock-closed-outline', label: t('profile.settings'), onPress: () => {} },
        { icon: 'information-circle-outline', label: t('common.information'), onPress: () => {} },
        { icon: 'wallet-outline', label: t('common.payments'), onPress: () => {} },
        { icon: 'heart-outline', label: t('profile.favorites'), onPress: () => {} },
        { icon: 'swap-horizontal-outline', label: t('profile.myItems'), onPress: () => {} },
        { icon: 'location-outline', label: t('common.location'), onPress: () => {} },
        { icon: 'language-outline', label: t('common.language'), onPress: () => router.push('/settings/language') },
    ];

    const secondaryMenuButtons: MenuButtonData[] = [
        { icon: 'help-circle-outline', label: t('common.help'), onPress: () => {} },
        { icon: 'settings-outline', label: t('profile.settings'), onPress: () => {} },
        { icon: 'shield-checkmark-outline', label: t('common.safety'), onPress: () => {} },
        { icon: 'document-text-outline', label: t('common.legal'), onPress: () => {} },
        { icon: 'log-out-outline', label: t('profile.logout'), onPress: () => {} },
    ];

    return (
        <SafeAreaView style={styles.container} edges={['top', 'right', 'left']}>
            <ProfileHeader />
            <ScrollView style={styles.scrollView}>
                {/* Profile Info Section */}
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

                {/* Main Menu */}
                <View style={styles.menuSection}>
                    {mainMenuButtons.map((button, index) => (
                        <MenuButton key={index} {...button} />
                    ))}
                </View>

                {/* Secondary Menu */}
                <View style={styles.menuSection}>
                    {secondaryMenuButtons.map((button, index) => (
                        <MenuButton key={index} {...button} />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    scrollView: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f5f5f5',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    profileSection: {
        padding: 24,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
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
    menuSection: {
        marginBottom: 16,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#e0e0e0',
    },
});
