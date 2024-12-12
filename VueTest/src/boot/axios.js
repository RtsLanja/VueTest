import axios from 'axios';
import { useAuthStore } from 'src/stores/authStore';


export default ({ app }) => {
  const authStore = useAuthStore();

  // Ajoute le token à chaque requête si l'utilisateur est authentifié
  axios.interceptors.request.use(
    (config) => {
      if (authStore.token) {
        config.headers['Authorization'] = `Bearer ${authStore.token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Vous pouvez configurer aussi les erreurs globales ici si besoin
};
