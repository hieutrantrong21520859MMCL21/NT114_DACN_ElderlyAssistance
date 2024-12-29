import { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native';

import { auth } from '../../server/firebase'; // Firebase config
import { signOut } from 'firebase/auth';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons
import { AuthContext } from '../../contexts/AuthContext';

export default function SettingsScreen({ navigation }) {
  const [avatar, setAvatar] = useState(auth.currentUser?.photoURL || "https://via.placeholder.com/150");
  const [name, setName] = useState(auth.currentUser?.displayName || 'Guest User');
  const user = auth.currentUser; // Get current logged-in user
  const context = useContext(AuthContext);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        Alert.alert("Announcement", "You have logged out successfully.");
        context.method.setUser({});
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

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: avatar }}
          style={styles.avatar}
        />
        <Text style={styles.username}>{name}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      {/* Options */}
      <View style={styles.options}>
        <TouchableOpacity 
          style={styles.optionItem} 
          onPress={() => navigation.navigate("Editing")}
        >
          <Ionicons name="person-outline" size={20} color="#333" />
          <Text style={styles.optionText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.optionItem} 
          onPress={() => navigation.navigate("ChangingPassword")}
        >
          <Ionicons name="lock-closed-outline" size={20} color="#333" />
          <Text style={styles.optionText}>Change Password</Text>
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
    padding: 20
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