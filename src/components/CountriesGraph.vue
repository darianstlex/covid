<template>
  <Card class="container">
    <div class="controls">
      <Select v-model="selected" multiple filterable :max-tag-count="10" size="large" placeholder="Select Countries">
        <Option v-for="item in countries" :value="item.Slug" :key="item.ISO2">{{ item.Country }}</Option>
      </Select>
      <RadioGroup class="status" v-model="status" type="button" size="large">
        <Radio label="confirmed">Confirmed</Radio>
        <Radio label="recovered">Recovered</Radio>
        <Radio label="deaths">Deaths</Radio>
      </RadioGroup>
    </div>
    <zingchart :data="chartData" :series="chartValues" />
  </Card>
</template>

<script>
import { chartData, scaleX, months } from './constants';

export default {
  name: 'CountriesGraph',
  components: {},
  data() {
    return {
      selected: ['united-kingdom', 'germany', 'italy', 'spain'],
      status: 'deaths',
    };
  },
  computed: {
    countries() {
      return this.$state.countries.$.list;
    },
    cases() {
      return this.$state.cases.$[this.status];
    },
    chartValues() {
      return this.selected.map(country => ({
        values: this.cases[country]?.map(it => it.Cases),
        text: this.countries.find(it => it.Slug === country)?.Country,
      }));
    },
    chartData() {
      const [first = []] = Object.values(this.cases);
      const labels = first.map(it => {
        const [, month, date] = it.Date.split('-');
        return `${date} ${months[month - 1]}`;
      });
      return {
        ...chartData,
        scaleX: {
          ...scaleX,
          labels,
        },
      };
    },
  },
  watch: {
    async selected(list) {
      this.$Loading.start();
      await Promise.all(list.map(it => this.$state.cases.fetch(it, this.status)));
      this.$Loading.finish();
    },
    async status(status) {
      this.$Loading.start();
      await Promise.all(this.selected.map(it => this.$state.cases.fetch(it, status)));
      this.$Loading.finish();
    },
  },
  async mounted() {
    await this.$state.countries.fetch();
  },
};
</script>

<style lang="scss" scoped>
.container {
  margin: 10px 50px;

  @media only screen and (max-width: 960px) {
    margin: 10px 2px;
  }

  .controls {
    display: flex;

    @media only screen and (max-width: 960px) {
      display: block;
    }
  }
  .status {
    display: flex;
    margin: 0 0 0 10px;

    @media only screen and (max-width: 960px) {
      width: initial;
      margin: 10px 0 0 0;
    }
  }
}
</style>
