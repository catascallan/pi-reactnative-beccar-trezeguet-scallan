import React, { Component } from 'react'
import { Text, View, TextInput, TouchableOpacity } from 'react-native-web'
import { auth, db } from '../firebase/config'
import { StyleSheet } from 'react-native'

class NewPostScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: [],
            mensaje: "",
            urlImagen: ""
        }
    }

    onSubmit(mensaje, urlImagen){
        if(mensaje === ""){
            return "No se puede crear un post vacío"
        }
        db.collection("posts").add({
            owner: auth.currentUser.email,
            descripcion: mensaje,
            createdAt: Date.now()
        })
        .then(this.props.navigation.navigate("Home"))
        .catch(err => console.log(err))
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.titulo}>Nuevo post</Text>

                <TextInput style={styles.field}
                    keyboardType='default'
                    placeholder="Ingrese su post"
                    onChangeText={text => this.setState({mensaje: text})}
                    value={this.state.mensaje}
                />
                <TouchableOpacity onPress={() => this.onSubmit(this.state.mensaje, this.state.urlImagen)} style={styles.boton}>
                    <Text style={styles.botonTexto}>Cargar post</Text>
                </TouchableOpacity>
            </View>
        )
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
    titulo: {
        fontWeight: "bold",
        fontSize: 20,
        color: "#D4C6E7", 
        marginBottom: 30,
        fontFamily: "Arial"
    },
    field: {
        borderWidth: 1,
        borderColor: "#F6D7B0", 
        borderRadius: 12,
        height: 50,
        width: "100%",
        paddingHorizontal: 15,
        fontSize: 16,
        marginBottom: 15,
        backgroundColor: "#FFFFFF",
        color: "#000",
        fontFamily: "Arial"
    },
    boton: {
        backgroundColor: "#C9E4DE", 
        paddingHorizontal: 10,
        paddingVertical: 12,
        borderRadius: 20,
        marginTop: 15,
        width: "100%",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3
    },
    botonTexto: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 16,
        fontFamily: "Arial"
    },
});

export default NewPostScreen;