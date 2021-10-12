import Vue from 'vue';
import Vuex from 'vuex';
import Parser from 'rss-parser';

const parser = new Parser({
  headers: {
    'Access-Control-Allow-Origin': 'http://localhost:8080/',
    'Access-Control-Allow-Credentials': 'true',
  },
  customFields: {
    item: [
      ['rbc_news:image', 'images', { keepArray: true }],
      ['rbc_news:anons', 'preview'],
      ['rbc_news:date', 'date'],
      ['rbc_news:time', 'time'],
    ],
  },
});
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    news: [],
    page: 1,
  },
  getters: {
    getNews: (state) => state.news,
    getPage: (state) => state.page,
  },
  mutations: {
    setNews(state, payload) {
      state.news = [...payload];
    },
    setPage(state, number) {
      state.page = number;
    },
  },
  actions: {
    async fetchNews({ commit }) {
      const feed = await parser.parseURL('http://static.feed.rbc.ru/rbc/logical/footer/news.rss');
      console.log(feed);
      commit('setNews', feed.items);
    },
  },
  modules: {
  },
});
