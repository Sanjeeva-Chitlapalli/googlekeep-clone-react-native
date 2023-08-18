import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const Header = () => {
  return (
    <View style={styles.header}>
      <Image
        source={{
          uri: 'https://www.gstatic.com/images/branding/product/1x/keep_2020q4_48dp.png',
        }}
        style={styles.logo}
      />
      <Text style={styles.title}>Keep</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    backgroundColor: '#333', // Dark background color
    padding: 20,
    alignItems: 'center',
    marginTop: -10, // Adjust as needed
  },
  logo: {
    width: 48,
    height: 48,
    resizeMode: 'contain',
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff', // White text color
  },
});

export default Header;
