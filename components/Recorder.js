import React, { useState } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';

const Recorder = ({ onRecordingComplete }) => {
  const [recording, setRecording] = useState(null);
  const [status, setStatus] = useState('Idle'); // Idle, Recording, Finished

  // Start recording audio
  const startRecording = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Permission to access microphone is required');
        return;
      }
      const recordingInstance = new Audio.Recording();
      await recordingInstance.prepareToRecordAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY);
      await recordingInstance.startAsync();
      setRecording(recordingInstance);
      setStatus('Recording');
    } catch (error) {
      console.error('Error starting the recording:', error);
    }
  };

  // Stop the recording and pass the URI to the parent component
  const stopRecording = async () => {
    try {
      await recording.stopAndUnloadAsync();
      const uri = recording.getURI();
      onRecordingComplete(uri); // Send URI of the recorded file
      setStatus('Finished');
    } catch (error) {
      console.error('Error stopping the recording:', error);
    }
  };

  return (
    <View style={styles.recorderContainer}>
      <Text>Status: {status}</Text>
      {status === 'Idle' ? (
        <Button title="Start Recording" onPress={startRecording} />
      ) : (
        <Button title="Stop Recording" onPress={stopRecording} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  recorderContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
});

export default Recorder;
