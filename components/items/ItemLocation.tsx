import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function ItemLocation() {
    return (
        <View style={styles.container}>
            {/* TODO: Replace with actual map component */}
            <View style={styles.mapPlaceholder} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 16,
    },
    mapPlaceholder: {
        width: '100%',
        height: 200,
        backgroundColor: '#e0e0e0',
        borderRadius: 8,
    },
}); 