import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { db, auth } from "../firebase/config";  
import firebase from "firebase";

class Post extends Component {
    constructor(props) {
        super(props);
        const likes = this.props.postInfo.data.likes || [];
        this.state = {
          liked: likes.includes(auth.currentUser.email), //email para verificar si el usuario dio like
          likesCount: likes.length, 
        };
      }
      
  handleLike = () => {
    const { postInfo } = this.props;
    const postRef = db.collection("posts").doc(postInfo.id);
    const userEmail = auth.currentUser.email; 

    if (this.state.liked) {
      postRef
        .update({
          likes: firebase.firestore.FieldValue.arrayRemove(userEmail),
        })
        .then(() => {
          this.setState((prevState) => ({
            liked: false,
            likesCount: prevState.likesCount - 1,
          }));
        });
    } else {
      postRef
        .update({
          likes: firebase.firestore.FieldValue.arrayUnion(userEmail),
        })
        .then(() => {
          this.setState((prevState) => ({
            liked: true,
            likesCount: prevState.likesCount + 1,
          }));
        });
    }
  };

  handleDelete = () => {
    const { postInfo } = this.props;
    db.collection("posts").doc(postInfo.id).delete(); 
  };

  render() {
    const { postInfo } = this.props;
    const { liked, likesCount } = this.state;

    const isOwner = auth.currentUser && auth.currentUser.email === postInfo.data.owner;

    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Posteado por: {postInfo.data.owner}</Text>

        <Text style={styles.field}>{postInfo.data.descripcion}</Text>

        <Text style={styles.fecha}>
          Fecha de creación: {new Date(postInfo.data.createdAt).toLocaleString()}
        </Text>

        <Text style={styles.likes}>Likes: {likesCount}</Text>

        <TouchableOpacity 
          style={styles.boton}
          onPress={this.handleLike}
        >
          <Text style={styles.botonTexto}>
            {liked ? "Sacar like" : "Dar like"}
          </Text>
        </TouchableOpacity>

        {isOwner && (
          <TouchableOpacity style={styles.botonLogin} onPress={this.handleDelete}>
            <Text style={styles.botonTextoLogin}>Eliminar</Text>
          </TouchableOpacity>
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
    backgroundColor: "#FFFCFE",
    paddingHorizontal: 40,
    paddingVertical: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#D4C6E7",
    marginBottom: 20,
  },
  titulo: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#D4C6E7",
    marginBottom: 10,
    fontFamily: "Arial",
    textAlign: "center",
  },
  field: {
    borderWidth: 1,
    borderColor: "#D4C6E7",
    borderRadius: 12,
    height: 80,
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 20,
    marginBottom: 15,
    backgroundColor: "#FFFFFF",
    color: "#808080",
    fontFamily: "Arial",
    textAlign: "center",
    textAlignVertical: "center",
  },
  fecha: {
    fontSize: 12,
    color: "#D4C6E7",
    marginTop: 15,
    marginBottom: 15,
    fontFamily: "Arial",
  },
  likes: {
    fontSize: 16,
    color: "#D4C6E7",
    marginBottom: 10,
    fontFamily: "Arial",
  },
  boton: {
    backgroundColor: "#C9E4DE",
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 20,
    marginTop: 15,
    width: "100%",
    alignItems: "center",
  },
  botonTexto: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: "Arial",
  },
  botonLogin: {
    backgroundColor: "transparent",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#BFDCE5",
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  botonTextoLogin: {
    color: "#BFDCE5",
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: "Arial",
  },
});

export default Post;
