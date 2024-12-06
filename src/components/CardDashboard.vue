<script setup>
// Define las props que recibirá cada card
defineProps({
  title: String,
  icon: String,
  description: String,
});

// Emite el evento de click hacia arriba
const emit = defineEmits(["cardClick"]);
</script>

<template>
  <Card
    class="cursor-pointer hover:shadow-4 transition-all transition-duration-300"
    @click="$emit('cardClick')"
  >
    <template #header>
      <div class="flex align-items-center justify-content-center p-4">
        <i :class="icon" style="font-size: 3rem"></i>
      </div>
    </template>
    <template #title>
      <h3 class="text-center m-0">{{ title }}</h3>
    </template>
    <template #content>
      <p class="text-center m-0 line-height-3">
        {{ description }}
      </p>
    </template>
  </Card>
</template>