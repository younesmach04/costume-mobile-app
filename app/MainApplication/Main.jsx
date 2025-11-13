import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'

const Main = () => {
    return ( <>

        <TouchableOpacity style={   {... styles.floatingPicture1 , right:20} }>
            <Image
                source={require('../../assets/cartsuit.png')} // Your image path
                style={styles.image}
            />
        </TouchableOpacity>
        <TouchableOpacity style={   {... styles.floatingPicture1 ,height:53 ,right:100} }>
            <Image
                source={require('../../assets/addprofile.png')} // Your image path
                style={styles.image}
            />
        </TouchableOpacity>
        </>
    )
}

export default Main

const styles = StyleSheet.create({
    floatingPicture1: {
        position: 'absolute',
        top: 80,

        width: 65,
        height: 50,
        borderRadius: 40,
        elevation: 8,
        shadowColor: '#000',

       shadowOffset: { width: 0, height: 9 },
        shadowOpacity: 0.8,

        overflow: 'hidden', // Important for rounded corners
    },

    image: {
        width: '100%',
        height: '100%',

        borderRadius: 30,
    },
})