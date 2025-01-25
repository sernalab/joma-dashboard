<script setup>
import { ref, onMounted } from "vue";
import SelectionSection from "@/components/SelectionSection.vue";

import { useI18n } from "vue-i18n";

const userData = ref(null);
const { t } = useI18n();

onMounted(() => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  if (user) {
    userData.value = user;
  }
});
</script>

<template>
  <div class="mb-4">
    <h1 class="text-3xl font-medium">
      {{ t("login.title") }} {{ userData?.name || userData?.id }}
    </h1>
  </div>
  <SelectionSection />
</template>

<style>
.widget {
  background-color: #fff;
  border-radius: 10px;
}
</style>