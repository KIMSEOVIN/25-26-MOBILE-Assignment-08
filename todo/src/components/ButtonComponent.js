import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const ButtonComponent = ({ text, onPress, disabled }) => {
  return (
    <TouchableOpacity 
   
      style={[
        styles.button, 
        disabled ? styles.buttonDisabled : styles.buttonActive 
      ]} 
      onPress={onPress}
      disabled={disabled} //비활성화 함수
    >
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
 
  button: {
    width: '80%',
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 20, 
  },

  buttonActive: {
    backgroundColor: 'blue', 
  },
  buttonDisabled: {
    backgroundColor: '#B0C4DE', // 비활성화할때는 연한파랑
  },
  text: {
    color: 'white', 
    textAlign: 'center',
    fontSize: 16,
  }
});

export default ButtonComponent;