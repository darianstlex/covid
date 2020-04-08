<template>
  <div class="home">
    <Layout>
      <Header>Header</Header>
      <Content>
        <CountriesGraph />
      </Content>
    </Layout>
  </div>
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
