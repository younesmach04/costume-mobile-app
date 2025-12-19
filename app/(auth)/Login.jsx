import {
    StyleSheet,
    TextInput,
    useColorScheme,
    View,
    ImageBackground,
    Pressable,
    Alert
} from 'react-native'
import React, {useEffect, useState} from 'react';
import { colors } from "../../Constants/Colors";
import Spacer from "../../components/Spacer";
import ThemedText from "../../components/Themedtext";
import { Link, useRouter } from "expo-router";
import authService from "../../Services/authService";

const Login = () => {
    const colorScheme = useColorScheme()
    const theme = colors[colorScheme]
    const router = useRouter()
    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const verifyTokenValidity = async() => {
            try {
                const token = await authService.getCurrentToken();
                if (token) {
                    const isTokenValid = await authService.validateToken();
                    console.log('Token valid:', isTokenValid);

                    // If token is valid, maybe redirect to main app?
                    if (isTokenValid.success) {
                        router.push("/MainApplication/Main");
                    }
                }
            } catch (error) {
                console.log('Token validation failed:', error);
                // Token is invalid or expired, user stays on login page
            }
        }
        verifyTokenValidity()

    },[])

    const handleInputChange = (key, value) => {
        setUser(prev => {
            return { ...prev, [key]: value }
        })
    }

    const handleLogin = async () => {
        if (!user.email || !user.password) {
            Alert.alert('Erreur', 'Veuillez remplir tous les champs');
            return;
        }

        setLoading(true);
        try {
            await authService.login({
                email: user.email,
                password: user.password
            });

            router.push("/MainApplication/Main");

        } catch (error) {
            console.log('Erreur', error.message || 'Erreur de connexion');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ImageBackground
            source={require('../../assets/background.png')}
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <ThemedText type='title'>Sign in</ThemedText>

                    <Spacer height={20}/>

                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="#999"
                        value={user.email}
                        onChangeText={(text) => handleInputChange('email', text)}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        editable={!loading}
                    />

                    <Spacer height={15}/>

                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="#999"
                        secureTextEntry
                        value={user.password}
                        onChangeText={(text) => handleInputChange('password', text)}
                        editable={!loading}
                    />

                    <Spacer height={20}/>

                    <View style={styles.signupContainer}>
                        <ThemedText type="util" style={{color: "#880808"}}>
                            You don't have an account ? Signup
                        </ThemedText>
                        <Link href="/Signup" asChild>
                            <Pressable>
                                <ThemedText type="util" style={{textDecorationLine:'underline',marginLeft: 5, color: "#0f23fa"}}>
                                    here
                                </ThemedText>
                            </Pressable>
                        </Link>
                    </View>

                    <Spacer height={20}/>

                    <View>
                        <Pressable
                            style={[
                                styles.button,
                                loading && styles.buttonDisabled
                            ]}
                            onPress={handleLogin}
                            disabled={loading}
                        >
                            {/* Correction : ThemedText au lieu de Themedtext */}
                            <ThemedText style={styles.buttonText}>
                                {loading ? 'Connexion...' : 'Login'}
                            </ThemedText>
                        </Pressable>
                    </View>
                </View>
            </View>
        </ImageBackground>
    )
}

export default Login

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        marginTop: 80
    },
    formContainer: {
        width: '100%',
        maxWidth: 400,
        backgroundColor: 'rgba(255, 255, 255, 0.0)',
        padding: 20,
        borderRadius: 12,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 15,
        borderRadius: 8,
        fontSize: 16,
        backgroundColor: 'white',
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        width: '100%',
    },
    buttonDisabled: {
        backgroundColor: '#cccccc',
        opacity: 0.6,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    signupContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'center',
    }
})