import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>
          Posteado por: {this.props.postInfo.data.owner}
        </Text>
        <Text style={styles.field}>
          Descripción: {this.props.postInfo.data.descripcion}
        </Text>
        <Text style={styles.field}>
          Fecha de creación:{" "}
          {new Date(this.props.postInfo.data.createdAt).toLocaleString()}
        </Text>
        <TouchableOpacity style={styles.boton}>
          <Text style={styles.botonTexto}>Like</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botonLogin}>
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
