<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'app',
  watch: {
    '$state.ui.$.error'({ data, status }) {
      this.$Notice.error({
        title: `Error: ${status}`,
        desc: data.message,
      });
    },
  },
};
</script>

<style lang="scss">
html,
body {
  margin: 0;
  height: 100%;
}
</style>

<style lang="scss" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
}
</style>
