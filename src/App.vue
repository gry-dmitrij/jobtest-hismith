<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-container>
        <v-row>
          <v-col cols="1">
            <v-btn v-show="$route.path !== '/'"
                   icon
                   class="mr-auto"
                   @click="$router.push('/')">
              <v-icon>mdi-arrow-left-thick</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="10"
                 class="d-flex justify-center align-center">
            <h2 class="mr-auto ml-auto">Лента новостей</h2>
          </v-col>
        </v-row>
      </v-container>

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
