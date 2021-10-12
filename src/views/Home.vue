<template>
  <v-container>
    <news-list />
  </v-container>
</template>

<script>
import NewsList from '../components/NewsList.vue';

export default {
  name: 'Home',
  components: {
    NewsList,
  },
};
</script>
