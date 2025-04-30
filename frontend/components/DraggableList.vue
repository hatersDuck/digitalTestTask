<template>
    <draggable 
      v-model="items"
      item-key="id"
      tag="div"
      class="space-y-2"
      @start="handleStart"
      @end="handleDragEnd"
    >
      <template #item="{ element }">
        <DraggableListItem
          :item="element"
          @select="handleSelect"
        />
      </template>
    </draggable>
  </template>
  
  <script lang="ts">
  import { defineComponent, type PropType } from 'vue'
  import draggable from 'vuedraggable'
  import DraggableListItem from './DraggableListItem.vue'
  import type { Slot } from '../types/slot'
  
  export default defineComponent({
    components: { draggable, DraggableListItem },
    data() {
        return {
            draggedId: 0
        }
    },
    props: {
      modelValue: {
        type: Array as PropType<Slot[]>,
        required: true
      },
    },
    emits: ['update:modelValue', 'update:selected', 'drag-end'],
    computed: {
      items: {
        get() {
          return this.modelValue
        },
        set(value: Slot[]) {
          this.$emit('update:modelValue', value)
        }
      }
    },
    methods: {
      handleStart(event: any){
          this.draggedId = Number(event.item.id)
      },  
      handleDragEnd(event: any) {
        this.$emit('drag-end', event.oldIndex+1, event.newIndex+1)
      },
      handleSelect(item: Slot) {
        this.$emit('update:selected', item)
      }
    }
  })
  </script>