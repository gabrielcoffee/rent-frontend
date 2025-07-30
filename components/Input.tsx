import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

type InputVariant = 'text' | 'textbox' | 'currency' | 'numeric';

interface InputProps {
    value: string;
    onChangeText: (text: string) => void;
    variant?: InputVariant;
    placeholder?: string;
    label?: string;
    rightText?: string;
    belowText?: string;
    error?: string;
    minValue?: number;
    maxValue?: number;
    autoCorrect?: boolean;
    keyboardType?: 'default' | 'numeric' | 'email-address' | 'phone-pad';
    maxCharacters?: number;
}

export default function Input({
    value,
    onChangeText,
    variant = 'text',
    placeholder,
    label,
    rightText,
    belowText,
    error,
    minValue,
    maxValue,
    autoCorrect = true,
    keyboardType = 'default',
    maxCharacters,
}: InputProps) {
    
    const handleTextChange = (text: string) => {
        let processedText = text;
        
        // Check character limits
        if (maxCharacters && text.length > maxCharacters) {
            return;
        }
        
        // Handle different variants
        switch (variant) {
            case 'currency':
                // Only allow numbers and decimal point
                processedText = text.replace(/[^0-9.]/g, '');
                
                // Prevent multiple decimal points
                const parts = processedText.split('.');
                if (parts.length > 2) return;
                
                // Limit to 2 decimal places
                if (parts[1] && parts[1].length > 2) return;
                break;
                
            case 'numeric':
                // Only allow numbers
                processedText = text.replace(/[^0-9]/g, '');
                
                // Check min/max constraints
                const numValue = parseInt(processedText) || 0;
                
                if (minValue !== undefined && numValue < minValue && processedText !== '') {
                    return;
                }
                
                if (maxValue !== undefined && numValue > maxValue && processedText !== '') {
                    return;
                }
                break;
                
            default:
                // For text and textbox, no special processing
                break;
        }
        
        onChangeText(processedText);
    };

    const getKeyboardType = () => {
        if (keyboardType !== 'default') return keyboardType;
        
        switch (variant) {
            case 'currency':
            case 'numeric':
                return 'numeric';
            default:
                return 'default';
        }
    };

    const getAutoCorrect = () => {
        // autoCorrect: true = corrige automaticamente palavras (ex: "teh" vira "the")
        // autoCorrect: false = não corrige automaticamente
        if (variant === 'textbox') return false; // Textbox geralmente não quer correção automática
        return autoCorrect;
    };

    const isTextbox = variant === 'textbox';

    return (
        <View style={styles.container}>
            {/* Label */}
            {label && (
                <Text style={styles.label}>{label}</Text>
            )}
            
            {/* Input Container */}
            <View style={[
                styles.inputContainer,
                variant === 'currency' && styles.currencyContainer,
                error && styles.inputError
            ]}>
                
                {/* Currency Symbol */}
                {variant === 'currency' && (
                    <Text style={styles.currencySymbol}>$</Text>
                )}
                
                {/* Text Input */}
                <TextInput
                    style={[
                        styles.input,
                        variant === 'currency' && styles.currencyInput,
                        isTextbox && styles.textarea
                    ]}
                    value={value}
                    onChangeText={handleTextChange}
                    placeholder={placeholder}
                    placeholderTextColor="#aaa"
                    keyboardType={getKeyboardType()}
                    autoCorrect={getAutoCorrect()}
                    multiline={isTextbox}
                    textAlignVertical={isTextbox ? 'top' : 'center'}
                />
                
                {/* Right Text (for currency and other variants) */}
                {rightText && (
                    <Text style={styles.rightText}>{rightText}</Text>
                )}
            </View>
            
            {/* Character count for textbox */}
            {isTextbox && maxCharacters && (
                <Text style={styles.characterCount}>
                    {value.length}/{maxCharacters}
                </Text>
            )}
            
            {/* Below Text (helper text) */}
            {belowText && (
                <Text style={styles.belowText}>{belowText}</Text>
            )}
            
            {/* Error Text */}
            {error && (
                <Text style={styles.errorText}>{error}</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    label: {
        fontSize: 15,
        fontWeight: '600',
        color: '#222',
        marginBottom: 6,
    },
    inputContainer: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        backgroundColor: '#fff',
    },
    currencyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#222',
        padding: 0,
    },
    currencyInput: {
        marginLeft: 8,
    },
    textarea: {
        minHeight: 80, // Altura mínima baseada no numberOfLines
        textAlignVertical: 'top',
        paddingTop: 0,
        paddingBottom: 0,
    },
    currencySymbol: {
        fontSize: 16,
        color: '#222',
        fontWeight: '500',
    },
    rightText: {
        fontSize: 16,
        color: '#666',
        marginLeft: 8,
    },
    characterCount: {
        fontSize: 12,
        color: '#666',
        textAlign: 'right',
        marginTop: 4,
    },
    belowText: {
        fontSize: 13,
        color: '#666',
        marginTop: 4,
        marginLeft: 4,
    },
    inputError: {
        borderColor: '#ff6b6b',
    },
    errorText: {
        fontSize: 12,
        color: '#ff6b6b',
        marginTop: 4,
        marginLeft: 4,
    },
}); 