import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import CheckboxItem from '../buttons/CheckboxItem';
import Input from '../Input';

export default function Step2Pricing() {
    const { t } = useTranslation();
    const [selectedRates, setSelectedRates] = useState<string[]>(['daily']);

    // Pricing Data
    const [dailyRate, setDailyRate] = useState('');
    const [weeklyRate, setWeeklyRate] = useState('');
    const [monthlyRate, setMonthlyRate] = useState('');
    const [securityDeposit, setSecurityDeposit] = useState('');
    const [lateReturnFee, setLateReturnFee] = useState('');
    const [minDuration, setMinDuration] = useState('1');
    const [maxDuration, setMaxDuration] = useState('30');

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
            {selectedRates.includes('daily') && (
                <Input
                    variant="currency"
                    value={dailyRate}
                    onChangeText={(value) => setDailyRate(value)}
                    placeholder="0.00"
                    rightText={t('announce.perDay', 'per day')}
                />
            )}
            {selectedRates.includes('weekly') && (
                <Input
                    variant="currency"
                    value={weeklyRate}
                    onChangeText={(value) => setWeeklyRate(value)}
                    placeholder="0.00"
                    rightText={t('announce.perWeek', 'per week')}
                />
            )}
            {selectedRates.includes('monthly') && (
                <Input
                    variant="currency"
                    value={monthlyRate}
                    onChangeText={(value) => setMonthlyRate(value)}
                    placeholder="0.00"
                    rightText={t('announce.perMonth', 'per month')}
                />
            )}

            {/* Security Deposit */}
            <Input
                variant="currency"
                label={t('announce.securityDeposit', 'Security Deposit (Optional)')}
                value={securityDeposit}
                onChangeText={(value) => setSecurityDeposit(value)}
                placeholder="0.00"
                belowText={t('announce.securityDepositHelp', 'Refundable deposit to cover potential damages')}
            />

            {/* Late Return Fee */}
            <Input
                variant="currency"
                label={t('announce.lateReturnFee', 'Late Return Fee (Optional)')}
                value={lateReturnFee}
                onChangeText={(value) => setLateReturnFee(value)}
                placeholder="0.00"
                rightText={t('announce.lateReturnFeeLabel', 'per day')}
                belowText={t('announce.lateReturnFeeHelp', 'Extra fee for returning the item late')}
            />

            {/* Rental Duration */}
            <Text style={styles.sectionTitle}>
                {t('announce.rentalDuration', 'Rental Duration')}
            </Text>
            <View style={styles.durationContainer}>
                <Input
                    variant="numeric"
                    value={minDuration}
                    onChangeText={(value) => setMinDuration(value)}
                    label={t('announce.minimumDays', 'Minimum (days)')}
                    placeholder="1"
                    minValue={1}
                />
                <Input
                    variant="numeric"
                    value={maxDuration}
                    onChangeText={(value) => setMaxDuration(value)}
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
    durationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginBottom: 8,
    },
}); 