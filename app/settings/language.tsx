import BorderButton from '@/components/buttons/BorderButton';
import SolidButton from '@/components/buttons/SolidButton';
import { SettingsCheckButton } from '@/components/profile/SettingsCheckButton';
import { useLanguage } from '@/contexts/LanguageContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LanguagePage() {
    const { t } = useTranslation();
    const { currentLanguage, changeAppLanguage, availableLanguages } = useLanguage();
    const router = useRouter();
    const [selectedLanguage, setSelectedLanguage] = useState(currentLanguage);

    const languageOptions = [
        { code: 'pt', name: 'Português', flag: '🇧🇷' },
        { code: 'en', name: 'English', flag: '🇺🇸' },
        { code: 'es', name: 'Español', flag: '🇪🇸' },
    ];

    const handleLanguageSelect = (languageCode: string) => {
        setSelectedLanguage(languageCode);
    };

    const handleConfirm = async () => {
        if (selectedLanguage !== currentLanguage) {
            await changeAppLanguage(selectedLanguage);
        }
        router.back();
    };

    const handleCancel = () => {
        setSelectedLanguage(currentLanguage);
        router.back();
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'right', 'left']}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={28} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>{t('common.language')}</Text>
                <View style={{ width: 28 }} />
            </View>

            <ScrollView style={styles.scrollView}>
                {/* Language Options */}
                <View style={styles.menuSection}>
                    {languageOptions.map((language) => (
                        <SettingsCheckButton
                            key={language.code}
                            flag={language.flag}
                            label={language.name}
                            isSelected={selectedLanguage === language.code}
                            onPress={() => handleLanguageSelect(language.code)}
                        />
                    ))}
                </View>
            </ScrollView>

            {/* Bottom Buttons */}
            <View style={styles.bottomButtons}>
                <BorderButton 
                    title={t('common.cancel')} 
                    onPress={handleCancel} 
                />
                <SolidButton 
                    title={t('common.confirm')} 
                    onPress={handleConfirm}
                    backgroundColor="#8B0000"
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        marginBottom: 24,
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
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    menuSection: {
        marginTop: 16,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#e0e0e0',
    },
    bottomButtons: {
        flexDirection: 'row',
        padding: 16,
        backgroundColor: '#f5f5f5',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        gap: 12,
    },
}); 