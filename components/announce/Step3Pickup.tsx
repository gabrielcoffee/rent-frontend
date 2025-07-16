import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type LocationType = 'fixed' | 'arrange';

export default function Step3Pickup() {
    const { t } = useTranslation();

    const [locationType, setLocationType] = useState<LocationType>('fixed');
    const [address, setAddress] = useState('');
    const [instructions, setInstructions] = useState('');

    const handleInstructionsChange = (instructions: string) => {
        // Limit to 200 characters
        if (instructions.length <= 200) {
            setInstructions(instructions);
        }
    };

    const RadioButton = ({ selected, onPress, title }: { selected: boolean; onPress: () => void; title: string }) => (
        <TouchableOpacity style={styles.radioContainer} onPress={onPress}>
            <View style={[styles.radioButton, selected && styles.radioButtonSelected]}>
                {selected && <View style={styles.radioButtonInner} />}
            </View>
            <Text style={styles.radioLabel}>{title}</Text>
        </TouchableOpacity>
    );

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Section Title */}
            <Text style={styles.sectionTitle}>{t('announce.step3Title', 'Pickup & Location')}</Text>

            {/* Location Type Selection */}
            <Text style={styles.sectionSubtitle}>
                {t('announce.locationType', 'Location Type')}
            </Text>
            
            <RadioButton
                selected={locationType === 'fixed'}
                onPress={() => setLocationType('fixed')}
                title={t('announce.fixedLocation', 'Fixed Location')}
            />
            
            <RadioButton
                selected={locationType === 'arrange'}
                onPress={() => setLocationType('arrange')}
                title={t('announce.arrangeWithClient', 'Arrange with Client')}
            />

            {/* Address Input - Only show if Fixed Location is selected */}
            {locationType === 'fixed' && (
                <>
                    <Text style={styles.sectionSubtitle}>
                        {t('announce.pickupLocation', 'Pickup Location')}
                    </Text>
                    <Text style={styles.inputLabel}>
                        {t('announce.address', 'Address')}
                    </Text>
                    <TextInput
                        style={styles.textInput}
                        value={address}
                        onChangeText={setAddress}
                        placeholder={t('announce.addressPlaceholder', 'Enter full address')}
                        placeholderTextColor="#aaa"
                    />
                </>
            )}

            {/* Pickup Instructions */}
            <Text style={styles.sectionSubtitle}>
                {t('announce.pickupInstructions', 'Pickup Instructions')}
            </Text>
            <TextInput
                style={styles.instructionsInput}
                value={instructions}
                onChangeText={handleInstructionsChange}
                placeholder={t('announce.pickupInstructionsPlaceholder', 'Special instructions for pickup (e.g., apartment number, parking info, contact details)...')}
                placeholderTextColor="#aaa"
                multiline
                numberOfLines={4}
                maxLength={200}
            />
            <Text style={styles.helperText}>
                {t('announce.pickupInstructionsHelp', 'Help renters find you and understand the pickup process')}
            </Text>
            <Text style={styles.characterCount}>
                {instructions.length}/200
            </Text>

            {/* Map Preview Placeholder */}
            <Text style={styles.sectionSubtitle}>
                {t('announce.mapPreview', 'Map Preview')}
            </Text>
            <View style={styles.mapPlaceholder}>
                <Text style={styles.mapPlaceholderText}>
                    {t('announce.mapPreviewPlaceholder', 'Map preview will appear...')}
                </Text>
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
        marginBottom: 12,
        marginTop: 16,
    },
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    radioButton: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#ddd',
        marginRight: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    radioButtonSelected: {
        borderColor: '#007AFF',
    },
    radioButtonInner: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#007AFF',
    },
    radioLabel: {
        fontSize: 16,
        color: '#222',
        fontWeight: '500',
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '500',
        color: '#333',
        marginBottom: 6,
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 12,
        fontSize: 15,
        color: '#222',
        backgroundColor: '#fafafa',
        marginBottom: 12,
    },
    instructionsInput: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 15,
        color: '#222',
        backgroundColor: '#fafafa',
        minHeight: 80,
        textAlignVertical: 'top',
        marginBottom: 4,
    },
    helperText: {
        fontSize: 13,
        color: '#666',
        marginBottom: 8,
        marginLeft: 4,
    },
    characterCount: {
        fontSize: 12,
        color: '#999',
        textAlign: 'right',
        marginBottom: 16,
    },
    mapPlaceholder: {
        height: 200,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    mapPlaceholderText: {
        fontSize: 16,
        color: '#999',
        fontStyle: 'italic',
    },
}); 