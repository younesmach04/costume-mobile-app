import {apiService} from './api';

export const vesteService = {
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
            user_id: profileData.user_id,
            profile_name: profileData.profileName || 'Profil Principal',
            tour_poitrine: parseFloat(profileData.tourPoitrine) || null,
            tour_taille: parseFloat(profileData.tourTaille) || null,
            tour_hanches: parseFloat(profileData.tourHanches) || null,
            largeur_epaules: parseFloat(profileData.largeurEpaules) || null,
            longueur_manche: parseFloat(profileData.longueurManche) || null,
            longueur_veste: parseFloat(profileData.longueurVeste) || null,
            type_revers: profileData.typeRevers || 'notch',
            boutons: parseInt(profileData.boutons) || 2,
            poches: profileData.poches || 'flap',
            ventriere: profileData.ventriere || 'cote'
        };
    },
    formatProfileForDisplay(backendData) {
        return {
            id: backendData.id,
            profileName: backendData.profile_name,

            tourPoitrine: backendData.tour_poitrine?.toString() || '',
            tourTaille: backendData.tour_taille?.toString() || '',
            tourHanches: backendData.tour_hanches?.toString() || '',
            largeurEpaules: backendData.largeur_epaules?.toString() || '',
            longueurManche: backendData.longueur_manche?.toString() || '',
            longueurVeste: backendData.longueur_veste?.toString() || '',

            typeRevers: backendData.type_revers,
            boutons: backendData.boutons?.toString() || '2',
            poches: backendData.poches || 'flap',
            ventriere: backendData.ventriere || 'cote'
        };
    }
};

export default vesteService;
