<template>
  <div class="page">
      <div style="width:100px;height:100px;background-color:red" @click.self="show('i am div')">
          <button @click.once="show('i am button')">hh</button>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  components: {

  },
  methods: {
      show(msg){
          alert(msg);
      }
  },
}
</script>

<style scoped lang="less">
</style>
