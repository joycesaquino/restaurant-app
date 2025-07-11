import React, { useEffect } from 'react';
import { View, Image, BackHandler } from 'react-native';
import { Button, Title, Text, Card } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../route-types';
import { styles } from './styles';

type Navigation = NativeStackNavigationProp<RootStackParamList>;
type RouteProps = NativeStackScreenProps<RootStackParamList, 'ProductSuccess'>['route'];

export default function ProductSuccess() {
    const navigation = useNavigation<Navigation>();
    const route = useRoute<RouteProps>();
    const { type, title, message } = route.params;

    const goToHome = () => {
        navigation.navigate('Home');
    };

    const goToLogin = () => {
        navigation.navigate('Login');
    };

    const addAnother = () => {
        if (type === 'product') {
            navigation.navigate('ProductRegistration');
        } else if (type === 'restaurant') {
            navigation.navigate('RestaurantRegistration');
        } else if (type === 'user') {
            navigation.navigate('UserRegistration');
        }
    };

    const viewMenu = () => {
        navigation.navigate('MenuList');
    };

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => null,
            headerRight: () => null,
            headerTitle: 'Sucesso!',
            headerTitleAlign: 'center',
            headerTintColor: 'black',
            headerStyle: {
                backgroundColor: 'white',
            },
        });
    }, [navigation]);

    useEffect(() => {
        const backAction = () => {
          if(type === 'product'  || type === 'user')
             navigation.navigate('Home');
          else
            navigation.navigate('Login');
           
            return true;
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove();
    }, []);

    const screenTitle = title || (
        type === 'product' ? 'Produto Cadastrado!' :
        type === 'restaurant' ? 'Restaurante Cadastrado!' :
        type === 'user' ? 'Usuário Cadastrado!' :
        'Operação Concluída!'
    );

    const screenMessage = message || (
        type === 'product'
            ? 'Seu produto foi cadastrado com sucesso e já está disponível no cardápio.'
            : type === 'restaurant'
            ? 'Seu restaurante foi cadastrado com sucesso e já está disponível no sistema.'
            : type === 'user'
            ? 'O novo usuário foi cadastrado com sucesso e já pode acessar o sistema.'
            : 'Sua operação foi concluída com sucesso!'
    );

    return (
        <View style={styles.container}>
            <Card style={styles.card}>
                <Card.Content style={styles.content}>
                    <View style={styles.iconContainer}>
                        <Image
                            source={require('../../../../assets/logotipo.png')}
                            style={styles.successIcon}
                            resizeMode="contain"
                        />
                    </View>

                    <Title style={styles.title}>{screenTitle}</Title>
                    <Text style={styles.message}>{screenMessage}</Text>

                    <View style={styles.buttonContainer}>
                        {type === 'product' ? (
                            <Button
                                mode="contained"
                                onPress={viewMenu}
                                style={[styles.button, styles.primaryButton]}
                                buttonColor="#d32f2f"
                                icon="food"
                            >
                                Ver Cardápio
                            </Button>
                        ) : type === 'restaurant' ? (
                            <Button
                                mode="contained"
                                onPress={goToHome}
                                style={[styles.button, styles.primaryButton]}
                                buttonColor="#d32f2f"
                                icon="home"
                            >
                                Ir para o Início
                            </Button>
                        ) : type === 'user' ? (
                            <Button
                                mode="contained"
                                onPress={goToLogin}
                                style={[styles.button, styles.primaryButton]}
                                buttonColor="#d32f2f"
                                icon="login"
                            >
                                Ir para Login
                            </Button>
                        ) : null}

                        <Button
                            mode="outlined"
                            onPress={addAnother}
                            style={[styles.button, styles.secondaryButton]}
                            textColor="#d32f2f"
                            icon="plus"
                        >
                            {type === 'product' ? 'Cadastrar Outro Produto' :
                             type === 'restaurant' ? 'Cadastrar Outro Restaurante' :
                             type === 'user' ? 'Cadastrar Outro Usuário' :
                             'Cadastrar Outro'
                            }
                        </Button>

                        {(type === 'product') && (
                            <Button
                                mode="text"
                                onPress={goToHome}
                                style={[styles.button, styles.textButton]}
                                textColor="#666"
                                icon="home"
                            >
                                Voltar ao Início
                            </Button>
                        )}
                    </View>
                </Card.Content>
            </Card>
        </View>
    );
}