import {StyleSheet, TextInput, useColorScheme, View, ImageBackground, Button, Pressable , Text} from 'react-native'
import React from 'react'
import {colors} from "../../Constants/Colors";
import Spacer from "../../components/Spacer";
import ThemedView from "../../components/ThemedView";
import Themedtext from "../../components/Themedtext";
import ThemedText from "../../components/Themedtext";
import Signup from "./Signup";
import {Link} from "expo-router";

const Login = () => {
    const colorScheme = useColorScheme()
    const theme = colors[colorScheme]
    return (
        <ImageBackground
            source={require('../../assets/background.png')} // Change to your image path
            style={styles.background}
            resizeMode="cover"
        >
            <View style={styles.container}>
                <View style={styles.formContainer}>
                    <Themedtext type='title'>Sign in </Themedtext>

                    <Spacer height={20}/>

                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="#999"
                    />

                    <Spacer height={15}/>

                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="#999"
                        secureTextEntry
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
                    <View >
                        <Pressable
                            style={styles.button}
                        >
                            <Themedtext  >Login</Themedtext>
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
        marginTop:80
    },

    formContainer: {

        width: '100%',
        maxWidth: 400,
        backgroundColor: 'rgba(255, 255, 255, 0.0)', // Semi-transparent background
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
    button:{
        backgroundColor: '#007AFF',
        width:80,
        padding: 7,
        borderRadius: 8,
        alignItems: 'center',
    },
    signupContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
    }

})