import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

interface NumericInputProps {
    value: string;
    onChangeText: (text: string) => void;
    label: string;
    placeholder?: string;
    minValue?: number;
    maxValue?: number;
    error?: string;
}

export default function NumericInput({ 
    value, 
    onChangeText, 
    label, 
    placeholder = "0",
    minValue,
    maxValue,
    error 
}: NumericInputProps) {
    const handleTextChange = (text: string) => {
        // Only allow numbers
        const numericText = text.replace(/[^0-9]/g, '');
        
        // Check min/max constraints
        const numValue = parseInt(numericText) || 0;
        
        if (minValue !== undefined && numValue < minValue && numericText !== '') {
            return;
        }
        
        if (maxValue !== undefined && numValue > maxValue && numericText !== '') {
            return;
        }
        
        onChangeText(numericText);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={[styles.input, error && styles.inputError]}
                value={value}
                onChangeText={handleTextChange}
                placeholder={placeholder}
                placeholderTextColor="#aaa"
                keyboardType="numeric"
                autoCorrect={false}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 4,
    },
    label: {
        fontSize: 15,
        fontWeight: '600',
        color: '#222',
        marginBottom: 6,
    },
    input: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 16,
        color: '#222',
        backgroundColor: '#fafafa',
    },
    inputError: {
        borderColor: '#ff6b6b',
    },
    errorText: {
        fontSize: 12,
        color: '#ff6b6b',
        marginTop: 4,
    },
}); 