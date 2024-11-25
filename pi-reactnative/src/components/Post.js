import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { db, auth } from "../firebase/config";  
import firebase from "firebase";

class Post extends Component {
    constructor(props) {
        super(props);
        const likes = this.props.postInfo.data.likes || [];
        this.state = {
          liked: likes.includes(auth.currentUser.email),
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
        <Text style={styles.owner}>Posteado por: {postInfo.data.owner}</Text>
        <Text style={styles.description}>{postInfo.data.descripcion}</Text>
        <Text style={styles.date}>
          Fecha: {new Date(postInfo.data.createdAt).toLocaleString()}
        </Text>
        <View style={styles.likeContainer}>
          <TouchableOpacity onPress={this.handleLike}>
            <AntDesign 
              name={liked ? "heart" : "hearto"} 
              size={24} 
              color={liked ? "#FF5C5C" : "#C4C4C4"} 
            />
          </TouchableOpacity>
          <Text style={styles.likeCount}>{likesCount}</Text>
        </View>
        {isOwner && (
          <TouchableOpacity style={styles.deleteButton} onPress={this.handleDelete}>
            <Text style={styles.deleteText}>Eliminar</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F4F1FC",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  owner: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4A4A4A",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: "#333",
    marginBottom: 12,
    lineHeight: 22,
  },
  date: {
    fontSize: 12,
    color: "#A9A9A9",
    marginBottom: 12,
  },
  likeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  likeCount: {
    marginLeft: 8,
    fontSize: 14,
    color: "#4A4A4A",
  },
  deleteButton: {
    marginTop: 12,
    backgroundColor: "#FFEDED",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  deleteText: {
    fontSize: 14,
    color: "#FF5C5C",
    fontWeight: "600",
  },
});

export default Post;
