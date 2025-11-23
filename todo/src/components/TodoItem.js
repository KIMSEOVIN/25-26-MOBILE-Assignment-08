import React, { memo } from 'react'; 
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 

const TodoItem = ({ item }) => {
  return (
    <View style={styles.container}>
   
      <TouchableOpacity style={styles.icon}>
        <MaterialIcons name="check-box-outline-blank" size={24} color="gray" />
      </TouchableOpacity>
      
      
      <Text style={styles.text}>{item.text}</Text>

   
      <TouchableOpacity style={styles.icon}>
        <MaterialIcons name="delete-outline" size={24} color="gray" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  icon: {
    padding: 5,
  },
  text: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
  },
});

export default memo(TodoItem);