import AnnounceFooter from '@/components/announce/AnnounceFooter';
import AnnounceHeader from '@/components/announce/AnnounceHeader';
import Step1Details from '@/components/announce/Step1Details';
import Step2Pricing from '@/components/announce/Step2Pricing';
import Step3Pickup from '@/components/announce/Step3Pickup';
import Step4Terms from '@/components/announce/Step4Terms';
import StepHeader from '@/components/announce/StepHeader';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AnnouncePage() {
    const [currentStep, setCurrentStep] = useState(1);

    const handleNext = () => {
        if (currentStep < 4) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleCancel = () => {
        // TODO: Handle cancel action
        console.log('Cancel pressed');
    };

    const handlePublish = () => {
        // TODO: Handle publish action
        console.log('Publish pressed');
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return <Step1Details />;
            case 2:
                return <Step2Pricing />;
            case 3:
                return <Step3Pickup />;
            case 4:
                return <Step4Terms />;
            default:
                return <Step1Details />;
        }
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'right', 'left']}>
            {/* Header */}
            <AnnounceHeader currentStep={currentStep} />
            
            {/* Step Header */}
            <StepHeader currentStep={currentStep} />
            
            {/* Render one step at a time */}
            <View style={styles.content}>
                {renderStepContent()}
            </View>
            
            {/* Footer */}
            <AnnounceFooter
                currentStep={currentStep}
                onNext={handleNext}
                onPrevious={handlePrevious}
                onCancel={handleCancel}
                onPublish={handlePublish}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    content: {
        flex: 1,
    },
});
