import React, { useState } from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { TextInput, Button, Text, HelperText, Card, Title } from 'react-native-paper';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../../route-types';
import { LoadingOverlay } from '../../components/loading-overlay';
import { Formik } from 'formik';
import { login as loginController } from '../../../controller/login-controller';
import { loginValidationSchema } from '../../../utils/validation';
import { showError } from '../../../utils/error-handler';

type Navigation = NativeStackNavigationProp<RootStackParamList>;

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<Navigation>();

  const handleLogin = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const result = await loginController(values.email, values.password);
      if (typeof result === 'string') {
        showError('Erro de Login', result);
        return;
      }
      navigation.navigate('Home');
    } catch (error) {
      showError('Erro', 'Erro inesperado. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <LoadingOverlay visible={loading} />

      <Card style={styles.card}>
        <Card.Content style={styles.content}>
          <Image
            source={require('../../../../assets/logotipo.png')}
            style={styles.logo}
            resizeMode="contain"
          />

          <Title style={styles.title}>Entrar</Title>

          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={loginValidationSchema}
            onSubmit={handleLogin}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isValid, dirty }) => (
              <>
                <View style={styles.inputContainer}>
                  <TextInput
                    label="Email"
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    mode="outlined"
                    error={touched.email && !!errors.email}
                  />
                  <HelperText type="error" visible={touched.email && !!errors.email}>
                    {errors.email}
                  </HelperText>
                </View>

                <View style={styles.inputContainer}>
                  <TextInput
                    label="Senha"
                    value={values.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    secureTextEntry
                    mode="outlined"
                    error={touched.password && !!errors.password}
                  />
                  <HelperText type="error" visible={touched.password && !!errors.password}>
                    {errors.password}
                  </HelperText>
                </View>

                <TouchableOpacity onPress={() => showError('Recuperar senha', 'Funcionalidade ainda não implementada.')}>
                  <Text style={styles.forgotPassword}>Esqueceu a senha?</Text>
                </TouchableOpacity>

                <Button
                  mode="contained"
                  onPress={() => handleSubmit()}
                  buttonColor="#d32f2f"
                  style={styles.loginButton}
                  disabled={!isValid || !dirty}
                >
                  Entrar
                </Button>

                <Text style={styles.footerText}>
                  Você não tem uma conta?{' '}
                  <Text style={styles.link} onPress={() => navigation.navigate('UserRegistration')}>
                    Crie uma
                  </Text>
                </Text>
              </>
            )}
          </Formik>
        </Card.Content>
      </Card>
    </View>
  );
}
