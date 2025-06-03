import { StyleSheet, Text, View } from "react-native";

export default function ProfilePage() {
    return (
        <View style={style.container}>
            <Text style={style.text}>About Page</Text>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: 'white',
    }
})
