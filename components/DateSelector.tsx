import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface DateSelectorProps {
    value: Date | null;
    onDateChange: (date: Date) => void;
    placeholder?: string;
    label?: string;
    disabled?: boolean;
}

export default function DateSelector({ 
    value, 
    onDateChange, 
    placeholder = "Select date",
    label,
    disabled = false 
}: DateSelectorProps) {
    const [showPicker, setShowPicker] = useState(false);

    const handlePress = () => {
        if (!disabled) {
            setShowPicker(true);
        }
    };

    const handleDateChange = (event: any, selectedDate?: Date) => {
        setShowPicker(false);
        if (selectedDate) {
            onDateChange(selectedDate);
        }
    };

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <View style={styles.container}>
            {label && <Text style={styles.label}>{label}</Text>}
            <TouchableOpacity 
                style={[
                    styles.inputContainer, 
                    disabled && styles.disabled,
                    !value && styles.placeholder
                ]} 
                onPress={handlePress}
                disabled={disabled}
            >
                <Text style={[
                    styles.dateText, 
                    !value && styles.placeholderText
                ]}>
                    {value ? formatDate(value) : placeholder}
                </Text>
                <Ionicons 
                    name="calendar-outline" 
                    size={20} 
                    color={disabled ? "#ccc" : "#666"} 
                />
            </TouchableOpacity>

            {showPicker && (
                <DateTimePicker
                    value={value || new Date()}
                    mode="date"
                    display="default"
                    onChange={handleDateChange}
                    minimumDate={new Date()}
                />
            )}
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
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 12,
        backgroundColor: '#fafafa',
    },
    disabled: {
        backgroundColor: '#f5f5f5',
        borderColor: '#e0e0e0',
    },
    placeholder: {
        borderColor: '#e0e0e0',
    },
    dateText: {
        fontSize: 16,
        color: '#222',
        flex: 1,
    },
    placeholderText: {
        color: '#aaa',
    },
}); 