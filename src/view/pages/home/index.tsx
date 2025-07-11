import React, { useEffect } from 'react';
import { View, BackHandler, Alert } from 'react-native';
import { Button, Card, Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { styles } from './styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../route-types';

type Navigation = NativeStackNavigationProp<RootStackParamList>;

export default function Home() {
    const navigation = useNavigation<Navigation>();
    const handleLogout = () => {
        navigation.replace('Login');
    };

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <Appbar.Action icon="logout" onPress={handleLogout} color="black" />
            ),
            headerTitle: 'Menu Principal',
            headerTitleAlign: 'center',
            headerTintColor: 'black',
            headerStyle: {
                backgroundColor: 'white',
            },
        });
    }, [navigation]);

    useEffect(() => {
        const backAction = () => {
            Alert.alert('Sair do Aplicativo', 'Você realmente deseja sair?', [
                {
                    text: 'Cancelar',
                    onPress: () => null,
                    style: 'cancel',
                },
                { text: 'Sair', onPress: () => BackHandler.exitApp() },
            ]);
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove();
    }, []);

    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                <Card.Content style={styles.content}>
                    <View style={styles.buttonContainer}>
                        <Button
                            mode="contained"
                            onPress={() => navigation.navigate('RestaurantRegistration')}
                            style={styles.button}
                            buttonColor="#d32f2f"
                            icon="store"
                        >
                            Cadastro de Restaurante
                        </Button>

                        <Button
                            mode="contained"
                            onPress={() => navigation.navigate('ProductRegistration')}
                            style={styles.button}
                            buttonColor="#d32f2f"
                            icon="food"
                        >
                            Cadastro de Produto
                        </Button>

                        <Button
                            mode="contained"
                            onPress={() => navigation.navigate('MenuList')}
                            style={styles.button}
                            buttonColor="#d32f2f"
                            icon="menu"
                        >
                            Lista de Cardápio
                        </Button>
                    </View>
                </Card.Content>
            </Card>
        </View>
    );
}