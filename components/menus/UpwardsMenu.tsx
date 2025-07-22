import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, Easing, FlatList, ListRenderItemInfo, Modal, Pressable, StyleSheet, Text, View } from 'react-native';

/**
 * UpwardsMenu - A modal menu that slides up from the bottom with smooth animations
 * 
 * Features:
 * - Slides up from bottom when opened
 * - Slides down with animation when an item is selected (if onSelect is provided)
 * - Fades out overlay when closed
 * - Supports custom item rendering with selection state
 * 
 * Usage:
 * ```tsx
 * <UpwardsMenu<MyItemType>
 *     visible={menuVisible}
 *     onClose={() => setMenuVisible(false)}
 *     onSelect={(item) => {
 *         // This will trigger the slide-down animation
 *         setSelectedItem(item);
 *     }}
 *     title="Select an option"
 *     items={myItems}
 *     selectedId={selectedItem?.id}
 *     renderItem={(item, isSelected) => (
 *         <View style={[styles.item, isSelected && styles.selected]}>
 *             <Text>{item.name}</Text>
 *         </View>
 *     )}
 * />
 * ```
 */
interface UpwardsMenuProps<T> {
    visible: boolean;
    onClose: () => void;
    onSelect?: (item: T) => void;
    title: string;
    items: T[];
    renderItem: (item: T, isSelected: boolean) => React.ReactElement | null;
    selectedId?: string | null;
}

const SCREEN_HEIGHT = Dimensions.get('window').height;

export default function UpwardsMenu<T extends { id: string }>({
    visible,
    onClose,
    onSelect,
    title,
    items,
    renderItem,
    selectedId,
}: UpwardsMenuProps<T>) {
    const overlayOpacity = useRef(new Animated.Value(0)).current;
    const translateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

    // Reset animation values when modal is shown
    const handleShow = () => {
        overlayOpacity.setValue(0);
        translateY.setValue(SCREEN_HEIGHT);
        Animated.parallel([
            Animated.timing(overlayOpacity, {
                toValue: 1,
                duration: 180,
                useNativeDriver: true,
                easing: Easing.out(Easing.ease),
            }),
            Animated.timing(translateY, {
                toValue: 0,
                duration: 260,
                useNativeDriver: true,
                easing: Easing.out(Easing.cubic),
            })
        ]).start();
    };

    // Animate out when visible changes to false
    useEffect(() => {
        if (!visible) {
            Animated.parallel([
                Animated.timing(overlayOpacity, {
                    toValue: 0,
                    duration: 180,
                    useNativeDriver: true,
                    easing: Easing.in(Easing.ease),
                }),
                Animated.timing(translateY, {
                    toValue: SCREEN_HEIGHT,
                    duration: 220,
                    useNativeDriver: true,
                    easing: Easing.in(Easing.cubic),
                })
            ]).start();
        }
        // No animation in here; handled by onShow
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [visible]);

    // Handle item selection with animation
    const handleItemSelect = (item: T) => {
        if (onSelect) {
            // Animate the menu down smoothly
            Animated.parallel([
                Animated.timing(overlayOpacity, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true,
                    easing: Easing.in(Easing.ease),
                }),
                Animated.timing(translateY, {
                    toValue: SCREEN_HEIGHT,
                    duration: 250,
                    useNativeDriver: true,
                    easing: Easing.in(Easing.cubic),
                })
            ]).start(() => {
                // Call onSelect after animation completes
                onSelect(item);
                onClose();
            });
        } else {
            // If no onSelect provided, just close normally
            onClose();
        }
    };

    return (
        <Modal
            visible={visible}
            transparent
            onRequestClose={onClose}
            onShow={handleShow}
        >
            {/* Overlay para fechar o menu quando o usuário clicar fora dele */}
            <Animated.View style={[styles.modalOverlay, { opacity: overlayOpacity }]}> 
                <Pressable style={{ flex: 1 }} onPress={onClose} />
            </Animated.View>

            {/* Conteúdo do menu */}
            <Animated.View style={[styles.modalContent, { transform: [{ translateY }] }]}> 
                <Text style={styles.modalTitle}>{title}</Text>

                {/* Lista todos os itens do menu para o usuário clicar */}
                <FlatList
                    data={items}
                    keyExtractor={item => item.id}
                    renderItem={({ item }: ListRenderItemInfo<T>) => {
                        const node = renderItem(item, selectedId === item.id);
                        if (node === null || node === undefined) return null;
                        
                        // Wrap the rendered item in a Pressable to handle selection
                        return (
                            <Pressable onPress={() => handleItemSelect(item)}>
                                {node}
                            </Pressable>
                        );
                    }}
                    keyboardShouldPersistTaps="handled"
                />
                <View style={{ height: 24 }} />
            </Animated.View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.2)',
        zIndex: 1,
    },
    modalContent: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#fff',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        padding: 20,
        maxHeight: '60%',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: -2 },
        shadowRadius: 8,
        elevation: 8,
        zIndex: 2,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#222',
        marginBottom: 16,
    },
}); 