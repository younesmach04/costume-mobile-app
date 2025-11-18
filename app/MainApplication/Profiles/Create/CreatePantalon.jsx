import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ActivityIndicator,
} from 'react-native';

export default function PantalonProfileForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [profile, setProfile] = useState({
        profileName: 'Profil Principal',
        tourTaille: '',
        tourHanches: '',
        tourCuisse: '',
        tourGenou: '',
        tourCheville: '',
        longueurEntrejambes: '',
        longueurTotale: '',
        coupe: 'regular',
        revers: 'non',
        typeCeinture: 'classique'
    });

    const handleInputChange = (field, value) => {
        setProfile(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = async () => {
        // Validation
        if (!profile.tourTaille || !profile.tourHanches) {
            Alert.alert('Erreur', 'Tour de taille et hanches sont requis');
            return;
        }

        setIsLoading(true);

        try {
            // Convert to snake_case for API
            const apiData = {
                profile_name: profile.profileName,
                tour_taille: profile.tourTaille,
                tour_hanches: profile.tourHanches,
                tour_cuisse: profile.tourCuisse,
                tour_genou: profile.tourGenou,
                tour_cheville: profile.tourCheville,
                longueur_entrejambes: profile.longueurEntrejambes,
                longueur_totale: profile.longueurTotale,
                coupe: profile.coupe,
                revers: profile.revers,
                type_ceinture: profile.typeCeinture
            };

            console.log('Profile Data:', apiData);

            const response = await fetch('http://your-laravel-app.com/api/pantalon-profiles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(apiData),
            });

            const data = await response.json();

            if (response.ok) {
                Alert.alert('Succès', 'Profil enregistré !');
                // Optionally reset form after successful save
            } else {
                Alert.alert('Erreur', data.message || 'Erreur de sauvegarde');
            }
        } catch (error) {
            Alert.alert('Erreur', 'Problème de connexion');
            console.error('Submit error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setProfile({
            profileName: 'Profil Principal',
            tourTaille: '',
            tourHanches: '',
            tourCuisse: '',
            tourGenou: '',
            tourCheville: '',
            longueurEntrejambes: '',
            longueurTotale: '',
            coupe: 'regular',
            revers: 'non',
            typeCeinture: 'classique'
        });
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Profil de Pantalon</Text>
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

                    <Text style={styles.label}>Tour de Taille *</Text>
                    <TextInput
                        style={styles.input}
                        value={profile.tourTaille}
                        onChangeText={(value) => handleInputChange('tourTaille', value)}
                        keyboardType="decimal-pad"
                        placeholder="ex: 85.00"
                    />

                    <Text style={styles.label}>Tour de Hanches *</Text>
                    <TextInput
                        style={styles.input}
                        value={profile.tourHanches}
                        onChangeText={(value) => handleInputChange('tourHanches', value)}
                        keyboardType="decimal-pad"
                        placeholder="ex: 95.00"
                    />

                    <Text style={styles.label}>Tour de Cuisse</Text>
                    <TextInput
                        style={styles.input}
                        value={profile.tourCuisse}
                        onChangeText={(value) => handleInputChange('tourCuisse', value)}
                        keyboardType="decimal-pad"
                        placeholder="ex: 58.00"
                    />

                    <Text style={styles.label}>Tour de Genou</Text>
                    <TextInput
                        style={styles.input}
                        value={profile.tourGenou}
                        onChangeText={(value) => handleInputChange('tourGenou', value)}
                        keyboardType="decimal-pad"
                        placeholder="ex: 38.00"
                    />

                    <Text style={styles.label}>Tour de Cheville</Text>
                    <TextInput
                        style={styles.input}
                        value={profile.tourCheville}
                        onChangeText={(value) => handleInputChange('tourCheville', value)}
                        keyboardType="decimal-pad"
                        placeholder="ex: 18.00"
                    />

                    <Text style={styles.label}>Longueur Entrejambe</Text>
                    <TextInput
                        style={styles.input}
                        value={profile.longueurEntrejambes}
                        onChangeText={(value) => handleInputChange('longueurEntrejambes', value)}
                        keyboardType="decimal-pad"
                        placeholder="ex: 82.00"
                    />

                    <Text style={styles.label}>Longueur Totale</Text>
                    <TextInput
                        style={styles.input}
                        value={profile.longueurTotale}
                        onChangeText={(value) => handleInputChange('longueurTotale', value)}
                        keyboardType="decimal-pad"
                        placeholder="ex: 108.00"
                    />
                </View>

                {/* Style Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Style</Text>

                    <Text style={styles.label}>Coupe</Text>
                    <View style={styles.buttonGroup}>
                        <TouchableOpacity
                            style={[styles.optionButton, profile.coupe === 'slim' && styles.optionButtonActive]}
                            onPress={() => handleInputChange('coupe', 'slim')}
                        >
                            <Text style={[styles.optionButtonText, profile.coupe === 'slim' && styles.optionButtonTextActive]}>
                                Slim
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.optionButton, profile.coupe === 'regular' && styles.optionButtonActive]}
                            onPress={() => handleInputChange('coupe', 'regular')}
                        >
                            <Text style={[styles.optionButtonText, profile.coupe === 'regular' && styles.optionButtonTextActive]}>
                                Regular
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.optionButton, profile.coupe === 'loose' && styles.optionButtonActive]}
                            onPress={() => handleInputChange('coupe', 'loose')}
                        >
                            <Text style={[styles.optionButtonText, profile.coupe === 'loose' && styles.optionButtonTextActive]}>
                                Loose
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.label}>Revers</Text>
                    <View style={styles.buttonGroup}>
                        <TouchableOpacity
                            style={[styles.optionButton, profile.revers === 'oui' && styles.optionButtonActive]}
                            onPress={() => handleInputChange('revers', 'oui')}
                        >
                            <Text style={[styles.optionButtonText, profile.revers === 'oui' && styles.optionButtonTextActive]}>
                                Oui
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.optionButton, profile.revers === 'non' && styles.optionButtonActive]}
                            onPress={() => handleInputChange('revers', 'non')}
                        >
                            <Text style={[styles.optionButtonText, profile.revers === 'non' && styles.optionButtonTextActive]}>
                                Non
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.label}>Type de Ceinture</Text>
                    <View style={styles.buttonGroup}>
                        <TouchableOpacity
                            style={[styles.optionButton, profile.typeCeinture === 'classique' && styles.optionButtonActive]}
                            onPress={() => handleInputChange('typeCeinture', 'classique')}
                        >
                            <Text style={[styles.optionButtonText, profile.typeCeinture === 'classique' && styles.optionButtonTextActive]}>
                                Classique
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.optionButton, profile.typeCeinture === 'elastique' && styles.optionButtonActive]}
                            onPress={() => handleInputChange('typeCeinture', 'elastique')}
                        >
                            <Text style={[styles.optionButtonText, profile.typeCeinture === 'elastique' && styles.optionButtonTextActive]}>
                                Élastique
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Action Buttons */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={handleSubmit}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <ActivityIndicator color="#ffffff" />
                        ) : (
                            <Text style={styles.submitButtonText}>Enregistrer le Profil</Text>
                        )}
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
        </View>
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
    }
});