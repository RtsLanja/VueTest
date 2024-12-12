<template>
  <q-layout view="lHh Lpr lFf" class="bg-whitesmoke">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title v-if="$q.screen.gt.xs">
          <q-btn flat no-caps no-wrap class="q-pa-none" disable>
            <q-avatar
            style="height: 70px; width: 150px;"
              square
            >
              <img src="/src/assets/planifyLogo.png" alt="logo" />
            </q-avatar>
          </q-btn>
        </q-toolbar-title>

        <div>
          <q-btn
            square
            dense
            flat
            color="teal-6"
            icon="event"
            v-if="$route.fullPath !== '/'"
            to="/"
            class="q-pa-xs btnHover"
          >
            <q-item-label class="q-px-sm">Calendrier</q-item-label>
          </q-btn>
          <q-btn
            square
            dense
            flat
            color="warning"
            icon="mdi-calendar-edit"
            v-if="$route.fullPath !== '/event'"
            to="/event"
            class="q-pa-xs btnHover"
          >
            <q-item-label class="q-px-sm">Gestion des Evenements</q-item-label>
          </q-btn>
          <q-btn
            square
            dense
            color="green-6"
            icon="mdi-account"
            class="q-ma-xs"
            style="border-radius: 5px;"
            v-if="$q.screen.gt.xs"
          >
            <q-item-label class="q-px-sm">{{user.name}}</q-item-label>
          </q-btn>
          <q-btn
            round
            dense
            color="secondary"
            icon="mdi-logout-variant"
            class="q-pa-xs q-mx-md"
            @click="logout"
          >
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { computed } from "vue";
import { useAuthStore } from "src/stores/authStore";
const authStore = useAuthStore();
const user = computed(() => authStore.user);
async function logout() {
  console.log("logout");
  authStore.logout();
}

</script>
<style scoped>
.btnHover:hover {
  background-color: inherit;
  border-radius: 5px;
  color: inherit;
  box-shadow: none;
}
.bg-whitesmoke{
  background-color: whitesmoke;
}

</style>
