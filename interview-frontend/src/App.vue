<template>
  <div class="app">
    <app-header></app-header>
    <router-view class="main-view"></router-view>
    <app-footer></app-footer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
export default {
  name: "App",
  components: {
    "app-header": Header,
    "app-footer": Footer,
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

.main-view {
  max-width: 95vw;
  min-height: 80vh;
  margin: 10px auto;
}
</style>
