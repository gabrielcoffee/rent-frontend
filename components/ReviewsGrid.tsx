import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import ReviewCard from './ReviewCard';

type Props = {
    itemId: string;
};

export default function ReviewsGrid({ itemId }: Props) {
    // TODO: Fetch reviews using itemId
    const reviews = [
        {
            id: '1',
            user: {
                name: 'John Doe',
                image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000',
            },
            rating: 5,
            comment: 'Great item, exactly as described!',
            date: '2024-03-15',
        },
        {
            id: '2',
            user: {
                name: 'Jane Smith',
                image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000',
            },
            rating: 4,
            comment: 'Good quality, would rent again.',
            date: '2024-03-10',
        },
    ];

    return (
        <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.container}
        >
            {reviews.map(review => (
                <ReviewCard key={review.id} review={review} />
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        gap: 16,
    },
}); 