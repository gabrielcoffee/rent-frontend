import { Link, Stack } from "expo-router";
import React from "react";
import { StyleSheet, View } from "react-native";

export default function NotFoundPage() {
    return (
        <React.Fragment>
            <Stack.Screen options={{title: 'Oops! Page not found...'}}/>
            <View style={style.container}>
                <Link href='/' style={style.button}>Go Back</Link>
            </View>     
        </React.Fragment>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        justifyContent: 'center',
        alignItems: 'center',
      },
    
      button: {
        fontSize: 20,
        textDecorationLine: 'underline',
        color: '#fff',
      }
})