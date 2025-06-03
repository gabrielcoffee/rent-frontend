import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function RentableItemCard() {
    return (
        <View style={styles.card}>
            {/* Informações do usuário */}
            <View style={styles.userInfo}>
                <Image
                    source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
                    style={styles.userImage}
                />
                <Text style={styles.userName}>Gabriel</Text>
                <View style={styles.userScore}>
                    <Ionicons name="star" size={14} color="#ffd700" />
                    <Text style={styles.scoreText}>4.5</Text>
                </View>
            </View>

            {/* Imagem com nome e setas */}
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: 'https://via.placeholder.com/300x180' }}
                    style={styles.itemImage}
                />
                <Text style={styles.itemName}>Mountain Bike</Text>
                <TouchableOpacity style={styles.arrowLeft}>
                    <Ionicons name="chevron-back" size={24} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.arrowRight}>
                    <Ionicons name="chevron-forward" size={24} color="#fff" />
                </TouchableOpacity>
            </View>

            {/* Botão e preço */}
            <View style={styles.bottomRow}>
                <TouchableOpacity style={styles.rentButton}>
                    <Text style={styles.rentText}>Rent</Text>
                </TouchableOpacity>
                <Text style={styles.priceText}>R$ 30/dia</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#2c2f36',
        borderRadius: 16,
        padding: 12,
        marginVertical: 10,
        marginHorizontal: 20,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 6,
        elevation: 5,
    },
    imageContainer: {
        position: 'relative',
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 10,
    },
    itemImage: {
        width: '100%',
        height: 180,
        borderRadius: 12,
    },
    itemName: {
        position: 'absolute',
        top: 10,
        left: 12,
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    arrowLeft: {
        position: 'absolute',
        left: 8,
        top: '45%',
        backgroundColor: 'rgba(0,0,0,0.4)',
        padding: 6,
        borderRadius: 20,
    },
    arrowRight: {
        position: 'absolute',
        right: 8,
        top: '45%',
        backgroundColor: 'rgba(0,0,0,0.4)',
        padding: 6,
        borderRadius: 20,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    userImage: {
        width: 32,
        height: 32,
        borderRadius: 16,
        marginRight: 8,
    },
    userName: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
    },
    userScore: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 'auto',
    },
    scoreText: {
        color: 'white',
        marginLeft: 4,
        fontSize: 14,
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    rentButton: {
        backgroundColor: '#6c5ce7',
        paddingVertical: 6,
        paddingHorizontal: 16,
        borderRadius: 20,
    },
    rentText: {
        color: 'white',
        fontWeight: 'bold',
    },
    priceText: {
        color: 'white',
        fontSize: 15,
        fontWeight: '500',
    },
});
