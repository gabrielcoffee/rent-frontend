import EarnedCard from '@/components/cards/EarnedCard';
import { ItemsMenuCard, RentedItem } from '@/components/cards/ItemsMenuCard';
import ItemTabs from '@/components/items/ItemTabs';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type TabType = 'rentals' | 'listings';

export default function ItemsPage() {
    const { t } = useTranslation();
    const [currentTab, setCurrentTab] = useState<TabType>('rentals');

    // Example items - replace with real data
    const items: RentedItem[] = [
        {
            id: '1',
            name: 'Canon EOS R5 Camera',
            image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000',
            priceDay: 45,
            rentedOn: '2024-11-15',
            returnDate: '2024-11-18',
            status: 'active',
            seller: {
                name: 'Sarah Johnson',
                avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?q=80&w=100',
                rating: 4.8
            },
            totalAmount: 135
        },
        {
            id: '2',
            name: 'MacBook Pro 16-inch',
            image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1000',
            priceDay: 80,
            rentedOn: '2024-11-20',
            returnDate: '2024-11-27',
            status: 'pending',
            seller: {
                name: 'Mike Chen',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100',
                rating: 4.9
            },
            totalAmount: 560
        },
        {
            id: '3',
            name: 'PlayStation 5',
            image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=1000',
            priceDay: 25,
            rentedOn: '2024-11-01',
            returnDate: '2024-11-06',
            status: 'completed',
            seller: {
                name: 'Alex Rodriguez',
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=100',
                rating: 4.7
            },
            totalAmount: 125
        },
        {
            id: '4',
            name: 'DJ Equipment Set',
            image: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?q=80&w=1000',
            priceDay: 75,
            rentedOn: '2024-11-10',
            returnDate: '2024-11-15',
            status: 'completed',
            seller: {
                name: 'Emma Wilson',
                avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100',
                rating: 4.6
            },
            totalAmount: 375
        },
        {
            id: '5',
            name: 'Professional Drone',
            image: 'https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?q=80&w=1000',
            priceDay: 100,
            rentedOn: '2024-11-18',
            returnDate: '2024-11-25',
            status: 'active',
            seller: {
                name: 'David Kim',
                avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100',
                rating: 4.9
            },
            totalAmount: 700
        }
    ];

    const handleTabChange = (tab: TabType) => {
        setCurrentTab(tab);
    };

    const handleMessage = (itemId: string) => {
        // Handle message action
        console.log('Message item:', itemId);
    };

    const handleExtend = (itemId: string) => {
        // Handle extend action
        console.log('Extend item:', itemId);
    };

    const handleRate = (itemId: string) => {
        // Handle rate action
        console.log('Rate item:', itemId);
    };

    return (
        <SafeAreaView style={styles.container} edges={['top', 'right', 'left']}>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                {/* Header Section */}
                <View style={styles.headerSection}>
                    <Text style={styles.title}>{t('items.title')}</Text>
                    <Text style={styles.subtitle}>{t('items.subtitle')}</Text>
                </View>

                {/* Summary Cards */}
                <View style={styles.cardsContainer}>
                    <EarnedCard totalEarned={425} activeListings={1} />
                </View>

                {/* Tabs */}
                <ItemTabs currentTab={currentTab} onTabChange={handleTabChange} />

                {/* Content Section */}
                <View style={styles.contentSection}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>
                            {currentTab === 'rentals' 
                                ? t('items.itemsYouRenting') 
                                : t('items.itemsYouListing')
                            }
                        </Text>
                        <Text style={styles.itemCount}>{items.length} items</Text>
                    </View>

                    {/* Items List */}
                    <View style={styles.itemsContainer}>
                        {items.map((item) => (
                            <ItemsMenuCard 
                                key={item.id} 
                                item={item}
                                onMessage={handleMessage}
                                onExtend={handleExtend}
                                onRate={handleRate}
                            />
                        ))}
                    </View>
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
    headerSection: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#222',
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
    },
    cardsContainer: {
        flexDirection: 'row',
        paddingHorizontal: 12,
        paddingVertical: 16,
    },
    contentSection: {
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#222',
    },
    itemCount: {
        fontSize: 14,
        color: '#666',
    },
    itemsContainer: {
        gap: 12,
    },
});
