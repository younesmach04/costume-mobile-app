import { apiService } from './api';

export const giletService = {

    async createProfile(profileData) {
        return apiService.post('/gilets/', profileData, true);
    },

    async getAllProfiles() {
        return apiService.get('/gilets/', true);
    },

    async getProfileById(profileId) {
        return apiService.get(`/gilets/${profileId}`, true);
    },

    async getProfilesByUser(userId) {
        return apiService.get(`/gilets/user/${userId}`, true);
    },

    async updateProfile(profileId, profileData) {
        return apiService.put(`/gilets/${profileId}`, profileData, true);
    },

    async deleteProfile(profileId) {
        return apiService.delete(`/gilets/${profileId}`, true);
    },

    validateProfileData(profileData) {
        return {
            user_id: profileData.user_id,

            profile_name: profileData.profileName || 'Profil Principal',

            tour_poitrine: parseFloat(profileData.tourPoitrine) || null,
            tour_taille: parseFloat(profileData.tourTaille) || null,
            longueur_gilet: parseFloat(profileData.longueurGilet) || null,
            largeur_epaules: parseFloat(profileData.largeurEpaules) || null,
            boutons: profileData.boutons || '6',
            poches: profileData.poches || 'passepoil'
        };
    },

    formatProfileForDisplay(backendData) {
        return {
            id: backendData.id,
            profileName: backendData.profile_name,

            tourPoitrine: backendData.tour_poitrine?.toString() || '',
            tourTaille: backendData.tour_taille?.toString() || '',
            longueurGilet: backendData.longueur_gilet?.toString() || '',
            largeur_epaules: backendData.largeur_epaules?.toString() || '',

            boutons: backendData.boutons || '6',
            poches: backendData.poches || 'passepoil',
        };
    }
};

export default giletService;
