<template>
  <Card class="container">
    <div class="content">
      <Select v-model="country" multiple filterable :max-tag-count="10" placeholder="Select Countries">
        <Option v-for="item in $state.countries.$.list" :value="item.Slug" :key="item.ISO2">{{ item.Country }}</Option>
      </Select>
      <zingchart :data="chartData" :series="chartValues" />
    </div>
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
  },
  title: {
    text: 'Covid 2019',
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
      country: ['united-kingdom'],
    };
  },
  computed: {
    cases() {
      return this.$state.cases.$.list;
    },
    chartValues() {
      return this.country.map(country => ({
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
    async country(country) {
      this.$Loading.start();
      await Promise.all(country.map(it => this.$state.cases.fetch(it)));
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

  .content {
    min-height: 200px;
  }
}
</style>
