import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import CategoriesGridRegular from '../../components/CategoriesGridRegular';
import ItemVerticalGrid from '../../components/ItemVerticalGrid';

// Mock data for categories
const categories = [
    { id: '1', label: 'Electronics', icon: 'phone-portrait' as const },
    { id: '2', label: 'Tools', icon: 'construct' as const },
    { id: '3', label: 'Sports', icon: 'basketball' as const },
    { id: '4', label: 'Party', icon: 'wine' as const },
    { id: '5', label: 'Camping', icon: 'compass' as const },
    { id: '6', label: 'Books', icon: 'book' as const },
];

// Mock data for items
const items = [
    {
        id: '1',
        name: 'Professional Camera',
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32',
        priceDay: 50,
        distance: 2.5,
    },
    {
        id: '2',
        name: 'Mountain Bike',
        image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e',
        priceDay: 30,
        distance: 1.8,
    },
    {
        id: '3',
        name: 'Camping Tent',
        image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4',
        priceDay: 25,
        distance: 3.2,
    },
    {
        id: '4',
        name: 'DJ Equipment',
        image: 'https://images.unsplash.com/photo-1511379938547-c1f69419868d',
        priceDay: 100,
        distance: 4.0,
    },
    {
        id: '5',
        name: 'Gaming Console',
        image: 'https://images.unsplash.com/photo-1486401899868-0e435ed85128',
        priceDay: 20,
        distance: 1.5,
    },
    {
        id: '6',
        name: 'Professional Drone',
        image: 'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9',
        priceDay: 75,
        distance: 2.8,
    },
    {
        id: '7',
        name: 'Electric Scooter',
        image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888',
        priceDay: 15,
        distance: 1.2,
    },
    {
        id: '8',
        name: 'Projector',
        image: 'https://images.unsplash.com/photo-1563297007-0686b7003af7',
        priceDay: 40,
        distance: 3.5,
    },
    {
        id: '9',
        name: 'VR Headset',
        image: 'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac',
        priceDay: 35,
        distance: 2.1,
    },
    {
        id: '10',
        name: 'Electric Guitar',
        image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1',
        priceDay: 45,
        distance: 1.7,
    },
    {
        id: '11',
        name: 'Telescope',
        image: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679',
        priceDay: 60,
        distance: 4.2,
    },
    {
        id: '12',
        name: 'Kayak',
        image: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12',
        priceDay: 55,
        distance: 3.8,
    },
];

export default function SearchPage() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const handleItemPress = (itemId: string) => {
        router.push(`/item/${itemId}`);
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Search Bar and Filter */}
            <View style={styles.searchContainer}>
                <View style={styles.searchInputContainer}>
                    <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search for items..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
                <TouchableOpacity style={styles.filterButton}>
                    <Ionicons name="options-outline" size={20} color="#666" />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollContainer}>
                {/* Categories Grid */}
                <CategoriesGridRegular
                    categories={categories}
                    selectedCategory={selectedCategory}
                    onCategoryPress={setSelectedCategory}
                />

                {/* Items Grid */}
                <ItemVerticalGrid
                    items={items}
                    onItemPress={handleItemPress}
                />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    scrollContainer: {
        flex: 1,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 16,
        marginTop: 16,
        marginBottom: 32,
        gap: 12,
    },
    filterButton: {
        width: 48,
        height: 48,
        backgroundColor: '#fff',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    searchInputContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 12,
        borderRadius: 12,
        height: 48,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    searchIcon: {
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
});
