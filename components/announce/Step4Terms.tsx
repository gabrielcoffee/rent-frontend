import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import CheckboxItem from '../buttons/CheckboxItem';

interface RentalTerms {
    noSmoking: boolean;
    noPets: boolean;
    returnCleaned: boolean;
    damageDeposit: boolean;
    lateReturnFee: boolean;
    mustProvideId: boolean;
    insuranceRequired: boolean;
    supervisedUse: boolean;
}

export default function Step4Terms() {
    const { t } = useTranslation();

    const [rentalTerms, setRentalTerms] = useState<RentalTerms>({
        noSmoking: false,
        noPets: false,
        returnCleaned: false,
        damageDeposit: false,
        lateReturnFee: false,
        mustProvideId: false,
        insuranceRequired: false,
        supervisedUse: false,
    });

    const [additionalTerms, setAdditionalTerms] = useState('');

    const toggleTerm = (term: keyof RentalTerms) => {
        setRentalTerms(prev => ({
            ...prev,
            [term]: !prev[term],
        }));
    };



    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Section Title */}
            <Text style={styles.sectionTitle}>{t('announce.step4Title', 'Terms & Conditions')}</Text>

            {/* Rental Terms Section */}
            <Text style={styles.sectionSubtitle}>
                {t('announce.rentalTerms', 'Rental Terms')}
            </Text>

            
            <CheckboxItem
                checked={rentalTerms.noSmoking}
                onPress={() => toggleTerm('noSmoking')}
                title={t('announce.noSmoking', 'No smoking')}
            />

            <CheckboxItem
                checked={rentalTerms.noPets}
                onPress={() => toggleTerm('noPets')}
                title={t('announce.noPets', 'No pets')}
            />

            <CheckboxItem
                checked={rentalTerms.returnCleaned}
                onPress={() => toggleTerm('returnCleaned')}
                title={t('announce.returnCleaned', 'Return cleaned')}
            />

            <CheckboxItem
                checked={rentalTerms.lateReturnFee}
                onPress={() => toggleTerm('lateReturnFee')}
                title={t('announce.lateReturnFeeCheckbox', 'Late return fee applies')}
            />

            <CheckboxItem
                checked={rentalTerms.mustProvideId}
                onPress={() => toggleTerm('mustProvideId')}
                title={t('announce.mustBeVerified', 'Must be verified')}
            />

            <CheckboxItem
                checked={rentalTerms.insuranceRequired}
                onPress={() => toggleTerm('insuranceRequired')}
                title={t('announce.insuranceRequired', 'Insurance required')}
            />

            <CheckboxItem
                checked={rentalTerms.supervisedUse}
                onPress={() => toggleTerm('supervisedUse')}
                title={t('announce.supervisedUse', 'Supervised use only')}
            />

            {/* Additional Terms Section */}
            <Text style={styles.sectionSubtitle}>
                {t('announce.additionalTerms', 'Additional Terms (Optional)')}
            </Text>

            <TextInput
                style={styles.additionalTermsInput}
                value={additionalTerms}
                onChangeText={setAdditionalTerms}
                placeholder={t('announce.additionalTermsPlaceholder', 'Add any specific terms or conditions for your rental...')}
                placeholderTextColor="#aaa"
                multiline
                numberOfLines={6}
                textAlignVertical="top"
            />

            <View style={{ height: 40 }} />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#222',
        marginBottom: 18,
    },
    sectionSubtitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#222',
        marginBottom: 12,
        marginTop: 16,
    },

    additionalTermsInput: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 12,
        fontSize: 15,
        color: '#222',
        backgroundColor: '#fafafa',
        minHeight: 120,
        textAlignVertical: 'top',
    },
}); 