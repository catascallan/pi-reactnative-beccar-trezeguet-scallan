import React, { Component } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { auth, db } from "../firebase/config";
import Post from "../components/Post";

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            loading: true,
        };
    }

    componentDidMount() {
        this.unsubscribe = db.collection("posts")
            .orderBy("createdAt", "desc") //ordenamos los posts de más nuevo a más viejo
            .onSnapshot((snapshot) => {
                const posts = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    data: doc.data(),
                }));
                this.setState({ posts, loading: false });
            });
    }

    componentWillUnmount() {
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    }    

    logout() {
        auth.signOut()
            .then(() => this.props.navigation.navigate("Login"))
            .catch((error) => console.error(error));
    }

    render() {
        if (!auth.currentUser) {
            this.props.navigation.navigate("Login");
            return null;
        }

        const { posts, loading } = this.state;

        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    {`Bienvenido ${auth.currentUser.email}`}
                </Text>
                {loading ? (
                    <Text style={styles.loadingText}>Cargando posts...</Text>
                ) : posts.length === 0 ? (
                    <Text style={styles.noPosts}>No hay posteos aún</Text>
                ) : (
                    <FlatList
                        data={posts} //array de posteos
                        keyExtractor={(item) => item.id} //clave única de cada post
                        renderItem={({ item }) => (
                            <Post postInfo={item} /> //componente renderizado en cada iteración
                        )}
                    />
                )}
                <TouchableOpacity
                    onPress={() => this.logout()} //cuando se apreta el botón de logout se ejecuta la función logout de arriba
                    style={styles.logoutButton}
                >
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF5F7",
        paddingHorizontal: 40,
    },
    welcome: {
        fontWeight: "bold",
        fontSize: 20,
        color: "#D4C6E7",
        marginBottom: 40,
        marginTop: 30,
        fontFamily: "Arial",
        textAlign: "center",
    },
    loadingText: {
        fontSize: 16,
        color: "#C9E4DE",
        marginBottom: 20,
        fontFamily: "Arial",
    },
    noPosts: {
        fontSize: 16,
        color: "#D4C6E7",
        marginBottom: 20,
        fontFamily: "Arial",
        textAlign: "center",
    },
    logoutButton: {
        backgroundColor: "#C9E4DE",
        paddingHorizontal: 10,
        paddingVertical: 12,
        borderRadius: 20,
        marginTop: 15,
        marginBottom: 30,
        width: "100%",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    logoutText: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 16,
        fontFamily: "Arial",
    },
});

export default HomeScreen;