// RegistrationScreen.js

import React, { useState } from "react";
import { TextInput, Text, Button } from "@react-native-material/core";
import { ScrollView, KeyboardAvoidingView, View, StyleSheet, Image, ImageBackground, Platform, Alert } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { createUserWithEmailAndPassword } from "firebase/auth"; // Import Firebase auth
import { auth } from "../firebase"; // Import Firebase config với 'auth'

export default function RegistrationScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const [isConfirmPasswordSecure, setIsConfirmPasswordSecure] = useState(true);
  const [iconPassword, setIconPassword] = useState('eye-off');
  const [iconConfirmPassword, setIconConfirmPassword] = useState('eye-off');
  const [passwordsMatch, setPasswordsMatch] = useState(true); // State to track if passwords match

  const checkIsPasswordSecure = () => {
    setIsPasswordSecure(!isPasswordSecure);
    setIconPassword(isPasswordSecure ? 'eye' : 'eye-off');
  };

  const checkIsConfirmPasswordSecure = () => {
    setIsConfirmPasswordSecure(!isConfirmPasswordSecure);
    setIconConfirmPassword(isConfirmPasswordSecure ? 'eye' : 'eye-off');
  };

  const handleRegister = () => {
    if (password !== confirmPassword) {
      Alert.alert("Passwords do not match");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        const user = userCredential.user;
        Alert.alert("Registered successfully", `Welcome, ${user.email}!`);
        navigation.navigate('Login'); // Navigate to Login after successful registration
      })
      .catch(error => {
        Alert.alert("Registration failed", error.message);
      });
  };

  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
    if (password !== text) {
      setPasswordsMatch(false);
    } else {
      setPasswordsMatch(true);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
      <ScrollView style={{ width: '100%' }}>
        <View style={styles.header}>
          <ImageBackground style={styles.header_background} source={require('../assets/images/sky_bg.png')}>
            <Text style={styles.header_title} variant="h3">Sign up</Text>
            <Image source={require('../assets/images/logo.png')} />
          </ImageBackground>
        </View>

        <View style={styles.form}>
          <TextInput
            variant="outlined"
            label="Email"
            placeholder="abc123@gmail.com"
            onChangeText={string => setEmail(string)}
            value={email}
          />

          <TextInput
            variant="outlined"
            label="Password"
            placeholder="123"
            secureTextEntry={isPasswordSecure}
            value={password}
            onChangeText={string => setPassword(string)}
            trailing={() => (
              <Icon name={iconPassword} size={24} onPress={checkIsPasswordSecure} />
            )}
          />

          <TextInput
            variant="outlined"
            label="Confirm password"
            placeholder="123"
            secureTextEntry={isConfirmPasswordSecure}
            value={confirmPassword}
            onChangeText={handleConfirmPasswordChange}
            trailing={() => (
              <Icon name={iconConfirmPassword} size={24} onPress={checkIsConfirmPasswordSecure} />
            )}
          />

          {!passwordsMatch && (
            <Text style={styles.errorText}>Passwords do not match</Text>
          )}

          <Button
            style={styles.form_btnRegister}
            title="Create Account"
            titleStyle={{ fontSize: 24 }}
            onPress={handleRegister}
            disabled={!passwordsMatch}
          />

          <View style={styles.lineBreak}>
            <Text>OR</Text>
          </View>

          <Button
            style={styles.form_btnLogin}
            title="Sign In"
            titleStyle={{ fontSize: 24 }}
            onPress={() => navigation.navigate('Login')}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    width: '100%',
    flex: 1,
  },
  header_background: {
    width: '100%',
    paddingTop: 80,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    rowGap: 32,
  },
  header_title: {
    fontFamily: 'Sofadi One',
    fontWeight: '700',
    color: 'white',
    textTransform: 'uppercase',
  },
  form: {
    width: '100%',
    padding: 48,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    rowGap: 16,
  },
  form_btnRegister: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#0096FF',
  },
  lineBreak: {
    width: 180,
    borderTopWidth: 1,
    borderTopColor: 'gray',
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form_btnLogin: {
    width: '80%',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#0096FF',
    alignSelf: 'center',
  },
  errorText: {
    color: 'red',
    marginTop: 8,
  },
});

