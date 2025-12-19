import {
    ScrollView, StyleSheet, Text, TouchableOpacity, View,
    ActivityIndicator, Alert
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import Spacer from "../../../components/Spacer";
import Themedtext from "../../../components/Themedtext";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import pantalonService from "../../../Services/PantalonService";
import authService from "../../../Services/authService"; // Ajouté

const PantalonProfile = () => {
    const [pantalons, setPantalons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchPantalons();
    }, []);

    const fetchPantalons = async () => {
        try {
            setLoading(true);
            setError(null);

            // 1. Récupérer l'utilisateur
            const user = await authService.getCurrentUser();
            if (!user?.id) throw new Error("Utilisateur non connecté");

            // 2. Appeler le service par utilisateur
            const response = await pantalonService.getProfilesByUser(user.id);

            // 3. Extraction sécurisée (supporte {data: []} ou [])
            const profilesArray = response?.data || (Array.isArray(response) ? response : []);
            setPantalons(profilesArray);

        } catch (err) {
            console.error('Error:', err);
            setError(err.message || 'Impossible de charger vos profils');
            setPantalons([]);
            Alert.alert('Erreur', err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleRefresh = () => fetchPantalons();

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <Themedtext style={styles.headerTitle}>Mes Profils Pantalon</Themedtext>
                <TouchableOpacity onPress={handleRefresh} disabled={loading}>
                    <Ionicons name="refresh" size={24} color={loading ? "#cccccc" : "#1e3a8a"} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {loading ? (
                    <View style={styles.centerContent}>
                        <ActivityIndicator size="large" color="#1e3a8a" />
                        <Text style={styles.loadingText}>Chargement...</Text>
                    </View>
                ) : error ? (
                    <View style={styles.centerContent}>
                        <Ionicons name="alert-circle-outline" size={64} color="#ff6b6b" />
                        <Text style={styles.errorText}>{error}</Text>
                        <TouchableOpacity style={styles.retryButton} onPress={handleRefresh}>
                            <Text style={styles.retryButtonText}>Réessayer</Text>
                        </TouchableOpacity>
                    </View>
                ) : pantalons.length === 0 ? (
                    <View style={styles.centerContent}>
                        <MaterialCommunityIcons name="fencing" size={64} color="#cccccc" />
                        <Themedtext style={styles.emptyText}>Aucun pantalon</Themedtext>
                        <Text style={styles.emptySubtext}>Créez votre premier profil de mesures.</Text>
                    </View>
                ) : (
                    pantalons.map((pant) => (
                        <TouchableOpacity
                            key={pant.id}
                            style={styles.card}
                            onPress={() => router.push({
                                pathname: `/MainApplication/Profiles/PantalonDetails`,
                                params: { id: pant.id }
                            })}
                        >
                            <View style={styles.cardHeader}>
                                <MaterialCommunityIcons name="archive-arrow-down-outline" size={24} color="#1e3a8a" style={styles.icon} />
                                <View style={styles.info}>
                                    <Text style={styles.name}>{pant.profile_name || 'Sans nom'}</Text>
                                    <Text style={styles.description}>Coupe : {pant.coupe} • Taille : {pant.tour_taille} cm</Text>
                                </View>
                                <Ionicons name="chevron-forward" size={20} color="#999" />
                            </View>
                        </TouchableOpacity>
                    ))
                )}
            </ScrollView>

            <TouchableOpacity
                style={styles.pillButton}
                onPress={() => router.push('/MainApplication/Profiles/Create/CreatePantalon')}
            >
                <Ionicons name="add" size={24} color="#ffffff" />
                <Text style={styles.pillText}>Nouveau Pantalon</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#ffffff" },
    header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 16 },
    headerTitle: { fontSize: 20, fontWeight: "bold", color: "#1e3a8a" },
    scrollContent: { padding: 16, paddingBottom: 100 },
    centerContent: { flex: 1, alignItems: "center", justifyContent: "center", marginTop: 60 },
    loadingText: { marginTop: 8, color: "#64748b" },
    errorText: { color: "#ff6b6b", fontWeight: "bold", marginBottom: 15 },
    retryButton: { backgroundColor: "#1e3a8a", padding: 10, borderRadius: 6 },
    retryButtonText: { color: "#fff", fontWeight: "bold" },
    emptyText: { fontSize: 18, fontWeight: "600" },
    emptySubtext: { color: "#777", textAlign: "center", paddingHorizontal: 20 },
    card: { backgroundColor: "#f8fafc", borderRadius: 12, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: '#e2e8f0' },
    cardHeader: { flexDirection: "row", alignItems: "center" },
    icon: { marginRight: 12 },
    info: { flex: 1 },
    name: { fontSize: 16, fontWeight: "bold", color: "#1e293b" },
    description: { fontSize: 14, color: "#64748b", marginTop: 4 },
    pillButton: { position: "absolute", bottom: 30, right: 20, flexDirection: "row", alignItems: "center", backgroundColor: "#1e3a8a", paddingHorizontal: 20, paddingVertical: 12, borderRadius: 30, elevation: 5 },
    pillText: { color: "#ffffff", fontWeight: "bold", marginLeft: 8 },
});

export default PantalonProfile;