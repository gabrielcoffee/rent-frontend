import { Image } from 'expo-image';
import { ImageSourcePropType, StyleSheet } from 'react-native';

type Props = {
    imgSource: ImageSourcePropType;
    selectedImage?: string;
}

export default function ImageViewer({imgSource, selectedImage}: Props) {
    const imgDisplayed = selectedImage ? {uri: selectedImage} : imgSource;
    return <Image source={imgDisplayed} style={styles.image}/>
}

const styles = StyleSheet.create({
    image: {
        borderRadius: 18,
        width: 320,
        height: 440
    }
})