import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Step2Pricing() {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.text}>Step 2: Pricing</Text>
                <Text style={styles.subtext}>Content coming soon...</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    subtext: {
        fontSize: 16,
        color: '#666',
    },
}); 