import React, { useState } from 'react';
import { View, TouchableOpacity, Alert, Image  } from 'react-native';
import { TextInput, Button, Text, ActivityIndicator, MD2Colors } from 'react-native-paper';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../route-types';
type Navigation = NativeStackNavigationProp<RootStackParamList>;

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation<Navigation>();

    async function getLogin() {
        try {
            setLoading(true);
            if(!email || !password) {
                setLoading(false);
                return Alert.alert(`Atenção`, `Informe os campos obrigatórios`);
            }

            setTimeout(() => {
                setLoading(false);
                navigation.navigate('Home');
            }, 2000);

        } catch(error) {
            console.log(error);
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <ActivityIndicator size={"large"} animating={loading} color={MD2Colors.red800} />
            <Image
            source={require('../../../assets/logotipo.png')} // Substitua pelo caminho real da sua imagem
            style={styles.logo}
            resizeMode="contain"
            />

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
                    onPress={() => navigation.navigate('UserRegistration')}
                >
                    Crie uma
                </Text>
            </Text>
        </View>
    );
}