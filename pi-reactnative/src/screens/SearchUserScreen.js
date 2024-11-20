import React, { Component } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { db } from "../firebase/config";

class SearchUserScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: '',
            users: [],
            loading: false,
            noResults: false
        };
    }

    handleSearch(busqueda) {
        this.setState({ searchQuery: busqueda, loading: true, noResults: false });

        if (busqueda.trim() === '') {
            this.setState({ users: [], loading: false, noResults: false });
            return;
        }

        db.collection("users")
            .where("nombre", ">=", busqueda)
            .where("nombre", "<=", busqueda + '\uf8ff')
            .get()
            .then((querySnapshot) => {
                if (querySnapshot.empty) {
                    this.setState({ users: [], loading: false, noResults: true });
                } else {
                    const users = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    }));
                    this.setState({ users, loading: false, noResults: false });
                }
            })
            .catch((error) => {
                console.error("Error buscando usuarios:", error);
                this.setState({ users: [], loading: false, noResults: true });
            });
    }

    render() {
        const { searchQuery, users, loading, noResults } = this.state;

        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Buscar usuarios por nombre..."
                    value={searchQuery}
                    onChangeText={(busqueda) => this.handleSearch(busqueda)}
                />

                {loading ? (
                    <ActivityIndicator size="large" color="#D4C6E7" style={styles.loading} />
                ) : noResults ? (
                    <Text style={styles.noResults}>No se encontraron usuarios</Text>
                ) : (
                    <FlatList
                        data={users}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.userItem}>
                                <Text style={styles.username}>{item.data.nombre}</Text>
                                <Text style={styles.email}>{item.data.email}</Text>
                            </View>
                        )}
                    />
                )}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "stretch",
        backgroundColor: "#FFF5F7",
        paddingHorizontal: 40,
        paddingTop: 30,
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 16,
        marginBottom: 20, 
        backgroundColor: '#fff',
        fontSize: 16,
    },
    loading: {
        marginTop: 20,
    },
    noResults: {
        textAlign: 'center',
        color: '#888',
        fontSize: 16,
        marginTop: 15,
        fontFamily: "Arial",
    },
    userItem: {
        padding: 20, 
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
        backgroundColor: '#F4F1FC',
        borderRadius: 8,
        marginBottom: 12,
    },
    username: {
        fontSize: 20, 
        fontWeight: 'bold',
        color: '#333',
    },
    email: {
        fontSize: 16, 
        color: '#666',
    },
});

export default SearchUserScreen;
