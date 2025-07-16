import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import DateSelector from '../DateSelector';
import NumericInput from '../NumericInput';
import PriceInput from '../PriceInput';

interface PricingData {
    dailyRate: string;
    weeklyRate: string;
    monthlyRate: string;
    securityDeposit: string;
    minDuration: string;
    maxDuration: string;
    availableFrom: Date | null;
    availableUntil: Date | null;
    isIndefinite: boolean;
}

export default function Step2Pricing() {
    const { t } = useTranslation();
    const [selectedRates, setSelectedRates] = useState<string[]>(['daily']);
    const [pricingData, setPricingData] = useState<PricingData>({
        dailyRate: '',
        weeklyRate: '',
        monthlyRate: '',
        securityDeposit: '',
        minDuration: '1',
        maxDuration: '30',
        availableFrom: null,
        availableUntil: null,
        isIndefinite: true,
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
            <Text style={styles.sectionSubtitle}>
                {t('announce.pricingStructure', 'Pricing Structure')}
            </Text>
            <View style={styles.checkboxContainer}>
                {rateOptions.map(option => (
                    <TouchableOpacity
                        key={option.key}
                        style={styles.checkboxRow}
                        onPress={() => handleRateToggle(option.key)}
                    >
                        <View style={[styles.checkbox, selectedRates.includes(option.key) && styles.checkboxSelected]}>
                            {selectedRates.includes(option.key) && (
                                <Ionicons name="checkmark" size={16} color="#fff" />
                            )}
                        </View>
                        <Text style={styles.checkboxLabel}>{option.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Rental Prices */}
            <Text style={styles.sectionSubtitle}>
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
            <Text style={styles.sectionSubtitle}>
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

            {/* Rental Duration */}
            <Text style={styles.sectionSubtitle}>
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

            {/* Availability Period */}
            <Text style={styles.sectionSubtitle}>
                {t('announce.availabilityPeriod', 'Availability Period')}
            </Text>
            
            {/* Indefinite Checkbox */}
            <TouchableOpacity
                style={styles.checkboxRow}
                onPress={() => updatePricingData('isIndefinite', !pricingData.isIndefinite)}
            >
                <View style={[styles.checkbox, pricingData.isIndefinite && styles.checkboxSelected]}>
                    {pricingData.isIndefinite && (
                        <Ionicons name="checkmark" size={16} color="#fff" />
                    )}
                </View>
                <Text style={styles.checkboxLabel}>{t('announce.indefinite', 'Indefinite')}</Text>
            </TouchableOpacity>

            <View style={styles.availabilityContainer}>
                <DateSelector
                    value={pricingData.availableFrom}
                    onDateChange={(date) => updatePricingData('availableFrom', date)}
                    label={t('announce.availableFrom', 'Available from')}
                    disabled={pricingData.isIndefinite}
                />
                <DateSelector
                    value={pricingData.availableUntil}
                    onDateChange={(date) => updatePricingData('availableUntil', date)}
                    label={t('announce.availableUntil', 'Available until')}
                    disabled={pricingData.isIndefinite}
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
    sectionSubtitle: {
        fontSize: 15,
        fontWeight: '600',
        color: '#222',
        marginBottom: 6,
        marginTop: 8,
    },
    checkboxContainer: {
        marginBottom: 16,
    },
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    checkbox: {
        width: 20,
        height: 20,
        borderRadius: 4,
        borderWidth: 2,
        borderColor: '#ccc',
        marginRight: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkboxSelected: {
        backgroundColor: '#3a5d47',
        borderColor: '#3a5d47',
    },
    checkboxLabel: {
        fontSize: 16,
        color: '#222',
        fontWeight: '500',
    },
    durationContainer: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    availabilityContainer: {
        flexDirection: 'row',
        marginBottom: 16,
        marginTop: 8,
    },
    helperText: {
        fontSize: 13,
        color: '#666',
        marginTop: -8,
        marginBottom: 16,
        marginLeft: 4,
    },
}); 