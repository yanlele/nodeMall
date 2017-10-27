<template>
  <div>
    <NavHeader></NavHeader>
    <NavBread>
      <span slot="bread">Goods</span>
    </NavBread>

    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default cur">Default</a>
          <a href="javascript:void(0)" class="price" @click="sortGoods">Price
            <svg class="icon icon-arrow-short">
              <use xlink:href="#icon-arrow-short"></use>
            </svg>
          </a>
          <a href="javascript:void(0)" class="filterby stopPop" @click="showFilterPop">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter" :class="{'filterby-show':filterBy}">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd><a href="javascript:void(0)" :class="{'cur':priceChecked=='all'}"
                     @click="setPriceFilter('all')">All</a>
              </dd>
              <dd v-for="(price,index) in priceFilter">
                <a href="javascript:void(0)" @click="setPriceFilter(index)"
                   :class="{'cur':priceChecked==index}">{{price.startPrice}}
                  - {{price.endPrice}}</a>
              </dd>
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="(item,index) in goodsList">
                  <div class="pic">
                    <a href="#"><img v-lazy="'/static/'+item.productImage" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.productName}}</div>
                    <div class="price">{{item.salePrice}}</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
              <div class="load-more" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy"
                   infinite-scroll-distance="30">
                <img src="./../assets/loading-svg/loading-bubbles.svg" v-show="loading">
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="modal" v-show="overLayFlag" @click="hideFilterPop"></div>


    <NavFooter></NavFooter>
  </div>
</template>

<script>
  import '../assets/css/base.css'
  import '../assets/css/product.css'
  import NavHeader from '@/components/header'
  import NavFooter from '@/components/footer'
  import NavBread from '@/components/NavBread'
  import axios from 'axios'

  export default{

    name: 'GoodsList',

    data(){
      return {
        goodsList: [],
        priceFilter: [
          {
            startPrice: '0.00',
            endPrice: '100.00',
          },
          {
            startPrice: '100.00',
            endPrice: '500.00',
          },
          {
            startPrice: '500.00',
            endPrice: '1000.00',
          },
          {
            startPrice: '1000.00',
            endPrice: '5000.00',
          }
        ],
        priceChecked: 'all',
        filterBy: false,
        overLayFlag: false,
        sortFlag: true,
        busy: true,
        loading: false,

        page: 1,
        pageSize: 8
      }
    },

    components: {
      NavHeader,
      NavFooter,
      NavBread
    },

    mounted(){
      this.getGoodsList();
    },


    methods: {
      getGoodsList(flag){
        let param = {
          page: this.page,
          pageSize: this.pageSize,
          sort: this.sortFlag ? 1 : -1,
          priceLevel: this.priceChecked
        };
        this.loading = true;
        axios.get('/goods', {
          params: param
        }).then((res) => {
          var res = res.data;
          this.loading = false;
          if (res.status === '0') {
            if (flag) {
              this.goodsList = [...this.goodsList, ...res.result.list];
              if (res.result.count === 0) {
                this.busy = true
              } else {
                this.busy = false
              }
            } else {
              this.goodsList = res.result.list;
              this.busy = false;
            }
          } else {
            this.goodsList = [];
          }
        })
      },
      sortGoods(){
        this.sortFlag = !this.sortFlag;
        this.page = 1;
        this.getGoodsList(true);
      },
      setPriceFilter(index){
        this.priceChecked = index;
        console.log(this.priceChecked);
        this.page = 1;
        this.getGoodsList();

        this.hideFilterPop();
      },

      loadMore(){
        this.busy = true;
        setTimeout(() => {
          this.page++;
          this.getGoodsList(true);
        }, 500);
      },
      addCart(productId){
        axios.post('/goods/addCart',{
          productId:productId
        }).then((res)=>{
          if(res.data.status===0){
            alert(res.data.message);
          }else{
            alert(res.data.message);
          }
        })
      },


      showFilterPop(){
        this.filterBy = true;
        this.overLayFlag = true;
      },

      hideFilterPop(){
        this.filterBy = false;
        this.overLayFlag = false;
      },

    }
  }
</script>


<style scoped rel="stylesheet/less" lang="less">
  .modal {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 2;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .5);
  }

  .load-more {
    text-align: center;
  }
</style>
