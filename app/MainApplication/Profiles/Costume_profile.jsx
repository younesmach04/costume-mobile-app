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
import costumeService from "../../../Services/CostumeService";

const CostumeProfile = () => {
    const [costumes, setCostumes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchCostumes();
    }, []);

    const fetchCostumes = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await costumeService.getAllCostumes();
            setCostumes(data);

        } catch (err) {
            console.error('Error fetching costumes:', err);
            const message = err?.message || err?.error || 'Impossible de charger les costumes';
            setError(message);
            Alert.alert('Erreur', message);
        } finally {
            setLoading(false);
        }
    };

    const handleRefresh = () => {
        fetchCostumes();
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>

            {/* HEADER */}
            <View style={styles.header}>
                <Themedtext style={styles.headerTitle}>Mes Costumes</Themedtext>
                <TouchableOpacity onPress={handleRefresh} disabled={loading}>
                    <Ionicons
                        name="refresh"
                        size={24}
                        color={loading ? "#cccccc" : "#335333"}
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
                        <ActivityIndicator size="large" color="#335333" />
                        <Spacer height={12} />
                        <Text style={styles.loadingText}>Chargement des costumes...</Text>
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

                ) : costumes.length === 0 ? (
                    <View style={styles.centerContent}>
                        <MaterialCommunityIcons name="tshirt-crew-outline" size={64} color="#cccccc" />
                        <Spacer height={16} />
                        <Themedtext style={styles.emptyText}>Aucun Costume</Themedtext>
                        <Spacer height={8} />
                        <Text style={styles.emptySubtext}>
                            Créez votre premier ensemble personnalisé dès maintenant.
                        </Text>
                    </View>

                ) : (
                    costumes.map((costume) => (
                        <TouchableOpacity
                            key={costume.id}
                            style={styles.card}
                            activeOpacity={0.7}
                            onPress={() =>
                                router.push({
                                    pathname: `/MainApplication/Profiles/CostumeDetails`,
                                    params: { id: costume.id }
                                })
                            }
                        >
                            <View style={styles.cardHeader}>
                                <View style={styles.iconContainer}>
                                    {/* Icône de costume complet */}
                                    <MaterialCommunityIcons name="black-mesa" size={28} color="#335333" />
                                </View>

                                <View style={styles.info}>
                                    <Text style={styles.name}>
                                        {costume.name || 'Costume Sans Nom'}
                                    </Text>
                                    <Text style={styles.description} numberOfLines={2}>
                                        {costume.veste_profile_id ? "✓ Veste " : ""}
                                        {costume.pantalon_id ? "✓ Pantalon " : ""}
                                        {costume.gilet_id ? "✓ Gilet" : ""}
                                    </Text>
                                </View>

                                <Ionicons name="chevron-forward" size={20} color="#999999" />
                            </View>
                        </TouchableOpacity>
                    ))
                )}
            </ScrollView>

            {/* CREATE BUTTON */}
            <TouchableOpacity
                style={styles.pillButton}
                activeOpacity={0.8}
                onPress={() => router.push('/MainApplication/Profiles/Create/CreateCostume')}
            >
                <View style={styles.plusIconContainer}>
                    <Ionicons name="add" size={24} color="#ffffff" />
                </View>
                <Text style={styles.pillText}>Nouveau Costume</Text>
            </TouchableOpacity>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 16,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: "bold",
    },
    scrollContent: {
        padding: 16,
        paddingBottom: 120,
    },
    centerContent: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 60,
    },
    loadingText: {
        marginTop: 8,
        color: "#555",
    },
    errorText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#ff6b6b",
        textAlign: "center",
    },
    errorSubtext: {
        textAlign: "center",
        color: "#777",
    },
    retryButton: {
        backgroundColor: "#335333",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 6,
    },
    retryButtonText: {
        color: "#ffffff",
        fontWeight: "bold",
    },
    emptyText: {
        fontSize: 18,
        fontWeight: "600",
    },
    emptySubtext: {
        textAlign: "center",
        color: "#777",
        marginHorizontal: 20,
    },
    card: {
        backgroundColor: "#f8fafc", // Un gris/bleu très léger pour différencier
        borderRadius: 12,
        padding: 18,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: "#e2e8f0",
    },
    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
    },
    iconContainer: {
        marginRight: 15,
        backgroundColor: "#edf2ed",
        padding: 10,
        borderRadius: 10,
    },
    info: {
        flex: 1,
    },
    name: {
        fontSize: 17,
        fontWeight: "bold",
        color: "#1e293b",
    },
    description: {
        fontSize: 13,
        color: "#64748b",
        marginTop: 4,
        fontStyle: 'italic',
    },
    pillButton: {
        position: "absolute",
        bottom: 30, // Ajusté selon votre navigation
        right: 20,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#335333",
        paddingHorizontal: 20,
        paddingVertical: 14,
        borderRadius: 30,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    plusIconContainer: {
        marginRight: 8,
    },
    pillText: {
        color: "#ffffff",
        fontWeight: "bold",
        fontSize: 16,
    },
});

export default CostumeProfile;