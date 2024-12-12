<template>
  <div>
    <div class="q-pa-md">
      <p class="text-h5 text-bold text-center text-teal-10">Gestion de mon agenda</p>
      <q-btn
        push
        label="Ajouter un évènement"
        icon="person_add"
        no-caps
        size="md"
        class="q-ml-md"
        @click="dialogEvent = true"
        color="primary"
      />

      <q-table
        v-if="eventsTable && eventsTable.length > 0"
        :rows="eventsTable"
        :columns="columns"
        row-key="id"
        class="q-ma-md"
      >
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn
              color="primary"
              icon="edit"
              @click="editRow(props.row)"
              flat
            />
            <q-btn
              color="negative"
              icon="delete"
              @click="deleteRow(props.row, user.id)"
              flat
            />
            <q-btn
              color="info"
              icon="visibility"
              @click="show(props.row)"
              flat
            />
          </q-td>
        </template>
      </q-table>

      <div
        v-else
        class="q-pa-md flex flex-center text-center text-grey-7 text-h6"
        style="height: 60vh"
      >
        Aucun évènement n'a encore été ajouté.
      </div>

      <q-dialog v-model="dialogEvent" persistent>
        <q-card class="q-ma-sm">
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">Formulaire des évènements</div>
            <q-space />
            <q-btn icon="close" flat round dense @click="onReset" />
          </q-card-section>

          <q-card-section>
            <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
              <q-input
                full-width
                outlined
                dense
                v-model="title"
                label="Titre *"
                lazy-rules
                :rules="[(val) => (val && val.length > 0) || 'Requis']"
              />

              <q-editor
                v-model="description"
                min-height="5rem"
                label="Description"
              />

              <div>
                <DateTimePicker
                  v-model="begin_date"
                  label="Date de début"
                  :rules="[validateDates]"
                />
              </div>

              <div>
                <DateTimePicker
                  v-model="end_date"
                  label="Date de fin"
                  :rules="[validateDates]"
                />
              </div>

              <div class="row justify-end q-gutter-sm">
                <q-btn label="Annuler" type="reset" color="primary" flat />
                <q-btn label="Enregistrer" type="submit" color="primary" />
              </div>
            </q-form>
          </q-card-section>
        </q-card>
      </q-dialog>
      <q-dialog v-model="dialogDetails" persistent>
      <q-card class="q-ma-sm">
        <q-card-section class="row items-center">
          <div class="text-h6">Détails de l'évènement</div>
          <q-space />
          <q-btn icon="close" flat round dense @click="dialogDetails = false" />
        </q-card-section>

        <q-card-section>
          <div>
            <p><strong>Titre :</strong> {{ selectedEvent.title }}</p>
            <p><strong>Description :</strong> {{ selectedEvent.description }}</p>
            <p><strong>Début :</strong> {{ selectedEvent.begin_date }}</p>
            <p><strong>Fin :</strong> {{ selectedEvent.end_date }}</p>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Fermer" color="primary" flat @click="resetDialog" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import moment from "moment";
import DateTimePicker from "src/components/dateTimePicker.vue";
import { useQuasar } from "quasar";
const $q = useQuasar();

import { useEventStore } from "src/stores/eventStore";
const eventStore = useEventStore();
const events = computed(() => eventStore.events);

import { useAuthStore } from "src/stores/authStore";
const authStore = useAuthStore();
const user = computed(() => authStore.user);

const dialogDetails = ref(false);
const dialogEvent = ref(false);
const title = ref("");
const description = ref("");
const begin_date = ref(moment().format("YYYY-MM-DD HH:mm"));
const end_date = ref(moment().format("YYYY-MM-DD HH:mm"));
const modeUpdate = ref(false);
const idUpdate = ref(null);
const eventsTable = computed(() => events.value.schedules);
const selectedEvent = ref({})

const validateDates = () => {
  if (!begin_date.value || !end_date.value) {
    return "Les deux dates sont requises";
  }
  if (moment(begin_date.value).isSameOrAfter(end_date.value)) {
    return "La date de début doit être inférieure à la date de fin";
  }
  return true;
};

const columns = [
  { name: "id", label: "ID", align: "left", field: (row) => row.id },
  { name: "title", label: "Title", align: "left", field: (row) => row.title },
  {
    name: "description",
    label: "Description",
    align: "left",
    field: (row) => row.description,
  },
  {
    name: "begin_time",
    label: "Begin Time",
    align: "left",
    field: (row) => row.formatted_begin_date,
  },
  {
    name: "end_time",
    label: "End Time",
    align: "left",
    field: (row) => row.formatted_end_date,
  },
  { name: "actions", label: "Actions", align: "center" },
];

onMounted(() => {
  eventStore.getEvent(user.value.id);
  console.log("event", eventsTable.value);
});

function onSubmit() {
  if (modeUpdate.value) {
    eventStore.updateEvent(
      idUpdate.value,
      title.value,
      description.value,
      begin_date.value,
      end_date.value,
      user.value.id
    );
  } else {
    eventStore.createEvent(
      user.value.id,
      title.value,
      description.value,
      begin_date.value,
      end_date.value
    );
  }
  onReset();
}

function onReset() {
  title.value = "";
  description.value = "";
  begin_date.value = moment().format("YYYY-MM-DD HH:mm");
  end_date.value = moment().format("YYYY-MM-DD HH:mm");
  dialogEvent.value = false;
  modeUpdate.value = false;
  idUpdate.value = null;
}

function editRow(row) {
  console.log("row", row);
  modeUpdate.value = true;
  idUpdate.value = row.id;
  title.value = row.title;
  description.value = row.description;
  begin_date.value = row.formatted_begin_date;
  end_date.value = row.formatted_end_date;
  dialogEvent.value = true;
}

function deleteRow(row, user_id) {
  $q.dialog({
    title: `Supprimer l'évènement "${row.title}" ?`,
    message: "Cette action est irréversible.",
    cancel: true,
    persistent: true,
  }).onOk(() => {
    eventStore.deleteEvent(row.id, user_id);
    $q.notify({
      message: `L'évènement "${row.title}" a été supprimé avec succès.`,
      color: "red",
    });
  });
}

function show(row){
  console.log("ro",row.formatted_begin_date);
  selectedEvent.value.title = row.title;
  selectedEvent.value.description = row.description;
  selectedEvent.value.begin_date = row.formatted_begin_date;
  selectedEvent.value.end_date = row.formatted_end_date;
  dialogDetails.value = true
  console.log(selectedEvent.value)
}
function resetDialog(){
  dialogDetails.value= false;
  selectedEvent.value= {};
}
</script>

<style scoped>
.q-pa-md {
  padding: 16px;
}
</style>
