import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MenuButton } from '../../components/buttons/MenuButton';
import ProfileInfoCard from '../../components/cards/ProfileInfoCard';
import ProfileHeader from '../../components/header/ProfileHeader';

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
    ];

    return (
        <SafeAreaView style={styles.container} edges={['top', 'right', 'left']}>
            <ProfileHeader />
            <ScrollView style={styles.scrollView}>
                {/* Profile Info Section */}
                <ProfileInfoCard profile={profile} />

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
    menuSection: {
        backgroundColor: '#fff',
        marginTop: 20,
        paddingHorizontal: 20,
    },
});
