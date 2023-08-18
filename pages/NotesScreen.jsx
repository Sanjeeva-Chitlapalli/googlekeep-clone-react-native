import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import CreateArea from '../components/CreateArea';
import Note from '../components/Note';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MasonryList from '@react-native-seoul/masonry-list';

const NotesScreen = () => {
  const [notes, setNotes] = useState([]);
  const [editedNote, setEditedNote] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedContent, setEditedContent] = useState('');

  const loadNotes = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem('notes');
      if (storedNotes !== null) {
        setNotes(JSON.parse(storedNotes));
      }
    } catch (error) {
      console.error('Error loading notes:', error);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const saveNotes = async updatedNotes => {
    try {
      await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
    } catch (error) {
      console.error('Error saving notes:', error);
    }
  };

  const addNote = newNote => {
    setNotes(prevValue => {
      const updatedNotes = [...prevValue, newNote];
      saveNotes(updatedNotes);
      return updatedNotes;
    });
  };

  const deleteNote = id => {
    setNotes(prevValue => {
      const updatedNotes = prevValue.filter((note, index) => index !== id);
      saveNotes(updatedNotes);
      return updatedNotes;
    });
  };

  const openEditModal = note => {
    setEditedNote(note);
    setEditedTitle(note.title);
    setEditedContent(note.content);
  };

  const handleSaveEdit = () => {
    if (editedNote) {
      const updatedNotes = notes.map((note, index) => {
        if (index === editedNote.id) {
          return {
            ...note,
            title: editedTitle,
            content: editedContent,
          };
        }
        return note;
      });

      saveNotes(updatedNotes);
      setNotes(updatedNotes);
      setEditedNote(null);
      setEditedTitle('');
      setEditedContent('');
    }
  };

  return (
    <View style={styles.container}>
      <CreateArea onAdd={addNote} />
      <MasonryList
        data={notes}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        renderItem={({item}) => (
          <Note
            id={item.id}
            title={item.title}
            content={item.content}
            onDelete={deleteNote}
            onEdit={openEditModal}
          />
        )}
        onRefresh={() => loadNotes()}
        contentContainerStyle={styles.notesList}
      />
      <Modal
        visible={editedNote !== null}
        animationType="slide"
        onRequestClose={() => setEditedNote(null)}>
        <View style={styles.modalContent}>
          <TextInput
            value={editedTitle}
            onChangeText={setEditedTitle}
            style={styles.editTitleInput}
          />
          <TextInput
            value={editedContent}
            onChangeText={setEditedContent}
            multiline
            style={styles.editContentInput}
          />
          <TouchableOpacity onPress={handleSaveEdit} style={styles.saveButton}>
            <Text>Save</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Dark background color
    padding: 10,
  },
  modalContent: {
    flex: 1,
    backgroundColor: '#212121', // Dark background color for modal content
    padding: 20,
  },
  editTitleInput: {
    fontSize: 20,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    color: '#fff', // White text color
  },
  editContentInput: {
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    textAlignVertical: 'top',
    color: '#fff', // White text color
  },
  saveButton: {
    backgroundColor: '#ffd35b',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
});

export default NotesScreen;
