﻿import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';
import { auth } from '../firebase'; // Firebase config
import { signOut } from 'firebase/auth';
import { launchImageLibrary } from 'react-native-image-picker'; // Import image picker
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons

export default function SettingScreen({ navigation }) {
  const [avatar, setAvatar] = useState(auth.currentUser?.photoURL || "https://via.placeholder.com/150");
  const [name, setName] = useState(auth.currentUser?.displayName || 'Guest User');
  const user = auth.currentUser; // Get current logged-in user

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        Alert.alert("Logged out", "You have been logged out successfully.");
        navigation.navigate("Login");
      })
      .catch((error) => {
        Alert.alert("Logout failed", error.message);
      });
  };

  useEffect(() => {
    // Update the name and avatar when returning from EditProfileScreen
    const unsubscribe = navigation.addListener('focus', () => {
      setName(auth.currentUser?.displayName || 'Guest User');
      setAvatar(auth.currentUser?.photoURL || "https://via.placeholder.com/150");
    });

    return unsubscribe;
  }, [navigation]);

  const handleAvatarChange = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 1 }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const selectedAvatar = response.assets[0].uri; 
        setAvatar(selectedAvatar); 
        // Optionally upload the new avatar to Firebase and update user profile
      }
    });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleAvatarChange}>
          <Image
            source={{ uri: avatar }}
            style={styles.avatar}
          />
        </TouchableOpacity>
        <Text style={styles.username}>{name}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      {/* Options */}
      <View style={styles.options}>
        <TouchableOpacity 
          style={styles.optionItem} 
          onPress={() => navigation.navigate("EditProfile")}
        >
          <Ionicons name="person-outline" size={20} color="#333" />
          <Text style={styles.optionText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.optionItem} 
          onPress={() => navigation.navigate("ChangePassword")}
        >
          <Ionicons name="lock-closed-outline" size={20} color="#333" />
          <Text style={styles.optionText}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.optionItem}>
          <Ionicons name="settings-outline" size={20} color="#333" />
          <Text style={styles.optionText}>App Settings</Text>
        </TouchableOpacity>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color="#fff" />
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    padding: 20,
    paddingTop: 60,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
    backgroundColor: "#fff",
    width: "100%",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  email: {
    fontSize: 14,
    color: "#666",
  },
  options: {
    width: "100%",
    marginBottom: 30,
  },
  optionItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    color: "#333",
    marginLeft: 10,
  },
  logoutButton: {
    backgroundColor: "#FF3B30",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoutButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 10,
  },
});
