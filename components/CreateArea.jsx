import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
// import { Ionicons } from "@expo/vector-icons";

const CreateArea = ({onAdd}) => {
  const [isExpanded, setExpanded] = useState(false);
  const [note, setNote] = useState({
    title: '',
    content: '',
  });

  const handleChange = (name, value) => {
    setNote(prevValue => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  };

  const submitButton = () => {
    onAdd(note);
    setNote({
      title: '',
      content: '',
    });
    setExpanded(false);
  };

  const handleExpanded = () => {
    setExpanded(true);
  };

  return (
    <View>
      <View style={styles.inputContainer}>
        {isExpanded && (
          <TextInput
            value={note.title}
            placeholder="Title"
            placeholderTextColor="#ddd"
            onChangeText={value => handleChange('title', value)}
            style={styles.titleInput}
          />
        )}
        <TextInput
          value={note.content}
          placeholder="Take a note..."
          placeholderTextColor="#ddd"
          onChangeText={value => handleChange('content', value)}
          multiline={isExpanded}
          onFocus={handleExpanded}
          style={styles.contentInput}
        />
      </View>
      <TouchableOpacity onPress={submitButton} style={styles.addButton}>
        <Image source={require('../assets/add.png')} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#444', // Dark border color
  },
  titleInput: {
    fontSize: 18,
    color: '#fff', // White text color
  },
  contentInput: {
    fontSize: 16,
    paddingVertical: 5,
    paddingHorizontal: 10,
    color: '#fff', // White text color
  },
  addButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 3,
    borderColor: '#ffd35b',
    borderRadius: 60,
    alignSelf: 'flex-end',
    marginBottom: 10,
    marginRight: 2,
    backgroundColor: '#333', // Dark background color for button
  },
  addButtonIcon: {
    tintColor: '#ffd35b', // Yellow color for the icon
  },
});

export default CreateArea;
