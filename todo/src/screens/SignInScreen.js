import React, { useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Keyboard,
  Alert,
} from "react-native";
import ImageComponent from "../components/ImageComponent";
import InputComponent from "../components/TextInputComponent";
import ButtonComponent from "../components/ButtonComponent";
import { login } from "../api/Auth";

const SignInScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  {/*로딩 중복 요청을 막기 위한 상태 추가*/}
  const [isLoading, setIsLoading] = useState(false); 

  const handleLoginSubmit = async () => {
    {/*이미 로딩 중이면 함수를 즉시 종료*/}
    if (isLoading) {
      return;
    }

    console.log("로그인 시도:", email, password);

    if (!email || !password) {
      Alert.alert("입력 오류", "이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }

    //  then.catch 대신 try...catch...finally 사용
    try {
     
      setIsLoading(true);

      // await: login 함수가 끝날 때까지 기다림
      const response = await login(email, password);

      Alert.alert("로그인 성공", response.message);

      navigation.navigate("List");
    } 
    
    
    catch (error) {
      Alert.alert("로그인 실패", error.message);
    } finally {
      //finally는 성공/실패 여부와 상관없이 항상 실행됨
      setIsLoading(false);
    }
  };
  const isDisabled = !email || !password || isLoading;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Pressable style={styles.container} onPress={() => Keyboard.dismiss()}>
        <ImageComponent />
        <InputComponent
          labelName2="이메일"
          iconName="mail"
          placeholder="이메일"
          isPassword={false}
          value={email}
          onChangeText={setEmail}
        />
        <InputComponent
          labelName2="비밀번호"
          iconName="lock"
          placeholder="비밀번호"
          isPassword={true}
          value={password}
          onChangeText={setPassword}
        />
        <ButtonComponent
          text="로그인"
          onPress={handleLoginSubmit}
          disabled={isDisabled}
        />
      </Pressable>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});

export default SignInScreen;
