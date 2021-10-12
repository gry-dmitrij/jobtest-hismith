<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      class="d-flex justify-center"
    >
      <h1>Лента новостей</h1>
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>
