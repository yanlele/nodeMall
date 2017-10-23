<template>
  <div>
    这个是商品列表页面
    <span>{{$route.params.goodsId}}</span>
  </div>
</template>

<script>
  export default{
    name: 'GoodsList',
    created(){
        console.log(this.$route.params)
    }
  }
</script>


<style scoped rel="stylesheet/less" lang="less">

</style>
