import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ExploreHeaderProps {
  location?: string;
  onNotificationPress?: () => void;
  onChatPress?: () => void;
}

export default function ExploreHeader({
  location = 'Curitiba, PR',
  onNotificationPress,
  onChatPress,
}: ExploreHeaderProps) {
  return (
    <View style={styles.header}>
      <View style={styles.locationContainer}>
        <Ionicons name="map-outline" size={24} color="#333" style={styles.mapIcon} />
        <Text style={styles.locationText}>{location}</Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={onNotificationPress} style={styles.iconButton}>
          <Ionicons name="notifications-outline" size={26} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity onPress={onChatPress} style={styles.iconButton}>
          <Ionicons name="chatbubble-ellipses-outline" size={26} color="#333" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mapIcon: {
    marginRight: 8,
  },
  locationText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    marginLeft: 8,
    padding: 4,
  },
}); 