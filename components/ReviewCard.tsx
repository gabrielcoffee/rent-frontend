import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

type Review = {
    id: string;
    user: {
        name: string;
        image: string;
    };
    rating: number;
    comment: string;
    date: string;
};

type Props = {
    review: Review;
};

export default function ReviewCard({ review }: Props) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image 
                    source={{ uri: review.user.image }}
                    style={styles.userImage}
                />
                <View style={styles.userInfo}>
                    <Text style={styles.userName}>{review.user.name}</Text>
                    <View style={styles.ratingContainer}>
                        <Ionicons name="star" size={16} color="#8B0000" />
                        <Text style={styles.rating}>{review.rating}</Text>
                    </View>
                </View>
            </View>
            <Text style={styles.comment}>{review.comment}</Text>
            <Text style={styles.date}>{review.date}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 280,
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    userImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    userInfo: {
        marginLeft: 12,
        flex: 1,
    },
    userName: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        marginBottom: 4,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rating: {
        fontSize: 14,
        color: '#666',
        marginLeft: 4,
    },
    comment: {
        fontSize: 14,
        color: '#333',
        lineHeight: 20,
        marginBottom: 8,
    },
    date: {
        fontSize: 12,
        color: '#666',
    },
}); 