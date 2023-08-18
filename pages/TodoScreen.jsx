import React, {useState, useEffect} from 'react';
import {View, FlatList, StyleSheet, ScrollView} from 'react-native';
import TodoArea from '../components/TodoArea';
import TodoItem from '../components/TodoItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TodoScreen = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      const storedTodos = await AsyncStorage.getItem('todos');
      if (storedTodos !== null) {
        setTodos(JSON.parse(storedTodos));
      }
    } catch (error) {
      console.error('Error loading todos:', error);
    }
  };

  const saveTodos = async updatedTodos => {
    try {
      await AsyncStorage.setItem('todos', JSON.stringify(updatedTodos));
    } catch (error) {
      console.error('Error saving todos:', error);
    }
  };

  const addTodo = newTodo => {
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    saveTodos(updatedTodos);
  };

  const deleteTodo = index => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
    saveTodos(newTodos);
  };

  return (
    <ScrollView style={styles.container}>
      <View >
        <TodoArea onAdd={addTodo} />
        <FlatList
          data={todos}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item, index}) => (
            <TodoItem text={item} onDelete={() => deleteTodo(index)} />
          )}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 10,
  },
});

export default TodoScreen;
