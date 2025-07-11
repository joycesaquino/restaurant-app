import React, { useState, useEffect, useCallback } from 'react';
import { FlatList, Image, View } from 'react-native';
import { Card, Text, TextInput, ActivityIndicator, Appbar } from 'react-native-paper';
import { getProducts } from '../../../controller/product-controller';
import { useFocusEffect } from '@react-navigation/native';
import { styles } from './styles';
import { Product } from '../../../model/products';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../../route-types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Navigation = NativeStackNavigationProp<RootStackParamList>;

export default function MenuList() {
  const [busca, setBusca] = useState('');
  const [produtos, setProdutos] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  const navigation = useNavigation<Navigation>();
      const handleLogout = () => {
          navigation.replace('Login');
      };

    useEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Appbar.Action icon="logout" onPress={handleLogout} color="black" />
            ),
          
        });
    }, [navigation]);


  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const products = await getProducts();
      const productsWithIds = products.map(p => ({
        ...p,
        id: p.id || `${p.name}-${Math.random().toString(36).substring(2, 9)}`,
      }));
      setAllProducts(productsWithIds);
      setProdutos(productsWithIds);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    } finally {
      setLoading(false);
    }
  }, []);
  useFocusEffect(
    useCallback(() => {
      loadProducts();
      return () => {
        setBusca('');
      };
    }, [loadProducts])
  );

  const filtrarProdutos = (texto: string) => {
    setBusca(texto);
    const filtrados = allProducts.filter((produto) => 
      produto.name.toLowerCase().includes(texto.toLowerCase())
    );
    setProdutos(filtrados);
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator animating={true} color="#d32f2f" size="large" />
        <Text style={{ marginTop: 10, color: '#888' }}>Carregando produtos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Pesquisar produto pelo nome"
          value={busca}
          onChangeText={filtrarProdutos}
          mode="outlined"
          style={styles.input}
          left={<TextInput.Icon icon="magnify" />}
        />
      </View>

      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <Card.Content style={styles.cardContent}>
              <View style={styles.row}>
                <Image source={{ uri: item.imageUri }} style={styles.image} />
                <View style={styles.details}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.description}>{item.description}</Text>
                  <Text style={styles.price}>R$ {item.price.toFixed(2).replace('.', ',')}</Text>
                </View>
              </View>
            </Card.Content>
          </Card>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum produto encontrado.</Text>}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </View>
  );
}