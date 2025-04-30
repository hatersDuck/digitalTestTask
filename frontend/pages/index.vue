<template>
    <div class="container mx-auto p-4">
        <input
            v-model="searchQuery"
            type="text"
            placeholder="Поиск..."
            class="border p-2 mb-4 w-full rounded"
            @input="handleSearch"
        />

        <DraggableList
            v-model="slots"
            @update:selected="updateSelected"
            @drag-end="saveOrder"
        />
        <div v-if="loading" class="text-center p-4 text-gray-500">
            Loading...
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import type { Slot } from '../types/slot';

export default defineComponent({
    data() {
        return {
            slots: [] as Slot[],
            page: 1,
            total: 0,
            searchQuery: '',
            loading: false,
            scrollListener: null as EventListener | null,
        };
    },
    async mounted() {
        if (this.$route.query.search) {
            this.searchQuery = this.$route.query.search as string;
        }

        await this.loadSlots();
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        async fetchData(url: string, options: RequestInit = {}) {
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    ...options.headers,
                },
                ...options,
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            return await response.json();
        },

        async loadSlots() {
            this.loading = true;
            try {
                const params = new URLSearchParams({
                    page: this.page.toString(),
                    limit: '20',
                    ...(this.searchQuery && { search: this.searchQuery }),
                });

                const data = await this.fetchData(
                    `/api/slots?${params.toString()}`,
                );
                this.slots = [...this.slots, ...data.slots];
                this.total = data.total;
            } finally {
                this.loading = false;
            }
        },

        handleSearch() {
            this.$router.replace({
                query: {
                    ...this.$route.query,
                    search: this.searchQuery || undefined,
                },
            });

            this.page = 1;
            this.slots = [];
            this.loadSlots();

            this.fetchData('/api/clear', {
                method: 'PATCH'
            });
        },

        async saveOrder(fromId: number, toId: number) {
            await this.fetchData('/api/reorder', {
                method: 'POST',
                body: JSON.stringify({ fromId, toId }),
            });
        },

        async updateSelected(newSelected: Slot) {
            newSelected.isSelected = !newSelected.isSelected;

            this.fetchData('/api/select', {
                method: 'PATCH',
                body: JSON.stringify({
                    ...newSelected,
                }),
            });
        },

        handleScroll() {
            const bottomOfWindow =
                document.documentElement.scrollTop + window.innerHeight >=
                document.documentElement.offsetHeight - 100;

            if (
                bottomOfWindow &&
                !this.loading &&
                this.slots.length < this.total
            ) {
                this.page += 1;
                this.loadSlots();
            }
        },
    },
});
</script>