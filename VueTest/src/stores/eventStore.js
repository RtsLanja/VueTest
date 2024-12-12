import { defineStore } from 'pinia';
import { Loading } from 'quasar';
import axios from 'axios';

export const useEventStore = defineStore('event', {
  state: () => ({
    events: [],
  }),
  actions: {
    async getEvent(user_id) {
      Loading.show();
      try {
        const response = await axios.get('http://localhost:3000/api/agendas', {
          params: { user_id: user_id },
        });
        console.log("Réponse:", response.data)
        this.events = response.data;

      } catch (error) {
        if (error.response) {
          console.error("Erreur requête : ", error.response.data);
        } else if (error.request) {
          console.error("Aucune réponse du serveur :", error.request);
        } else {
          console.error("Erreur générale :", error.message);
        }
      } finally {
        Loading.hide();
      }
    },
    async createEvent(user_id,title,description,begin_date , end_date){
      try {
        const response = await axios.post('http://localhost:3000/api/agendas', { title,description, begin_date, end_date,user_id });
        console.log("Réponse:", response.data);
        this.getEvent(user_id);
      } catch (error) {
        if (error.response) {
          console.error("erreur requete : ", error.response.data)
        } else if (error.request) {
          console.error("Aucune réponse du serveur:", error.request);
        } else {
          console.error("Erreur générale:", error.message);
        }
        Loading.hide();
      }
    },
    async updateEvent(id,title,description,begin_date , end_date,user_id){
      try {
        const response = await axios.put(`http://localhost:3000/api/agendas/${id}`, { title,description, begin_date, end_date });
        console.log("Réponse:", response.data);
        this.getEvent(user_id);
      } catch (error) {
        if (error.response) {
          console.error("erreur requete : ", error.response.data)
        } else if (error.request) {
          console.error("Aucune réponse du serveur:", error.request);
        } else {
          console.error("Erreur générale:", error.message);
        }
      }
    },
    async deleteEvent(id,user_id){
      try {
        console.log("uid", user_id);
        const response = await axios.delete(`http://localhost:3000/api/agendas/${id}`);
        console.log("Réponse:", response.data);
        this.getEvent(user_id)
      } catch (error) {
        if (error.response) {
          console.error("erreur requete : ", error.response.data)
        } else if (error.request) {
          console.error("Aucune réponse du serveur:", error.request);
        } else {
          console.error("Erreur générale:", error.message);
        }
      }
    },
  },
});
