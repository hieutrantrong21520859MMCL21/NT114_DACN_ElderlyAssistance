import React from 'react';
import { View, Text, StyleSheet, SectionList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

const featuresData = [
  {
    title: 'Medical',
    data: [
      { id: '1', name: 'Schedule Medicine', icon: 'medkit' },
      { id: '2', name: 'Exercise', icon: 'fitness' },
    ],
  },
  {
    title: 'Entertainment',
    data: [
      { id: '3', name: 'News', icon: 'newspaper' },
      { id: '4', name: 'Music', icon: 'musical-notes' },
      { id: '5', name: 'Audio Book', icon: 'book' },
    ],
  },
  {
    title: 'OneClick',
    data: [
      { id: '6', name: 'Chatbot', icon: 'chatbubbles' },
      { id: '7', name: 'Support', icon: 'help-circle' },
      { id: '8', name: 'SOS', icon: 'alert-circle' },
    ],
  },
];

export default function HomeScreen({ navigation }) {
  const renderFeatureItem = ({ item }) => {
    const handlePress = () => {
      switch (item.name) {
        case 'Schedule Medicine':
          navigation.navigate('ScheduleMedicine');
          break;
        case 'Exercise':
          navigation.navigate('Exercise');
          break;
        case 'News':
          alert('News screen not implemented yet');
          break;
        case 'Music':
          navigation.navigate('Music');
          break;
        case 'Audio Book':
          navigation.navigate('AudioBook');
          break;
        case 'Chatbot':
          alert('Chatbot screen not implemented yet');
          break;
        case 'Support':
          alert('Support screen not implemented yet');
          break;
        case 'SOS':
          alert('SOS feature activated');
          break;
        default:
          alert(`Navigating to ${item.name}`);
      }
    };

    const isSOS = item.name === 'SOS';
    const itemStyle = isSOS
      ? [styles.featureItem, styles.sosButton]
      : styles.featureItem;

    const iconStyle = isSOS ? [styles.icon, styles.sosIcon] : styles.icon;

    return (
      <TouchableOpacity style={itemStyle} onPress={handlePress}>
        <Ionicons name={item.icon} size={24} style={iconStyle} />
        <Text style={styles.featureName}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SectionList
      sections={featuresData}
      keyExtractor={(item) => item.id}
      renderItem={renderFeatureItem}
      renderSectionHeader={({ section }) => (
        <Text style={styles.sectionTitle}>{section.title}</Text>
      )}
      contentContainerStyle={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 20,
    paddingTop: 80,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
    marginBottom: 10,
  },
  icon: {
    marginRight: 15,
    color: '#1D8CF8',
  },
  featureName: {
    fontSize: 18,
    color: '#333',
  },
  sosButton: {
    backgroundColor: '#FFCCCC',
    borderColor: '#FF0000',
    borderWidth: 1,
  },
  sosIcon: {
    color: '#FF0000',
  },
});
