import React, { useState } from 'react';
import { FlatList, View, Text, Button, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';

const VoiceNotesList = ({ voiceNotes, onDelete }) => {
  const [sound, setSound] = useState();

  // Play the audio note when clicked
  const playSound = async (uri) => {
    const { sound } = await Audio.Sound.createAsync({ uri });
    setSound(sound);
    await sound.playAsync();
  };

  return (
    <View>
      <FlatList
        data={voiceNotes}
        keyExtractor={(item) => item.uri}
        renderItem={({ item }) => (
          <View style={styles.noteItem}>
            <Text>Date: {item.date}</Text>
            <Text>Duration: {item.duration}s</Text>
            <Button title="Play" onPress={() => playSound(item.uri)} />
            <Button title="Delete" onPress={() => onDelete(item.uri)} />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  noteItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
});

export default VoiceNotesList;
