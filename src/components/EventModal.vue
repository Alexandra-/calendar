<template>
    <div class="event-modal">
        <AppButton v-if="editMode" type="button" class="btn-delete" @click="deleteEvent">
            <IconTrash />
        </AppButton>
        <AppButton type="button" class="btn-close" @click="closeModal">
            <IconClose />
        </AppButton>
        <input type="text" class="form-control" placeholder="event name" maxlength="30" v-model.trim="newEvent.title">
        <input type="date" class="form-control" placeholder="Event date" v-model="newEvent.date">
        <input type="time" class="form-control" placeholder="Event time" v-model="newEvent.time">
        <textarea class="form-control form-control__textarea" placeholder="notes" v-model.trim="newEvent.notes"></textarea>
        <ColorPicker format="hex" shape="circle" v-model:pureColor="newEvent.backgroundColor"/>
        <div class="event-modal__footer">
            <AppButton type="button" class="btn-danger" @click="closeModal">
                Cancel
            </AppButton>
            <AppButton type="button" @click="saveEvent">
                Save
            </AppButton>
        </div>
    </div>
</template>

<script setup>
import IconClose from '@/components/UI/icons/IconClose.vue'
import IconTrash from '@/components/UI/icons/IconTrash.vue'
const newEvent = defineModel()

defineProps({
    editMode: {
        type: Boolean,
        required: true,
        defult(rawProps) {
            return false
        }
    }
})

const emit = defineEmits(['save', 'cancel', 'delete'])

const saveEvent = () => {
  emit('save')
}

const closeModal = () => {
  emit('cancel')
}

const deleteEvent = () => {
    emit('delete')
}

</script>

<style lang="scss" scoped>
.event-modal {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 9999;
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

.modal-top {
    &:before {
        top: auto;
        bottom: -9px;
        transform: rotate(180deg);
       
    }
}

.btn-close {
    position: absolute;
    right: 4px;
    top: 4px;
    padding: 4px;
    line-height: 1;
}

.btn-delete {
    position: absolute;
    top: 4px;
    right: 36px;
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
