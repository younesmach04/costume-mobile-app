import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import Spacer from "../../../../components/Spacer";

export default function GiletProfileForm() {
    const [profile, setProfile] = useState({
        profileName: 'Profil Principal',
        tourPoitrine: '',
        tourTaille: '',
        longueurGilet: '',
        encolure: '',
        encolureStyle: 'v',
        boutons: '6',
        poches: 'droites'
    });

    const handleInputChange = (field, value) => {
        setProfile(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = () => {
        console.log('Profile Data:', profile);
        alert('Profil enregistré !');
    };

    const handleReset = () => {
        setProfile({
            profileName: 'Profil Principal',
            tourPoitrine: '',
            tourTaille: '',
            longueurGilet: '',
            encolure: '',
            encolureStyle: 'v',
            boutons: '6',
            poches: 'droites'
        });
    };

    return (
        <>

        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Profil de Gilet</Text>
                <Text style={styles.headerSubtitle}>Configurez vos mesures et préférences</Text>
            </View>

            {/* Scrollable Form */}
            <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                {/* Nom du profil */}
                <View style={styles.section}>
                    <Text style={styles.label}>Nom du Profil</Text>
                    <TextInput
                        style={styles.input}
                        value={profile.profileName}
                        onChangeText={(value) => handleInputChange('profileName', value)}
                        maxLength={100}
                        placeholder="Nom du profil"
                    />
                </View>

                {/* Mesures Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Mesures (cm)</Text>

                    <Text style={styles.label}>Tour de Poitrine</Text>
                    <TextInput
                        style={styles.input}
                        value={profile.tourPoitrine}
                        onChangeText={(value) => handleInputChange('tourPoitrine', value)}
                        keyboardType="decimal-pad"
                        placeholder="ex: 98.50"
                    />

                    <Text style={styles.label}>Tour de Taille</Text>
                    <TextInput
                        style={styles.input}
                        value={profile.tourTaille}
                        onChangeText={(value) => handleInputChange('tourTaille', value)}
                        keyboardType="decimal-pad"
                        placeholder="ex: 85.00"
                    />

                    <Text style={styles.label}>Longueur Gilet</Text>
                    <TextInput
                        style={styles.input}
                        value={profile.longueurGilet}
                        onChangeText={(value) => handleInputChange('longueurGilet', value)}
                        keyboardType="decimal-pad"
                        placeholder="ex: 60.00"
                    />

                    <Text style={styles.label}>Encolure</Text>
                    <TextInput
                        style={styles.input}
                        value={profile.encolure}
                        onChangeText={(value) => handleInputChange('encolure', value)}
                        keyboardType="decimal-pad"
                        placeholder="ex: 40.00"
                    />
                </View>

                {/* Style Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Style</Text>

                    <Text style={styles.label}>Style d'Encolure</Text>
                    <View style={styles.buttonGroup}>
                        <TouchableOpacity
                            style={[styles.optionButton, profile.encolureStyle === 'v' && styles.optionButtonActive]}
                            onPress={() => handleInputChange('encolureStyle', 'v')}
                        >
                            <Text style={[styles.optionButtonText, profile.encolureStyle === 'v' && styles.optionButtonTextActive]}>
                                V
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.optionButton, profile.encolureStyle === 'u' && styles.optionButtonActive]}
                            onPress={() => handleInputChange('encolureStyle', 'u')}
                        >
                            <Text style={[styles.optionButtonText, profile.encolureStyle === 'u' && styles.optionButtonTextActive]}>
                                U
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.optionButton, profile.encolureStyle === 'carree' && styles.optionButtonActive]}
                            onPress={() => handleInputChange('encolureStyle', 'carree')}
                        >
                            <Text style={[styles.optionButtonText, profile.encolureStyle === 'carree' && styles.optionButtonTextActive]}>
                                Carrée
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.label}>Nombre de Boutons</Text>
                    <View style={styles.buttonGroup}>
                        <TouchableOpacity
                            style={[styles.optionButton, profile.boutons === '5' && styles.optionButtonActive]}
                            onPress={() => handleInputChange('boutons', '5')}
                        >
                            <Text style={[styles.optionButtonText, profile.boutons === '5' && styles.optionButtonTextActive]}>
                                5 Boutons
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.optionButton, profile.boutons === '6' && styles.optionButtonActive]}
                            onPress={() => handleInputChange('boutons', '6')}
                        >
                            <Text style={[styles.optionButtonText, profile.boutons === '6' && styles.optionButtonTextActive]}>
                                6 Boutons
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.optionButton, profile.boutons === '7' && styles.optionButtonActive]}
                            onPress={() => handleInputChange('boutons', '7')}
                        >
                            <Text style={[styles.optionButtonText, profile.boutons === '7' && styles.optionButtonTextActive]}>
                                7 Boutons
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.label}>Type de Poches</Text>
                    <View style={styles.buttonGroup}>
                        <TouchableOpacity
                            style={[styles.optionButton, profile.poches === 'droites' && styles.optionButtonActive]}
                            onPress={() => handleInputChange('poches', 'droites')}
                        >
                            <Text style={[styles.optionButtonText, profile.poches === 'droites' && styles.optionButtonTextActive]}>
                                Droites
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.optionButton, profile.poches === 'inclinees' && styles.optionButtonActive]}
                            onPress={() => handleInputChange('poches', 'inclinees')}
                        >
                            <Text style={[styles.optionButtonText, profile.poches === 'inclinees' && styles.optionButtonTextActive]}>
                                Inclinées
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Action Buttons */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                        <Text style={styles.submitButtonText}>Enregistrer le Profil</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
                        <Text style={styles.resetButtonText}>Réinitialiser</Text>
                    </TouchableOpacity>
                </View>

                {/* Debug View */}
                <View style={styles.debugContainer}>
                    <Text style={styles.debugTitle}>Valeurs actuelles:</Text>
                    <Text style={styles.debugText}>{JSON.stringify(profile, null, 2)}</Text>
                </View>
            </ScrollView>
            <Spacer height={150}/>
        </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    header: {
        backgroundColor: '#1e293b',
        padding: 20,
        paddingTop: 50,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#cbd5e1',
        marginTop: 4,
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        padding: 16,
    },
    section: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1e293b',
        marginBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e2e8f0',
        paddingBottom: 8,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#475569',
        marginBottom: 8,
        marginTop: 12,
    },
    input: {
        backgroundColor: '#f8fafc',
        borderWidth: 1,
        borderColor: '#cbd5e1',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        color: '#1e293b',
    },
    buttonGroup: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 8,
    },
    optionButton: {
        flex: 1,
        minWidth: 90,
        backgroundColor: '#ffffff',
        borderWidth: 2,
        borderColor: '#cbd5e1',
        borderRadius: 8,
        padding: 12,
        alignItems: 'center',
    },
    optionButtonActive: {
        backgroundColor: '#1e293b',
        borderColor: '#1e293b',
    },
    optionButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#475569',
    },
    optionButtonTextActive: {
        color: '#ffffff',
    },
    buttonContainer: {
        marginTop: 8,
        marginBottom: 16,
    },
    submitButton: {
        backgroundColor: '#1e293b',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 12,
    },
    submitButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    resetButton: {
        backgroundColor: '#ffffff',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#cbd5e1',
    },
    resetButtonText: {
        color: '#475569',
        fontSize: 16,
        fontWeight: 'bold',
    },
    debugContainer: {
        backgroundColor: '#f1f5f9',
        padding: 12,
        borderRadius: 8,
        marginBottom: 20,
    },
    debugTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1e293b',
        marginBottom: 8,
    },
    debugText: {
        fontSize: 12,
        color: '#475569',
        fontFamily: 'monospace',
    },
});