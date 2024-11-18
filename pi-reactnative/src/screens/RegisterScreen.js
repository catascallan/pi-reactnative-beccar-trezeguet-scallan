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
                this.props.navigation.navigate("HomeMenu"); //navegación entre pantallas con la función navigate()
            }
        });
    }

    validateForm() {
        const { email, password, userName } = this.state;
        const registroValido = email !== "" && password !== "" && userName !== ""; //los campos no pueden quedar vacíos
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
        return ( //"formulario" de registro
            <View style={styles.container}>
                <Image 
                    source={require("../../assets/logo.png")} 
                    style={styles.logo} 
                />
                <Text style={styles.titulo}>CREA TU CUENTA</Text>

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
        color: "#000"
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
    botonDisabled: {
        backgroundColor: "#ECECEC" 
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

export default Register;