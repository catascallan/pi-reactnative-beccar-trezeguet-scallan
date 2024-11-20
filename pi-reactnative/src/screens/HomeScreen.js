import React, { Component } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
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

    render() {
        if (!auth.currentUser) {
            this.props.navigation.navigate("Login");
            return null;
        }

        const { posts, loading } = this.state;

        return (
            <View style={styles.container}>
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
        paddingTop: 30,
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
});

export default HomeScreen;