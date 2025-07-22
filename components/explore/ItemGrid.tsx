import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import RentableItemCard from './ItemCard';

type Item = {
    id: string;
    name: string;
    image: string;
    priceDay: number;
    distance: number;
}

type Props = {
    title: string;
    items: Item[];
    onItemPress: (itemId: string) => void;
}

export default function ItemGrid({ title, items, onItemPress }: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title}</Text>
            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                {items.map((item) => (
                    <RentableItemCard
                        key={item.id}
                        itemName={item.name}
                        itemImage={item.image}
                        priceDay={item.priceDay}
                        distance={item.distance}
                        onPress={() => onItemPress(item.id)}
                    />
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
        paddingLeft: 16,
    },
    scrollContent: {
        padding: 8,
    },
}); 