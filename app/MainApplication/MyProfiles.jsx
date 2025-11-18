import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';

const ProfileNavigationButtons = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>My profiles</Text>

            <TouchableOpacity
                style={[styles.button, styles.vesteButton]}
                onPress={() => router.push('/MainApplication/Profiles/Veste_profile')}
                activeOpacity={0.7}
            >
                <Text style={styles.buttonText}>Veste Profiles</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, styles.giletButton]}
                onPress={() => router.push('/MainApplication/Profiles/Gilet_profile')}
                activeOpacity={0.7}
            >
                <Text style={styles.buttonText}>Gilet Profiles</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, styles.pantalonButton]}
                onPress={() => router.push('/MainApplication/Profiles/Pantalon_profile')}
                activeOpacity={0.7}
            >
                <Text style={styles.buttonText}>Pantalon Profiles</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#333',
    },
    button: {
        width: '100%',
        maxWidth: 300,
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginVertical: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    vesteButton: {
        backgroundColor: '#3498db',
    },
    giletButton: {
        backgroundColor: '#e74c3c',
    },
    pantalonButton: {
        backgroundColor: '#2ecc71',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '600',
    },
});

export default ProfileNavigationButtons;