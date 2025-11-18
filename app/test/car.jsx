import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";

const CostumesSection = () => {
    const categories = [
        {
            title: 'Suits',
            subtitle: '',
            image: require('../../assets/c1.png'),
            backgroundColor: '#f8f8f8'
        },
        {
            title: 'Pants',
            subtitle: '',
            image: require('../../assets/c2.png'),
            backgroundColor: '#ffffff'
        },
        {
            title: 'Shirts',
            subtitle: '',

            image: require('../../assets/c3.png'),
            backgroundColor: '#f8f8f8'
        },
        {
            title: 'Gilets ',
            subtitle: '',
            image: require('../../assets/c4.png'),
            backgroundColor: '#ffffff'
        }
    ];

    return (
        <SafeAreaView>
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>Costumes homme</Text>

            <View style={styles.categoriesGrid}>
                {categories.map((category, index) => (
                    <TouchableOpacity key={index} style={styles.categoryItem}>
                        <View style={[styles.categoryCard, { backgroundColor: category.backgroundColor }]}>
                            <View style={styles.imageContainer}>
                                <Image
                                    source={category.image}
                                    style={styles.circularImage}
                                    resizeMode="cover"
                                />
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.categoryTitle}>{category.title}</Text>
                                <Text style={styles.categorySubtitle}>{category.subtitle}</Text>
                                {category.subsubtitle && (
                                    <Text style={styles.categorySubtitle}>{category.subsubtitle}</Text>
                                )}
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </View>

        </SafeAreaView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 10,
        textAlign: 'left',
    },
    categoriesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    categoryItem: {
        width: '48%',
        marginBottom: 12,
    },
    categoryCard: {
        padding: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        alignItems: 'center',
        minHeight: 180,
    },
    imageContainer: {
        marginBottom: 12,
    },
    circularImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    textContainer: {
        alignItems: 'center',
    },
    categoryTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
        textAlign: 'center',
    },
    categorySubtitle: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
        color: '#333',
    },
});

export default CostumesSection;