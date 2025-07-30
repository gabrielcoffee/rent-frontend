import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import CheckboxItem from '../buttons/CheckboxItem';
import Input from '../Input';

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

    // Terms Data
    const [noSmoking, setNoSmoking] = useState(false);
    const [noPets, setNoPets] = useState(false);
    const [returnCleaned, setReturnCleaned] = useState(false);
    const [lateReturnFee, setLateReturnFee] = useState(false);
    const [mustProvideId, setMustProvideId] = useState(false);
    const [insuranceRequired, setInsuranceRequired] = useState(false);
    const [supervisedUse, setSupervisedUse] = useState(false);
    const [additionalTerms, setAdditionalTerms] = useState('');

    const terms: Array<[boolean, (value: boolean) => void, string]> = [
        [noSmoking, setNoSmoking, t('announce.noSmoking', 'No smoking')],
        [noPets, setNoPets, t('announce.noPets', 'No pets')],
        [returnCleaned, setReturnCleaned, t('announce.returnCleaned', 'Return cleaned')],
        [lateReturnFee, setLateReturnFee, t('announce.lateReturnFeeCheckbox', 'Late return fee applies')],
        [mustProvideId, setMustProvideId, t('announce.mustBeVerified', 'Must be verified')],
        [insuranceRequired, setInsuranceRequired, t('announce.insuranceRequired', 'Insurance required')],
        [supervisedUse, setSupervisedUse, t('announce.supervisedUse', 'Supervised use only')],
    ]

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Section Title */}
            <Text style={styles.sectionTitle}>{t('announce.step4Title', 'Terms & Conditions')}</Text>

            {/* Rental Terms Section */}
            <Text style={styles.sectionLabel}>
                {t('announce.rentalTerms', 'Rental Terms')}
            </Text>
            
            {/* Rental Terms */}
            {terms.map(([checked, setChecked, title]) => (
                <CheckboxItem
                    key={title}
                    checked={checked}
                    onPress={() => setChecked(!checked)}
                    title={title}
                />
            ))}

            {/* Additional Terms Section */}
            <Input
                variant="textbox"
                label={t('announce.additionalTerms', 'Additional Terms (Optional)')}
                value={additionalTerms}
                onChangeText={setAdditionalTerms}
                placeholder={t('announce.additionalTermsPlaceholder', 'Add any specific terms or conditions for your rental...')}
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
    sectionLabel: {
        fontSize: 15,
        fontWeight: '600',
        color: '#222',
        marginBottom: 6,
    },
}); 