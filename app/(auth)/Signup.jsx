import {
    StyleSheet,
    TextInput,
    useColorScheme,
    View,
    ImageBackground,
    Pressable,
    Text,
    ScrollView,
    Alert
} from 'react-native'
import { useState } from 'react'
import { colors } from "../../Constants/Colors";
import Spacer from "../../components/Spacer";
import ThemedText from "../../components/Themedtext";
import { Link, useRouter } from "expo-router";
import { authService } from '../../Services/authService';

const Signup = () => {
    const colorScheme = useColorScheme()
    const theme = colors[colorScheme]
    const router = useRouter()
    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: ''
    })
    const [formErrors, setFormErrors] = useState({})
    const [loading, setLoading] = useState(false)

    const handleFocus = (key) => {
        setFormErrors(prev => ({ ...prev, [key]: false }))
    }

    const handleBlur = (key) => {
        if (!user[key] || user[key] === '') {
            setFormErrors(prev => ({ ...prev, [key]: true }))
        }
    }

    const handleInputChange = (key, value) => {
        setUser(prev => {
            return { ...prev, [key]: value }
        })
        if (formErrors[key]) {
            setFormErrors(prev => ({ ...prev, [key]: false }))
        }
    }

    const validateForm = () => {
        const errors = {}
        const requiredFields = ['firstName', 'lastName', 'email', 'password', 'confirmPassword', 'phone']

        requiredFields.forEach(field => {
            if (!user[field] || user[field].trim() === '') {
                errors[field] = true
            }
        })

        if (user.email && !/\S+@\S+\.\S+/.test(user.email)) {
            errors.email = true
        }

        if (user.password && user.password.length < 6) {
            errors.password = true
        }

        if (user.password !== user.confirmPassword) {
            errors.confirmPassword = true
        }

        setFormErrors(errors)
        return Object.keys(errors).length === 0
    }

    const handleSignup = async () => {
        if (!validateForm()) {
            Alert.alert('Erreur', 'Veuillez corriger les erreurs dans le formulaire')
            return
        }

        setLoading(true)
        try {
            const response = await authService.register(user)

            Alert.alert('Succès', 'Compte créé avec succès! Vous pouvez maintenant vous connecter.', [
                {
                    text: 'OK',
                    onPress: () => router.push('/Login')
                }
            ])

        } catch (error) {
            console.error('Signup error:', error)

            if (error.errors) {
                const errorMessages = Object.values(error.errors).flat().join('\n')
                Alert.alert('Erreur de validation', errorMessages)
            } else if (error.message) {
                Alert.alert('Erreur', error.message)
            } else {
                Alert.alert('Erreur', 'Une erreur est survenue lors de la création du compte')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <ImageBackground
                source={require('../../assets/Signup.png')}
                style={styles.background}
                resizeMode="cover"
            >
                <View style={styles.container}>
                    <View style={styles.formContainer}>
                        <Spacer height={70} />
                        {/* Correction : ThemedText au lieu de Themedtext */}
                        <ThemedText type='title'>Sign up</ThemedText>
                        <Spacer height={10} />

                        {/* First Name */}
                        {formErrors['firstName'] && <Text style={styles.errorText}>Le prénom est requis</Text>}
                        <TextInput
                            style={[
                                styles.input,
                                formErrors['firstName'] && styles.inputError
                            ]}
                            placeholder="First Name"
                            placeholderTextColor="#999"
                            value={user.firstName}
                            onChangeText={text => handleInputChange('firstName', text)}
                            onFocus={() => handleFocus('firstName')}
                            onBlur={() => handleBlur('firstName')}
                            editable={!loading}
                        />
                        <Spacer height={15} />

                        {/* Last Name */}
                        {formErrors['lastName'] && <Text style={styles.errorText}>Le nom est requis</Text>}
                        <TextInput
                            style={[
                                styles.input,
                                formErrors['lastName'] && styles.inputError
                            ]}
                            placeholder="Last Name"
                            placeholderTextColor="#999"
                            value={user.lastName}
                            onChangeText={text => handleInputChange('lastName', text)}
                            onFocus={() => handleFocus('lastName')}
                            onBlur={() => handleBlur('lastName')}
                            editable={!loading}
                        />
                        <Spacer height={15} />

                        {/* Email */}
                        {formErrors['email'] && (
                            <Text style={styles.errorText}>
                                {user.email ? 'Format email invalide' : 'L\'email est requis'}
                            </Text>
                        )}
                        <TextInput
                            style={[
                                styles.input,
                                formErrors['email'] && styles.inputError
                            ]}
                            placeholder="Email"
                            placeholderTextColor="#999"
                            value={user.email}
                            onChangeText={text => handleInputChange('email', text)}
                            onFocus={() => handleFocus('email')}
                            onBlur={() => handleBlur('email')}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            editable={!loading}
                        />
                        <Spacer height={15} />

                        {/* Password */}
                        {formErrors['password'] && (
                            <Text style={styles.errorText}>
                                {user.password ? 'Le mot de passe doit contenir au moins 6 caractères' : 'Le mot de passe est requis'}
                            </Text>
                        )}
                        <TextInput
                            style={[
                                styles.input,
                                formErrors['password'] && styles.inputError
                            ]}
                            placeholder="Password"
                            placeholderTextColor="#999"
                            secureTextEntry
                            value={user.password}
                            onChangeText={text => handleInputChange('password', text)}
                            onFocus={() => handleFocus('password')}
                            onBlur={() => handleBlur('password')}
                            editable={!loading}
                        />
                        <Spacer height={15} />

                        {/* Confirm Password */}
                        {formErrors['confirmPassword'] && (
                            <Text style={styles.errorText}>
                                {user.confirmPassword ? 'Les mots de passe ne correspondent pas' : 'La confirmation du mot de passe est requise'}
                            </Text>
                        )}
                        <TextInput
                            style={[
                                styles.input,
                                formErrors['confirmPassword'] && styles.inputError
                            ]}
                            placeholder="Confirm Password"
                            placeholderTextColor="#999"
                            secureTextEntry
                            value={user.confirmPassword}
                            onChangeText={text => handleInputChange('confirmPassword', text)}
                            onFocus={() => handleFocus('confirmPassword')}
                            onBlur={() => handleBlur('confirmPassword')}
                            editable={!loading}
                        />
                        <Spacer height={15} />

                        {/* Phone */}
                        {formErrors['phone'] && <Text style={styles.errorText}>Le téléphone est requis</Text>}
                        <TextInput
                            style={[
                                styles.input,
                                formErrors['phone'] && styles.inputError
                            ]}
                            placeholder="Phone"
                            placeholderTextColor="#999"
                            value={user.phone}
                            onChangeText={text => handleInputChange('phone', text)}
                            onFocus={() => handleFocus('phone')}
                            onBlur={() => handleBlur('phone')}
                            keyboardType="phone-pad"
                            editable={!loading}
                        />

                        <Spacer height={20} />

                        {/* Link to Login */}
                        <View style={styles.signupContainer}>
                            <ThemedText type="util" style={{ color: "#880808" }}>
                                Already have an account?{' '}
                                <Link href="/Login" asChild>
                                    <Pressable>
                                        <ThemedText
                                            type="util"
                                            style={{
                                                textDecorationLine: 'underline',
                                                color: "#0f23fa"
                                            }}
                                        >
                                            Login here
                                        </ThemedText>
                                    </Pressable>
                                </Link>
                            </ThemedText>
                        </View>

                        <Spacer height={20} />

                        {/* Signup Button */}
                        <View>
                            <Pressable
                                style={[
                                    styles.button,
                                    loading && styles.buttonDisabled
                                ]}
                                onPress={handleSignup}
                                disabled={loading}
                            >
                                {/* Correction : ThemedText au lieu de Themedtext */}
                                <ThemedText style={styles.buttonText}>
                                    {loading ? 'Creating...' : 'Signup'}
                                </ThemedText>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </ScrollView>
    )
}

export default Signup

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
    },
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
    inputError: {
        borderColor: 'red',
        borderWidth: 2,
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
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    errorText: {
        color: 'red',
        fontWeight: 'bold',
        fontSize: 12,
        marginBottom: 5,
    }
})