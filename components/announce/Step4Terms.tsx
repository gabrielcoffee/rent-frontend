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

    const [noSmoking, setNoSmoking] = useState(false);
    const [noPets, setNoPets] = useState(false);
    const [returnCleaned, setReturnCleaned] = useState(false);
    const [lateReturnFee, setLateReturnFee] = useState(false);
    const [mustProvideId, setMustProvideId] = useState(false);
    const [insuranceRequired, setInsuranceRequired] = useState(false);
    const [supervisedUse, setSupervisedUse] = useState(false);

    const terms: Array<[boolean, (value: boolean) => void, string]> = [
        [noSmoking, setNoSmoking, t('announce.noSmoking', 'No smoking')],
        [noPets, setNoPets, t('announce.noPets', 'No pets')],
        [returnCleaned, setReturnCleaned, t('announce.returnCleaned', 'Return cleaned')],
        [lateReturnFee, setLateReturnFee, t('announce.lateReturnFeeCheckbox', 'Late return fee applies')],
        [mustProvideId, setMustProvideId, t('announce.mustBeVerified', 'Must be verified')],
        [insuranceRequired, setInsuranceRequired, t('announce.insuranceRequired', 'Insurance required')],
        [supervisedUse, setSupervisedUse, t('announce.supervisedUse', 'Supervised use only')],
    ]
    const [additionalTerms, setAdditionalTerms] = useState('');

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Section Title */}
            <Text style={styles.sectionTitle}>{t('announce.step4Title', 'Terms & Conditions')}</Text>

            {/* Rental Terms Section */}
            <Text style={styles.sectionSubtitle}>
                {t('announce.rentalTerms', 'Rental Terms')}
            </Text>
            
            {terms.map(([checked, setChecked, title]) => (
                <CheckboxItem
                    key={title}
                    checked={checked}
                    onPress={() => setChecked(!checked)}
                    title={title}
                />
            ))}

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
        backgroundColor: '#f5f5f5',
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