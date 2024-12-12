<template lang="">
  <q-page class="row bg-primary">
    <div
      v-if="$q.screen.gt.sm"
      style="margin-right: 100px"
      class="col q-pa-md flex flex-center"
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
        <q-btn
          class="q-mt-lg"
          color="secondary"
          icon="mdi-arrow-left-circle"
          label="Connexion"
          rounded
          to="/auth"
        />
      </div>
    </div>
    <div
      class="col bg-white"
      style="
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
      "
    >
      <q-item-label class="text-center q-pa-md text-h2 text-bold text-primary">
        Inscription
      </q-item-label>
      <q-item-label caption class="q-px-xl text-center q-pb-md">
        Remplissez les informations ci-dessous pour compléter votre inscription.
      </q-item-label>

      <q-form @submit="handleSubmit" class="q-pa-lg">
        <q-input
          color="secondary"
          outlined
          v-model="name"
          label="Nom"
          class="q-my-sm"
        >
          <template v-slot:prepend>
            <q-icon name="mdi-account" />
          </template>
        </q-input>
        <q-input
          color="secondary"
          outlined
          v-model="email"
          label="Email"
          class="q-my-sm"
          lazy-rules
          :rules="[emailRule]"
        >
          <template v-slot:prepend>
            <q-icon name="mdi-email" />
          </template>
        </q-input>
        <q-input
          color="secondary"
          outlined
          v-model="pwd"
          type="password"
          label="Mot de passe"
          class="q-my-sm"
        >
          <template v-slot:prepend>
            <q-icon name="mdi-lock" />
          </template>
        </q-input>
        <q-input
          color="secondary"
          outlined
          v-model="pwdConfirmation"
          type="password"
          label="Confirmer le mot de passe"
          class="q-my-sm"
        >
          <template v-slot:prepend>
            <q-icon name="mdi-lock-check" />
          </template>
        </q-input>
        <q-btn
          class="q-my-sm full-width"
          color="primary"
          icon="mdi-account-plus"
          label="Créer le compte"
          type="submit"
          push
          size="lg"
        />
      </q-form>

      <q-btn
        class="q-mt-lg"
        color="secondary"
        icon="mdi-arrow-left-circle"
        label="Connexion"
        rounded
        to="/"
        v-if="$q.screen.lt.md"
        style="align-self: flex-end"
      />
    </div>
  </q-page>
</template>
<script setup>
import { useAuthStore } from "src/stores/authStore";
import { Notify, uid } from "quasar";
import { ref } from "vue";
const email = ref(null);
const name = ref(null);
const pwd = ref(null);
const id = ref(uid());
const pwdConfirmation = ref(null);
const authStore = useAuthStore();
const emailRule = (val) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(val) || "Veuillez entrer une adresse email valide";
};
const handleSubmit = async () => {
  try {
    if (pwd.value == pwdConfirmation.value)
      authStore.signup(id.value, name.value, email.value, pwd.value);
    else {
      Notify.create({
        message: "verifier le mot de passe",
        color: "red",
        position: "top",
        icon: "warning",
      });
    }
  } catch (error) {
    alert(error.message);
  }
};
</script>
<style lang=""></style>
