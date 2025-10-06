import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type TabType = 'rentals' | 'listings';

interface ItemTabsProps {
    currentTab: TabType;
    onTabChange: (tab: TabType) => void;
}

export default function ItemTabs({ currentTab, onTabChange }: ItemTabsProps) {
    const { t } = useTranslation();

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[
                    styles.tab,
                    styles.leftTab,
                    currentTab === 'rentals' && styles.selectedTab
                ]}
                onPress={() => onTabChange('rentals')}
            >
                <Text style={[
                    styles.tabText,
                    currentTab === 'rentals' && styles.selectedTabText
                ]}>
                    {t('items.myRentals')}
                </Text>
            </TouchableOpacity>
            
            <TouchableOpacity
                style={[
                    styles.tab,
                    styles.rightTab,
                    currentTab === 'listings' && styles.selectedTab
                ]}
                onPress={() => onTabChange('listings')}
            >
                <Text style={[
                    styles.tabText,
                    currentTab === 'listings' && styles.selectedTabText
                ]}>
                    {t('items.myListings')}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 4,
        marginHorizontal: 16,
        marginVertical: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },
    tab: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    leftTab: {
        borderTopLeftRadius: 6,
        borderBottomLeftRadius: 6,
    },
    rightTab: {
        borderTopRightRadius: 6,
        borderBottomRightRadius: 6,
    },
    selectedTab: {
        backgroundColor: '#333',
    },
    tabText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#666',
    },
    selectedTabText: {
        color: '#fff',
        fontWeight: '600',
    },
}); 