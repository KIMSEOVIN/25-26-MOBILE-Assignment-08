import React, { useState, useEffect } from 'react'; 
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useUser } from '../contexts/UserContext'; 
import TodoItem from '../components/TodoItem';    


const ListScreen = ({ navigation }) => {
  const { user } = useUser(); 

 
  const [todos, setTodos] = useState([
    { id: '1', text: '모바일과제하기' },
    { id: '2', text: '대학과제하기' },
    { id: '3', text: '공부하기' },
  ]);

  const renderTodoItem = ({ item }) => (
    <TodoItem item={item} />
  );

  const EmptyListComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>할 일을 추가해주세요 </Text>
    </View>
  );


  useEffect(() => {
    navigation.setOptions({
      headerBackTitle: "뒤로가기",
      title: `${user?.email || 'seovin'}의 목록`,
    });
  }, [navigation, user]); 

  return (
    <View style={styles.container}>
      <FlatList
        data={todos}                  
        renderItem={renderTodoItem}  
        keyExtractor={item => item.id} 
        
        ListEmptyComponent={EmptyListComponent} 
      />
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
});

export default ListScreen;