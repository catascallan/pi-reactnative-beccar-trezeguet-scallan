import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { db } from "../firebase/config";  

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: this.props.postInfo.data.likes || 0,  
      liked: false,  
    };
  }

  handleLike = () => {
    const { postInfo } = this.props;
    const postRef = db.collection("posts").doc(postInfo.id);

    if (this.state.liked) {
      postRef.update({
        likes: this.state.likes - 1
      }).then(() => {
        this.setState({ likes: this.state.likes - 1, liked: false });
      });
    } else {
      postRef.update({
        likes: this.state.likes + 1
      }).then(() => {
        this.setState({ likes: this.state.likes + 1, liked: true });
      });
    }
  };

  handleDelete = () => {
    const { postInfo } = this.props;
    db.collection("posts").doc(postInfo.id).delete(); 
  };

  render() {
    const { postInfo } = this.props;
    const { likes, liked } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>
          Posteado por: {postInfo.data.owner}
        </Text>

        {postInfo.data.foto && (
          <Image
            source={{ uri: postInfo.data.foto }}
            style={styles.image}
          />
        )}

        <Text style={styles.field}>
          Descripción: {postInfo.data.descripcion}
        </Text>

        <Text style={styles.field}>
          Fecha de creación:{" "}
          {new Date(postInfo.data.createdAt).toLocaleString()}
        </Text>

        <Text style={styles.likes}>Likes: {likes}</Text>

        <TouchableOpacity 
          style={styles.boton}
          onPress={this.handleLike}
        >
          <Text style={styles.botonTexto}>
            {liked ? "Sacar like" : "Dar like"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botonLogin} onPress={this.handleDelete}>
          <Text style={styles.botonTextoLogin}>Eliminar</Text>
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
  image: {
    width: 100,  
    height: 100,
    borderRadius: 10,
    marginBottom: 15,
  },
  field: {
    borderWidth: 1,
    borderColor: "#D4C6E7",
    borderRadius: 12,
    height: 60,
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
    color: "#333",
    fontFamily: "Arial",
    textAlign: "center",
    textAlignVertical: "center",
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
