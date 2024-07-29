import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, TextInput, TouchableOpacity, Button, Dimensions, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Spinner from 'react-native-loading-spinner-overlay';
import Colors from '@/constants/Colors';
import { Link } from 'expo-router';
import { useAuth } from '@/context/AuthContext';
import * as SecureStore from 'expo-secure-store';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const Page = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { onLogin, onRegister } = useAuth();
    const [initialized, setInitialized] = useState(false);

    const onSignInPress = async () => {
        setLoading(true);

        try {
            const result = await onLogin!(email, password);
            console.log("~ file: index.tsx:24 ~ onSignInPress ~ result:", result);
        } catch (e) {
            Alert.alert('Error', 'could not login');
        } finally {
            setLoading(false);
        }
    };

    const onSignUpPress = async () => {
        setLoading(true);

        try {
            const result = await onRegister!(email, password);
            console.log("~ file: index.tsx:24 ~ onSignUpPress ~ result:", result);
        } catch (e) {
            Alert.alert('Error', 'could not login');
        } finally {
            setLoading(false);
        }
    };

  return (
    <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Spinner visible={loading} />
      <Text style={styles.header}>Meet Me</Text>
      <Text style={styles.subHeader}>The fastest way to meet</Text>
      <TextInput 
        autoCapitalize="none"
        placeholder="joe@joe.com"
        value={email}
        onChangeText={setEmail}
        style={styles.inputField}
      />
      <TextInput 
        placeholder="password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.inputField}
      />
      <TouchableOpacity onPress={onSignInPress} style={styles.button}>
        <Text style={{ color: '#fff' }}>Sign In</Text>
      </TouchableOpacity>
      <Button
        title="Don't have an account? Sign Up"
        onPress={onSignUpPress}
        color={Colors.primary}
      ></Button>

    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingHorizontal: WIDTH > HEIGHT ? '30%' : 20,
        justifyContent: 'center'
    },
    header: {
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 10
    },
    subHeader: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 40
    },
    inputField: {
        marginVertical: 4,
        height: 50,
        borderWidth: 1,
        borderColor: Colors.primary,
        borderRadius: 4,
        padding: 10
    },
    button: {
        marginVertical: 15,
        alignItems: 'center',
        backgroundColor: Colors.primary,
        padding: 12,
        borderRadius: 4
    }
});

export default Page;