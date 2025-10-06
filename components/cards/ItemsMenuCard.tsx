import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export type RentedItem = {
    id: string;
    name: string;
    image: string;
    priceDay: number;
    rentedOn: string;
    returnDate: string;
    status: 'active' | 'pending' | 'completed';
    seller: {
        name: string;
        avatar: string;
        rating: number;
    };
    totalAmount?: number;
    daysLeft?: number;
};

interface ItemsMenuCardProps {
    item: RentedItem;
    onMessage?: (itemId: string) => void;
    onExtend?: (itemId: string) => void;
    onRate?: (itemId: string) => void;
}

export const ItemsMenuCard: React.FC<ItemsMenuCardProps> = ({ 
    item, 
    onMessage, 
    onExtend, 
    onRate 
}) => {
    const { t } = useTranslation();
    
    // Calculate the number of days
    const startDate = new Date(item.rentedOn);
    const endDate = new Date(item.returnDate);
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const totalAmount = item.totalAmount || (item.priceDay * days);
    
    // Calculate days left for active items
    const today = new Date();
    const daysLeft = item.status === 'active' 
        ? Math.max(0, Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)))
        : undefined;

    // Format dates
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric', 
            year: 'numeric' 
        });
    };

    const getStatusStyle = () => {
        switch (item.status) {
            case 'active':
                return { backgroundColor: '#e8f5e8', color: '#2e7d32' };
            case 'pending':
                return { backgroundColor: '#fff3e0', color: '#f57c00' };
            case 'completed':
                return { backgroundColor: '#f5f5f5', color: '#666666' };
            default:
                return { backgroundColor: '#f5f5f5', color: '#666666' };
        }
    };

    const statusStyle = getStatusStyle();

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
                {/* Status Badge */}
                <View style={[styles.statusBadge, { backgroundColor: statusStyle.backgroundColor }]}>
                    <Text style={[styles.statusText, { color: statusStyle.color }]}>
                        {t(`items.${item.status}`)}
                    </Text>
                </View>

                {/* Item Name */}
                <Text style={styles.itemName}>{item.name}</Text>

                {/* Seller Info */}
                <View style={styles.sellerInfo}>
                    <Image 
                        source={{ uri: item.seller.avatar }}
                        style={styles.sellerAvatar}
                        resizeMode="cover"
                    />
                    <View style={styles.sellerDetails}>
                        <Text style={styles.sellerName}>{item.seller.name}</Text>
                        <Text style={styles.sellerRating}>★ {item.seller.rating}</Text>
                    </View>
                </View>

                {/* Dates */}
                <Text style={styles.dates}>
                    {formatDate(item.rentedOn)} - {formatDate(item.returnDate)}
                </Text>

                {/* Price and Days Left */}
                <View style={styles.priceRow}>
                    <Text style={styles.price}>${totalAmount}</Text>
                    {item.status === 'active' && daysLeft !== undefined && (
                        <Text style={styles.daysLeft}>
                            {t('items.daysLeft', { days: daysLeft })}
                        </Text>
                    )}
                </View>

                {/* Action Buttons */}
                <View style={styles.actionButtons}>
                    <TouchableOpacity 
                        style={styles.actionButton}
                        onPress={() => onMessage?.(item.id)}
                    >
                        <Text style={styles.actionButtonText}>💬</Text>
                        <Text style={styles.actionButtonLabel}>{t('items.message')}</Text>
                    </TouchableOpacity>

                    {item.status === 'active' && (
                        <TouchableOpacity 
                            style={styles.actionButton}
                            onPress={() => onExtend?.(item.id)}
                        >
                            <Text style={styles.actionButtonText}>⏰</Text>
                            <Text style={styles.actionButtonLabel}>{t('items.extend')}</Text>
                        </TouchableOpacity>
                    )}

                    {item.status === 'completed' && (
                        <TouchableOpacity 
                            style={styles.actionButton}
                            onPress={() => onRate?.(item.id)}
                        >
                            <Text style={styles.actionButtonText}>⭐</Text>
                            <Text style={styles.actionButtonLabel}>{t('items.rate')}</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    itemCard: {
        flex: 1,
        flexDirection: 'row',
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
        marginBottom: 12,
    },
    itemImageContainer: {
        width: 80,
        height: 80,
        marginRight: 12,
    },
    itemImage: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    itemInfo: {
        flex: 1,
        justifyContent: 'space-between',
    },
    statusBadge: {
        alignSelf: 'flex-start',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        marginBottom: 8,
    },
    statusText: {
        fontSize: 10,
        fontWeight: '600',
        textTransform: 'uppercase',
    },
    itemName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    sellerInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    sellerAvatar: {
        width: 20,
        height: 20,
        borderRadius: 10,
        marginRight: 6,
    },
    sellerDetails: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    sellerName: {
        fontSize: 12,
        color: '#666',
        marginRight: 4,
    },
    sellerRating: {
        fontSize: 12,
        color: '#666',
    },
    dates: {
        fontSize: 12,
        color: '#666',
        marginBottom: 8,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    price: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    daysLeft: {
        fontSize: 12,
        color: '#666',
    },
    actionButtons: {
        flexDirection: 'row',
        gap: 8,
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f8f9fa',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#e9ecef',
    },
    actionButtonText: {
        fontSize: 12,
        marginRight: 4,
    },
    actionButtonLabel: {
        fontSize: 12,
        color: '#666',
        fontWeight: '500',
    },
}); 