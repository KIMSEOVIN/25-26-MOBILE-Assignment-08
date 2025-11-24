import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  TextInput, 
  Animated, 
  Keyboard, 
  Platform,
  Dimensions,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import { nanoid } from 'nanoid/non-secure'; 
import { useUser } from '../contexts/UserContext';
import TodoItem from '../components/TodoItem';

const { width } = Dimensions.get('window'); 

const ListScreen = ({ navigation }) => {
  const { user } = useUser();
  
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');  
  const [isInputOpen, setIsInputOpen] = useState(false); 
  const [keyboardHeight, setKeyboardHeight] = useState(0); 

  
  const animation = useRef(new Animated.Value(0)).current;


  useEffect(() => {
    const loadTodos = async () => {
      try {
        const savedTodos = await AsyncStorage.getItem('todos');
        if (savedTodos) {
          setTodos(JSON.parse(savedTodos));
        }
      } catch (e) {
        console.log('불러오기 실패', e);
      }
    };
    loadTodos();
  }, []);

  useEffect(() => {
    const saveTodos = async () => {
      try {
        await AsyncStorage.setItem('todos', JSON.stringify(todos));
      } catch (e) {
        console.log('저장 실패', e);
      }
    };
    saveTodos();
  }, [todos]);

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (e) => setKeyboardHeight(e.endCoordinates.height)
    );
    const hideSubscription = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => setKeyboardHeight(0)
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);


  const toggleInput = () => {
    const toValue = isInputOpen ? 0 : 1; 
    
    Animated.spring(animation, {
      toValue,
      useNativeDriver: false, 
      friction: 5,
    }).start();

    setIsInputOpen(!isInputOpen);
    if (isInputOpen) Keyboard.dismiss(); 
  };

 
  const addTodo = () => {
    if (!text.trim()) return; 

    const newTodo = {
      id: nanoid(), 
      text: text,
    };
    setTodos([...todos, newTodo]);
    setText(''); 
    toggleInput(); 
  };


  const handleDelete = (id) => {
    Alert.alert("삭제", "정말 삭제하시겠습니까?", [
      { text: "취소", style: "cancel" },
      { 
        text: "삭제", 
        style: "destructive",
        onPress: () => {
          const newTodos = todos.filter((todo) => todo.id !== id);
          setTodos(newTodos);
        }
      }
    ]);
  };

  const renderTodoItem = ({ item }) => (
    <TodoItem item={item} onDelete={handleDelete} />
  );

  const EmptyListComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>할 일을 추가해주세요</Text>
    </View>
  );

  useEffect(() => {
    navigation.setOptions({
      headerBackTitle: "뒤로가기",
      title: `${user?.name}의 목록`,
    });
  }, [navigation, user]);

  const rotate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });


  const fabWidth = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [60, width - 40],
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={todos}
        renderItem={renderTodoItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={EmptyListComponent}
        contentContainerStyle={{ paddingBottom: 100 }} 
      />


      <Animated.View 
        style={[
          styles.fabContainer, 
          { 
            bottom: keyboardHeight + 20, 
            width: fabWidth,            
          }
        ]}
      >
 
        {isInputOpen && (
          <TextInput
            style={styles.input}
            placeholder="할 일을 입력하세요"
            value={text}
            onChangeText={setText}
            autoFocus={true}
            onSubmitEditing={addTodo}
          />
        )}

   
        <TouchableOpacity 
          style={styles.fabButton} 
          onPress={isInputOpen && text ? addTodo : toggleInput}
        >
          <Animated.View style={{ transform: [{ rotate }] }}>
            <MaterialIcons 
              name={isInputOpen && text ? "check" : "add"} 
              size={30} 
              color="white" 
            />
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    fontSize: 16,
    color: 'gray',
  },
 
  fabContainer: {
    position: 'absolute',
    right: 20,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4A90E2',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end', 
    paddingRight: 5, 

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  fabButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: 'white',
    paddingLeft: 20,
    fontSize: 16,
  }
});

export default ListScreen;