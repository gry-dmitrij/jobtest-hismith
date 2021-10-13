import Vue from 'vue';
import Vuex from 'vuex';
import Parser from 'rss-parser';

const parser = new Parser({
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
  },
  customFields: {
    /**
     * Переименовывает поля:
     * item: [
     *   ['old_name', 'new_name'}
     * ]
     * keepArray сохраняет весь массив данных, без него прилетает только первое значение
     */
    item: [
      ['rbc_news:image', 'images', { keepArray: true }],
      ['rbc_news:anons', 'preview'],
      ['rbc_news:date', 'date'],
      ['rbc_news:time', 'time'],
      ['rbc_news:full-text', 'fullText'],
      ['rbc_news:newsDate_timestamp', 'timestamp'],
    ],
  },
});

function sortNews(item1, item2) {
  return new Date(item2.isoDate).getTime() - new Date(item1.isoDate).getTime();
}
Vue.use(Vuex);

// прокси для избежания ошибок CORS
const PROXY = 'https://thingproxy.freeboard.io/fetch/';
export default new Vuex.Store({
  state: {
    news: [],
    page: 1,
  },
  getters: {
    getNews: (state) => state.news,
    getPage: (state) => state.page,
    /**
     * Получает отдельную новость по guid новости
     * @param state
     * @returns {function(*): *}
     */
    getNewById: (state) => (id) => state.news.find((item) => item.guid === id),
  },
  mutations: {
    setNews(state, payload) {
      payload.sort(sortNews);
      state.news = [...payload];
    },
    setPage(state, number) {
      state.page = number;
    },
  },
  actions: {
    async fetchNews({ commit }) {
      const feed = await parser.parseURL(
        `${PROXY}http://static.feed.rbc.ru/rbc/logical/footer/news.rss`,
      );
      commit('setNews', feed.items);
    },
  },
  modules: {
  },
});
