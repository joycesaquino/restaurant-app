import React from 'react';
import { View, Image } from 'react-native';
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

  const addAnother = () => {
    if (type === 'product') {
      navigation.navigate('ProductRegistration');
    } else {
      navigation.navigate('RestaurantRegistration');
    }
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
          <Title style={styles.title}>
            {title || (type === 'product' ? 'Produto Cadastrado!' : 'Restaurante Cadastrado!')}
          </Title>
          <Text style={styles.message}>
            {message || (type === 'product' 
              ? 'Seu produto foi cadastrado com sucesso e já está disponível no cardápio.'
              : 'Seu restaurante foi cadastrado com sucesso e já está disponível no sistema.'
            )}
          </Text>

          {/* Action Buttons */}
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
            ) : (
              <Button
                mode="contained"
                onPress={goToHome}
                style={[styles.button, styles.primaryButton]}
                buttonColor="#d32f2f"
                icon="home"
              >
                Ir para o Início
              </Button>
            )}

            <Button
              mode="outlined"
              onPress={addAnother}
              style={[styles.button, styles.secondaryButton]}
              textColor="#d32f2f"
              icon="plus"
            >
              {type === 'product' ? 'Cadastrar Outro Produto' : 'Cadastrar Outro Restaurante'}
            </Button>

            {type === 'product' && (
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