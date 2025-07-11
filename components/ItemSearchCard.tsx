import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
    itemName: string;
    itemImage: string;
    priceDay: number;
    distance: number;
    onPress: () => void;
}

export default function ItemSearchCard({ itemName, itemImage, priceDay, distance, onPress }: Props) {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Image
                source={{ uri: itemImage }}
                style={styles.itemImage}
            />
            <View style={styles.infoContainer}>
                <Text style={styles.itemName} numberOfLines={1}>{itemName}</Text>
                <View style={styles.detailsContainer}>
                    <Text style={styles.priceText}>${priceDay}/day</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="location-outline" size={15} color="#666" style={{ marginRight: 3 }} />
                        <Text style={styles.distanceText}>{distance}km</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    itemImage: {
        width: '100%',
        height: 140,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    infoContainer: {
        padding: 12,
    },
    itemName: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 6,
        color: '#333',
    },
    detailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    priceText: {
        fontSize: 14,
        color: '#2ea682',
        fontWeight: '500',
    },
    distanceText: {
        fontSize: 13,
        color: '#666',
    },
}); 