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
import pantalonService from "../../../Services/PantalonService";

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

            // Appel au service pour récupérer les pantalons
            const data = await pantalonService.getAllProfiles();
            setPantalons(data);

        } catch (err) {
            console.error('Error fetching pantalons:', err);
            const message = err?.message || err?.error || 'Impossible de charger les profils';
            setError(message);
            Alert.alert('Erreur', message);
        } finally {
            setLoading(false);
        }
    };

    const handleRefresh = () => {
        fetchPantalons();
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>

            {/* HEADER */}
            <View style={styles.header}>
                <Themedtext style={styles.headerTitle}>Pantalon Profiles</Themedtext>
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
                        <Text style={styles.loadingText}>Loading pants...</Text>
                    </View>

                ) : error ? (
                    <View style={styles.centerContent}>
                        <Ionicons name="alert-circle-outline" size={64} color="#ff6b6b" />
                        <Spacer height={16} />
                        <Text style={styles.errorText}>Failed to load pantalons</Text>
                        <Spacer height={8} />
                        <Text style={styles.errorSubtext}>{error}</Text>
                        <Spacer height={20} />
                        <TouchableOpacity
                            style={styles.retryButton}
                            onPress={handleRefresh}
                        >
                            <Text style={styles.retryButtonText}>Retry</Text>
                        </TouchableOpacity>
                    </View>

                ) : pantalons.length === 0 ? (
                    <View style={styles.centerContent}>
                        <MaterialCommunityIcons name="fencing" size={64} color="#cccccc" />
                        <Spacer height={16} />
                        <Themedtext style={styles.emptyText}>No Pantalons Yet</Themedtext>
                        <Spacer height={8} />
                        <Text style={styles.emptySubtext}>
                            Tap the button below to create your first pant profile
                        </Text>
                    </View>

                ) : (
                    pantalons.map((pant) => (
                        <TouchableOpacity
                            key={pant.id}
                            style={styles.card}
                            activeOpacity={0.7}
                            onPress={() =>
                                router.push({
                                    pathname: `/MainApplication/Profiles/PantalonDetails`,
                                    params: { id: pant.id }
                                })
                            }
                        >
                            <View style={styles.cardHeader}>
                                <View style={styles.iconContainer}>
                                    <MaterialCommunityIcons name="archive-arrow-down-outline" size={24} color="#335333" />
                                </View>

                                <View style={styles.info}>
                                    <Text style={styles.name}>
                                        {pant.profile_name || 'Unnamed Pantalon'}
                                    </Text>
                                    <Text style={styles.description} numberOfLines={2}>
                                        Coupe : {pant.coupe || 'Classique'} • Taille : {pant.tour_taille} cm
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
                onPress={() => router.push('/MainApplication/Profiles/Create/CreatePantalon')}
            >
                <View style={styles.plusIconContainer}>
                    <Ionicons name="add" size={24} color="#ffffff" />
                </View>
                <Text style={styles.pillText}>Create Pant</Text>
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
        paddingBottom: 120, // Plus d'espace pour ne pas cacher le dernier item derrière le bouton
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
        backgroundColor: "#f5f5f5",
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
    },
    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
    },
    iconContainer: {
        marginRight: 12,
    },
    info: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#1e293b",
    },
    description: {
        fontSize: 14,
        color: "#64748b",
        marginTop: 4,
    },
    pillButton: {
        position: "absolute",
        bottom: 100, // Ajusté pour être au dessus de votre footer
        right: 20,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#335333",
        paddingHorizontal: 20,
        paddingVertical: 12,
        borderRadius: 30,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
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

export default PantalonProfile;