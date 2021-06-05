<template>
  <div class="about">
    <about-nav></about-nav>
    <router-view></router-view>
  </div>
</template>

<script>
import AboutNav from "./AboutNav/AboutNav.vue";
export default {
  components: { AboutNav },
};
</script>

<style>
</style>