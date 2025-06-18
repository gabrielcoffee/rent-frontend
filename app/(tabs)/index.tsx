import CategoriesGrid from '@/components/CategoriesGrid';
import ItemGrid from '@/components/ItemGrid';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Category = {
    id: string;
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
};

const CATEGORIES: Category[] = [
    { id: 'sports', label: 'Sports', icon: 'basketball-outline' },
    { id: 'tech', label: 'Tech', icon: 'laptop-outline' },
    { id: 'creative', label: 'Creative', icon: 'camera-outline' },
    { id: 'house', label: 'House', icon: 'home-outline' },
    { id: 'tools', label: 'Tools', icon: 'construct-outline' },
    { id: 'music', label: 'Music', icon: 'musical-notes-outline' },
    { id: 'outdoor', label: 'Outdoor', icon: 'leaf-outline' },
    { id: 'fitness', label: 'Fitness', icon: 'fitness-outline' },
    { id: 'gaming', label: 'Gaming', icon: 'game-controller-outline' },
    { id: 'party', label: 'Party', icon: 'wine-outline' },
    { id: 'camping', label: 'Camping', icon: 'compass-outline' },
    { id: 'photography', label: 'Photo', icon: 'aperture-outline' },
];

const exampleItems = [
    {
        id: '1',
        name: 'Canon EOS R5 Camera',
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32',
        priceDay: 45,
        distance: 2.5
    },
    {
        id: '2',
        name: 'Electric Mountain Bike',
        image: 'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91',
        priceDay: 30,
        distance: 1.8
    },
    {
        id: '3',
        name: 'DJI Mavic Air 2',
        image: 'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9',
        priceDay: 55,
        distance: 3.2
    },
    {
        id: '4',
        name: 'MacBook Pro 16"',
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
        priceDay: 40,
        distance: 4.1
    },
    {
        id: '5',
        name: 'Professional Drums Set',
        image: 'https://images.unsplash.com/photo-1519892300165-cb5542fb47c7',
        priceDay: 35,
        distance: 2.9
    },
    {
        id: '6',
        name: 'Gaming PC Setup',
        image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f7',
        priceDay: 50,
        distance: 1.5
    }
];

export default function HomePage() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const handleItemPress = (itemId: string) => {
        // TODO: Navigate to item details
        console.log('Item pressed:', itemId);
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'right', 'left']}>
            <StatusBar style="dark" />
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.locationContainer}>
                    <Ionicons name="map-outline" size={28} color="#333" />
                    <Text style={styles.locationText}>Curitiba, PR</Text>
                </View>
                <TouchableOpacity>
                    <Ionicons name="notifications-outline" size={28} color="#333" />
                </TouchableOpacity>
            </View>

            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Categories */}
                <CategoriesGrid
                    categories={CATEGORIES}
                    selectedCategory={selectedCategory}
                    onCategoryPress={(categoryId) => setSelectedCategory(
                        selectedCategory === categoryId ? null : categoryId
                    )}
                />

                {/* Item Grids */}
                <View style={styles.gridsContainer}>
                    <ItemGrid 
                        title="Near You" 
                        items={exampleItems} 
                        onItemPress={handleItemPress}
                    />
                    
                    <ItemGrid 
                        title="Recommended" 
                        items={exampleItems} 
                        onItemPress={handleItemPress}
                    />
                    
                    <ItemGrid 
                        title="Popular" 
                        items={exampleItems} 
                        onItemPress={handleItemPress}
                    />
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
    scrollView: {
        flex: 1,
    },
    header: {
        height: 60,
        paddingHorizontal: 16,
        backgroundColor: '#f5f5f5',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
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
    gridsContainer: {
        paddingBottom: 16,
    },
});
