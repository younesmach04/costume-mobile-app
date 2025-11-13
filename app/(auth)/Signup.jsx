import {
    StyleSheet,
    TextInput,
    useColorScheme,
    View,
    ImageBackground,
    Button,
    Pressable,
    Text,
    ScrollView
} from 'react-native'
import { useState } from 'react'
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
    const [user ,setUser] = useState({})
    const [formErrors,setFormErrors] = useState({})

    const handleFocus = key => {
        setFormErrors(prev => ({...prev,[key]: false}))
    }

    const handleBlur = key => {
        if(user[key] === '')
        setFormErrors(prev => ({...prev,[key]: true}))
    }

    const handleInputChange = (key,value) => {
        setUser(prev => {
            return {...prev,[key]: value}
        })
    }

    const handleButtonPress = ()=>{
        console.log(user)
    }

    return (
        <>
        <ScrollView>

        <ImageBackground
            source={require('../../assets/Signup.png')}
            style={styles.background}
            resizeMode="cover"

        >

            <View style={styles.container}>

                <View style={styles.formContainer}>
                    <Spacer height={70}/>r
                    <Themedtext type='title'>Sign up </Themedtext>
                    <Spacer height={10}/>
                    { formErrors['firstName'] && <Text style={styles.errorText}>The first name is invalid</Text> }
                    <TextInput
                        style={styles.input}
                        placeholder="First Name"
                        placeholderTextColor="#999"
                        onChangeText={text => handleInputChange('firstName',text)}
                        onFocus={() => handleFocus('firstName')}
                        onBlur={() => handleBlur('firstName')}
                    />
                    <Spacer height={15}/>
                    { formErrors['lastName'] &&  (<Text style={styles.errorText}>The last name is invalid</Text>) }
                    <TextInput
                        style={styles.input}
                        placeholder="Lastname"
                        placeholderTextColor="#999"
                        onFocus={() => handleFocus('lastname')}
                        onBlur={() => handleBlur('lastname')}
                        onChangeText={text => handleInputChange('lastName',text)}
                    />
                    <Spacer height={15}/>


                    { formErrors['email'] &&  (<Text style={styles.errorText}>The Email is invalid</Text>) }
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="#999"
                        onFocus={() => handleFocus('email')}
                        onBlur={() => handleBlur('email')}
                        onChangeText={text => handleInputChange('email',text)}
                    />

                    <Spacer height={15}/>
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="#999"
                        secureTextEntry
                        onChangeText={text => handleInputChange('password',text)}
                        onFocus={() => handleFocus('password')}
                        onBlur={() => handleBlur('password')}
                    />
                    <Spacer height={15}/>
                    { formErrors['confirmPassword'] &&  (<Text style={styles.errorText}>The confirmPassword is invalid</Text>) }
                    <TextInput
                        style={styles.input}
                        placeholder="ConfirmPassword"
                        placeholderTextColor="#999"
                        secureTextEntry
                        onFocus={() => handleFocus('confirmPassword')}
                        onBlur={() => handleBlur('confirmPassword')}
                        onChangeText={text => handleInputChange('confirmPassword',text)}
                    />
                    <Spacer height={15}/>
                    { formErrors['phone'] &&  (<Text style={styles.errorText}>The phone format is invalid</Text>) }
                    <TextInput
                        style={styles.input}
                        placeholder="Phone"
                        placeholderTextColor="#999"
                        onFocus={() => handleFocus('phone')}
                        onBlur={() => handleBlur('phone')}
                        onChangeText={text => handleInputChange('phone',text)}

                    />

                    <Spacer height={20}/>
                    <View style={styles.signupContainer}>
                        <ThemedText type="util" style={{color: "#880808"}}>
                            Click <Link href="/Signup" asChild>
                            <Pressable>
                                <ThemedText type="util" style={{textDecorationLine:'underline',marginLeft: 5, color: "#0f23fa"}}>
                                    here
                                </ThemedText>
                            </Pressable>
                        </Link> to login
                        </ThemedText>

                    </View>
                    <Spacer height={20}/>
                    <View >
                        <Pressable
                            style={styles.button}
                            onPressIn={handleButtonPress}
                        >
                            <Themedtext  >Signup</Themedtext>
                        </Pressable>



                    </View>


                </View>
            </View>
        </ImageBackground>
        </ScrollView>
        </>
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
    },
    errorText: {

            color: 'red',
            fontWeight: 'bold'

        }

} )