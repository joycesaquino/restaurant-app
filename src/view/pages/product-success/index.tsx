import React from 'react';
import { View, Image } from 'react-native';
import { Button, Title, Text, Card } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../route-types';
import { styles } from './styles';

type Navigation = NativeStackNavigationProp<RootStackParamList>;

export default function ProductSuccess() {
  const navigation = useNavigation<Navigation>();

  const goToHome = () => {
    navigation.navigate('Home');
  };

  const addAnotherProduct = () => {
    navigation.navigate('ProductRegistration');
  };

  const viewMenu = () => {
    navigation.navigate('MenuList');
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content style={styles.content}>
          {/* Success Icon */}
          <View style={styles.iconContainer}>
            <Image 
              source={require('../../../../assets/logotipo.png')}
              style={styles.successIcon}
              resizeMode="contain"
            />
          </View>

          {/* Success Message */}
          <Title style={styles.title}>Produto Cadastrado!</Title>
          <Text style={styles.message}>
            Seu produto foi cadastrado com sucesso e já está disponível no cardápio.
          </Text>

          {/* Action Buttons */}
          <View style={styles.buttonContainer}>
            <Button
              mode="contained"
              onPress={viewMenu}
              style={[styles.button, styles.primaryButton]}
              buttonColor="#d32f2f"
              icon="food"
            >
              Ver Cardápio
            </Button>

            <Button
              mode="outlined"
              onPress={addAnotherProduct}
              style={[styles.button, styles.secondaryButton]}
              textColor="#d32f2f"
              icon="plus"
            >
              Cadastrar Outro Produto
            </Button>

            <Button
              mode="text"
              onPress={goToHome}
              style={[styles.button, styles.textButton]}
              textColor="#666"
              icon="home"
            >
              Voltar ao Início
            </Button>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
} 