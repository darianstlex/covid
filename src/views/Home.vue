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
// @ is an alias to /src
import CountriesGraph from '@/components/CountriesGraph.vue';

export default {
  name: 'Home',
  components: {
    CountriesGraph,
  },
};
</script>
