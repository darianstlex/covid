<template>
  <Card class="container">
    <div class="controls">
      <Select v-model="selected" multiple filterable :max-tag-count="10" placeholder="Select Countries">
        <Option v-for="item in $state.countries.$.list" :value="item.Slug" :key="item.ISO2">{{ item.Country }}</Option>
      </Select>
      <RadioGroup class="status" v-model="status" type="button">
        <Radio label="confirmed">Confirmed</Radio>
        <Radio label="recovered">Recovered</Radio>
        <Radio label="deaths">Deaths</Radio>
      </RadioGroup>
    </div>
    <zingchart :data="chartData" :series="chartValues" />
  </Card>
</template>

<script>
const chartData = {
  theme: 'light',
  type: 'line',
  plot: {
    aspect: 'spline',
    tooltip: {
      text: '%t: %kt - %vt',
    },
    animation: {
      delay: 10,
      effect: '5',
      speed: '500',
    },
  },
  legend: {
    x: '60px',
    y: '70px',
  },
  preview: {
    'background-color': '#d7d7d8',
    'border-width': 1,
    height: 50,
    'preserve-zoom': false,
    mask: {
      backgroundColor: 'white',
      alpha: 0.8,
    },
    handle: {
      'border-width': 2,
      height: '50px',
    },
    y: '85%',
  },
  zoom: {
    active: true,
    'preserve-zoom': false,
  },
};

const scaleX = {
  zooming: true,
  zoomToValues: [30, 100],
  guide: {
    visible: true,
  },
};

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

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
    cases() {
      return this.$state.cases.$[this.status];
    },
    chartValues() {
      return this.selected.map(country => ({
        values: this.cases[country]?.map(it => it.Cases),
        text: this.$state.countries.$.list.find(it => it.Slug === country)?.Country,
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
    width: 412px;
    margin: 0 0 0 10px;

    @media only screen and (max-width: 960px) {
      width: initial;
      margin: 10px 0 0 0;
    }
  }
}
</style>
