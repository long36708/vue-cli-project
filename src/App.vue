<!--<comment>-->
<!--Author:-->
<!--Name:-->
<!--Email:-->
<!--Github:-->
<!--Date:-->
<!--</comment>-->

<template>
  <nav>
    <router-link to="/">打开devtool</router-link>
    |
    <router-link to="/about">不打开devtool</router-link>
    |
    <router-link to="/finalRegistry">监听垃圾回收</router-link>
    |
    <router-link to="/test-block">测试块中的垃圾回收</router-link>
  </nav>
  <router-view />
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
    };
  },
  created() {
    console.log("应用app");
    // version badge
    console.log(
      `\n\n %c Vue-APlayer ${1.0} %c vue-aplayer.js.org \n`,
      "color: #fff; background:#41b883; padding:5px 0;",
      "color: #fff; background: #35495e; padding:5px 0;"
    );
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
