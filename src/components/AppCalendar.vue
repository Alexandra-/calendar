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
        <div v-show="showModal" class="event-modal" :style="{ top: modalPosition.top + 'px', left: modalPosition.left + 'px' }">
            <div>
                <AppButton type="button" class="btn-close" @click="closeModal">
                    <IconClose />
                </AppButton>
                <input type="text" class="form-control" placeholder="event name" maxlength="30" v-model="newEvent.title">
                <input type="date" class="form-control" placeholder="Event date" v-model="newEvent.date">
                <input type="time" class="form-control" placeholder="Event time" v-model="newEvent.time">
                <ColorPicker format="hex" shape="circle" v-model:pureColor="newEvent.backgroundColor"/>
                <textarea class="form-control form-control__textarea" placeholder="notes" v-model="newEvent.notes"></textarea>
                <div class="event-modal__footer">
                    <AppButton type="button" class="btn-danger" @click="closeModal">
                        Cancel
                    </AppButton>
                    <AppButton type="button" @click="saveEvent">
                        Save
                    </AppButton>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from '@/event-utils'
import IconClose from '@/components/UI/icons/IconClose.vue'

import { ref } from 'vue'

let showModal = ref(false);
let modalPosition = ref({ top: 0, left: 0 });
let isAnimating = false;
let defaultEventColor = ref('#3B86FF')
const newEvent = ref({
    id: createEventId(),
    title: '',
    date: '',
    time: '',
    notes: '',
    backgroundColor: defaultEventColor
});

let currentEvents = ref([])
let currentDayInfo = ref(null)

const modalHeight = ref(null);

const closeModal = () => {
    showModal.value = false;
}

const handledateClick = (dayInfo) => {
    if (isAnimating) return;

    isAnimating = true;

    if (showModal.value) {
        newEvent.value = {
            id: createEventId(),
            title: '',
            date: '',
            time: '',
            notes: '',
            backgroundColor: defaultEventColor
        };
        closeModal();
        setTimeout(() => {
            setCurrentDate(dayInfo);
            openModalAtNewPosition(dayInfo);
            isAnimating = false;
        }, 100);
    } else {
        setCurrentDate(dayInfo);
        openModalAtNewPosition(dayInfo);
        isAnimating = false;
    }
}

const setCurrentDate = (dayInfo) => {
    currentDayInfo.value = dayInfo;
    // Set default values for newEvent based on clicked date
    const defaultDate = new Date(dayInfo.dateStr + 'T08:00:00');
    newEvent.value.date = defaultDate.toISOString().split('T')[0]; // YYYY-MM-DD
    newEvent.value.time = defaultDate.toTimeString().split(' ')[0].substring(0, 5); // HH:MM
}

const openModalAtNewPosition = (dayInfo) => {
    const rect = dayInfo.jsEvent.target.getBoundingClientRect();
    const documentHeight = document.documentElement.offsetHeight;
    const modalOffset = rect.height * 0.2;

    if (!modalHeight.value) {
        const modalElement = document.querySelector('.event-modal');
        modalHeight.value = modalElement.offsetHeight;
    }

    if (rect.bottom + modalHeight.value > documentHeight) {
        modalPosition.value = {
            top: rect.top + window.scrollY - modalHeight.value + modalOffset,
            left: rect.left + window.scrollX
        };
    } else {
        modalPosition.value = {
            top: rect.bottom + window.scrollY - modalOffset,
            left: rect.left + window.scrollX
        };
    }

    showModal.value = true;
}

const saveEvent = () => {
    if (newEvent.value.title && newEvent.value.date && newEvent.value.time) {
        const calendarApi = currentDayInfo.value.view.calendar;
        const eventStart = new Date(`${newEvent.value.date}T${newEvent.value.time}`);
        
        const existingEvent = calendarApi.getEventById(newEvent.value.id);
        
        if (existingEvent) {
            existingEvent.setProp('title', newEvent.value.title);
            existingEvent.setStart(eventStart);
            existingEvent.setProp('backgroundColor', newEvent.value.backgroundColor);
            existingEvent.setProp('borderColor', newEvent.value.backgroundColor);
            existingEvent.setExtendedProp('notes', newEvent.value.notes);
        } else {
            calendarApi.addEvent({
                id: newEvent.value.id,
                title: newEvent.value.title,
                start: eventStart,
                allDay: true,
                extendedProps: {
                    notes: newEvent.value.notes
                },
                backgroundColor: newEvent.value.backgroundColor,
                borderColor: newEvent.value.backgroundColor
            });
        }

        newEvent.value = {
            id: createEventId(),
            title: '',
            date: '',
            time: '',
            notes: '',
            backgroundColor: defaultEventColor
        };
        closeModal();
    } else {
        alert('Please fill in all fields.');
    }
};

const handleEventClick = (clickInfo) => {
    const rect = clickInfo.jsEvent.target.getBoundingClientRect();
    const documentHeight = document.documentElement.offsetHeight;
    const modalOffset = 10;
    const modalElement = document.querySelector('.event-modal');

    if (!modalHeight.value) {
        modalHeight.value = modalElement.offsetHeight;
    }

    if (rect.bottom + modalHeight.value + modalOffset > documentHeight) {
        modalPosition.value = {
            top: rect.top + window.scrollY - modalHeight.value - modalOffset,
            left: rect.left + window.scrollX
        };
        modalElement.classList.add('modal-above');
    } else {
        modalPosition.value = {
            top: rect.bottom + window.scrollY + modalOffset,
            left: rect.left + window.scrollX
        };
        modalElement.classList.remove('modal-above');
    }

    newEvent.value = {
        id: clickInfo.event.id,
        title: clickInfo.event.title,
        date: new Date(clickInfo.event.startStr).toISOString().split('T')[0],
        time: new Date(clickInfo.event.startStr).toTimeString().split(' ')[0].substring(0, 5),
        notes: clickInfo.event.extendedProps.notes || '',
        backgroundColor: clickInfo.event.backgroundColor
    };
    showModal.value = true; 
};

const handleEvents = (events) => {
    currentEvents = events
}

const calendarOptions = {
    plugins: [
        dayGridPlugin,
        timeGridPlugin,
        listPlugin,
        interactionPlugin // needed for dateClick
    ],
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
    dateClick: handledateClick,
    eventClick: handleEventClick,
    eventsSet: handleEvents
}

</script>

<style lang="scss">
.content-box {
    padding: 20px;
    background-color: #fff;
    box-shadow: 0px 2px 6px #0000000A;
}

.event-modal {
    position: absolute;
    top:50%;
    left: 50%;
    z-index: 2;
    width: 200px;
    padding: 20px 26px;
    background-color: #fff;
    box-shadow: 0px 3px 18px #00000029;
    border: 1px solid #43425D;
    border-radius: 10px;

    &:before {
        content: '';
        position: absolute;
        top: -9px;
        left: 50%;
        transform: translateX(-50%);
        width: 0; 
        height: 0; 
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        border-bottom: 9px solid #43425D;
    }
}

.btn-close {
    position: absolute;
    right: 4px;
    top: 4px;
    padding: 4px;
    line-height: 1;
}

.event-modal__footer {
    display: flex;
    justify-content: space-between;
    padding-top: 10px;
}

.form-control {
    display: block;
    margin-bottom: 8px;
    padding: 6px 0;
    width: 100%;
    line-height: 20px;
    font-family: "Source Sans 3", Arial, Helvetica, sans-serif;
    border: none;
    border-bottom: 1px solid #C6C6CE;
    transition: border-color 0.3s;

    &:focus {
        outline: none;
        border-color: var(--color-primary);
    }
}

.form-control__textarea {
    resize: none;
}

</style>