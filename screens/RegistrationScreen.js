import React, { useState } from "react";
import { TextInput, Text } from "@react-native-material/core";
import { ScrollView, KeyboardAvoidingView, View, StyleSheet, Image, ImageBackground, Platform, Alert, TouchableOpacity } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"; // Import updateProfile
import { auth } from "../firebase"; // Import Firebase config

export default function RegistrationScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState(''); // New state for username
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const [isConfirmPasswordSecure, setIsConfirmPasswordSecure] = useState(true);
  const [iconPassword, setIconPassword] = useState('eye-off');
  const [iconConfirmPassword, setIconConfirmPassword] = useState('eye-off');
  const [passwordsMatch, setPasswordsMatch] = useState(true);

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
      .then(async (userCredential) => {
        const user = userCredential.user;
        // Update displayName with username
        await updateProfile(user, { displayName: username });
        Alert.alert("Registered successfully", `Welcome, ${user.displayName}!`);
        navigation.navigate('Login');
      })
      .catch(error => {
        Alert.alert("Registration failed", error.message);
      });
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
            label="Username"
            placeholder="Your Name"
            onChangeText={setUsername}
            value={username}
            style={styles.input}
          />

          <TextInput
            variant="outlined"
            label="Email"
            placeholder="abc123@gmail.com"
            onChangeText={setEmail}
            value={email}
            style={styles.input}
          />

          <TextInput
            variant="outlined"
            label="Password"
            placeholder="123"
            secureTextEntry={isPasswordSecure}
            value={password}
            onChangeText={setPassword}
            style={styles.input}
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
            onChangeText={(text) => {
              setConfirmPassword(text);
              setPasswordsMatch(password === text);
            }}
            style={styles.input}
            trailing={() => (
              <Icon name={iconConfirmPassword} size={24} onPress={checkIsConfirmPasswordSecure} />
            )}
          />

          {!passwordsMatch && (
            <Text style={styles.errorText}>Passwords do not match</Text>
          )}

          <TouchableOpacity
            style={[styles.form_btn, styles.form_btnRegister]}
            onPress={handleRegister}
            disabled={!passwordsMatch || !username}
          >
            <Text style={styles.form_btnText}>Create Account</Text>
          </TouchableOpacity>
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
  input: {
    width: '100%',
    marginBottom: 16,
  },
  form_btn: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form_btnRegister: {
    backgroundColor: '#0096FF',
    marginTop: 16,
  },
  form_btnLogin: {
    backgroundColor: '#0096FF',
    marginTop: 8,
  },
  form_btnText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
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
  errorText: {
    color: 'red',
    marginTop: 8,
  },
});
