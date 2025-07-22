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

export default function ItemCard({ itemName, itemImage, priceDay, distance, onPress }: Props) {
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
                        <Ionicons name="location-outline" size={15} color="#666" />
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
        marginHorizontal: 6,
        marginTop: 8,
        marginBottom: 18,
        width: 160,
        shadowColor: '#000',
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 5,
    },
    itemImage: {
        width: '100%',
        height: 120,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    infoContainer: {
        padding: 12,
    },
    itemName: {
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 4,
        color: '#333',
    },
    detailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    priceText: {
        fontSize: 13,
        color: '#2ea682',
        fontWeight: '500',
    },
    distanceText: {
        fontSize: 13,
        color: '#666',
    },
});
