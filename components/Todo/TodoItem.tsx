import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

interface TodoItemProps {
  todo: string;
  onDelete: () => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onDelete }) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{todo}</Text>
      <Button title="Delete" onPress={onDelete} color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#eee',
  },
  itemText: {
    fontSize: 16,
  },
});

export default TodoItem;
