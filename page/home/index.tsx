// page/home/index.tsx
import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import AddTodo from '../../components/Todo/AddTodo';
import TodoList from '../../components/Todo/TodoList';

const Home: React.FC = () => {
  const [todos, setTodos] = useState<string[]>([]);

  const handleAddTodo = (todo: string) => {
    setTodos((prevTodos) => [...prevTodos, todo]);
  };

  const handleDeleteTodo = (index: number) => {
    setTodos((prevTodos) => prevTodos.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Todo List</Text>
      <AddTodo onAddTodo={handleAddTodo} />
      <TodoList todos={todos} onDeleteTodo={handleDeleteTodo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default Home;
