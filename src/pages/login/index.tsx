import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { TextInput, Button, Text, useTheme, ActivityIndicator, MD2Colors } from 'react-native-paper';
import { styles } from './styles';
// import { useNavigation } from '@react-navigation/native';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const theme = useTheme();
    //   const navigation = useNavigation();

    async function getLogin() {
        try {
            setLoading(true);
            if(!email || !password) {
                setLoading(false);
                return Alert.alert(`Atenção`, `Informe os campos obrigatórios`);
            }

            setTimeout(() => {
                setLoading(false);
                return Alert.alert(`Logado com sucesso!`)
            }, 5000);
        } catch(error) {
            console.log(error);
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <ActivityIndicator size={"large"} animating={loading} color={MD2Colors.red800} />
            <Text style={styles.title}>Entrar</Text>

            <TextInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                mode="outlined"
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
            />

            <TextInput
                label="Senha"
                value={password}
                onChangeText={setPassword}
                mode="outlined"
                secureTextEntry
                style={styles.input}
            />

            <TouchableOpacity onPress={() => console.log('Esqueceu a senha')}>
                <Text style={styles.forgotPassword}>Esqueceu a senha?</Text>
            </TouchableOpacity>

            <Button
                mode="contained"
                onPress={() => getLogin()}
                buttonColor="#d32f2f"
                style={styles.loginButton}
            >
                Entrar
            </Button>

            <Text style={styles.footerText}>
                Você não tem uma conta?{' '}
                <Text
                    style={styles.link}
                    onPress={() => { }}
                >
                    Crie uma
                </Text>
            </Text>
        </View>
    );
}