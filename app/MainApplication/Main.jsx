import { TouchableOpacity, StyleSheet, View, Text, ScrollView, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import Spacer from "../../components/Spacer";
import Themedtext from "../../components/Themedtext";
import { Link } from "expo-router";
import authService from '../../Services/authService';

const { width } = Dimensions.get('window');
// Calcul pour avoir exactement 2 colonnes avec des marges propres
const CARD_WIDTH = (width - 50) / 2;

const Main = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const userData = await authService.getCurrentUser();
                setUser(userData);
            } catch (error) {
                console.error("Erreur chargement utilisateur:", error);
            } finally {
                setLoading(false);
            }
        };
        loadUserData();
    }, []);

    const isAdmin = user?.role === 'Admin';

    const getPath = (type) => {
        if (isAdmin) {
            switch (type) {
                case 'veste': return "/MainApplication/VesteManagement";
                case 'pantalon': return "/MainApplication/PantalonManagement";
                case 'gilet': return "/MainApplication/GiletManagement";
                case 'costume': return "/MainApplication/CostumeManagement";
                default: return "/MainApplication/Home";
            }
        } else {
            switch (type) {
                case 'veste': return "/MainApplication/Profiles/VesteProfile";
                case 'pantalon': return "/MainApplication/Profiles/PantalonProfile";
                case 'gilet': return "/MainApplication/Profiles/GiletProfile";
                case 'costume': return "/MainApplication/Profiles/CostumeProfile";
                default: return "/MainApplication/Home";
            }
        }
    };

    if (loading) return null;

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <View style={styles.header}>
                <View style={styles.welcomeSection}>
                    <Text style={styles.greeting}>Bienvenue, {user?.firstName || ''}</Text>
                    <Text style={styles.tagline}>
                        {isAdmin ? "Espace d'administration" : "Créez votre costume parfait"}
                    </Text>
                </View>
            </View>

            {/* Navigation rapide */}
            <View style={styles.categoriesSection}>
                <Themedtext style={styles.sectionTitle}>Navigation rapide</Themedtext>
                <View style={styles.categoriesGrid}>
                    <Link href={getPath('veste')} asChild>
                        <TouchableOpacity style={styles.categoryCard}>
                            <View style={styles.categoryImageContainer}><Text style={styles.categoryEmoji}>👔</Text></View>
                            <Text style={styles.categoryTitle}>Vestes</Text>
                        </TouchableOpacity>
                    </Link>
                    <Link href={getPath('pantalon')} asChild>
                        <TouchableOpacity style={styles.categoryCard}>
                            <View style={styles.categoryImageContainer}><Text style={styles.categoryEmoji}>👖</Text></View>
                            <Text style={styles.categoryTitle}>Pantalons</Text>
                        </TouchableOpacity>
                    </Link>
                    <Link href={getPath('gilet')} asChild>
                        <TouchableOpacity style={styles.categoryCard}>
                            <View style={styles.categoryImageContainer}><Text style={styles.categoryEmoji}>🦺</Text></View>
                            <Text style={styles.categoryTitle}>Gilets</Text>
                        </TouchableOpacity>
                    </Link>
                    <Link href={getPath('costume')} asChild>
                        <TouchableOpacity style={styles.categoryCard}>
                            <View style={styles.categoryImageContainer}><Text style={styles.categoryEmoji}>📋</Text></View>
                            <Text style={styles.categoryTitle}>Costumes</Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            </View>


            <View style={styles.quickActionsSection}>
                <Text style={styles.quickActionsTitle}>Actions disponibles</Text>

                    {!isAdmin ? (
                        <>
                            {/* Ligne 1 */}
                            <View style={styles.actionsGrid}>
                            <Link href="/MainApplication/Profiles/Create/CreateVeste" asChild>
                                <TouchableOpacity style={styles.actionCard}>
                                    <View style={styles.categoryImageContainer}><Text style={styles.categoryEmoji}>👔</Text></View>
                                    <Text style={styles.actionText}>Nouvelle Veste</Text>
                                </TouchableOpacity>
                            </Link>

                            <Link href="/MainApplication/Profiles/Create/CreatePantalon" asChild>
                                <TouchableOpacity style={styles.actionCard}>
                                    <View style={styles.categoryImageContainer}><Text style={styles.categoryEmoji}>👖</Text></View>
                                    <Text style={styles.actionText}>Nouveau Pantalon</Text>
                                </TouchableOpacity>
                            </Link>
                            </View>
                            <View style={styles.actionsGrid}>

                            {/* Ligne 2 */}
                            <Link href="/MainApplication/Profiles/Create/CreateGilet" asChild>
                                <TouchableOpacity style={styles.actionCard}>
                                    <View style={styles.categoryImageContainer}><Text style={styles.categoryEmoji}>🦺</Text></View>
                                    <Text style={styles.actionText}>Nouveau Gilet</Text>
                                </TouchableOpacity>
                            </Link>


                            <Link href="/MainApplication/MyProfiles" asChild>
                                <TouchableOpacity style={styles.actionCard}>
                                    <View style={styles.categoryImageContainer}><Text style={styles.categoryEmoji}>📋</Text></View>
                                    <Text style={styles.actionText}>Mes Profils</Text>
                                </TouchableOpacity>
                            </Link>
                            </View>
                        </>
                    ) : (
                        <View style={styles.actionsGrid}>
                            <Link href="/MainApplication/UserManagement" asChild>
                                <TouchableOpacity style={[styles.actionCard, styles.greenCard, { width: width - 40 }]}>
                                    <Text style={styles.actionIcon}>👥</Text>
                                    <Text style={styles.actionText}>Gérer les Profils Clients</Text>
                                </TouchableOpacity>
                            </Link>
                        </View>
                    )}
            </View>

            <Spacer height={40} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8fafc' },
    header: { backgroundColor: '#1e3a8a', padding: 25, paddingTop: 60, borderBottomLeftRadius: 30, borderBottomRightRadius: 30, elevation: 5 },
    welcomeSection: { marginBottom: 10 },
    greeting: { fontSize: 26, fontWeight: 'bold', color: '#fff' },
    tagline: { fontSize: 15, color: 'rgba(255,255,255,0.8)', marginTop: 4 },

    categoriesSection: { marginTop: 25, paddingHorizontal: 20 },
    sectionTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#1e293b' },
    categoriesGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
    categoryCard: { width: '48%', backgroundColor: '#fff', padding: 15, borderRadius: 20, alignItems: 'center', marginBottom: 10, elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5 },
    categoryImageContainer: { backgroundColor: '#f0f4ff', padding: 10, borderRadius: 50, marginBottom: 8 },
    categoryEmoji: { fontSize: 24 },
    categoryTitle: { fontWeight: '600', color: '#334155' },

    quickActionsSection: { marginTop: 20, paddingHorizontal: 20 },
    quickActionsTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 15, color: '#1e293b' },
    actionsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around'

    },
    actionCard: { width: '48%', backgroundColor: '#fff', padding: 15, borderRadius: 20, alignItems: 'center', marginBottom: 10, elevation: 2, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5 },
    purpleCard: { backgroundColor: '#f5f3ff' },
    pinkCard: { backgroundColor: '#fff1f2' },
    blueCard: { backgroundColor: '#eff6ff' },
    greenCard: { backgroundColor: '#f0fdf4' },
    actionIcon: { fontSize: 28, marginBottom: 8 },
    actionText: { fontWeight: '700', textAlign: 'center', color: '#1e3a8a', fontSize: 14 },
});

export default Main;