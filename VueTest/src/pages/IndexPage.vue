<template>
  <NavigationBar @today="onToday" @prev="onPrev" @next="onNext" />
  <div class="row justify-center">
    <div style="display: flex; max-width: 800px; width: 100%; height: 500px">
      <QCalendarDay
        ref="calendar"
        v-model="selectedDate"
        view="week"
        hour24-format
        short-weekday-label
        :date-header="dateHeader"
        :weekday-align="weekdayAlign"
        :date-align="dateAlign"
        :weekdays="[1, 2, 3, 4, 5, 6, 0]"
        :interval-count="28"
        :interval-start="14"
        :interval-minutes="30"
        locale="fr"
        bordered
        hoverable
        focusable
        @change="onChange"
        @moved="onMoved"
        @click-date="onClickDate"
        @click-time="onClickTime"
        @click-interval="onClickInterval"
        @click-head-intervals="onClickHeadIntervals"
        @click-head-day="onClickHeadDay"
      >
        <template #day-container="{ scope: { days } }">
          <template v-if="hasDate(days)">
            <div class="day-view-current-time-indicator" :style="style" />
            <div class="day-view-current-time-line" :style="style" />
          </template>
        </template>
        <template #head-day-event="{ scope: { timestamp } }">
          <div
            style="
              display: flex;
              justify-content: center;
              flex-wrap: wrap;
              padding: 2px;
            "
          >
            <template
              v-for="event in eventsMap[timestamp.date]"
              :key="event.id"
            >
              <q-badge
                v-if="!event.time"
                :class="badgeClasses(event, 'header')"
                :style="badgeStyles(event, 'header')"
                style="
                  width: 100%;
                  cursor: pointer;
                  height: 12px;
                  font-size: 10px;
                  margin: 1px;
                "
              >
                <div class="title q-calendar__ellipsis">
                  {{ event.title }}
                  <q-tooltip>{{ event.description }}</q-tooltip>
                </div>
              </q-badge>
              <q-badge
                v-else
                :class="badgeClasses(event, 'header')"
                :style="badgeStyles(event, 'header')"
                style="
                  margin: 1px;
                  width: 10px;
                  max-width: 10px;
                  height: 10px;
                  max-height: 10px;
                  cursor: pointer;
                "
                @click="scrollToEvent(event)"
              >
                <q-tooltip>{{ event.time + " - " + event.description }}</q-tooltip>
              </q-badge>
            </template>
          </div>
        </template>

        <template
          #day-body="{ scope: { timestamp, timeStartPos, timeDurationHeight } }"
        >
          <template v-for="event in getEvents(timestamp.date)" :key="event.id">
            <div
              v-if="event.time !== undefined"
              class="my-event"
              :class="badgeClasses(event, 'body')"
              :style="
                badgeStyles(event, 'body', timeStartPos, timeDurationHeight)
              "
            >
              <div class="title">
                <div>{{ event.title }}</div>

                <q-tooltip>{{
                  event.time +
                  " - " +
                  event.description
                }}</q-tooltip>
              </div>
            </div>
          </template>
        </template>
      </QCalendarDay>

    </div>
  </div>
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
import { QCalendarDay } from '@quasar/quasar-ui-qcalendar';
import NavigationBar from "../components/navigationBar.vue";
import { today } from "@quasar/quasar-ui-qcalendar";

import { useEventStore } from "src/stores/eventStore";
const eventStore = useEventStore();
const events = computed(() => eventStore.events);
const eventsTable = computed(() => events.value.schedules);

import { useAuthStore } from "src/stores/authStore";
const authStore = useAuthStore();
const user = computed(() => authStore.user);

const selectedDate = ref(today());
const dateAlign = ref("center");
const weekdayAlign = ref("center");
const dateHeader = ref("stacked");
const calendar = ref(null);

onMounted(() => {
  eventStore.getEvent(user.value.id);
  console.log("event", eventsTable.value);
});

const eventsMap = computed(() => {
  if (!eventsTable.value || eventsTable.value.length === 0) {
    return {};
  }

  const map = {};
  eventsTable.value.forEach((event) => {
    const eventDate = event.formatted_begin_date.split(" ")[0];
    const beginTime = event.formatted_begin_date.split(" ")[1];
    const endTime = event.formatted_end_date.split(" ")[1];
    if (!map[eventDate]) {
      map[eventDate] = [];
    }
    map[eventDate].push({
      id: event.id,
      title: event.title,
      description: event.description,
      time: beginTime,
      duration: calculateDuration(beginTime, endTime),
      bgcolor: "primary",
    });
  });
  return map;
});


function calculateDuration(start, end) {
  const [startHour, startMinute] = start.split(":").map(Number);
  const [endHour, endMinute] = end.split(":").map(Number);
  return (endHour * 60 + endMinute) - (startHour * 60 + startMinute);
}

function hasDate(days) {
  return days.find((day) => day.date === selectedDate.value);
}

function onNext() {
  calendar.value.next();
}

function onPrev() {
  calendar.value.prev();
}

function onToday() {
  calendar.value.moveToToday();
}

function scrollToEvent(event) {
  calendar.value.scrollToTime(event.time, 350);
}

function getEvents(dt) {
  return eventsMap.value[dt] || [];
}

function badgeClasses(event, type) {
  const isHeader = type === "header";
  return {
    [`text-white bg-${event.bgcolor}`]: true,
    "full-width": !isHeader && (!event.side || event.side === "full"),
    "left-side": !isHeader && event.side === "left",
    "right-side": !isHeader && event.side === "right",
    "rounded-border": true,
  };
}

function badgeStyles(event, type, timeStartPos = undefined, timeDurationHeight = undefined) {
  const s = {};
  if (timeStartPos && timeDurationHeight) {
    s.top = timeStartPos(event.time) + "px";
    s.height = timeDurationHeight(event.duration) + "px";
  }
  s["align-items"] = "flex-start";
  return s;
}
</script>


<style lang="sass">
.day-view-current-time-indicator
  position: absolute
  left: -5px
  height: 10px
  width: 10px
  margin-top: -4px
  background-color: rgba(0, 0, 255, .5)
  border-radius: 50%

.day-view-current-time-line
  position: absolute
  left: 5px
  border-top: rgba(0, 0, 255, .5) 2px solid
  width: calc(100% - 5px)

.q-dark,
.body--dark,
.q-calendar--dark
  .day-view-current-time-indicator
    background-color: rgba(255, 255, 0, .85)

  .day-view-current-time-line
    border-top: rgba(255, 255, 0, .85) 2px solid

.my-event
  position: absolute
  font-size: 12px
  justify-content: center
  margin: 0 1px
  text-overflow: ellipsis
  overflow: hidden
  cursor: pointer

.title
  position: relative
  display: flex
  justify-content: center
  align-items: center
  height: 100%

.text-white
  color: white

.bg-blue
  background: blue

.bg-green
  background: green

.bg-orange
  background: orange

.bg-red
  background: red

.bg-teal
  background: teal

.bg-grey
  background: grey

.bg-purple
  background: purple

.full-width
  left: 0
  width: calc(100% - 2px)

.left-side
  left: 0
  width: calc(50% - 3px)

.right-side
  left: 50%
  width: calc(50% - 3px)

.rounded-border
  border-radius: 2px
</style>
