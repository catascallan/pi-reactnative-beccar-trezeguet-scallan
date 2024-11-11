import { Component } from "react";
import { StyleSheet, TextInput, TouchableOpacity, Text, View, Image } from "react-native";
import { auth, db } from "../firebase/config";

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            userName: "",
            registered: false,
            error: "",
            botonHabilitado: true
        };
    }

    componentDidMount() {
        auth.onAuthStateChanged(user => {
            if (user) {
                this.props.navigation.navigate("HomeMenu");
            }
        });
    }

    validateForm() {
        const { email, password, userName } = this.state;
        const registroValido = email !== "" && password !== "" && userName !== "";
        this.setState({ botonHabilitado: !registroValido });
    }

    handleInputChange(field, value) {
        this.setState({ [field]: value }, () => this.validateForm());
    }

    register() {
        auth.createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then((response) => {
                db.collection("users").add({
                    email: this.state.email,
                    nombre: this.state.userName,
                    createdAt: Date.now()
                });
                this.props.navigation.navigate("Login");
            })
            .catch((error) => this.setState({ error: error.message }));
    }

    render() {
        return (
            <View style={styles.container}>
                <Image 
                    //source={require("../assets/logo.png")} (crear logo desp)
                    //style={styles.logo} 
                />
                <Text style={styles.titulo}>Crea una cuenta</Text>

                <TextInput
                    style={styles.field}
                    keyboardType="email-address"
                    placeholder="Correo electrónico"
                    onChangeText={(text) => this.handleInputChange("email", text)}
                    value={this.state.email}
                />
                <TextInput
                    style={styles.field}
                    keyboardType="default"
                    placeholder="Nombre de usuario"
                    onChangeText={(text) => this.handleInputChange("userName", text)}
                    value={this.state.userName}
                />
                <TextInput
                    style={styles.field}
                    keyboardType="default"
                    placeholder="Contraseña"
                    secureTextEntry={true}
                    onChangeText={(text) => this.handleInputChange("password", text)}
                    value={this.state.password}
                />
                {this.state.error ? <Text style={styles.errorText}>{this.state.error}</Text> : null}
                <TouchableOpacity
                    onPress={() => this.register()}
                    style={[styles.boton, this.state.botonHabilitado && styles.botonDisabled]}
                    disabled={this.state.botonHabilitado}
                >
                    <Text style={styles.botonTexto}>Registrarme</Text>
                </TouchableOpacity>

                <Text style={styles.textoLogin}>¿Ya tenés cuenta?</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("Login")} style={styles.botonLogin}>
                    <Text style={styles.botonTextoLogin}>Iniciar sesión</Text>
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
    logo: {
        width: 120,
        height: 120,
        marginBottom: 20
    },
    titulo: {
        fontWeight: "bold",
        fontSize: 24,
        color: "#d4a7c0", 
        marginBottom: 20
    },
    field: {
        borderWidth: 1,
        borderColor: "#f2d0d9", 
        borderRadius: 5,
        height: 50,
        width: "100%",
        paddingHorizontal: 15,
        fontSize: 16,
        marginBottom: 10,
        backgroundColor: "#fff"
    },
    boton: {
        backgroundColor: "#e1a9b7", 
        paddingHorizontal: 10,
        paddingVertical: 12,
        borderRadius: 5,
        marginTop: 10,
        width: "100%",
        alignItems: "center"
    },
    botonDisabled: {
        backgroundColor: "#f5d4db" 
    },
    botonTexto: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16
    },
    botonLogin: {
        backgroundColor: "transparent",
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#e1a9b7", 
        marginTop: 15,
        width: "100%",
        alignItems: "center"
    },
    botonTextoLogin: {
        color: "#e1a9b7", 
        fontWeight: "bold",
        fontSize: 16
    },
    textoLogin: {
        fontSize: 14,
        color: "#d4a7c0", 
        marginTop: 20
    },
    errorText: {
        color: "red",
        marginTop: 10,
        textAlign: "center"
    }
});

export default Register;