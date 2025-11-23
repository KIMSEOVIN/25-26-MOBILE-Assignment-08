import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import SignInScreen from "./src/screens/SignInScreen";
import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./src/navagations/AuthStack";
import ListScreen from "./src/screens/ListScreen";
import { UserProvider } from './src/contexts/UserContext'; 

const App = () => {
  return (
    <UserProvider>
      <NavigationContainer>
        <StatusBar style="dark" />

        <AuthStack />
    
      </NavigationContainer>
    </UserProvider>
  );
};
{/*{{ user, setUser }}>이거를 userContext에 넣엇음 */}

export default App;
