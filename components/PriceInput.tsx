import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

interface PriceInputProps {
    value: string;
    onChangeText: (text: string) => void;
    label: string;
    placeholder?: string;
    error?: string;
}

export default function PriceInput({ 
    value, 
    onChangeText, 
    label, 
    placeholder = "0.00",
    error 
}: PriceInputProps) {
    const handleTextChange = (text: string) => {
        // Only allow numbers and decimal point
        const numericText = text.replace(/[^0-9.]/g, '');
        
        // Prevent multiple decimal points
        const parts = numericText.split('.');
        if (parts.length > 2) return;
        
        // Limit to 2 decimal places
        if (parts[1] && parts[1].length > 2) return;
        
        onChangeText(numericText);
    };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.currencySymbol}>$</Text>
                <TextInput
                    style={[styles.input, error && styles.inputError]}
                    value={value}
                    onChangeText={handleTextChange}
                    placeholder={placeholder}
                    placeholderTextColor="#aaa"
                    keyboardType="numeric"
                    autoCorrect={false}
                />
                <Text style={styles.label}>{label}</Text>
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 12,
        backgroundColor: '#fafafa',
    },
    currencySymbol: {
        fontSize: 16,
        color: '#222',
        fontWeight: '500',
        marginRight: 8,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#222',
        padding: 0,
    },
    inputError: {
        borderColor: '#ff6b6b',
    },
    label: {
        fontSize: 16,
        color: '#666',
        marginLeft: 8,
    },
    errorText: {
        fontSize: 12,
        color: '#ff6b6b',
        marginTop: 4,
        marginLeft: 4,
    },
}); 