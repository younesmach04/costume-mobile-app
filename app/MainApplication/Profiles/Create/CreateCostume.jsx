import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
    Alert,
    SafeAreaView
} from 'react-native';
import { router } from 'expo-router';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import costumeService from '../../../../Services/CostumeService';
import vesteService from '../../../../Services/VesteService';
import giletService from '../../../../Services/GiletService';
import pantalonService from '../../../../Services/PantalonService';
import authService from '../../../../Services/authService';

const CreateCostume = () => {
    // États pour le formulaire
    const [costumeName, setCostumeName] = useState('');
    const [selectedVeste, setSelectedVeste] = useState(null);
    const [selectedGilet, setSelectedGilet] = useState(null);
    const [selectedPantalon, setSelectedPantalon] = useState(null);

    // États pour les listes de données
    const [data, setData] = useState({ vestes: [], gilets: [], pantalons: [] });
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        loadAllProfiles();
    }, []);

    const loadAllProfiles = async () => {
        try {
            setLoading(true);
            const userId = await authService.getCurrentUserId();


            const [v, g, p] = await Promise.all([
                vesteService.getProfilesByUser(userId),
                giletService.getProfilesByUser(userId),
                pantalonService.getProfilesByUser(userId)
            ]);

            setData({ vestes: v, gilets: g, pantalons: p });
        } catch (error) {
            console.error(error);
            Alert.alert("Erreur", "Impossible de charger vos profils de mesures.");
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async () => {
        if (!costumeName.trim()) {
            Alert.alert("Champ requis", "Veuillez donner un nom à ce costume.");
            return;
        }
        if (!selectedVeste && !selectedPantalon) {
            Alert.alert("Sélection requise", "Un costume doit au moins comporter une veste ou un pantalon.");
            return;
        }

        try {
            setSubmitting(true);
            const userId = await authService.getCurrentUserId();

            const payload = costumeService.validateCostumeData({
                name: costumeName,
                userId: userId,
                vesteProfileId: selectedVeste?.id,
                giletId: selectedGilet?.id,
                pantalonId: selectedPantalon?.id
            });

            await costumeService.createCostume(payload);
            Alert.alert("Succès", "Votre costume a été créé !", [
                { text: "OK", onPress: () => router.push('/MainApplication/Profiles/CostumeProfile') }
            ]);
        } catch (error) {
            Alert.alert("Erreur", "Une erreur est survenue lors de la création.");
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#335333" />
                <Text>Chargement de vos profils...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="close" size={28} color="#1e293b" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Composer un Costume</Text>
                <View style={{ width: 28 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* NOM DU COSTUME */}
                <View style={styles.section}>
                    <Text style={styles.label}>Nom du costume</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="ex: Mariage Juillet, Business Bleu..."
                        value={costumeName}
                        onChangeText={setCostumeName}
                    />
                </View>

                {/* SÉLECTION VESTE */}
                <SelectorSection
                    title="Choisir une Veste"
                    icon="suit-club"
                    items={data.vestes}
                    selectedItem={selectedVeste}
                    onSelect={setSelectedVeste}
                    emptyMessage="Aucun profil de veste trouvé"
                />

                {/* SÉLECTION PANTALON */}
                <SelectorSection
                    title="Choisir un Pantalon"
                    icon="fencing"
                    items={data.pantalons}
                    selectedItem={selectedPantalon}
                    onSelect={setSelectedPantalon}
                    emptyMessage="Aucun profil de pantalon trouvé"
                />

                {/* SÉLECTION GILET */}
                <SelectorSection
                    title="Choisir un Gilet (Optionnel)"
                    icon="vest"
                    items={data.gilets}
                    selectedItem={selectedGilet}
                    onSelect={setSelectedGilet}
                    emptyMessage="Aucun profil de gilet trouvé"
                />

                <TouchableOpacity
                    style={[styles.submitButton, submitting && styles.disabledButton]}
                    onPress={handleCreate}
                    disabled={submitting}
                >
                    {submitting ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.submitButtonText}>Enregistrer le Costume</Text>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

// Composant interne pour les sections de sélection
const SelectorSection = ({ title, icon, items, selectedItem, onSelect, emptyMessage }) => (
    <View style={styles.section}>
        <View style={styles.sectionHeader}>
            <MaterialCommunityIcons name={icon} size={20} color="#335333" />
            <Text style={styles.sectionTitle}>{title}</Text>
        </View>

        {items.length === 0 ? (
            <Text style={styles.emptyText}>{emptyMessage}</Text>
        ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalList}>
                {items.map((item) => {
                    const isSelected = selectedItem?.id === item.id;
                    return (
                        <TouchableOpacity
                            key={item.id}
                            style={[styles.itemCard, isSelected && styles.selectedCard]}
                            onPress={() => onSelect(isSelected ? null : item)}
                        >
                            <Text style={[styles.itemName, isSelected && styles.selectedText]}>
                                {item.profile_name || 'Profil sans nom'}
                            </Text>
                            {isSelected && (
                                <Ionicons name="checkmark-circle" size={20} color="#fff" style={styles.checkIcon} />
                            )}
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        )}
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    header: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#f1f5f9' },
    headerTitle: { fontSize: 18, fontWeight: 'bold' },
    scrollContent: { padding: 20 },
    section: { marginBottom: 25 },
    label: { fontSize: 14, fontWeight: 'bold', color: '#64748b', marginBottom: 8, textTransform: 'uppercase' },
    input: { backgroundColor: '#f1f5f9', padding: 15, borderRadius: 12, fontSize: 16 },
    sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
    sectionTitle: { marginLeft: 8, fontSize: 16, fontWeight: 'bold', color: '#1e293b' },
    horizontalList: { flexDirection: 'row' },
    itemCard: {
        backgroundColor: '#f8fafc',
        padding: 15,
        borderRadius: 12,
        marginRight: 10,
        minWidth: 140,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    selectedCard: { backgroundColor: '#335333', borderColor: '#335333' },
    itemName: { color: '#475569', fontWeight: '500' },
    selectedText: { color: '#fff' },
    emptyText: { color: '#94a3b8', fontStyle: 'italic', fontSize: 13 },
    submitButton: { backgroundColor: '#335333', padding: 18, borderRadius: 15, alignItems: 'center', marginTop: 20 },
    submitButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
    disabledButton: { opacity: 0.6 }
});

export default CreateCostume;