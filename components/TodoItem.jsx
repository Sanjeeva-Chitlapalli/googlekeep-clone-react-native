import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';

const TodoItem = ({text, onDelete}) => {
  const [completed, setCompleted] = useState(false);

  const toggleCompleted = () => {
    setCompleted(prevCompleted => !prevCompleted);
  };

  return (
    <View style={[styles.container, completed && styles.completedContainer]}>
      <TouchableOpacity onPress={toggleCompleted} style={styles.completeButton}>
        <Text style={{color: 'white'}}>
          {completed ? '✓' : ''}
          <Image source={require('../assets/check1.png')} width={5}></Image>
        </Text>
      </TouchableOpacity>
      <Text style={[styles.text, completed && styles.completedText]}>
        {text}
      </Text>
      <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
        <Image source={require('../assets/delete.png')} height={20} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 15,
  },
  completedContainer: {
    backgroundColor: '#444', // Adjust the color for completed todos
    opacity: 0.7,
  },
  text: {
    flex: 1,
    fontSize: 16,
    color: '#ddd',
  },
  completedText: {
    textDecorationLine: 'line-through', // Add line-through for completed todos
  },
  completeButton: {
    marginRight: 10,
    marginTop: -20,
  },
  deleteButton: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    height: 20,
  },
});

export default TodoItem;
