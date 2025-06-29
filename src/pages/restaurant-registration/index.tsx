import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import { TextInput, Button, Text, HelperText } from 'react-native-paper';
import { MaskedTextInput } from 'react-native-mask-text';
import { Picker } from '@react-native-picker/picker';
import { styles } from './styles';

const brazilianStates = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES',
  'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR',
  'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC',
  'SP', 'SE', 'TO',
];

export default function RestaurantRegistration() {
  const [name, setName] = useState('');
  const [cep, setCep] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');
  const [uf, setUf] = useState('');
  const [cnpj, setCnpj] = useState('');

  const handleSalvar = () => {
    console.log({
      name,
      endereco: { cep, street, number, district, city, uf },
      cnpj,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        label="Nome do Restaurante"
        value={name}
        onChangeText={setName}
        mode="outlined"
        style={styles.input}
      />

      <Text style={styles.sectionTitle}>Endereço</Text>

      <TextInput
        label="CEP"
        value={cep}
        onChangeText={setCep}
        mode="outlined"
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        label="Rua"
        value={street}
        onChangeText={setStreet}
        mode="outlined"
        style={styles.input}
      />

      <TextInput
        label="Número"
        value={number}
        onChangeText={setNumber}
        mode="outlined"
        keyboardType="numeric"
        style={styles.input}
      />

      <TextInput
        label="Bairro"
        value={district}
        onChangeText={setDistrict}
        mode="outlined"
        style={styles.input}
      />

      <TextInput
        label="Cidade"
        value={city}
        onChangeText={setCity}
        mode="outlined"
        style={styles.input}
      />

      <Text style={styles.ufLabel}>UF</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={uf}
          onValueChange={(value) => setUf(value)}
          style={styles.picker}
        >
          <Picker.Item label="Selecione o estado" value="" />
          {brazilianStates.map((estado) => (
            <Picker.Item key={estado} label={estado} value={estado} />
          ))}
        </Picker>
      </View>

      <Text style={styles.sectionTitle}>CNPJ</Text>
      <MaskedTextInput
        mask="99.999.999/9999-99"
        value={cnpj}
        onChangeText={(text, rawText) => setCnpj(text)}
        keyboardType="numeric"
        style={styles.maskedInput}
        placeholder="00.000.000/0000-00"
      />
      <HelperText type="info">Formato: 00.000.000/0000-00</HelperText>

      <Button
        mode="contained"
        onPress={handleSalvar}
        style={styles.button}
        buttonColor="#d32f2f"
      >
        Cadastrar Restaurante
      </Button>
    </ScrollView>
  );
}