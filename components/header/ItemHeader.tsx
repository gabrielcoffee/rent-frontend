import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

type Props = {
    isScrolled: boolean;
    headerOpacity: number;
};

export default function ItemHeader({ isScrolled, headerOpacity }: Props) {
    const router = useRouter();

    return (
        <View style={[
            styles.header, 
            { backgroundColor: `rgba(255, 255, 255, ${headerOpacity})` },
        ]}>
            <TouchableOpacity 
                style={[styles.headerButton, isScrolled && styles.headerButtonScrolled]} 
                onPress={() => router.back()}
            >
                <Ionicons name="arrow-back" size={24} color={isScrolled ? "#333" : "#fff"} />
            </TouchableOpacity>
            <View style={styles.headerRight}>
                <TouchableOpacity style={[styles.headerButton, isScrolled && styles.headerButtonScrolled]}>
                    <Ionicons name="heart-outline" size={24} color={isScrolled ? "#333" : "#fff"} />
                </TouchableOpacity>
                <TouchableOpacity style={[styles.headerButton, isScrolled && styles.headerButtonScrolled]}>
                    <Ionicons name="share-outline" size={24} color={isScrolled ? "#333" : "#fff"} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 60,
        height: 115,
    },
    headerButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerButtonScrolled: {
        backgroundColor: 'transparent',
    },
    headerRight: {
        flexDirection: 'row',
        gap: 8,
    },
}); 