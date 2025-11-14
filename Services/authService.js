import { apiService, tokenService } from './api';
export const authService = {
    async register(userData) {
        try {
            const result = await apiService.post('/register', userData);
            console.log(' Inscription réussie:', result.message);
            return result;

        } catch (error) {
            console.error(' Erreur d\'inscription:', error);
            throw error;
        }
    },
    async login(credentials) {
        try {
            const result = await apiService.post('/login', credentials);
            console.log(' Connexion réussie:', result.message);
            if (result.data && result.data.access_token) {
                await tokenService.setToken(result.data.access_token);
            }

            return result;

        } catch (error) {
            console.error(' Erreur de connexion:', error);
            throw error;
        }
    },
    async logout() {
        try {
            await apiService.post('/logout', {}, true);
        } catch (error) {
            console.log(' Déconnexion serveur échouée, continuation...');
        } finally {
            await tokenService.removeToken();
            console.log(' Déconnexion réussie');
        }
    },

    async getProfile() {
        try {
            const result = await apiService.get('/me', true);
            console.log(' Profil récupéré:', result.message);
            return result;

        } catch (error) {
            console.error(' Erreur récupération profil:', error);
            throw error;
        }
    },
    async refreshToken() {
        try {
            const result = await apiService.post('/refresh', {}, true);
            console.log(' Token rafraîchi:', result.message);

            if (result.data && result.data.token) {
                await tokenService.setToken(result.data.token);
            }

            return result;
        } catch (error) {
            console.error(' Erreur rafraîchissement token:', error);
            throw error;
        }
    },
    async validateToken() {
        try {
            const result = await apiService.post('/validate-token', {}, true);
            console.log(' Token validé:', result.message);
            return result;
        } catch (error) {
            console.error(' Erreur validation token:', error);
            throw error;
        }
    },

    async updateProfile(userData) {
        try {
            const result = await apiService.put('/profile', userData, true);
            console.log(' Profil mis à jour:', result.message);
            return result;

        } catch (error) {
            console.error(' Erreur mise à jour profil:', error);
            throw error;
        }
    },
    async changePassword(passwordData) {
        try {
            const result = await apiService.post('/change-password', passwordData, true);
            console.log(' Mot de passe changé:', result.message);
            return result;

        } catch (error) {
            console.error(' Erreur changement mot de passe:', error);
            throw error;
        }
    },


    async checkEmail(email) {
        try {
            const result = await apiService.post('/check-email', { email });
            console.log(' Email vérifié:', result.message);
            return result;
        } catch (error) {
            console.error(' Erreur vérification email:', error);
            throw error;
        }
    },

    async isAuthenticated() {
        return await tokenService.isAuthenticated();
    },

    async getCurrentToken() {
        return await tokenService.getToken();
    }
};

export default authService;