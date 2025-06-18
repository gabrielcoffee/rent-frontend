import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ItemRentedCard, RentedItem } from '../../components/ItemRentedCard';

type Tab = 'Rented' | 'My Items' | 'Favorites';

export default function ItemsPage() {
    const [selectedTab, setSelectedTab] = useState<Tab>('Rented');

    const tabs: Tab[] = ['Rented', 'My Items', 'Favorites'];

    // Example items - replace with real data
    const items: RentedItem[] = [
        {
            id: '1',
            name: 'Sony Camera XM1',
            image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000',
            priceDay: 50,
            rentedOn: '2024-03-15',
            returnDate: '2024-03-20'
        },
        {
            id: '2',
            name: 'DJ Equipment Set',
            image: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?q=80&w=1000',
            priceDay: 75,
            rentedOn: '2024-03-10',
            returnDate: '2024-03-15'
        },
        {
            id: '3',
            name: 'Professional Drone',
            image: 'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?q=80&w=1000',
            priceDay: 100,
            rentedOn: '2024-03-18',
            returnDate: '2024-03-25'
        },
        {
            id: '4',
            name: 'Gaming Console PS5',
            image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=1000',
            priceDay: 30,
            rentedOn: '2024-03-16',
            returnDate: '2024-03-23'
        },
        {
            id: '5',
            name: 'Professional Microphone',
            image: 'https://images.unsplash.com/photo-1589903308904-1010c2294adc?q=80&w=1000',
            priceDay: 25,
            rentedOn: '2024-03-12',
            returnDate: '2024-03-17'
        },
        {
            id: '6',
            name: 'GoPro Camera',
            image: 'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1000',
            priceDay: 40,
            rentedOn: '2024-03-17',
            returnDate: '2024-03-24'
        },
        {
            id: '7',
            name: 'VR Headset',
            image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=1000',
            priceDay: 45,
            rentedOn: '2024-03-19',
            returnDate: '2024-03-26'
        },
        {
            id: '8',
            name: 'Professional Lighting Kit',
            image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=1000',
            priceDay: 60,
            rentedOn: '2024-03-13',
            returnDate: '2024-03-18'
        },
        {
            id: '9',
            name: 'Electric Scooter',
            image: 'https://images.unsplash.com/photo-1601004890684-d8cbf643f5f2?q=80&w=1000',
            priceDay: 35,
            rentedOn: '2024-03-16',
            returnDate: '2024-03-21'
        },
        {
            id: '10',
            name: 'Portable Projector',
            image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?q=80&w=1000',
            priceDay: 55,
            rentedOn: '2024-03-18',
            returnDate: '2024-03-25'
        }
    ];

    return (
        <SafeAreaView style={styles.container} edges={['top', 'right', 'left']}>
            {/* Fixed Header */}
            <View style={styles.header}>
                {/* Tabs */}
                <View style={styles.tabsContainer}>
                    {tabs.map((tab) => (
                        <TouchableOpacity
                            key={tab}
                            style={[
                                styles.tab,
                                selectedTab === tab && styles.selectedTab
                            ]}
                            onPress={() => setSelectedTab(tab)}
                        >
                            <Text style={[
                                styles.tabText,
                                selectedTab === tab && styles.selectedTabText
                            ]}>
                                {tab}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Search Icons */}
                <View style={styles.searchIcons}>
                    <TouchableOpacity style={styles.iconButton}>
                        <Ionicons name="search-outline" size={24} color="#333" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}>
                        <Ionicons name="calendar-outline" size={24} color="#333" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}>
                        <Ionicons name="filter-outline" size={24} color="#333" />
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView style={styles.scrollView}>
                <View style={styles.itemsContainer}>
                    {items.map((item) => (
                        <ItemRentedCard key={item.id} item={item} />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        backgroundColor: '#f5f5f5',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        zIndex: 1,
    },
    tabsContainer: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'transparent',
    },
    selectedTab: {
        borderBottomColor: '#8B0000',
    },
    tabText: {
        fontSize: 16,
        color: '#666',
        fontWeight: '500',
    },
    selectedTabText: {
        color: '#8B0000',
        fontWeight: '600',
    },
    searchIcons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingHorizontal: 16,
        paddingVertical: 12,
        gap: 16,
    },
    iconButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },
    scrollView: {
        flex: 1,
    },
    itemsContainer: {
        padding: 16,
        gap: 16,
    },
});
