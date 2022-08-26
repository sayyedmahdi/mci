<template>
  <div v-if="loggedIn">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      loggedIn: true
    }
  }
}
</script>

<style scoped>

</style>
