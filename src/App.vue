<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
      class="d-flex"
    >
      <v-btn v-show="$route.path !== '/'"
             icon
             class="mr-auto"
             @click="$router.push('/')">
        <v-icon>mdi-arrow-left-thick</v-icon>
      </v-btn>
      <h1 class="mr-auto ml-auto">Лента новостей</h1>
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
