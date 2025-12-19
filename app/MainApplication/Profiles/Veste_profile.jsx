import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ActivityIndicator,
    Alert
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import Themedtext from "../../../components/Themedtext";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import vesteService from "../../../Services/VesteService";
import authService from "../../../Services/authService";

const VesteProfile = () => {
    const [vestes, setVestes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchVestes();
    }, []);

    const fetchVestes = async () => {
        try {
            setLoading(true);
            setError(null);

            // 1. Récupérer l'utilisateur connecté
            const user = await authService.getCurrentUser();

            if (!user || !user.id) {
                throw new Error("Session expirée. Veuillez vous reconnecter.");
            }

            const response = await vesteService.getProfilesByUser(user.id);
            const profilesArray = response?.data || (Array.isArray(response) ? response : []);

            setVestes(profilesArray);

        } catch (err) {
            console.error('Error fetching vestes:', err);
            setError(err.message || 'Impossible de charger vos profils');
            setVestes([]);
            Alert.alert('Erreur', err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleRefresh = () => fetchVestes();

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <View style={styles.header}>
                <Themedtext style={styles.headerTitle}>Mes Profils Veste</Themedtext>
                <TouchableOpacity onPress={handleRefresh} disabled={loading}>
                    <Ionicons name="refresh" size={24} color={loading ? "#cccccc" : "#1e3a8a"} />
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {loading ? (
                    <View style={styles.centerContent}>
                        <ActivityIndicator size="large" color="#1e3a8a" />
                        <Text style={styles.loadingText}>Chargement de vos mesures...</Text>
                    </View>
                ) : error ? (
                    <View style={styles.centerContent}>
                        <Ionicons name="alert-circle-outline" size={64} color="#ff6b6b" />
                        <Text style={styles.errorText}>{error}</Text>
                        <TouchableOpacity style={styles.retryButton} onPress={handleRefresh}>
                            <Text style={styles.retryButtonText}>Réessayer</Text>
                        </TouchableOpacity>
                    </View>
                ) : vestes.length === 0 ? (
                    <View style={styles.centerContent}>
                        <MaterialCommunityIcons name="coat-rack" size={64} color="#cccccc" />
                        <Themedtext style={styles.emptyText}>Aucun profil trouvé</Themedtext>
                        <Text style={styles.emptySubtext}>Créez votre premier profil de mesures pour continuer.</Text>
                    </View>
                ) : (
                    vestes.map((veste) => (
                        <TouchableOpacity
                            key={veste.id}
                            style={styles.card}
                            onPress={() => router.push({
                                pathname: `/MainApplication/Profiles/VesteDetails`,
                                params: { id: veste.id }
                            })}
                        >
                            <View style={styles.cardHeader}>
                                <Ionicons name="shirt" size={24} color="#1e3a8a" style={styles.icon} />
                                <View style={styles.info}>
                                    <Text style={styles.name}>{veste.profile_name || 'Sans nom'}</Text>
                                    <Text style={styles.description}>Modèle : {veste.type_revers} - {veste.boutons} boutons</Text>
                                </View>
                                <Ionicons name="chevron-forward" size={20} color="#999" />
                            </View>
                        </TouchableOpacity>
                    ))
                )}
            </ScrollView>

            <TouchableOpacity
                style={styles.pillButton}
                onPress={() => router.push('/MainApplication/Profiles/Create/CreateVeste')}
            >
                <Ionicons name="add" size={24} color="#ffffff" />
                <Text style={styles.pillText}>Nouveau Profil</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 20 },
    headerTitle: { fontSize: 22, fontWeight: "bold", color: "#1e293b" },
    scrollContent: { padding: 20, paddingBottom: 120 },
    centerContent: { flex: 1, alignItems: "center", justifyContent: "center", marginTop: 100 },
    loadingText: { marginTop: 10, color: "#64748b" },
    errorText: { color: "#ef4444", marginBottom: 20 },
    retryButton: { backgroundColor: "#1e3a8a", padding: 10, borderRadius: 8 },
    retryButtonText: { color: "#fff", fontWeight: "bold" },
    emptyText: { fontSize: 18, fontWeight: "bold", marginTop: 10 },
    emptySubtext: { color: "#64748b", textAlign: "center", marginTop: 5 },
    card: { backgroundColor: "#f8fafc", borderRadius: 15, padding: 18, marginBottom: 12, borderWidth: 1, borderColor: "#e2e8f0" },
    cardHeader: { flexDirection: "row", alignItems: "center" },
    icon: { marginRight: 15 },
    info: { flex: 1 },
    name: { fontSize: 16, fontWeight: "bold", color: "#1e293b" },
    description: { fontSize: 13, color: "#64748b", marginTop: 2 },
    pillButton: { position: "absolute", bottom: 30, right: 20, flexDirection: "row", alignItems: "center", backgroundColor: "#1e3a8a", paddingHorizontal: 20, paddingVertical: 15, borderRadius: 30, elevation: 5 },
    pillText: { color: "#fff", fontWeight: "bold", marginLeft: 8 }
});

export default VesteProfile;