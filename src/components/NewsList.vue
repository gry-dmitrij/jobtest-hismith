<template>
  <v-container>
    <v-row>
      <v-col cols="10"
             offset="1">
        <v-card class="pa-3 d-flex flex-column align-center">
          <h2>Список новостей</h2>
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
  },
  computed: {
    ...mapGetters([
      'getNews',
      'getPage',
    ]),
    news() {
      return this.getNews.slice((this.page - 1) * 5, 5 * this.page);
    },
    paginationLength() {
      return Math.ceil(this.getNews.length / 5);
    },
    page: {
      get() {
        return this.getPage;
      },
      set(value) {
        this.setPage(value);
      },
    },
  },
};
</script>

<style scoped>

</style>
