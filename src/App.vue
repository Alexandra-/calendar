<template>
  <div class="app">
    <AppSidebar />
    <div class="main">
      <AppHeader />
      <div class="content">
        <AppCalendar />
      </div>
    </div>
  </div>
</template>

<script setup>
  import AppSidebar from '@/components/AppSidebar.vue'
  import AppHeader from './components/AppHeader.vue'
  import AppCalendar from '@/components/AppCalendar.vue'
</script>

<style lang='scss'>
.main {
  flex-grow: 1;
}

.content {
  padding: 32px 75px;
}
</style>
