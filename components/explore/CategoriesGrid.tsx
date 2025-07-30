import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import CategoryButton from './CategoryButton';

type Category = {
    id: string;
    label: string;
    emoji: string;
};

type Props = {
    categories: Category[];
    selectedCategories: string[];
    onCategoryPress: (categoryId: string) => void;
};

export default function CategoriesGrid({ categories, selectedCategories, onCategoryPress } : Props) {
    const { t } = useTranslation();
    
    // Split categories into two rows
    const firstRowCategories = categories.slice(0, 6);
    const secondRowCategories = categories.slice(6);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{t('home.categories')}</Text>
            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.categoriesWrapper}>

                    {/* First Row */}
                    <View style={styles.categoriesRow}>
                        {firstRowCategories.map(category => (
                            <CategoryButton
                                key={category.id}
                                emoji={category.emoji}
                                label={category.label}
                                isSelected={selectedCategories.includes(category.id)}
                                onPress={() => onCategoryPress(category.id)}
                            />
                        ))}
                    </View>

                    {/* Second Row */}
                    <View style={[styles.categoriesRow, styles.secondRow]}>
                        {secondRowCategories.map(category => (
                            <CategoryButton
                                key={category.id}
                                emoji={category.emoji}
                                label={category.label}
                                isSelected={selectedCategories.includes(category.id)}
                                onPress={() => onCategoryPress(category.id)}
                            />
                        ))}
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
        marginBottom: 24,
        paddingHorizontal: 16,
        marginTop: 24,
    },
    scrollContent: {
        paddingHorizontal: 8,
    },
    categoriesWrapper: {
        paddingVertical: 0,
    },
    categoriesRow: {
        flexDirection: 'row',
        paddingHorizontal: 8,
        marginBottom: 4,
    },
    secondRow: {
        paddingLeft: 55, // Adjusted to center between first and second items
    },
}); 