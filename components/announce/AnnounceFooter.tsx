import { router } from 'expo-router';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import BorderButton from '../buttons/BorderButton';
import SolidButton from '../buttons/SolidButton';

type AnnounceFooterProps = {
    currentStep: number;
    onNext: () => void;
    onPrevious: () => void;
    onCancel: () => void;
    onPublish: () => void;
};

export default function AnnounceFooter({ 
    currentStep, 
    onNext, 
    onPrevious, 
    onCancel, 
    onPublish 
}: AnnounceFooterProps) {
    const { t } = useTranslation();

    const renderButtons = () => {
        if (currentStep === 1) {
            return (
                <>
                    <BorderButton 
                        title={t('common.cancel')} 
                        onPress={() => router.back()} 
                    />
                    <SolidButton 
                        title={t('common.next')} 
                        onPress={onNext}
                        icon="arrow-forward"
                    />
                </>
            );
        } else if (currentStep === 4) {
            return (
                <>
                    <BorderButton 
                        title={t('common.previous')} 
                        onPress={onPrevious} 
                    />
                    <SolidButton 
                        title={t('announce.publishListing')} 
                        onPress={onPublish}
                        backgroundColor="#8B0000"
                        icon="checkmark"
                    />
                </>
            );
        } else {
            return (
                <>
                    <BorderButton 
                        title={t('common.previous')} 
                        onPress={onPrevious} 
                    />
                    <SolidButton 
                        title={t('common.next')} 
                        onPress={onNext}
                        icon="arrow-forward"
                    />
                </>
            );
        }
    };

    return (
        <View style={styles.footer}>
            {renderButtons()}
        </View>
    );
}

const styles = StyleSheet.create({
    footer: {
        flexDirection: 'row',
        padding: 16,
        marginBottom: 24,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
        gap: 12,
    },
}); 