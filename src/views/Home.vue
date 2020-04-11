<template>
  <Layout class="home">
    <Header>
      <span class="title">Covid - 19</span>
    </Header>
    <Content>
      <CountriesGraph />
    </Content>
    <Footer>@DarianstLex © 2020</Footer>
  </Layout>
</template>

<script>
import CountriesGraph from '@/components/CountriesGraph.vue';

export default {
  name: 'Home',
  components: {
    CountriesGraph,
  },
};
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
}

.title {
  font-size: 28px;
  color: white;
}
</style>
