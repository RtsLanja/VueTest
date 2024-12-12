<template>
  <q-input
    :value="modelValue"
    dense
    outlined
    v-model="localDate"
    @click="dateDialog"
    class="text-black full-width"
  >
    <template v-slot:prepend>
      <q-icon color="red" name="event" class="cursor-pointer">
        <q-popup-proxy
          cover
          transition-show="scale"
          transition-hide="scale"
          ref="datePopupRef"
        >
          <q-date v-model="localDate" mask="YYYY-MM-DD HH:mm">
            <div class="row items-center justify-end">
              <q-btn
                no-caps
                v-close-popup
                label="Fermer"
                color="primary"
                push
                rounded
                @click="updateValue"
              />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>
    <template>

    </template>
    <template v-slot:append>
      <q-icon color="orange" name="access_time" class="cursor-pointer">
        <q-popup-proxy
          cover
          transition-show="scale"
          transition-hide="scale"
          ref="timeRef"
        >
          <q-time
            v-model="localDate"
            mask="YYYY-MM-DD HH:mm"
            format24h
          >
            <div class="row items-center justify-end">
              <q-btn
                v-close-popup
                label="Fermer"
                color="primary"
                push
                no-caps
                rounded
                @click="updateValue"
              />
            </div>
          </q-time>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script setup>
import { ref, watch, defineEmits } from "vue";

// Declare the emit function
const emit = defineEmits();

// Prop binding for v-model
const { modelValue } = defineProps({
  modelValue: String,
});

const datePopupRef = ref(null);
const timeRef = ref(null);
const localDate = ref(modelValue);

// Emit the update:modelValue event to create two-way binding
const updateValue = () => {
  emit("update:modelValue", localDate.value);
};

// Watch for changes to the modelValue prop
watch(() => modelValue, (newValue) => {
  localDate.value = newValue;
});
</script>

<style lang="sass">
/* You can style the component as needed */
</style>
