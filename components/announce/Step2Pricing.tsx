import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import CheckboxItem from '../buttons/CheckboxItem';
import NumericInput from '../NumericInput';
import PriceInput from '../PriceInput';

interface PricingData {
    dailyRate: string;
    weeklyRate: string;
    monthlyRate: string;
    securityDeposit: string;
    lateReturnFee: string;
    minDuration: string;
    maxDuration: string;
}

export default function Step2Pricing() {
    const { t } = useTranslation();
    const [selectedRates, setSelectedRates] = useState<string[]>(['daily']);
    const [pricingData, setPricingData] = useState<PricingData>({
        dailyRate: '',
        weeklyRate: '',
        monthlyRate: '',
        securityDeposit: '',
        lateReturnFee: '',
        minDuration: '1',
        maxDuration: '30',
    });

    const rateOptions = [
        { key: 'daily', label: t('announce.dailyRates', 'Daily rates') },
        { key: 'weekly', label: t('announce.weeklyRates', 'Weekly rates') },
        { key: 'monthly', label: t('announce.monthlyRates', 'Monthly rates') },
    ];

    const handleRateToggle = (rateKey: string) => {
        setSelectedRates(prev => {
            if (prev.includes(rateKey)) {
                // Don't allow removing the last selected rate
                if (prev.length === 1) return prev;
                return prev.filter(r => r !== rateKey);
            } else {
                return [...prev, rateKey];
            }
        });
    };

    const updatePricingData = (field: keyof PricingData, value: string | Date | boolean) => {
        setPricingData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const getRateLabel = (rateKey: string) => {
        switch (rateKey) {
            case 'daily': return t('announce.perDay', 'per day');
            case 'weekly': return t('announce.perWeek', 'per week');
            case 'monthly': return t('announce.perMonth', 'per month');
            default: return '';
        }
    };



    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Section Title */}
            <Text style={styles.sectionTitle}>{t('announce.step2Title', 'Pricing & Availability')}</Text>

            {/* Pricing Structure */}
            <Text style={styles.sectionLabel}>
                {t('announce.pricingStructure', 'Pricing Structure')}
            </Text>
            {rateOptions.map(option => (
                <CheckboxItem
                    key={option.key}
                    checked={selectedRates.includes(option.key)}
                    onPress={() => handleRateToggle(option.key)}
                    title={option.label}
                />
            ))}

            {/* Rental Prices */}
            <Text style={styles.sectionLabel}>
                {t('announce.rentalPrices', 'Rental Prices')}
            </Text>
            {['daily', 'weekly', 'monthly'].map(rateKey => 
                selectedRates.includes(rateKey) && (
                    <PriceInput
                        key={rateKey}
                        value={pricingData[`${rateKey}Rate` as keyof PricingData] as string}
                        onChangeText={(value) => updatePricingData(`${rateKey}Rate` as keyof PricingData, value)}
                        label={getRateLabel(rateKey)}
                    />
                )
            )}

            {/* Security Deposit */}
            <Text style={styles.sectionLabel}>
                {t('announce.securityDeposit', 'Security Deposit (Optional)')}
            </Text>
            <PriceInput
                value={pricingData.securityDeposit}
                onChangeText={(value) => updatePricingData('securityDeposit', value)}
                label=""
            />
            <Text style={styles.helperText}>
                {t('announce.securityDepositHelp', 'Refundable deposit to cover potential damages')}
            </Text>

            {/* Late Return Fee */}
            <Text style={styles.sectionLabel}>
                {t('announce.lateReturnFee', 'Late Return Fee (Optional)')}
            </Text>
            <PriceInput
                value={pricingData.lateReturnFee}
                onChangeText={(value) => updatePricingData('lateReturnFee', value)}
                label={t('announce.lateReturnFeeLabel', 'Additional fee for late return')}
            />
            <Text style={styles.helperText}>
                {t('announce.lateReturnFeeHelp', 'Extra fee for returning the item late')}
            </Text>

            {/* Rental Duration */}
            <Text style={styles.sectionLabel}>
                {t('announce.rentalDuration', 'Rental Duration')}
            </Text>
            <View style={styles.durationContainer}>
                <NumericInput
                    value={pricingData.minDuration}
                    onChangeText={(value) => updatePricingData('minDuration', value)}
                    label={t('announce.minimumDays', 'Minimum (days)')}
                    placeholder="1"
                    minValue={1}
                />
                <NumericInput
                    value={pricingData.maxDuration}
                    onChangeText={(value) => updatePricingData('maxDuration', value)}
                    label={t('announce.maximumDays', 'Maximum (days)')}
                    placeholder="30"
                    maxValue={90}
                />
            </View>

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
    sectionLabel: {
        fontSize: 15,
        fontWeight: '600',
        color: '#222',
        marginBottom: 6,
        marginTop: 8,
    },

    durationContainer: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    helperText: {
        fontSize: 13,
        color: '#666',
        marginTop: -8,
        marginBottom: 16,
        marginLeft: 4,
    },
}); 