
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const ImageComponent = () => {
  return ( //뷰로 이미지 넣어두기
    <View>
      <Image 
        source={require('../assets/login-image.png')} 
        style={styles.image} 
      />
    </View>
  );
};

//사진 스타일 바꾸기
const styles = StyleSheet.create({
  image: {
    width: 150, 
    height: 150, 
   
  }
});

export default ImageComponent;