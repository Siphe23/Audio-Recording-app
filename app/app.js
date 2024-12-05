import React, { useState } from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import Recorder from './Recorder';
import VoiceNotesList from './VoiceNotesList';

const App = () => {
  const [voiceNotes, setVoiceNotes] = useState([]);

  // Add new recording to the list
  const handleRecordingComplete = (uri) => {
    const newNote = {
      uri,
      date: new Date().toLocaleString(),
      duration: Math.floor(Math.random() * 5) + 1, // Mock duration in seconds
    };
    setVoiceNotes([...voiceNotes, newNote]);
  };

  // Delete a specific note by URI
  const handleDeleteNote = (uri) => {
    setVoiceNotes(voiceNotes.filter((note) => note.uri !== uri));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Audio Recording App</Text>
      <Recorder onRecordingComplete={handleRecordingComplete} />
      <VoiceNotesList voiceNotes={voiceNotes} onDelete={handleDeleteNote} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default App;
