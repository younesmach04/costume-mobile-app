import { Image, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import Carousel from "../test/car";
import Spacer from "../../components/Spacer";
import Themedtext from "../../components/Themedtext";
import {Link} from "expo-router";

const Main = () => {
    return (
        <>
            <TouchableOpacity style={{ ...styles.floatingPicture1, right: 20 }}>
                <Image
                    source={require('../../assets/cartsuit.png')}
                    style={styles.image}
                />
            </TouchableOpacity>

            <Link href="/MainApplication/MyProfiles" asChild>
                <TouchableOpacity style={{ ...styles.floatingPicture1, height: 53, right: 100 }}>
                    <Image
                        source={require('../../assets/addprofile.png')}
                        style={styles.image}
                    />
                </TouchableOpacity>
            </Link>

            <Themedtext type='title' style={{ top: 160, left: 20 }}>
                Categories
            </Themedtext>

            <Spacer height={90} />
            <Carousel />
        </>
    );
};

export default Main;

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
        overflow: 'hidden',
    },

    image: {
        width: '100%',
        height: '100%',
        borderRadius: 30,
    },
});
