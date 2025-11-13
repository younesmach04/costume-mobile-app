import {StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import {Link} from "expo-router";
import Spacer from "../components/Spacer";

const index = () => {
    return (

        <SafeAreaView style={styles.container}>
            <Spacer height={200}></Spacer>
            <Link href="/(auth)/Login" asChild>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Go to Auth Screen</Text>
                </TouchableOpacity>
            </Link>
            <Spacer height={200}></Spacer>
            <Link href="/MainApplication/Main" asChild>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Go to main Screen</Text>
                </TouchableOpacity>
            </Link>

        </SafeAreaView>
    )
}

export default index

const styles = StyleSheet.create({
    buttonText: {
        color: 'black',
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
    }
});