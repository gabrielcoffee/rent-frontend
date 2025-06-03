import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const NICHES = [
    { id: 'sports', label: 'Sports', sub: ['Running', 'Golf', 'Cycling'] },
    { id: 'tech', label: 'Tech', sub: ['Laptops', 'Peripherals', 'Phones'] },
    { id: 'creative', label: 'Creative', sub: ['Cameras', 'Instruments', 'Drones'] },
    { id: 'house', label: 'House', sub: ['Tools', 'Appliances', 'Furniture'] },
];

export default function HomePage() {
    const [selectedNiche, setSelectedNiche] = useState<string | null>(null);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#25292e' }}>
            
        {/* Header */}
        <View style={styles.header}>
            <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={20} color="white" />
            <Text style={styles.locationText}>Curitiba, PR</Text>
            </View>
            <Ionicons name="notifications-outline" size={24} color="white" />
        </View>

        {/* Content */}
        <View style={styles.content}>

            {/* Niches */}
            <View style={styles.nicheRow}>
                {NICHES.map(niche => (
                    <TouchableOpacity
                    key={niche.id}
                    style={[
                        styles.nicheButton,
                        selectedNiche === niche.id && styles.nicheSelected,
                    ]}
                    onPress={() =>
                        setSelectedNiche(selectedNiche === niche.id ? null : niche.id)
                    }
                    >
                    <Text style={styles.nicheText}>{niche.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Subniches */}
            {selectedNiche && (
            <View style={styles.subnicheRow}>
                {NICHES.find(n => n.id === selectedNiche)?.sub.map(sub => (
                <View key={sub} style={styles.subnicheChip}>
                    <Text style={styles.subnicheText}>{sub}</Text>
                </View>
                ))}
            </View>
            )}
        </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    header: {
        height: 60,
        paddingHorizontal: 16,
        backgroundColor: '#1e2126',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    locationText: {
        color: 'white',
        marginLeft: 6,
        fontSize: 16,
    },
    content: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    nicheRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
        marginTop: 16
    },
    nicheButton: {
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 8,
        backgroundColor: '#3a3f47',
    },
    nicheSelected: {
        backgroundColor: '#6c5ce7',
    },
    nicheText: {
        color: 'white',
        fontSize: 14,
    },
    subnicheRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    subnicheChip: {
        paddingVertical: 4,
        paddingHorizontal: 10,
        backgroundColor: '#444',
        marginRight: 8,
        marginBottom: 8,
    },
    subnicheText: {
        color: 'white',
        fontSize: 13,
    },
});
