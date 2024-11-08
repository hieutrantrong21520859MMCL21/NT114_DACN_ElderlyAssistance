import React from 'react';
import { View, Text, StyleSheet, SectionList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const featuresData = [
  {
    title: 'Medical',
    data: [
      { id: '1', name: 'Schedule Medicine', icon: '💊' },
      { id: '2', name: 'Exercise', icon: '🏋️' },
    ],
  },
  {
    title: 'Entertainment',
    data: [
      { id: '3', name: 'News', icon: '📰' },
      { id: '4', name: 'Music', icon: '🎶' },
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
          alert('Exercise screen not implemented yet');
          break;
        case 'News':
          alert('News screen not implemented yet');
          break;
        case 'Music':
          alert('Music screen not implemented yet');
          break;
        default:
          alert(`Navigating to ${item.name}`);
      }
    };

    return (
      <TouchableOpacity style={styles.featureItem} onPress={handlePress}>
        <Text style={styles.icon}>{item.icon}</Text>
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
    fontSize: 24,
    marginRight: 15,
    color: '#1D8CF8',
  },
  featureName: {
    fontSize: 18,
    color: '#333',
  },
});
