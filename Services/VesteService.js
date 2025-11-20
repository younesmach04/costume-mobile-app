import {apiService} from './api';

export const giletService = {
    async createProfile(profileData) {
        return apiService.post('/veste-profiles/', profileData, true);
    },

    async getAllProfiles() {
        return apiService.get('/veste-profiles/', true);
    },

    async getProfileById(profileId) {
        return apiService.get(`/veste-profiles/${profileId}`, true);
    },

    async getProfilesByUser(userId) {
        return apiService.get(`/veste-profiles/user/${userId}`, true);
    },

    async updateProfile(profileId, profileData) {
        return apiService.put(`/veste-profiles/${profileId}`, profileData, true);
    },

    async deleteProfile(profileId) {
        return apiService.delete(`/veste-profiles/${profileId}`, true);
    },
    validateProfileData(profileData) {
        return {
            profile_name: profileData.profileName || 'Profil Principal',
            tour_poitrine: parseFloat(profileData.tourPoitrine) || null,
            tour_taille: parseFloat(profileData.tourTaille) || null,
            longueur_gilet: parseFloat(profileData.longueurGilet) || null,
            encolure: parseFloat(profileData.encolure) || null,
            encolure_style: profileData.encolureStyle || 'v',
            boutons: parseInt(profileData.boutons) || 6,
            poches: profileData.poches || 'droites',
        };
    },

    formatProfileForDisplay(backendData) {
        return {
            id: backendData.id,
            profileName: backendData.profile_name,
            tourPoitrine: backendData.tour_poitrine?.toString() || '',
            tourTaille: backendData.tour_taille?.toString() || '',
            longueurGilet: backendData.longueur_gilet?.toString() || '',
            encolure: backendData.encolure?.toString() || '',
            encolureStyle: backendData.encolure_style || 'v',
            boutons: backendData.boutons?.toString() || '6',
            poches: backendData.poches || 'droites',
        };
    },
};

export default giletService;
