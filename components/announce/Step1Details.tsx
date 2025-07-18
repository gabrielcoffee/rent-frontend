import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import UpwardsMenu from '../modals/UpwardsMenu';
import { CATEGORIES, CONDITIONS, Category, Condition } from './constants';

export default function Step1Details() {
    const { t } = useTranslation();
    const [categoryMenuVisible, setCategoryMenuVisible] = useState(false);
    const [conditionMenuVisible, setConditionMenuVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [selectedCondition, setSelectedCondition] = useState<Condition | null>(null);

    return (
        <ScrollView style={styles.container}>
            {/* Section Title */}
            <Text style={styles.sectionTitle}>{t('announce.step1Title', 'Item Details')}</Text>

            {/* Photos Upload Area */}
            <TouchableOpacity style={styles.photoUpload} activeOpacity={0.8}>
                <Ionicons name="cloud-upload-outline" size={32} color="#bbb" style={{ marginBottom: 6 }} />
                <Text style={styles.photoUploadText}>{t('announce.photos', 'Tap to add photos')}</Text>
                <Text style={styles.photoUploadSubtext}>{t('announce.photosLimit', 'Up to 10 photos')}</Text>
            </TouchableOpacity>

            {/* Title Input */}
            <Text style={styles.label}>{t('announce.itemName', 'Title')}</Text>
            <TextInput
                style={styles.input}
                placeholder={t('announce.itemName', 'What are you renting out?')}
                placeholderTextColor="#aaa"
            />

            {/* Description Input */}
            <Text style={styles.label}>{t('announce.description', 'Description')}</Text>
            <TextInput
                style={[styles.input, styles.textarea]}
                placeholder={t('announce.descriptionPlaceholder', 'Describe your item, its features, and any special instructions...')}
                placeholderTextColor="#aaa"
                multiline
                numberOfLines={4}
            />

            {/* Category & Condition Row */}
            <View style={styles.row}>
                <View style={{ flex: 1, marginRight: 8 }}>
                    <Text style={styles.label}>{t('announce.category', 'Category')}</Text>
                    <TouchableOpacity style={styles.selectButton} onPress={() => setCategoryMenuVisible(true)}>
                        <Text style={[styles.selectButtonText, !selectedCategory && { color: '#aaa' }]}> 
                            {selectedCategory ? `${selectedCategory.emoji} ${t(selectedCategory.label)}` : t('announce.selectCategory', 'Select Category')}
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, marginLeft: 8 }}>
                    <Text style={styles.label}>{t('announce.condition', 'Condition')}</Text>
                    <TouchableOpacity style={styles.selectButton} onPress={() => setConditionMenuVisible(true)}>
                        <Text style={[styles.selectButtonText, !selectedCondition && { color: '#aaa' }]}> 
                            {selectedCondition ? `${selectedCondition.emoji} ${t(selectedCondition.label)}` : t('announce.condition', 'Select condition')}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Category UpwardsMenu */}
            <UpwardsMenu<Category>
                visible={categoryMenuVisible}
                onClose={() => setCategoryMenuVisible(false)}
                onSelect={(item: Category) => setSelectedCategory(item)}
                title={t('announce.category', 'announce.category')}
                items={CATEGORIES}
                selectedId={selectedCategory?.id || null}
                renderItem={(item: Category, isSelected: boolean) => (
                    <View style={[styles.menuItem, isSelected && styles.selectedMenuItem]}>
                        <Text style={styles.menuItemText}>{item.emoji} {t(item.label)}</Text>
                        {isSelected && <Ionicons name="checkmark" size={18} color="#3a5d47" />}
                    </View>
                )}
            />

            {/* Condition UpwardsMenu */}
            <UpwardsMenu<Condition>
                visible={conditionMenuVisible}
                onClose={() => setConditionMenuVisible(false)}
                onSelect={(item: Condition) => setSelectedCondition(item)}
                title={t('announce.condition', 'announce.condition')}
                items={CONDITIONS}
                selectedId={selectedCondition?.id || null}
                renderItem={(item: Condition, isSelected: boolean) => (
                    <View style={[styles.menuItem, isSelected && styles.selectedMenuItem]}>
                        <Text style={styles.menuItemText}>{item.emoji} {t(item.label)}</Text>
                        {isSelected && <Ionicons name="checkmark" size={18} color="#3a5d47" />}
                    </View>
                )}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#222',
        marginBottom: 18,
    },
    photoUpload: {
        borderWidth: 1.5,
        borderColor: '#ccc',
        borderStyle: 'dashed',
        borderRadius: 12,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    photoUploadText: {
        color: '#888',
        fontSize: 16,
        marginBottom: 2,
    },
    photoUploadSubtext: {
        color: '#bbb',
        fontSize: 13,
    },
    label: {
        fontSize: 15,
        fontWeight: '600',
        color: '#222',
        marginBottom: 6,
        marginTop: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 15,
        color: '#222',
        backgroundColor: '#fafafa',
        marginBottom: 10,
    },
    textarea: {
        minHeight: 80,
        textAlignVertical: 'top',
    },
    row: {
        flexDirection: 'row',
        marginTop: 8,
    },
    selectButton: {
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 10,
        backgroundColor: '#fafafa',
        alignItems: 'flex-start',
    },
    selectButtonText: {
        fontSize: 15,
        color: '#222',
        fontWeight: '500',
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 8,
        borderRadius: 8,
        marginBottom: 2,
        justifyContent: 'space-between',
    },
    selectedMenuItem: {
        backgroundColor: '#e6f4ea',
    },
    menuItemText: {
        fontSize: 16,
        color: '#222',
    },
}); 