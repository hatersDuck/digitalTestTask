<template>
    <div
        class="flex items-center p-3 border rounded bg-white hover:shadow-md transition-shadow"
        :id="item.id.toString()"
    >
        <input
            type="checkbox"
            :checked="item.isSelected"
            @change="handleSelect"
            class="mr-3 h-4 w-4"
        />
        <span class="text-gray-700">{{ item.title || `Item ${item.id}` }} ({{ item.id }})</span>
    </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { Slot } from '../types/slot';


export default defineComponent({
    props: {
        item: {
            type: Object as PropType<Slot>,
            required: true,
        },
    },
    emits: ['select'],
    methods: {
      handleSelect() {
        this.$emit("select", this.item)
      }
    }
});
</script>