import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export type RentedItem = {
    id: string;
    name: string;
    image: string;
    priceDay: number;
    rentedOn: string;
    returnDate: string;
};

interface ItemRentedCardProps {
    item: RentedItem;
}

export const ItemRentedCard: React.FC<ItemRentedCardProps> = ({ item }) => {
    // Calculate the number of days
    const startDate = new Date(item.rentedOn);
    const endDate = new Date(item.returnDate);
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const totalAmount = item.priceDay * days;

    return (
        <TouchableOpacity style={styles.itemCard}>
            <View style={styles.itemImageContainer}>
                <Image 
                    source={{ uri: item.image }}
                    style={styles.itemImage}
                    resizeMode="cover"
                />
            </View>
            <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.rentalDate}>Rented on {item.rentedOn}</Text>
                <Text style={styles.paymentInfo}>Paid ${totalAmount} for {days} days</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    itemCard: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 12,
        overflow: 'hidden',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },
    itemImageContainer: {
        width: 120,
        height: 120,
    },
    itemImage: {
        width: '100%',
        height: '100%',
    },
    itemInfo: {
        flex: 1,
        padding: 16,
        justifyContent: 'space-between',
    },
    itemName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    rentalDate: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    paymentInfo: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
}); 