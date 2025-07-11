import React, { useState, useEffect } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { TextInput, Button, Text, HelperText, Card, Title } from 'react-native-paper';
import { MaskedTextInput } from 'react-native-mask-text';
import { Picker } from '@react-native-picker/picker';
import { styles } from './styles';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { LoadingOverlay } from '../../components/loading-overlay';
import debounce from 'lodash.debounce';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../route-types';
import { getCurrentUser } from '../../../utils/auth';
import { useCep } from '../../../hooks/useCep';

const validationSchema = Yup.object().shape({
  name: Yup.string().min(6, 'Mínimo 6 caracteres').required('Informe o nome'),
  cep: Yup.string()
    .matches(/^\d{8}$/, 'CEP inválido. Deve conter 8 dígitos numéricos.')
    .required('Informe o CEP'),
  street: Yup.string().required('Informe a rua'),
  number: Yup.number().required('Informe o número'),
  district: Yup.string().required('Informe o bairro'),
  city: Yup.string().required('Informe a cidade'),
  uf: Yup.string().required('Informe o estado'),
  cnpj: Yup.string().min(14, 'Mínimo 14 caracteres').required('Informe o CNPJ'),
});

const brazilianStates = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES',
  'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR',
  'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC',
  'SP', 'SE', 'TO',
];

export default function RestaurantRegistration() {
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { fetchAddress, loading: cepLoading, error: cepError, clearError } = useCep();

  useEffect(() => {
    getCurrentUser().then(user => {
      if (!user || user.userType !== 'Admin') {
        Alert.alert('Acesso negado', 'Apenas administradores podem acessar esta tela.', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
      } else {
        setIsAdmin(true);
      }
    });
  }, []);

  const handleSalvar = (values: any) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log({ ...values });
      navigation.navigate('ProductSuccess', { type: 'restaurant' });
    }, 2000);
  };

  if (!isAdmin) return null;

  return (
    <View style={styles.container}>
      <LoadingOverlay visible={loading} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card style={styles.card}>
          <Card.Content style={styles.content}>
            <Title style={styles.title}>Cadastro de Restaurante</Title>
            <Formik
        initialValues={{
          name: '', cep: '', street: '', number: '',
          district: '', city: '', uf: '', cnpj: ''
        }}
        validationSchema={validationSchema}
        onSubmit={(values) => handleSalvar(values)}
      >
        {({
          handleChange, handleBlur, handleSubmit, setFieldValue,
          values, errors, touched, isValid, dirty
        }) => {
          const debouncedSetCNPJ = React.useMemo(
            () => debounce((value: string) => setFieldValue('cnpj', value), 300),
            [setFieldValue]
          );

          const debouncedFetchCep = React.useMemo(
            () => debounce(async (cep: string) => {
              if (cep.length === 8) {
                clearError();
                const address = await fetchAddress(cep);
                if (address) {
                  setFieldValue('street', address.street);
                  setFieldValue('district', address.district);
                  setFieldValue('city', address.city);
                  setFieldValue('uf', address.uf);
                }
              }
            }, 500),
            [setFieldValue, fetchAddress, clearError]
          );

          const handleCepChange = (cep: string) => {
            handleChange('cep')(cep);
            debouncedFetchCep(cep);
          };

          const handleSelect = (value: string) => {
            setFieldValue('uf', value);
          };

          return <>
            <View style={styles.inputContainer}>
              <TextInput
                label="Nome do Restaurante"
                value={values.name}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                mode="outlined"
                error={touched.name && !!errors.name}
              />
              <HelperText type="error" visible={touched.name && !!errors.name}>
                {touched.name && errors.name}
              </HelperText>
            </View>

            <Text style={styles.sectionTitle}>Endereço</Text>

            <View style={styles.inputContainer}>
              <TextInput
                label="CEP"
                value={values.cep}
                onChangeText={handleCepChange}
                onBlur={handleBlur('cep')}
                mode="outlined"
                keyboardType="numeric"
                error={(touched.cep && !!errors.cep) || !!cepError}
                right={cepLoading ? <TextInput.Icon icon="loading" /> : undefined}
              />
              <HelperText type="error" visible={touched.cep && !!errors.cep}>
                {touched.cep && errors.cep}
              </HelperText>
              <HelperText type="error" visible={!!cepError}>
                {cepError}
              </HelperText>
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                label="Rua"
                value={values.street}
                onChangeText={handleChange('street')}
                onBlur={handleBlur('street')}
                mode="outlined"
                error={touched.street && !!errors.street}
                disabled={!values.street}
              />
              <HelperText type="error" visible={touched.street && !!errors.street}>
                {touched.street && errors.street}
              </HelperText>
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                label="Número"
                value={values.number}
                onChangeText={handleChange('number')}
                onBlur={handleBlur('number')}
                mode="outlined"
                keyboardType="numeric"
                error={touched.number && !!errors.number}
              />
              <HelperText type="error" visible={touched.number && !!errors.number}>
                {touched.number && errors.number}
              </HelperText>
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                label="Bairro"
                value={values.district}
                onChangeText={handleChange('district')}
                onBlur={handleBlur('district')}
                mode="outlined"
                error={touched.district && !!errors.district}
                disabled={!values.district}
              />
              <HelperText type="error" visible={touched.district && !!errors.district}>
                {touched.district && errors.district}
              </HelperText>
            </View>

            <View style={styles.inputContainer}>
              <TextInput
                label="Cidade"
                value={values.city}
                onChangeText={handleChange('city')}
                onBlur={handleBlur('city')}
                mode="outlined"
                error={touched.city && !!errors.city}
                disabled={!values.city}
              />
              <HelperText type="error" visible={touched.city && !!errors.city}>
                {touched.city && errors.city}
              </HelperText>
            </View>

            <Text style={styles.sectionTitle}>UF</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={values.uf}
                onValueChange={(value) => handleSelect(value)}
                style={styles.picker}
                enabled={!!values.uf}
              >
                <Picker.Item label="Selecione o estado" value="" />
                {brazilianStates.map((estado) => (
                  <Picker.Item key={estado} label={estado} value={estado} />
                ))}
              </Picker>
            </View>
            <HelperText type="error" visible={touched.uf && !!errors.uf}>
              {touched.uf && errors.uf}
            </HelperText>

            <Text style={styles.sectionTitle}>CNPJ</Text>
            <View style={styles.inputContainer}>
              <MaskedTextInput
                mask="99.999.999/9999-99"
                value={values.cnpj}
                onChangeText={(text, rawText) => {
                  debouncedSetCNPJ(rawText);
                }}
                onBlur={handleBlur('cnpj')}
                keyboardType="numeric"
                style={[
                  styles.maskedInput,
                  touched.cnpj && errors.cnpj && { borderColor: 'red', borderWidth: 1 },
                ]}
                placeholder="00.000.000/0000-00"
              />
              <HelperText type="info">Formato: 00.000.000/0000-00</HelperText>
              <HelperText type="error" visible={touched?.cnpj && !!errors?.cnpj}>
                {touched?.cnpj && errors?.cnpj}
              </HelperText>
            </View>

            <Button
              mode="contained"
              onPress={() => handleSubmit()}
              style={styles.button}
              buttonColor="#d32f2f"
              disabled={!isValid || !dirty}
              icon="store"
            >
              Cadastrar Restaurante
            </Button>
          </>
        }}
      </Formik>
          </Card.Content>
        </Card>
      </ScrollView>
    </View>
  );
}