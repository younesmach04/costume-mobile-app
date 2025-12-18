import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator,
    SafeAreaView,
    Alert
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Import des services
import UserService from '../../../Services/UserService';
import authService from '../../../Services/authService';

const UserDetails = () => {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            setLoading(true);
            const response = await UserService.getCurrentUser();

            if (response && response.success) {
                setUser(response.data.user);
            } else {
                setUser(null);
            }
        } catch (error) {
            console.error("Erreur fetchUserProfile:", error);
            if (error.status === 401) {
                router.replace('/Login');
            } else {
                Alert.alert("Erreur", "Impossible de charger vos informations.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            await authService.logout();
            console.log("Redirection vers /Login...");

            // On utilise setTimeout pour s'assurer que le nettoyage du storage est fini
            setTimeout(() => {
                router.replace('/Login');
            }, 0);

        } catch (error) {
            console.error("Erreur handleLogout:", error);
            router.replace('/Login');
        }
    };

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#3498db" />
                <Text style={styles.loadingText}>Chargement de votre profil...</Text>
            </View>
        );
    }

    if (!user) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.emptyContainer}>
                    <MaterialCommunityIcons name="account-alert-outline" size={80} color="#cbd5e1" />
                    <Text style={styles.emptyTitle}>Profil introuvable</Text>
                    <TouchableOpacity
                        style={styles.createButton}
                        onPress={() => router.replace('/Login')}
                    >
                        <Text style={styles.createButtonText}>Se reconnecter</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <MaterialCommunityIcons name="arrow-left" size={26} color="#1e293b" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Mon Profil</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                <View style={styles.profileHeader}>
                    <View style={styles.avatarContainer}>
                        <MaterialCommunityIcons name="account" size={50} color="#fff" />
                    </View>
                    <Text style={styles.profileName}>
                        {user.firstName} {user.lastName}
                    </Text>
                    <Text style={styles.userRole}>{user.role || 'Utilisateur'}</Text>
                </View>
                <View style={styles.sectionCard}>
                    <Text style={styles.sectionTitle}>Informations de contact</Text>

                    <InfoRow icon="account-outline" label="Prénom" value={user.firstName} />
                    <InfoRow icon="account-outline" label="Nom" value={user.lastName} />
                    <InfoRow icon="email-outline" label="Email" value={user.email} />
                    <InfoRow icon="phone-outline" label="Téléphone" value={user.phone || 'Non renseigné'} />
                </View>
                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={handleLogout}
                >
                    <MaterialCommunityIcons name="logout" size={20} color="#e74c3c" />
                    <Text style={styles.logoutText}>Se déconnecter</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
};

const InfoRow = ({ icon, label, value }) => (
    <View style={styles.detailRow}>
        <MaterialCommunityIcons name={icon} size={22} color="#3498db" />
        <View style={styles.textContainer}>
            <Text style={styles.infoLabel}>{label}</Text>
            <Text style={styles.infoValue}>{value}</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8fafc' },
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    loadingText: { marginTop: 10, color: '#64748b' },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#fff',
    },
    headerTitle: { fontSize: 18, fontWeight: '700', color: '#1e293b' },
    scrollContent: { paddingBottom: 30 },
    profileHeader: {
        alignItems: 'center',
        padding: 30,
        backgroundColor: '#fff',
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        marginBottom: 20,
        elevation: 2,
    },
    avatarContainer: {
        width: 100, height: 100, borderRadius: 50,
        backgroundColor: '#3498db', justifyContent: 'center',
        alignItems: 'center', marginBottom: 15
    },
    profileName: { fontSize: 24, fontWeight: 'bold', color: '#1e293b' },
    userRole: { fontSize: 14, color: '#94a3b8', marginTop: 5 },
    sectionCard: {
        backgroundColor: '#fff',
        marginHorizontal: 20,
        borderRadius: 20,
        padding: 20,
        marginBottom: 15,
        elevation: 1,
    },
    sectionTitle: { fontSize: 13, fontWeight: 'bold', color: '#94a3b8', marginBottom: 15, textTransform: 'uppercase', letterSpacing: 1 },
    detailRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12 },
    textContainer: { marginLeft: 15 },
    infoLabel: { fontSize: 12, color: '#64748b' },
    infoValue: { fontSize: 16, fontWeight: '600', color: '#1e293b' },
    detailLabel: { flex: 1, marginLeft: 10, fontSize: 15, color: '#475569' },
    detailValue: { fontSize: 15, fontWeight: 'bold', color: '#1e293b' },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20,
        marginTop: 10,
        padding: 15,
        borderRadius: 15,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#fee2e2'
    },
    logoutText: { marginLeft: 10, color: '#e74c3c', fontWeight: 'bold', fontSize: 16 },
    emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 },
    emptyTitle: { fontSize: 20, fontWeight: 'bold', color: '#1e293b', marginTop: 20, marginBottom: 20 },
    createButton: { backgroundColor: '#1e293b', paddingVertical: 15, paddingHorizontal: 25, borderRadius: 12 },
    createButtonText: { color: '#fff', fontWeight: 'bold' }
});

export default UserDetails;