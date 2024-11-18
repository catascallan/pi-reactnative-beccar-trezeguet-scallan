import React, { Component } from "react";
import { StyleSheet, TextInput, TouchableOpacity, Text, View, Image } from "react-native";
import { auth } from "../firebase/config";

class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            error: ""
        };
    }

    componentDidMount() {
        auth.onAuthStateChanged(user => { //remember me
            if (user) {
                this.props.navigation.navigate("HomeMenu");
            }
        });
    }

    login() {
        const { email, password } = this.state;

        if (!email.includes("@")) {
            this.setState({ error: "Email mal formateado" });
        } else if (password.length < 6) {
            this.setState({ error: "La password debe tener una longitud mínima de 6 caracteres" });
        } else {
            auth.signInWithEmailAndPassword(email, password)
                .then(response => {
                    this.props.navigation.navigate("HomeMenu"); //si el login es exitoso, se redirige a home
                })
                .catch(error => this.setState({ error: "Falló el login." })); 
        }
    }

    render() {
        return ( //"formulario" creado por nosotras
            <View style={styles.container}>
                <Image 
                    source={require("../../assets/logo.png")} 
                    style={styles.logo} 
                />
                <Text style={styles.titulo}>INGRESAR</Text>
                <TextInput
                    style={styles.field}
                    keyboardType="email-address"
                    placeholder="Email"
                    onChangeText={text => this.setState({ email: text })} //recibe la info y la guarda en el estado
                    value={this.state.email} //muestra la información del estado
                />
                <TextInput
                    style={styles.field}
                    keyboardType="default"
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={text => this.setState({ password: text })}
                    value={this.state.password}
                />
                
                {this.state.error ? <Text style={styles.errorText}>{this.state.error}</Text> : null}

                <TouchableOpacity onPress={() => this.login()} style={styles.boton}>
                    <Text style={styles.botonTexto}>Login</Text>
                </TouchableOpacity>

                <Text style={styles.textoLogin}>¿Todavía no te registraste?</Text> 
                <TouchableOpacity onPress={() => this.props.navigation.navigate("Register")} style={styles.botonLogin}> 
                    <Text style={styles.botonTextoLogin}>No tengo cuenta</Text> 
                </TouchableOpacity> 
            </View> //navegación a register si todavía no está registrado
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
        width: 280,
        height: 280,
        marginBottom: 20
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
    botonLogin: {
        backgroundColor: "transparent",
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#BFDCE5", 
        marginTop: 20,
        width: "100%",
        alignItems: "center"
    },
    botonTextoLogin: {
        color: "#BFDCE5", 
        fontWeight: "bold",
        fontSize: 16,
        fontFamily: "Arial"
    },
    textoLogin: {
        fontSize: 14,
        color: "#D4C6E7",  
        marginTop: 20,
        fontFamily: "Arial"
    },
    errorText: {
        color: "#F8C9C0", 
        marginTop: 10,
        textAlign: "center"
    }
});

export default LoginScreen;