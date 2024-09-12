<template>
    <h1>Calendar</h1>
    <div class="content-box">
        <h2>Calendar View</h2>
        <FullCalendar
            :options='calendarOptions'
        >
            <template v-slot:eventContent='arg'>
            {{ arg.event.title }}
            </template>
            
        </FullCalendar>

        <EventModal
            v-show="showModal"
            v-model="newEvent"
            @save="saveEvent"
            @cancel="closeModal"
            @delete="deleteEvent"
            editMode
            :style="{ top: modalPosition.top + 'px', left: modalPosition.left + 'px' }" />
    </div>
</template>

<script setup>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from '@/event-utils'
import EventModal from '@/components/EventModal.vue'

import { ref, nextTick } from 'vue'

let currentEvents = ref([])
let currentDayInfo;
let defaultEventColor = ref('#3B86FF')
const newEvent = ref({
    id: createEventId(),
    title: '',
    date: '',
    time: '',
    notes: '',
    backgroundColor: defaultEventColor
});
let calendarApi = null;

let showModal = ref(false);
let editMode = ref(false);
let modalPosition = ref({ top: 0, left: 0 });
let modalHeight;
let modalWidth;

const initEvents = (events) => {
    currentEvents.value = events
}

const closeModal = () => {
    showModal.value = false;
}

const resetNewEvent = () => {
    editMode.value = false;
    newEvent.value = {
        id: createEventId(),
        title: '',
        date: '',
        time: '',
        notes: '',
        backgroundColor: defaultEventColor
    };
}

const createEvent = (dayInfo) => {
    currentDayInfo = dayInfo;
    resetNewEvent();
    setCurrentDate(dayInfo);
    setModalPosition(dayInfo);
}

const setCurrentDate = (dayInfo) => {
    // Set default values for newEvent based on clicked date
    const defaultDate = new Date(dayInfo.dateStr + 'T08:00:00');
    newEvent.value.date = defaultDate.toISOString().split('T')[0]; // YYYY-MM-DD
    newEvent.value.time = defaultDate.toTimeString().split(' ')[0].substring(0, 5); // HH:MM
}

const setModalPosition = (info, offset) => {
    let modalOffset = offset;
    showModal.value = true;
    const modalEl = document.querySelector('.event-modal');

    nextTick(() => {
        if (!modalHeight) {
            modalHeight = modalEl.offsetHeight;
            modalWidth = modalEl.offsetWidth;
        }

        const documentHeight = document.documentElement.offsetHeight;
        const dayEl = info.jsEvent.target.getBoundingClientRect();
        let scrollLeft = window.scrollX,
            scrollTop = window.scrollY;

        if (!modalOffset) {
            modalOffset = -(dayEl.height * 0.2);
        }
        
        let modalLeft = scrollLeft + dayEl.left + ((dayEl.width - modalWidth) / 2 ),
            modalBot = scrollTop + dayEl.bottom + modalHeight + modalOffset

        if (modalBot > documentHeight) {
            modalPosition.value = {
                top: scrollTop + dayEl.top - modalHeight - modalOffset,
                left: modalLeft
            };

            if(!modalEl.classList.contains('modal-top')) {
                modalEl.classList.add('modal-top')
            }

        } else {
            modalPosition.value = {
                top: scrollTop + dayEl.bottom + modalOffset,
                left: modalLeft
            };

            if(modalEl.classList.contains('modal-top')) {
                modalEl.classList.remove('modal-top')
            }
        }
       
    })
}

const saveEvent = () => {
    if (newEvent.value.title && newEvent.value.date && newEvent.value.time) {
        if (!calendarApi) {
            calendarApi = currentDayInfo.view.calendar;
        }  
        
        const eventStart = new Date(`${newEvent.value.date}T${newEvent.value.time}`);
        const existingEvent = calendarApi.getEventById(newEvent.value.id);
        
        if (existingEvent) {
            existingEvent.setProp('title', newEvent.value.title);
            existingEvent.setStart(eventStart);
            existingEvent.setProp('backgroundColor', newEvent.value.backgroundColor);
            existingEvent.setProp('borderColor', newEvent.value.backgroundColor);
            existingEvent.setExtendedProp('notes', newEvent.value.notes);
            editMode.value = false;
        } else {
            calendarApi.addEvent({
                id: newEvent.value.id,
                title: newEvent.value.title,
                start: eventStart,
                extendedProps: {
                    notes: newEvent.value.notes
                },
                backgroundColor: newEvent.value.backgroundColor,
                borderColor: newEvent.value.backgroundColor
            });
        }

        resetNewEvent();
        closeModal();
    } else {
        alert('Please fill in all fields.');
    }
};

const editEvent = (clickInfo) => {
    if (!calendarApi) {
        calendarApi = clickInfo.view.calendar;
    }

    let modalOffset = 10;
    setModalPosition(clickInfo, modalOffset);

    newEvent.value = {
        id: clickInfo.event.id,
        title: clickInfo.event.title,
        date: new Date(clickInfo.event.startStr).toISOString().split('T')[0],
        time: new Date(clickInfo.event.startStr).toTimeString().split(' ')[0].substring(0, 5),
        notes: clickInfo.event.extendedProps.notes || '',
        backgroundColor: clickInfo.event.backgroundColor
    };
    showModal.value = true; 
    editMode.value = true; 
};

const deleteEvent = () => {
    calendarApi.getEventById(newEvent.value.id).remove();
    resetNewEvent();
    closeModal();
    editMode.value = false;
}

const eventDrag = () => {
    closeModal();
    editMode.value = false;
}

const calendarOptions = {
    plugins: [
        dayGridPlugin,
        timeGridPlugin,
        listPlugin,
        interactionPlugin // needed for dateClick
    ],
    eventDisplay: "block", // needed for changing background color of timed events
    nowIndicator: true,
    buttonText: {
        today: 'Today',
        month: 'Month',
        week: 'Week',
        day: 'Day',
        list: 'Agenda',
        prev: 'Back',
        next: 'Next'
    },
    buttonIcons: false,
    headerToolbar: {
        left: 'today,prev,next',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,list'
    },
    initialView: 'dayGridMonth',
    initialEvents: INITIAL_EVENTS, 
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    weekends: true,
    eventsSet: initEvents,
    eventClick: editEvent,
    dateClick: createEvent,
    eventDragStart: eventDrag
}
</script>

<style lang="scss">
.content-box {
    padding: 20px;
    background-color: #fff;
    box-shadow: 0px 2px 6px #0000000A;
}
</style>
