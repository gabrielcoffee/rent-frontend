import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, View } from 'react-native';

type StepHeaderProps = {
    currentStep: number;
};

type Step = {
    number: number;
    title: string;
    icon: keyof typeof Ionicons.glyphMap;
};

export default function StepHeader({ currentStep }: StepHeaderProps) {
    const { t } = useTranslation();

    const steps: Step[] = [
        { number: 1, title: t('announce.step1Label'), icon: 'document-text-outline' },
        { number: 2, title: t('announce.step2Label'), icon: 'pricetag-outline' },
        { number: 3, title: t('announce.step3Label'), icon: 'location-outline' },
        { number: 4, title: t('announce.step4Label'), icon: 'checkmark-circle-outline' },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.stepsContainer}>
                {steps.map((step, index) => (
                    <React.Fragment key={step.number}>
                        <View style={styles.stepItem}>
                            <View style={[
                                styles.stepCircle,
                                currentStep >= step.number && styles.activeStepCircle
                            ]}>
                                <Ionicons 
                                    name={step.icon} 
                                    size={20} 
                                    color={currentStep >= step.number ? '#fff' : '#999'} 
                                />
                            </View>
                            <Text
                                style={[
                                    styles.stepTitle,
                                    currentStep >= step.number && styles.activeStepTitle
                                ]}
                                numberOfLines={1}
                                ellipsizeMode="tail"
                            >
                                {step.title}
                            </Text>
                        </View>
                        
                        {/* Connector line */}
                        {index < steps.length - 1 && (
                            <View style={[
                                styles.connector,
                                currentStep > step.number && styles.activeConnector
                            ]} />
                        )}
                    </React.Fragment>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderBottomColor: "#e0e0e0",
        borderBottomWidth: 1,
    },
    stepsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    stepItem: {
        alignItems: 'center',
        minWidth: 60,
        paddingHorizontal: 4,
    },
    stepCircle: {
        width: 40,
        height: 40,
        borderRadius: 20, // Circular
        backgroundColor: '#f5f5f5',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 6,
    },
    activeStepCircle: {
        backgroundColor: '#8B0000',
        borderColor: '#8B0000',
    },
    stepTitle: {
        fontSize: 10,
        color: '#999',
        textAlign: 'center',
        minWidth: 40,
        paddingHorizontal: 2,
    },
    activeStepTitle: {
        color: '#8B0000',
    },
    connector: {
        flex: 1,
        height: 2,
        backgroundColor: '#e0e0e0',
        marginBottom: 20,
        alignSelf: 'center', // Alinha no centro
    },
    activeConnector: {
        backgroundColor: '#8B0000',
    },
}); 