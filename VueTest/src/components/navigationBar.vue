<template>


  <div class="row justify-center">


    <div class="q-pa-md q-gutter-sm row">
      <q-btn-group rounded>
      <q-btn rounded no-caps push   @click="$emit('prev')">
        &lt;&lt;
      </q-btn>
      <q-btn no-caps rounded push  @click="$emit('today')">
        Le programme pour cette semaine
      </q-btn>
      <q-btn no-caps rounded  push  @click="$emit('next')">
        &gt;&gt;
      </q-btn>
    </q-btn-group>
    </div>
  </div>

</template>
