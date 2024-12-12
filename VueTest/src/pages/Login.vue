<template lang="">
  <q-page class="row bg-primary">
    <div class="col bg-white q-pa-xl flex flex-center" style="height: 100vh">
      <div class="text-center">
        <q-item-label class="q-pa-md text-h2 text-bold text-primary">
          Connexion
        </q-item-label>
        <q-item-label caption class="q-px-xl q-pb-md">
          Remplissez les informations ci-dessous pour se connecter à votre
          compte.
        </q-item-label>

        <q-form @submit="handleLogin" class="q-gutter-md">
          <q-input
            color="secondary"
            outlined
            v-model="email"
            label="E-mail"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'requis',
              (val) => !!val || 'Adresse email invalide',
              isValidEmail,
            ]"
          >
            <template v-slot:prepend>
              <q-icon name="mdi-email" />
            </template>
          </q-input>
          <q-input
            autocomplete
            outlined
            :type="showPassword ? 'text' : 'password'"
            v-model="password"
            label="Mot de passe"
            lazy-rules
            :rules="[(val) => (val && val.length > 0) || 'Requis']"
          >
            <template v-slot:prepend>
              <q-icon name="mdi-lock" />
            </template>
            <template v-slot:append>
              <q-icon
                :name="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                class="cursor-pointer"
                @click="togglePasswordVisibility"
              />
            </template>
          </q-input>

          <div>
            <q-btn
              push
              class="full-width"
              label="Se connecter"
              icon-right="login"
              no-caps
              size="lg"
              type="submit"
              color="primary"
            />
          </div>
        </q-form>
        <div class="q-mt-lg flex justify-end" v-if="$q.screen.lt.md">
          <q-btn
            color="secondary"
            icon-right="mdi-arrow-right-circle"
            label="Inscription"
            rounded
            to="/signin"
          />
        </div>
      </div>
    </div>
    <div
      v-if="$q.screen.gt.sm"
      style="margin-right: 100px"
      class="col q-pa-md flex flex-center text-white"
    >
      <div>
        <q-avatar style="width: 100%; height: 200px" square>
          <img src="/src/assets/planifyLogo.png" alt="logo" />
        </q-avatar>
        <q-item-label class="text-center q-pa-md text-h5">
          Créez un compte pour rejoindre la communauté et accéder à nos
          fonctionnalités exclusives.
        </q-item-label>

        <!-- Ajout d'une liste d'avantages par exemple -->
        <ul class="q-mt-md no-bullets">
          <li class="q-pb-xs">
            <q-icon name="check_circle" color="positive" /> Gestion simplifiée
            de votre agenda
          </li>
          <li class="q-pb-xs">
            <q-icon name="check_circle" color="positive" /> Synchronisation
            multicanal pour un accès constant
          </li>
          <li class="q-pb-xs">
            <q-icon name="check_circle" color="positive" /> Notifications et
            rappels personnalisés pour ne rien manquer
          </li>
        </ul>

        <!-- Bouton de retour à la page de login -->
        <div class="q-mt-lg flex justify-end">
          <q-btn
            color="secondary"
            icon-right="mdi-arrow-right-circle"
            label="Inscription"
            rounded
            to="/signup"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>
<script setup>
import { useAuthStore } from "src/stores/authStore";
import { ref } from "vue";
const email = ref(null);
const password = ref(null);
const authStore = useAuthStore();
const handleLogin = async () => {
  try {
    authStore.login(email.value, password.value);
  } catch (error) {
    alert(error.message);
  }
};
const showPassword = ref(false);

function togglePasswordVisibility() {
  showPassword.value = !showPassword.value;
}

</script>
<style lang=""></style>
