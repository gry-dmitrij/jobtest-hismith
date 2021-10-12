<template>
  <v-container>
    <v-row>
      <v-col>
        <h2>{{ news.title }}</h2>
        <v-row>
          <v-col cols="3"
                 class="d-flex flex-column">
            <span class="text--secondary subtitle-2">{{ news.date }}</span>
            <span v-if="news.author">Автор: {{ news.author }}</span>
            <a :href="news.link"
               class="text--secondary">оригинал</a>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <p class="text--secondary">{{ news.preview }}</p>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-carousel v-model="slide">
              <v-carousel-item v-for="(item, idx) in news.images"
                               :key="idx"
                               :src="item.url[0]">
              </v-carousel-item>
            </v-carousel>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <p>{{ news.fullText }}</p>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'NewsPage',
  data() {
    return {
      news: {},
      slide: 0,
    };
  },
  mounted() {
    const { id } = this.$route.params;
    this.news = this.getNewById(id);
  },
  computed: {
    ...mapGetters([
      'getNewById',
    ]),
  },
};
</script>

<style scoped>

</style>
