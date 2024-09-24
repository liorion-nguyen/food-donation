import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import TodoItem from './TodoItem';

interface TodoListProps {
  todos: string[];
  onDeleteTodo: (index: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onDeleteTodo }) => {
  return (
    <FlatList
      style={styles.list}
      data={todos}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item, index }) => (
        <TodoItem todo={item} onDelete={() => onDeleteTodo(index)} />
      )}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    marginTop: 20,
  },
});

export default TodoList;
