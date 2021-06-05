<template>
  <div class="app">
    <app-header></app-header>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Header from "./components/Header/Header";
export default {
  name: "App",
  components: {
    "app-header": Header,
  },
  computed: {
    ...mapGetters(["isLogin"]),
  },
  created() {
    this.$axios
      .get("/publickey")
      .then((res) => {
        localStorage.setItem("pubkey", res.data);
      })
      .catch((err) => console.log(err));

    this.$axios
      .get("/user")
      .then((res) => {
        this.$store.dispatch("setCurrentUser", res.data.user);
        this.$store.dispatch("setCurrentLogStatus", true);
        // this.$router.push({ name: "home" });
      })
      .catch((err) => err);
  },
};
</script>

<style lang="less">
* {
  margin: 0;
  padding: 0;
}
.fl {
  float: left !important;
}
.fr {
  float: right !important;
}
a {
  display: block;
  text-decoration: none;
}
</style>
