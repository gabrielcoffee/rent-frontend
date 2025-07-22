import { Stack } from "expo-router";

export default function App() {
    
    // Stack -> pilha de telas onde as próximas são "empilhadas" em cima das anteriores
    // Stack.Screen -> mapeamento automatico das rotas ou telas (ex: (tabs) -> (tabs)/index)
    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
            <Stack.Screen name="(item)" options={{ headerShown: false }}/>
            <Stack.Screen name="settings" options={{ headerShown: false }}/>
        </Stack>
    );
}