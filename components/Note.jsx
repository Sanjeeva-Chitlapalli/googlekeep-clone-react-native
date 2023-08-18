import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';

const Note = ({title, content, onDelete, id, onEdit}) => {
  const handleEditButton = () => {
    if (onEdit) {
      onEdit({id, title, content});
    }
  };

  return (
    <View style={styles.note}>
      <TouchableOpacity onPress={handleEditButton} style={styles.editButton}>
        <Image source={require('../assets/edit.png')} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => onDelete(id)}
        style={styles.deleteButton}>
        <Image source={require('../assets/delete.png')} height={100} />
      </TouchableOpacity>
      <Text style={styles.noteTitle}>{title}</Text>
      <Text style={styles.noteContent}>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  note: {
    backgroundColor: '#333', // Dark background color
    padding: 10,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#444', // Dark border color
    position: 'relative',
  },
  noteTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#fff', // White text color
  },
  noteContent: {
    fontSize: 16,
    color: '#fff', // White text color
  },
  editButton: {
    position: 'absolute',
    top: 5,
    right: 40,
    zIndex: 1,
    backgroundColor: '#555', // Dark background color for edit button
    padding: 5,
    borderRadius: 5,
  },
  deleteButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 1,
    paddingLeft: 5,
    backgroundColor: '#555',
    // Dark background color for edit button
    padding: 5,
    borderRadius: 5,
  },
});

export default Note;
