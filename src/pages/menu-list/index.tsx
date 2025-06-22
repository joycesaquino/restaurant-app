import React, { useState } from 'react';
import { View, FlatList, Image } from 'react-native';
import { Text, Card, TextInput } from 'react-native-paper';
import { styles } from './styles';

const products = [
  {
    id: '1',
    name: 'Pizza Margherita',
    description: 'Molho de tomate, mussarela e manjericão fresco.',
    price: 'R$ 35,00',
    image: 'https://laticiniosbomdestino.com.br/2016/wp-content/uploads/2023/03/pizza-marguerita-com-mozzarella-de-bufala-bom-destino-scaled.jpg',
  },
  {
    id: '2',
    name: 'Hambúrguer Artesanal',
    description: 'Pão brioche, carne 180g, queijo cheddar e bacon.',
    price: 'R$ 28,00',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjF_0B9XbtUUI7pOZmO7TQyLtgcuQ4eujwXA&s',
  },
  {
    id: '3',
    name: 'Salada Caesar',
    description: 'Alface, frango grelhado, parmesão e molho caesar.',
    price: 'R$ 22,00',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHcqtOQGHJCk9x6BR8d0Coc7Xt1R9d0t-AlQ&s',
  },
];

export default function MenuList() {
  const [busca, setBusca] = useState('');
  const [produtos, setProdutos] = useState(products);

  const filtrarProdutos = (texto: string) => {
    setBusca(texto);
    const filtrados = products.filter((produto) =>
      produto.name.toLowerCase().includes(texto.toLowerCase())
    );
    setProdutos(filtrados);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Pesquisar produto pelo nome"
        value={busca}
        onChangeText={filtrarProdutos}
        mode="outlined"
        style={styles.input}
        left={<TextInput.Icon icon="magnify" />}
      />

      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={styles.card}>
            <View style={styles.row}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.details}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.price}>{item.price}</Text>
              </View>
            </View>
          </Card>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum produto encontrado.</Text>}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
    </View>
  );
}