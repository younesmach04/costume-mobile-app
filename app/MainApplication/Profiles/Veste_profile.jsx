import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React from 'react'
import {SafeAreaView} from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import {router} from "expo-router";

const VesteProfile = () => {
    return (<>

        <SafeAreaView>
         <ScrollView>

             <Text> GET REQUEST FOR VEST </Text>

         </ScrollView>


        </SafeAreaView>
            <TouchableOpacity
            style={styles.pillButton}
            onPress={() => router.push('/MainApplication/Profiles/Create/CreateVeste')}
            activeOpacity={0.8}
        >
            <View style={styles.plusIcon}>
                <Ionicons name="add" size={24} color="#335333" />
            </View>
            <Text style={styles.pillText}>Create Vest</Text>
        </TouchableOpacity>

        </>
        )
}
export default VesteProfile
const styles = StyleSheet.create({
    pillButton: {
        position: 'absolute',
        bottom: 150,
        right: 30,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        paddingVertical: 12,
        paddingRight: 20,
        paddingLeft: 8,
        borderRadius: 50,
        gap: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 6,
        borderWidth: 2,
        borderColor: '#335333',
    },
    plusIcon: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#335333',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pillText: {
        color: '#335333',
        fontSize: 16,
        fontWeight: '700',
    },
});