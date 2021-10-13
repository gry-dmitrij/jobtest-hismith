<template>
  <v-container>
    <v-row>
      <v-col cols="10"
             offset="1">
        <v-card class="pa-3 d-flex flex-column align-center">
          <h2>Список новостей</h2>
          <v-container>
            <v-row>
              <v-col cols="3">
                <v-menu
                  v-model="menuPicker"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="datesString"
                      label="Выберите дату"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                    <v-btn @click="clearFilter">Очистить фильтр</v-btn>
                  </template>
                  <v-date-picker
                    v-model="dates"
                    range
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col>
                <v-text-field label="Поиск"
                              v-model="searchWords"/>
              </v-col>
            </v-row>
          </v-container>
          <new-item v-for="(item, idx) in news"
                    :key="idx"
                    :header="item.title"
                    :link="`/new/${item.guid}`"
                    :date="`${item.date} ${item.time}`"
                    :description="item.preview"/>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-pagination :length="paginationLength"
                      total-visible="8"
                      v-model="page"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import NewItem from './NewItem.vue';

export default {
  name: 'NewsList',
  components: {
    NewItem,
  },
  data() {
    return {
      dates: [],
      menuPicker: false,
      searchWords: '',
    };
  },
  mounted() {
    this.fetchNews();
  },
  methods: {
    ...mapActions([
      'fetchNews',
    ]),
    ...mapMutations([
      'setPage',
    ]),
    clearFilter() {
      this.searchWords = '';
      this.dates = [];
    },
  },
  computed: {
    ...mapGetters([
      'getNews',
      'getPage',
    ]),
    filterNews() {
      let news = this.getNews;
      const { dates } = this;
      let dateStart = new Date(dates[0]);
      let dateEnd = new Date(dates[1]);
      if (dateStart > dateEnd) {
        [dateStart, dateEnd] = [dateEnd, dateStart];
      }
      if (dates[0]) {
        news = news.filter((item) => new Date(item.isoDate) >= dateStart);
      }
      if (dates[1]) {
        news = news.filter((item) => new Date(item.isoDate) <= dateEnd);
      }
      if (this.filterWords.length) {
        news = news.filter((item) => new RegExp(this.filterWords.join('|'), 'i').test(item.title));
      }
      return news;
    },
    news() {
      return this.filterNews.slice((this.page - 1) * 5, 5 * this.page);
    },
    paginationLength() {
      return Math.ceil(this.filterNews.length / 5);
    },
    page: {
      get() {
        return this.getPage;
      },
      set(value) {
        this.setPage(value);
      },
    },
    datesString() {
      return `${this.dates[0] || ''} - ${this.dates[1] || ''}`;
    },
    filterWords() {
      return this.searchWords.split(' ').filter((item) => item.length > 2);
    },
  },
};
</script>

<style scoped>

</style>
