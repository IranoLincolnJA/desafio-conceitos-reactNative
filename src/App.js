import React, { useEffect, useState } from 'react';

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import api from '../src/services/api';

export default function App() {
  const [repositories, setRepo] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepo(response.data)
    })
  }, []);

  async function handleLikeRepository(id) {
    await api.post(`repositories/${id}/like`)
    .then(api.get('repositories')
    .then(response => {
      setRepo(response.data)
    }));
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList 
          data={repositories}
          keyExtractor={repository => repository.id}
          renderItem={({ item: repository }) => (
            <View style={styles.repositoryContainer}>
              <Text style={styles.repository}>{repository.title}</Text>
              <View style={styles.techsContainer}>
                {repository.techs.map(tech => (
                  <Text style={styles.tech} key={Math.random(1, 100)}>{tech}</Text>
                ))}
              </View>
              <View style={styles.likesContainer}>
                <Text
                  style={styles.likeText}
                  testID={`repository-likes-1`}
                >
                  {repository.likes}
                </Text>
              </View> 
              <TouchableOpacity
                style={styles.button}
                onPress={() => handleLikeRepository(repository.id)}
                testID={`like-button-1`}
              >
                <Text style={styles.buttonText}>Curtir</Text>
              </TouchableOpacity>
            </View>  
          )}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
