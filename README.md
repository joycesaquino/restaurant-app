# 🍽️ App Mobile - Cardápio de Restaurante

Este é um projeto desenvolvido como parte do **Trabalho Prático da     disciplina de Aplicações Mobile**. O aplicativo simula o cardápio      digital  de um restaurante, com funcionalidades completas de cadastro, login e gerenciamento de pratos, restaurantes e usuários.

## 📱 Funcionalidades

### Funcionalidades Obrigatórias

1. **Tela de Login**
   - Campos: e-mail e senha
   - Botão: "Entrar"
   - Link: “Não possui conta? Cadastre-se”

2. **Cadastro de Usuário**
   - Nome completo
   - E-mail (com validação de formato)
   - Senha
   - Tipo de usuário: cliente ou admin

3. **Cadastro de Restaurante** (somente para usuários admin)
   - Nome do restaurante
   - Endereço completo:
     - Rua, número, CEP, Bairro, Cidade, UF
     - Latitude e Longitude (simulados ou reais)
   - CNPJ (com máscara de formatação)

4. **Cadastro de Produto / Prato** (somente para usuários admin)
   - Nome do prato
   - Descrição
   - Preço
   - Imagem (upload ou via link)

5. **Lista de Cardápio** (acessível a todos)
   - Exibição dos pratos em uma lista vertical
   - Imagem à esquerda
   - Nome do prato em negrito
   - Descrição logo abaixo
   - Preço exibido à direita ou abaixo

## 🛠️ Tecnologias Utilizadas

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [TypeScript](https://www.typescriptlang.org/) (opcional)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/) (para persistência local)
- Navigation Stack

## 🎥 Demonstração em Vídeo

📺 Assista ao vídeo de apresentação do app pelo link abaixo:

🔗 [Link para o vídeo no Google Drive]([https://youtube.com/seu-video-aqui](https://drive.google.com/file/d/1HlIaAh5TOVc_KekvrVlncnn0jFjrOeuN/view?usp=drive_link))  
Note: Deixei a configuração de acesso para que qualquer pessoa com o link consiga acessar o vídeo, não consegui fazer upload no github por conta do tamanho e por isso mantive o GDrive, qualquer problema de acesso posso disponibilizar por outro meio.


## 🔗 Repositório

- Use a versão mais atualizada do node js
- npm install
- npx expo start
- acesso na porta http://localhost:8081/ , via qr code ou endereço de IP na rede local  exp://192.168.68.{..}:8081

---
O projeto foi feito de forma colaborativa no repositório principal https://github.com/AllissonFilipe/restaurant-app.git

**Grupo:** Allison Felipe, Aryel Penido e Joyce Aquino

**Aluno:** Joyce Aquino  

**Curso:** Arquitetura de Software Distribuído  

**Professor:** Fernando Pereira  

**Entrega Individual - Trabalho Prático: App Mobile - Cardápio de Restaurante**
