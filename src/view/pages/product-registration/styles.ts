import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#ffffff',
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  content: {
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#d32f2f',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 12,
  },
  imageButton: {
    marginBottom: 16,
    borderRadius: 8,
  },
  imagePreview: {
    width: '100%',
    height: 180,
    marginBottom: 16,
    borderRadius: 12,
  },
  submitButton: {
    marginTop: 16,
    borderRadius: 8,
    paddingVertical: 4,
  },
});