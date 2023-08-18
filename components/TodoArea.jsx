import React, {useState} from 'react';
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const TodoArea = ({onAdd}) => {
  const [todo, setTodo] = useState('');

  const submitButton = () => {
    if (todo.trim() !== '') {
      onAdd(todo);
      setTodo('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        value={todo}
        placeholder="Add a new todo..."
        placeholderTextColor="#ddd"
        onChangeText={value => setTodo(value)}
        style={styles.input}
      />
      <TouchableOpacity onPress={submitButton} style={styles.addButton}>
        <Image source={require('../assets/add.png')} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#121212',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#ddd',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  addButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 3,
    borderColor: '#ffd35b',
    borderRadius: 60,
  },
  addButtonText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default TodoArea;
