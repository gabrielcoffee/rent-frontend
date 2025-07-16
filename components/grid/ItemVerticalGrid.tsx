import React from 'react';
import { StyleSheet, View } from 'react-native';
import ItemSearchCard from './ItemSearchCard';

type Item = {
    id: string;
    name: string;
    image: string;
    priceDay: number;
    distance: number;
};

type Props = {
    items: Item[];
    onItemPress: (itemId: string) => void;
};

export default function ItemVerticalGrid({ items, onItemPress }: Props) {
    return (
        <View style={styles.container}>
            <View style={styles.gridContent}>
                {items.map((item) => (
                    <View key={item.id} style={styles.cardContainer}>
                        <ItemSearchCard
                            itemName={item.name}
                            itemImage={item.image}
                            priceDay={item.priceDay}
                            distance={item.distance}
                            onPress={() => onItemPress(item.id)}
                        />
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gridContent: {
        paddingHorizontal: 16,
        paddingBottom: 16,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    cardContainer: {
        width: '50%',
        paddingHorizontal: 6,
    },
}); 