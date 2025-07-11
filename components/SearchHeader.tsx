import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import BorderButton from './buttons/BorderButton';

type SearchHeaderProps = {
    searchQuery: string;
    onSearchChange: (text: string) => void;
    onSearch: () => void;
    onFilter: () => void;
    onRelevance: () => void;
    onMap: () => void;
};

export default function SearchHeader({
    searchQuery,
    onSearchChange,
    onSearch,
    onFilter,
    onRelevance,
    onMap
}: SearchHeaderProps) {
    const { t } = useTranslation();

    return (
        <View style={styles.container}>
            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <View style={styles.searchInputContainer}>
                   <TextInput
                        style={styles.searchInput}
                        placeholder={t('search.placeholder')}
                        value={searchQuery}
                        onChangeText={onSearchChange}
                        returnKeyType="search"         
                        onSubmitEditing={onSearch}       
                    />
                </View>
                <TouchableOpacity style={styles.searchButton} onPress={onSearch}>
                    <Ionicons name="search" size={20} color="#fff" />
                </TouchableOpacity>
            </View>

            {/* Filter Bar */}
            <View style={styles.filterContainer}>
                <View style={styles.filterButtons}>
                    <BorderButton 
                        title={t('search.filters')}
                        onPress={onFilter}
                        icon="filter-outline"
                        compact
                        style={styles.filterButton}
                    />
                    <BorderButton 
                        title={t('search.relevance')}
                        onPress={onRelevance}
                        icon="swap-vertical-outline"
                        compact
                        style={styles.filterButton}
                    />
                </View>
                <TouchableOpacity style={styles.mapButton} onPress={onMap}>
                    <Ionicons name="map-outline" size={24} color="#333" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 16,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8, // reduced margin
        gap: 12,
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
    searchButton: {
        width: 48,
        height: 48,
        backgroundColor: '#333',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    filterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    filterButtons: {
        flexDirection: 'row',
        gap: 8,
        flex: 1,
    },
    filterButton: {
        flex: 1,
        minWidth: 0,
        minHeight: 0,
        maxWidth: 120,
        maxHeight: 44,
        borderWidth: 1,
        borderColor: '#333',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    mapButton: {
        width: 44,
        height: 44,
        backgroundColor: '#fff',
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#e0e0e0',
        marginLeft: 8,
    },
}); 