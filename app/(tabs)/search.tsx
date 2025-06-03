import * as ImagePicker from "expo-image-picker";
import { useState } from 'react';
import { ImageSourcePropType, StyleSheet, View } from 'react-native';

import Button from '@/components/Button';
import CircleButton from "@/components/CircleButton";
import EmojiList from "@/components/EmojiList";
import EmojiPicker from "@/components/EmojiPicker";
import EmojiSticker from "@/components/EmojiSticker";
import IconButton from "@/components/IconButton";
import ImageViewer from '@/components/ImageViewer';

const PlaceholderImage = require('@/assets/images/background-image.png');


export default function ImagePage() {
    const [selectedImage, setSelectedImage] = useState<undefined | string>(undefined);
    const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
    const [isEmojiModalVisible, setIsEmojiModalVisible] = useState<boolean>(false);
    const [selectedEmoji, setSelectedEmoji] = useState<ImageSourcePropType | undefined>(undefined);

    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 1
        });

        if (!result.canceled) {
            console.log("Imagem Selecionada");
            setSelectedImage(result.assets[0].uri);
            setShowAppOptions(true);
        }
        else {
            alert("You didn't select any picture")
        }
    }

    const onReset = () => {
        setShowAppOptions(false);
    };

    const onAddSticker = () => {
        setIsEmojiModalVisible(true);
    };

    const onModalClose = () => {
        setIsEmojiModalVisible(false);
    };

    const onSaveImgAsync = async () => {

    }

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <ImageViewer imgSource={PlaceholderImage} selectedImage={selectedImage}/>
                {
                    selectedEmoji && <EmojiSticker imageSize={40} stickerSource={selectedEmoji}/>
                }
            </View>

            {showAppOptions ? (
                <View style={styles.optionsContainer}>
                    <View style={styles.optionsRow}>
                        <IconButton icon="refresh" label="Reset" onPress={onReset} />
                        <CircleButton onPress={onAddSticker} />
                        <IconButton icon="save-alt" label="Save" onPress={onSaveImgAsync} />
                    </View>
                </View>
            ) : (
                <View style={styles.buttonContainer}>
                    <Button theme='primary' label="Choose a photo" onPress={pickImageAsync}/>
                    <Button label="Use this photo" />
                </View>
            )}
            <EmojiPicker isVisible={isEmojiModalVisible} onClose={onModalClose}>
                <EmojiList onSelect={setSelectedEmoji} onCloseModal={onModalClose}></EmojiList>
            </EmojiPicker>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        alignItems: 'center',
    },
    imageContainer: {
        flex: 1,
    },
    image: {
        width: 320,
        height: 440,
        borderRadius: 18,
    },
    buttonContainer: {
        flex: 1 / 3,
        alignItems: 'center',
    },
    optionsContainer: {
        position: 'absolute',
        bottom: 80
    },
    optionsRow: {
        alignItems: 'center',
        flexDirection: 'row'
    }
});
