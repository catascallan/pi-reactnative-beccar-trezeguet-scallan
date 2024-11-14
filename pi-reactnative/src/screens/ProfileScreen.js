import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image } from "react-native";
import { auth, db } from "../firebase/config";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            posts: [],
            totalPosts: 0
        };
    }

    componentDidMount() {
        const currentUser = auth.currentUser;
        
        if (currentUser) {
            db.collection("users")
                .where("email", "==", currentUser.email)
                .onSnapshot(snapshot => {
                    snapshot.forEach(doc => {
                        this.setState({ user: doc.data() });
                    });
                });

            db.collection("posts")
                .where("userId", "==", currentUser.uid)
                .onSnapshot(snapshot => {
                    const posts = snapshot.docs.map(doc => ({
                        id: doc.id,
                        description: doc.data().description
                    }));
                    this.setState({ posts, totalPosts: posts.length });
                });
        }
    }

    handleDeletePost = (postId) => {
        db.collection("posts").doc(postId).delete();
    };

    handleLogout = () => {
        auth.signOut()
            .then(() => this.props.navigation.navigate("Login"))
            .catch(error => console.log(error));
    };

    render() {
        const { user, posts, totalPosts } = this.state;

        return (
            <View style={styles.container}>
                <Image 
                    source={require("../../assets/profile.png")} 
                    style={styles.logo} 
                />
                <Text style={styles.titulo}>Mi Perfil</Text>
                <Text style={styles.info}>Nombre de usuario: {user.nombre}</Text>
                <Text style={styles.info}>Email: {user.email}</Text>
                <Text style={styles.info}>Total de posteos: {totalPosts}</Text>

                <FlatList
                    data={posts}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.postContainer}>
                            <Text>{item.description}</Text>
                            <TouchableOpacity
                                onPress={() => this.handleDeletePost(item.id)}
                                style={styles.botonDelete}
                            >
                                <Text style={styles.botonTexto}>Eliminar post</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />

                <TouchableOpacity onPress={this.handleLogout} style={styles.botonLogout}>
                    <Text style={styles.botonTextoLogout}>Cerrar sesión</Text>
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
        backgroundColor: "#fef5f7",
        paddingHorizontal: 40
    },
    titulo: {
        fontWeight: "bold",
        fontSize: 24,
        color: "#d4a7c0",
        marginBottom: 20
    },
    logo: {
        width: 200,
        height:200,
        marginBottom: 10,
        marginTop: 10,
    },
    info: {
        fontSize: 16,
        color: "#d4a7c0",
        marginBottom: 10
    },
    postContainer: {
        backgroundColor: "#fff",
        padding: 15,
        marginVertical: 10,
        width: "100%",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#f2d0d9"
    },
    botonDelete: {
        backgroundColor: "#e1a9b7",
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 5,
        alignItems: "center",
        marginTop: 10
    },
    botonLogout: {
        backgroundColor: "#e1a9b7",
        paddingHorizontal: 10,
        paddingVertical: 12,
        borderRadius: 5,
        marginTop: 20,
        marginBottom:20,
        width: "100%",
        alignItems: "center"
    },
    botonTexto: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16
    },
    botonTextoLogout: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16
    }
});

export default Profile;
