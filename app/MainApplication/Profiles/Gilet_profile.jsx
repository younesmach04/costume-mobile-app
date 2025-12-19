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
import Spacer from "../../../components/Spacer";
import Themedtext from "../../../components/Themedtext";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import giletService from "../../../Services/GiletService";
import authService from "../../../Services/authService"; // Import du service d'authentification

const GiletProfile = () => {
    const [gilets, setGilets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchGilets();
    }, []);

    const fetchGilets = async () => {
        try {
            setLoading(true);
            setError(null);

            // 1. Récupérer l'utilisateur connecté
            const user = await authService.getCurrentUser();

            if (!user || !user.id) {
                throw new Error("Session expirée. Veuillez vous reconnecter.");
            }

            // 2. Appeler getProfilesByUser au lieu de getAllProfiles
            const response = await giletService.getProfilesByUser(user.id);

            /**
             * 3. Gestion du format de réponse :
             * Laravel retourne souvent { success: true, data: [...] }
             */
            const profilesArray = response?.data || (Array.isArray(response) ? response : []);
            setGilets(profilesArray);

        } catch (err) {
            console.error('Error fetching gilets:', err);
            const message = err?.message || 'Impossible de charger vos profils';
            setError(message);
            setGilets([]); // Évite que .map ne plante
            Alert.alert('Erreur', message);
        } finally {
            setLoading(false);
        }
    };

    const handleRefresh = () => {
        fetchGilets();
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>

            {/* HEADER */}
            <View style={styles.header}>
                <Themedtext style={styles.headerTitle}>Mes Profils Gilet</Themedtext>
                <TouchableOpacity onPress={handleRefresh} disabled={loading}>
                    <Ionicons
                        name="refresh"
                        size={24}
                        color={loading ? "#cccccc" : "#1e3a8a"}
                    />
                </TouchableOpacity>
            </View>

            {/* CONTENT */}
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {loading ? (
                    <View style={styles.centerContent}>
                        <ActivityIndicator size="large" color="#1e3a8a" />
                        <Spacer height={12} />
                        <Text style={styles.loadingText}>Chargement...</Text>
                    </View>

                ) : error ? (
                    <View style={styles.centerContent}>
                        <Ionicons name="alert-circle-outline" size={64} color="#ff6b6b" />
                        <Spacer height={16} />
                        <Text style={styles.errorText}>Erreur de chargement</Text>
                        <Spacer height={8} />
                        <Text style={styles.errorSubtext}>{error}</Text>
                        <Spacer height={20} />
                        <TouchableOpacity
                            style={styles.retryButton}
                            onPress={handleRefresh}
                        >
                            <Text style={styles.retryButtonText}>Réessayer</Text>
                        </TouchableOpacity>
                    </View>

                ) : gilets.length === 0 ? (
                    <View style={styles.centerContent}>
                        <MaterialCommunityIcons name="vest" size={64} color="#cccccc" />
                        <Spacer height={16} />
                        <Themedtext style={styles.emptyText}>Aucun Gilet</Themedtext>
                        <Spacer height={8} />
                        <Text style={styles.emptySubtext}>
                            Vous n'avez pas encore créé de profil gilet.
                        </Text>
                    </View>

                ) : (
                    gilets.map((gilet) => (
                        <TouchableOpacity
                            key={gilet.id}
                            style={styles.giletCard}
                            activeOpacity={0.7}
                            onPress={() =>
                                router.push({
                                    pathname: `/MainApplication/Profiles/GiletDetails`,
                                    params: { id: gilet.id }
                                })
                            }
                        >
                            <View style={styles.giletCardHeader}>
                                <View style={styles.giletIconContainer}>
                                    <Ionicons name="shirt" size={24} color="#1e3a8a" />
                                </View>

                                <View style={styles.giletInfo}>
                                    <Text style={styles.giletName}>
                                        {gilet.profile_name || 'Gilet sans nom'}
                                    </Text>

                                    <Text style={styles.giletDescription} numberOfLines={2}>
                                        {gilet.poches ? `Poches : ${gilet.poches}` : 'Mesures personnalisées'}
                                    </Text>
                                </View>

                                <Ionicons
                                    name="chevron-forward"
                                    size={20}
                                    color="#999999"
                                />
                            </View>
                        </TouchableOpacity>
                    ))
                )}
            </ScrollView>

            {/* CREATE BUTTON */}
            <TouchableOpacity
                style={styles.pillButton}
                activeOpacity={0.8}
                onPress={() =>
                    router.push('/MainApplication/Profiles/Create/CreateGilet')
                }
            >
                <View style={styles.plusIcon}>
                    <Ionicons name="add" size={24} color="#ffffff" />
                </View>
                <Text style={styles.pillText}>Nouveau Gilet</Text>
            </TouchableOpacity>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#ffffff" },
    header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 16 },
    headerTitle: { fontSize: 20, fontWeight: "bold", color: "#1e293b" },
    scrollContent: { padding: 16, paddingBottom: 100 },
    centerContent: { flex: 1, alignItems: "center", justifyContent: "center", marginTop: 40 },
    loadingText: { marginTop: 8, color: "#555" },
    errorText: { fontSize: 18, fontWeight: "bold", color: "#ff6b6b", textAlign: "center" },
    errorSubtext: { textAlign: "center", color: "#777" },
    retryButton: { backgroundColor: "#1e3a8a", paddingHorizontal: 20, paddingVertical: 10, borderRadius: 6 },
    retryButtonText: { color: "#ffffff", fontWeight: "bold" },
    emptyText: { fontSize: 18, fontWeight: "600" },
    emptySubtext: { textAlign: "center", color: "#777", marginHorizontal: 20 },
    giletCard: { backgroundColor: "#f8fafc", borderRadius: 12, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: "#e2e8f0" },
    giletCardHeader: { flexDirection: "row", alignItems: "center" },
    giletIconContainer: { marginRight: 12 },
    giletInfo: { flex: 1 },
    giletName: { fontSize: 16, fontWeight: "bold", color: "#1e293b" },
    giletDescription: { fontSize: 14, color: "#64748b", marginTop: 4 },
    pillButton: { position: "absolute", bottom: 30, right: 20, flexDirection: "row", alignItems: "center", backgroundColor: "#1e3a8a", paddingHorizontal: 20, paddingVertical: 12, borderRadius: 30, elevation: 5 },
    plusIcon: { marginRight: 6 },
    pillText: { color: "#ffffff", fontWeight: "bold" },
});

export default GiletProfile;