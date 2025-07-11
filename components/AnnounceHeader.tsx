import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type AnnounceHeaderProps = {
    currentStep: number;
};

export default function AnnounceHeader({ currentStep }: AnnounceHeaderProps) {
    const { t } = useTranslation();
    const router = useRouter();

    return (
        <View style={styles.container}>
            <View style={styles.headerContent}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{t('announce.createListing')}</Text>
                    <Text style={styles.stepText}>{t('announce.step', { step: currentStep, total: 4 })}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        paddingTop: 16,
        paddingBottom: 16,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    backButton: {
        marginRight: 16,
    },
    titleContainer: {
        flex: 1,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 2,
    },
    stepText: {
        fontSize: 14,
        color: '#666',
    },
}); 