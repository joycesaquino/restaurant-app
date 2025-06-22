import React, { useState } from 'react';
import { View, Image, Alert } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import { styles } from './styles';

export default function ProductRegistration() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUri, setImageUri] = useState<string | null>(null);

  const escolherImagem = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Permita acesso às imagens para continuar.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleCadastro = () => {
    if (!name || !description || !price || !imageUri) {
      Alert.alert('Erro', 'Preencha todos os campos e selecione uma imagem.');
      return;
    }

    console.log({
      name,
      description,
      price,
      imagem: imageUri,
    });

    Alert.alert('Sucesso', 'Produto cadastrado com sucesso!');
  };

  return (
    <View style={styles.container}>
      <Text variant="headlineMedium" style={styles.title}>Cadastro de Produto</Text>

      <TextInput
        label="Nome do prato"
        value={name}
        onChangeText={setName}
        mode="outlined"
        style={styles.input}
      />

      <TextInput
        label="Descrição"
        value={description}
        onChangeText={setDescription}
        mode="outlined"
        multiline
        numberOfLines={4}
        style={styles.input}
      />

      <TextInput
        label="Preço"
        value={price}
        onChangeText={setPrice}
        mode="outlined"
        keyboardType="decimal-pad"
        style={styles.input}
      />

      <Button mode="outlined" onPress={escolherImagem} style={styles.imageButton} textColor="#d32f2f">
        {imageUri ? 'Trocar Imagem' : 'Selecionar Imagem'}
      </Button>

      {imageUri && (
        <Image source={{ uri: imageUri }} style={styles.imagePreview} />
      )}

      <Button mode="contained" onPress={handleCadastro} style={styles.submitButton} buttonColor="#d32f2f">
        Cadastrar Produto
      </Button>
    </View>
  );
}

