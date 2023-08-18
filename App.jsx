import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Header from './components/Header';
import NotesScreen from './pages/NotesScreen';
import TodoScreen from './pages/TodoScreen';
import {Text, View, StyleSheet} from 'react-native';

const Tab = createMaterialTopTabNavigator(); // Use createMaterialTopTabNavigator

const App = () => {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <Header />
        <View style={styles.tabContainer}>
          <Tab.Navigator
            tabBarOptions={{
              labelStyle: {fontSize: 14},
              activeTintColor: 'white',
              inactiveTintColor: 'gray',
              style: {backgroundColor: '#3333'},
              indicatorStyle: {
                backgroundColor: '#ffd35b',
                height: '6%',
              },
            }}>
            <Tab.Screen name="Notes" component={NotesScreen} />
            <Tab.Screen name="Todos" component={TodoScreen} />
          </Tab.Navigator>
        </View>
      </View>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabContainer: {
    flex: 1,
  },
});

export default App;
