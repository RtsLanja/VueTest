import { defineStore } from 'pinia';
import axios from 'axios';
import { Notify } from 'quasar';
import { Loading } from 'quasar';
import { getActivePinia } from "pinia"

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token:  null,
    isAuthenticated: false,
  }),
  actions: {
    async login(email, password) {
      try {
        Loading.show();
        let res = [];
        try {
          const response = await axios.post('http://localhost:3000/api/auth/login', { email, password });
          console.log("Réponse:", response.data);
          res = response.data
        } catch (error) {
          if (error.response) {
            console.error( error.response.data);
            Notify.create({
              message: error.response.data.message,
              color: "red",
              position: "top",
              icon :"warning"
            });

          } else if (error.request) {
            console.error("Aucune réponse du serveur:", error.request);
          } else {
            console.error("Erreur générale:", error.message);
          }
        }

        if (res.token) {
          this.user = res.user;
          this.token = res.token;
          this.isAuthenticated = true;
          console.log('res',this.user)

          Notify.create({
            message: "Connexion réussie",
            color: "green",
            position: "top",
            icon:"check",
          });

          this.router.push("/");
        } else {
          Notify.create({
            message: "E-mail ou mot de passe incorrect",
            color: "red",
            position: "top",
          });
        }

        Loading.hide();
      } catch (error) {
        Loading.hide();
        console.log("erreur:" , error);
      }
    },
    logout() {
      Loading.show();
      this.user = null;
      this.token = null;
      this.isAuthenticated = false;
      getActivePinia()._s.forEach(store => store.$reset());
      Loading.hide();
      console.log("eto")
      this.router.push("/auth");
      console.log("eto")
    },
    async signup(id ,name, email, pwd) {
      try{
        Loading.show();
        const response =  await axios.post('http://localhost:3000/api/auth/register', { id , name,email, pwd });
        console.log("Réponse:", response.data);
        Notify.create({
          message: "Creation de compte réussie",
          color: "green",
          position: "top",
          icon:"check",
        });
        this.login(email,pwd);
        Loading.hide();
      }catch (error) {
        if (error.response) {
          console.error( error.response.data);
          Notify.create({
            message: error.response.data.message,
            color: "red",
            position: "top",
            icon :"warning"
          });

        } else if (error.request) {
          console.error("Aucune réponse du serveur:", error.request);
        } else {
          console.error("Erreur générale:", error.message);
        }
        Loading.hide();
      }
    }
  },
  persist: {
    key: 'authState',
  },
});
