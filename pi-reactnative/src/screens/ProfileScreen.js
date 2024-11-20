import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Image } from "react-native";
import { auth, db } from "../firebase/config";

class ProfileScreen extends Component {
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
                .where("owner", "==", currentUser.email)  
                .onSnapshot(snapshot => {
                    const posts = snapshot.docs.map(doc => ({
                        id: doc.id,
                        description: doc.data().descripcion
                    }));
                    console.log(posts); 
                    this.setState({ posts, totalPosts: posts.length });
                }, (error) => {
                    console.error(error);
                });
        }
    }

    handleDeletePost = (postId) => {
        db.collection("posts").doc(postId).delete(); //función de borrado del post
    };

    handleLogout = () => {
        auth.signOut() //función de deslogueo
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
                            <Text style={styles.postText}>{item.description}</Text>
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
                    <Text style={styles.botonTextoLogout}>Logout</Text>
                </TouchableOpacity> 
            </View> //botón de deslogueo
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF5F7",  
        paddingHorizontal: 40
    },
    logo: {
        width: 250,  
        height: 250,  
        marginTop: 10,
    },
    titulo: {
        fontWeight: "bold",
        fontSize: 20,
        color: "#D4C6E7",  
        marginBottom: 30,
        fontFamily: "Arial"
    },
    info: {
        fontSize: 16,
        color: "#B2A0C3",  
        marginBottom: 10,
        fontFamily: "Arial"
    },
    postContainer: {
        backgroundColor: "#F4F1FC",
        padding: 20, 
        borderRadius: 16, 
        marginBottom: 20,
        marginTop: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 }, 
        shadowOpacity: 0.15,
        shadowRadius: 6,
        alignItems: "center", 
        justifyContent: "center", 
    },
    botonDelete: {
        backgroundColor: "#FFEDED",
        paddingVertical: 10, 
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 12,
    },
    botonTexto: {
        color: "#FF5C5C",
        fontWeight: "600",
        fontSize: 16, 
    },
    postText: {
        fontSize: 16, 
        color: "#696969", 
        textAlign: "center", 
        lineHeight: 24,
    },
    botonLogout: {
        backgroundColor: "#C9E4DE",  
        paddingHorizontal: 10,
        paddingVertical: 12,
        borderRadius: 20,
        marginTop: 20,
        marginBottom: 20,
        width: "100%",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3
    },
    botonTextoLogout: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 16,
        fontFamily: "Arial"
    }
});

export default ProfileScreen;
