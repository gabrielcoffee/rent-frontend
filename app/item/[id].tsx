import ItemLocation from '@/components/ItemLocation';
import OwnerCard from '@/components/OwnerCard';
import ReviewsGrid from '@/components/ReviewsGrid';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function ItemPage() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const [isScrolled, setIsScrolled] = useState(false);
    const [headerOpacity, setHeaderOpacity] = useState(0);

    // TODO: Fetch item data using the id
    const item = {
        name: "Professional Camera",
        location: "Curitiba, PR",
        rating: 4.8,
        reviewCount: 128,
        description: "High-quality professional camera perfect for photography enthusiasts. Includes various lenses and accessories.",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000",
        owner: {
            name: "Julian Casablanca",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000",
            rating: 4.9,
            reviewCount: 256,
            rentingSince: "3 years",
            isVerified: true
        }
    };

    const handleScroll = (event: any) => {
        const scrollY = event.nativeEvent.contentOffset.y;
        const opacity = Math.min(scrollY / 100, 1);
        setHeaderOpacity(opacity);
        setIsScrolled(scrollY > 0);
    };

    return (
        <SafeAreaView style={styles.container} edges={['right', 'left']}>
            <StatusBar style="light" />
            
            {/* Header */}
            <View style={[
                styles.header, 
                { backgroundColor: `rgba(255, 255, 255, ${headerOpacity})` }
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

            <ScrollView 
                style={styles.scrollView}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                {/* Item Image */}
                <Image 
                    source={{ uri: item.image }}
                    style={styles.image}
                    resizeMode="cover"
                />

                {/* Item Info */}
                <View style={styles.infoContainer}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <Text style={styles.location}>{item.location}</Text>

                    {/* Rating */}
                    <View style={styles.ratingContainer}>
                        <Ionicons name="star" size={20} color="#8B0000" />
                        <Text style={styles.rating}>{item.rating}</Text>
                        <Text style={styles.reviewCount}>({item.reviewCount} reviews)</Text>
                    </View>

                    <View style={styles.divider} />

                    {/* Owner Info */}
                    <View style={styles.ownerContainer}>
                        <Image 
                            source={{ uri: item.owner.image }}
                            style={styles.ownerImage}
                        />
                        <View style={styles.ownerInfo}>
                            <Text style={styles.ownerLabel}>Owned by</Text>
                            <Text style={styles.ownerName}>{item.owner.name}</Text>
                        </View>
                    </View>

                    <View style={styles.divider} />

                    {/* Description */}
                    <Text style={styles.description}>{item.description}</Text>

                    <View style={styles.divider} />

                    {/* Location */}
                    <Text style={styles.sectionTitle}>How far from you</Text>
                    <Text style={styles.locationText}>Curitiba, Paraná, Brazil</Text>
                    <ItemLocation />

                    {/* Reviews */}
                    <View style={styles.ratingSection}>
                        <Text style={styles.bigRating}>{item.rating}</Text>
                        <Text style={styles.ratingLabel}>out of 5</Text>
                    </View>
                    <ReviewsGrid itemId={id as string} />

                    <View style={styles.divider} />

                    {/* Owner Card */}
                    <Text style={styles.sectionTitle}>Meet the Owner</Text>
                    <OwnerCard owner={item.owner} />
                    <TouchableOpacity style={styles.messageButton}>
                        <Text style={styles.messageButtonText}>Message owner</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingTop: 8,
        height: 60,
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
    scrollView: {
        flex: 1,
    },
    image: {
        width: width,
        height: width,
    },
    infoContainer: {
        padding: 16,
    },
    itemName: {
        fontSize: 24,
        fontWeight: '600',
        color: '#333',
        textAlign: 'center',
        marginBottom: 8,
    },
    location: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 16,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    rating: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginLeft: 4,
    },
    reviewCount: {
        fontSize: 14,
        color: '#666',
        marginLeft: 4,
    },
    divider: {
        height: 1,
        backgroundColor: '#e0e0e0',
        marginVertical: 16,
    },
    ownerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ownerImage: {
        width: 48,
        height: 48,
        borderRadius: 24,
    },
    ownerInfo: {
        marginLeft: 12,
    },
    ownerLabel: {
        fontSize: 14,
        color: '#666',
    },
    ownerName: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    description: {
        fontSize: 16,
        color: '#333',
        lineHeight: 24,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
        marginBottom: 12,
    },
    locationText: {
        fontSize: 16,
        color: '#666',
        marginBottom: 12,
    },
    ratingSection: {
        alignItems: 'center',
        marginVertical: 24,
    },
    bigRating: {
        fontSize: 48,
        fontWeight: '700',
        color: '#333',
    },
    ratingLabel: {
        fontSize: 16,
        color: '#666',
        marginTop: 4,
    },
    messageButton: {
        backgroundColor: '#8B0000',
        paddingVertical: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 16,
    },
    messageButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
}); 