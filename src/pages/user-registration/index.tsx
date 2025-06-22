import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button, Text, Menu, Divider } from 'react-native-paper';
import { styles } from './styles';

export default function UserRegistration() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState(''); // Cliente ou Admin
    const [menuVisible, setMenuVisible] = useState(false);

    const handleSubmit = () => {
        if (!name || !email || !password || !userType) {
            alert('Por favor, preencha todos os campos!');
            return;
        }

        // Lógica de envio
        console.log({ name, email, password, userType });
        alert('Usuário cadastrado com sucesso!');
    };

    return (
        <View style={styles.container}>
            <Text variant="headlineMedium" style={styles.title}>
                Cadastro de Usuário
            </Text>

            {/* Nome completo */}
            <TextInput
                label="Nome completo"
                value={name}
                onChangeText={setName}
                mode="outlined"
                style={styles.input}
            />

            {/* Email */}
            <TextInput
                label="Email"
                value={email}
                onChangeText={setEmail}
                mode="outlined"
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.input}
            />

            {/* Senha */}
            <TextInput
                label="Senha"
                value={password}
                onChangeText={setPassword}
                mode="outlined"
                secureTextEntry
                style={styles.input}
            />

            {/* Tipo de usuário */}
            <Menu
                visible={menuVisible}
                onDismiss={() => setMenuVisible(false)}
                anchor={
                    <Button
                        mode="outlined"
                        onPress={() => setMenuVisible(true)}
                        style={styles.menuButton}
                        textColor="#d32f2f"
                    >
                        {userType || 'Selecionar Tipo de Usuário'}
                    </Button>
                }
            >
                <Menu.Item
                    onPress={() => {
                        setUserType('Cliente');
                        setMenuVisible(false);
                    }}
                    title="Cliente"
                />
                <Divider />
                <Menu.Item
                    onPress={() => {
                        setUserType('Admin');
                        setMenuVisible(false);
                    }}
                    title="Admin"
                />
            </Menu>

            {/* Botão de envio */}
            <Button mode="contained" onPress={handleSubmit} style={styles.submitButton} buttonColor="#d32f2f">
                Cadastrar
            </Button>
        </View>
    );
}