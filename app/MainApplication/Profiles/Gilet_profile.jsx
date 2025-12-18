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
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { giletService } from "../../../Services/GiletService";




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

            const data = await giletService.getAllProfiles();
            setGilets(data);

        } catch (err) {
            console.error('Error fetching gilets:', err);

            const message =
                err?.message ||
                err?.error ||
                'Impossible de charger les profils';

            setError(message);
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
                <Themedtext style={styles.headerTitle}>Gilet Profiles</Themedtext>
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
                        <Text style={styles.loadingText}>Loading gilets...</Text>
                    </View>

                ) : error ? (
                    <View style={styles.centerContent}>
                        <Ionicons name="alert-circle-outline" size={64} color="#ff6b6b" />
                        <Spacer height={16} />
                        <Text style={styles.errorText}>Failed to load gilets</Text>
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

                ) : gilets.length === 0 ? (
                    <View style={styles.centerContent}>
                        <Ionicons name="shirt-outline" size={64} color="#cccccc" />
                        <Spacer height={16} />
                        <Themedtext style={styles.emptyText}>No Gilets Yet</Themedtext>
                        <Spacer height={8} />
                        <Text style={styles.emptySubtext}>
                            Tap the button below to create your first gilet profile
                        </Text>
                    </View>

                ) : (
                    gilets.map((gilet) => (
                        <TouchableOpacity
                            key={gilet.id}
                            style={styles.giletCard}
                            activeOpacity={0.7}
                            onPress={() =>
                                router.push(`/MainApplication/Profiles/GiletDetails`)
                            }
                        >
                            <View style={styles.giletCardHeader}>
                                <View style={styles.giletIconContainer}>
                                    <Ionicons name="shirt" size={24} color="#335333" />
                                </View>

                                <View style={styles.giletInfo}>
                                    <Text style={styles.giletName}>
                                        {gilet.profile_name || 'Unnamed Gilet'}
                                    </Text>

                                    {gilet.poches && (
                                        <Text
                                            style={styles.giletDescription}
                                            numberOfLines={2}
                                        >
                                            Poches : {gilet.poches}
                                        </Text>
                                    )}
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
                <Text style={styles.pillText}>Create Gilet</Text>
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
    },

    centerContent: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
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

    giletCard: {
        backgroundColor: "#f5f5f5",
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
    },

    giletCardHeader: {
        flexDirection: "row",
        alignItems: "center",
    },

    giletIconContainer: {
        marginRight: 12,
    },

    giletInfo: {
        flex: 1,
    },

    giletName: {
        fontSize: 16,
        fontWeight: "bold",
    },

    giletDescription: {
        fontSize: 14,
        color: "#666",
        marginTop: 4,
    },

    pillButton: {
        position: "absolute",
        bottom: 20,
        right: 20,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#335333",
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderRadius: 30,
    },

    plusIcon: {
        marginRight: 6,
    },

    pillText: {
        color: "#ffffff",
        fontWeight: "bold",
    },
});



export default GiletProfile;
