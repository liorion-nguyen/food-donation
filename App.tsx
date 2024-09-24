import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import Home from './page/home';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Home />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
});
