import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Category = {
    id: string;
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
};

type Props = {
    categories: Category[];
    selectedCategory: string | null;
    onCategoryPress: (categoryId: string) => void;
};

export default function CategoriesGridRegular({ categories, selectedCategory, onCategoryPress }: Props) {
    // Split categories into two rows
    const firstRowCategories = categories.slice(0, 3);
    const secondRowCategories = categories.slice(3, 6);

    return (
        <View style={styles.container}>
            <View style={styles.gridContainer}>
                {/* First Row */}
                <View style={styles.row}>
                    {firstRowCategories.map(category => (
                        <TouchableOpacity
                            key={category.id}
                            style={[
                                styles.categoryButton,
                                selectedCategory === category.id && styles.selectedCategory
                            ]}
                            onPress={() => onCategoryPress(category.id)}
                        >
                            <Ionicons
                                name={category.icon}
                                size={24}
                                color={selectedCategory === category.id ? '#fff' : '#333'}
                            />
                            <Text style={[
                                styles.categoryLabel,
                                selectedCategory === category.id && styles.selectedLabel
                            ]}>
                                {category.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Second Row */}
                <View style={styles.row}>
                    {secondRowCategories.map(category => (
                        <TouchableOpacity
                            key={category.id}
                            style={[
                                styles.categoryButton,
                                selectedCategory === category.id && styles.selectedCategory
                            ]}
                            onPress={() => onCategoryPress(category.id)}
                        >
                            <Ionicons
                                name={category.icon}
                                size={24}
                                color={selectedCategory === category.id ? '#fff' : '#333'}
                            />
                            <Text style={[
                                styles.categoryLabel,
                                selectedCategory === category.id && styles.selectedLabel
                            ]}>
                                {category.label}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 24,
    },
    gridContainer: {
        paddingHorizontal: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    categoryButton: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginHorizontal: 6,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    selectedCategory: {
        backgroundColor: '#2ea682',
        borderColor: '#2ea682',
    },
    categoryLabel: {
        marginTop: 8,
        fontSize: 14,
        color: '#333',
        textAlign: 'center',
    },
    selectedLabel: {
        color: '#fff',
    },
}); 