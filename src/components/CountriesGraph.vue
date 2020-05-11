<template>
  <Card class="container">
    <div class="controls">
      <Select
        v-model="state.selectedCountries"
        :max-tag-count="10"
        size="large"
        placeholder="Select Countries"
        multiple
        filterable
      >
        <Option v-for="item in countries.$.list" :value="item.Slug" :key="item.ISO2">{{ item.Country }}</Option>
      </Select>
      <RadioGroup class="status" v-model="state.status" type="button" size="large">
        <Radio label="confirmed">Confirmed</Radio>
        <Radio label="recovered">Recovered</Radio>
        <Radio label="deaths">Deaths</Radio>
      </RadioGroup>
    </div>
    <div class="chart">
      <zingchart :data="chartData" :series="chartSeries" />
      <Spin v-if="$state.ui.$.loading" size="large" fix />
    </div>
  </Card>
</template>

<script>
import { useDebounceFn } from '@vueuse/core';
import { computed, reactive, watch, onMounted } from '@vue/composition-api';
import { chartConfig, scaleX, months } from './constants';
import { countries } from 'services/countries';
import { cases } from 'services/cases';

export default {
  name: 'CountriesGraph',
  setup() {
    // state
    const state = reactive({
      selectedCountries: ['united-kingdom', 'germany', 'italy', 'spain'],
      status: 'deaths',
    });

    const fetchCases = useDebounceFn((countryList, status) => {
      countryList.map(country => cases.fetch(country, status));
    }, 300);

    // watchers
    watch([() => state.selectedCountries, () => state.status], ([countryList, status]) => {
      fetchCases(countryList, status);
    });

    // computed
    const chartData = computed(() => {
      const [first = []] = Object.values(cases.$[state.status]);
      const labels = first.map(it => {
        const [, month, date] = it.Date.split('-');
        return `${date} ${months[month - 1]}`;
      });

      return {
        ...chartConfig,
        scaleX: {
          ...scaleX,
          zoomToValues: [45, first.length],
          labels,
        },
      };
    });

    const chartSeries = computed(() =>
      [...state.selectedCountries].map(country => ({
        values: cases.$[state.status][country]?.map(it => it.Cases),
        text: countries.$.list.find(it => it.Slug === country)?.Country,
      }))
    );

    onMounted(() => {
      countries.fetch();
    });

    return {
      countries,
      state,
      chartData,
      chartSeries,
    };
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
