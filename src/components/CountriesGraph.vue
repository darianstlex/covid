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
    <div class="chart">
      <zingchart :data="chartData" :series="chartValues" />
      <Spin size="large" fix v-if="$state.ui.$.loading"></Spin>
    </div>
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
    selected(list) {
      list.map(it => this.$state.cases.fetch(it, this.status));
    },
    status(status) {
      this.selected.map(it => this.$state.cases.fetch(it, status));
    },
  },
  mounted() {
    this.$state.countries.fetch();
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
  .chart {
    position: relative;
  }
}
</style>

<style lang="scss">
.ivu-spin-fix {
  background-color: hsla(0, 0%, 100%, 0.66) !important;
}
</style>
