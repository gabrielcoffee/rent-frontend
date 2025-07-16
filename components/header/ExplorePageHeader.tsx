import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
    location: string;
    onNotificationPress: () => void;
};

export default function ExplorePageHeader({ location, onNotificationPress }: Props) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.locationContainer}>
                    <Ionicons name="map-outline" size={28} color="#333" />
                    <Text style={styles.locationText}>{location}</Text>
                </View>
                <TouchableOpacity onPress={onNotificationPress}>
                    <Ionicons name="notifications-outline" size={28} color="#333" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },
    header: {
        height: 60,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationText: {
        color: '#333',
        marginLeft: 8,
        fontSize: 16,
        fontWeight: '500',
    },
}); 