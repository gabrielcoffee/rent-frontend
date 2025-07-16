import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

interface MapPinLocationProps {
    location: {
        latitude: number;
        longitude: number;
        address: string;
    } | null;
    onLocationChange: (location: {
        latitude: number;
        longitude: number;
        address: string;
    }) => void;
}

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function MapPinLocation({ location, onLocationChange }: MapPinLocationProps) {
    const mapRef = useRef<MapView>(null);

    useEffect(() => {
        if (location && mapRef.current) {
            mapRef.current.animateToRegion({
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            });
        }
    }, [location]);

    const handleMarkerDragEnd = async (e: any) => {
        const { latitude, longitude } = e.nativeEvent.coordinate;
        
        try {
            // Reverse geocoding to get address from coordinates
            const response = await fetch(
                `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyDjLNDp9d4cJcDfuVwiLCbK4bnWXUwftP0`
            );
            const data = await response.json();
            
            if (data.results && data.results.length > 0) {
                const address = data.results[0].formatted_address;
                onLocationChange({
                    latitude,
                    longitude,
                    address,
                });
            }
        } catch (error) {
            console.error('Error reverse geocoding:', error);
            // Fallback to coordinates only
            onLocationChange({
                latitude,
                longitude,
                address: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`,
            });
        }
    };

    if (!location) {
        return (
            <View style={styles.placeholderContainer}>
                <Ionicons name="location" size={48} color="#ccc" />
                <Text style={styles.placeholderText}>Map preview will appear here</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <MapView
                ref={mapRef}
                style={styles.map}
                initialRegion={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
                showsUserLocation={false}
                showsMyLocationButton={false}
                showsCompass={false}
                showsScale={false}
            >
                <Marker
                    coordinate={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                    }}
                    draggable
                    onDragEnd={handleMarkerDragEnd}
                    pinColor="#3a5d47"
                />
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 200,
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 16,
    },
    map: {
        flex: 1,
    },
    placeholderContainer: {
        height: 200,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    placeholderText: {
        fontSize: 16,
        color: '#999',
        marginTop: 8,
    },
}); 