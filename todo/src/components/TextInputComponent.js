import { MaterialIcons } from "@expo/vector-icons";
import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';


const InputComponent = ({ 
  labelName2, 
  iconName, 
  placeholder, 
  isPassword,
  value, 
  onChangeText 
}) => {
  return (
    <View >
      <Text>{labelName2}</Text>
    
      <View style={styles.container}>
  
        <View style={styles.iconContainer}>
          <MaterialIcons name={iconName} size={20} color='gray' />
        </View>

        <TextInput 
          style={styles.input}
          placeholder={placeholder} 
          secureTextEntry={isPassword}
          value={value}               
          onChangeText={onChangeText} 
          
        />
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container3:{
    flexDirection:'column'
  },
  container: {
    flexDirection: 'row', 
    alignItems: 'center', 
    width: '80%', 
    marginBottom: 15, 
  },
  iconContainer: {
    position: 'absolute',
    left: 10,
  },
  input: {
    flex: 1, 
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingLeft: 40,
    paddingRight: 15, 
  }
});

export default InputComponent;