import CategoriesGrid from '@/components/explore/CategoriesGrid';
import ExploreHeader from '@/components/explore/ExploreHeader';
import ItemGrid from '@/components/explore/ItemGrid';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Category = {
    id: string;
    label: string;
    emoji: string;
};

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
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const { t } = useTranslation();

    const CATEGORIES: Category[] = [
        { id: 'sports', label: t('categories.sports'), emoji: '⚽' },
        { id: 'tech', label: t('categories.tech'), emoji: '💻' },
        { id: 'creative', label: t('categories.creative'), emoji: '🎨' },
        { id: 'house', label: t('categories.house'), emoji: '🏠' },
        { id: 'tools', label: t('categories.tools'), emoji: '🔧' },
        { id: 'music', label: t('categories.music'), emoji: '🎵' },
        { id: 'outdoor', label: t('categories.outdoor'), emoji: '🌲' },
        { id: 'fitness', label: t('categories.fitness'), emoji: '💪' },
        { id: 'gaming', label: t('categories.gaming'), emoji: '🎮' },
        { id: 'party', label: t('categories.party'), emoji: '🎉' },
        { id: 'camping', label: t('categories.camping'), emoji: '⛺' },
        { id: 'photography', label: t('categories.photography'), emoji: '📸' },
    ];

    const handleCategoryPress = (categoryId: string) => {
        setSelectedCategories(prev => {
            if (prev.includes(categoryId)) {
                return prev.filter(id => id !== categoryId);
            } else {
                return [...prev, categoryId];
            }
        });
    };

    const handleItemPress = (itemId: string) => {
        router.navigate(`/(item)/${itemId}`);
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'right', 'left']}>
            <ExploreHeader />
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Categories */}
                <CategoriesGrid
                    categories={CATEGORIES}
                    selectedCategories={selectedCategories}
                    onCategoryPress={handleCategoryPress}
                />
                {/* Item Grids */}
                <View style={styles.gridsContainer}>
                    <ItemGrid 
                        title={t('explore.nearYou')} 
                        items={exampleItems} 
                        onItemPress={handleItemPress}
                    />
                    <ItemGrid 
                        title={t('explore.recommended')} 
                        items={exampleItems} 
                        onItemPress={handleItemPress}
                    />
                    <ItemGrid 
                        title={t('explore.popular')} 
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
