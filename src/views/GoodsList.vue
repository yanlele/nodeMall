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
            <svg class="icon icon-arrow-short" :class="{'sort-up':!sortFlag}">
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
                    <a href="#"><img v-lazy="'../static/'+item.productImage" alt=""></a>
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

    <modal :mdShow="mdShow" @close="closeModal">
      <p slot="message">
        请先登录，否则无法加入到购物车中！
      </p>
      <div slot="btnGroup">
        <a href="javascript:" class="btn btn--m" @click="mdShow=false">关闭</a>
      </div>
    </modal>


    <modal :mdShow="mdShowCart" @close="closeModal">
      <p slot="message">
        <svg class="icon-status-ok" style="width: 61px;height: 44px;">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
        </svg>
        <span>加入购物车成功</span>
      </p>
      <div slot="btnGroup">
        <a href="javascript:" class="btn btn--m" @click="mdShowCart=false">继续购物</a>
        <router-link href="javascript:" class="btn btn--m" to="/cart">查看购物车</router-link>
      </div>
    </modal>


    <NavFooter></NavFooter>
  </div>
</template>

<script>
  import '../assets/css/base.css'
  import '../assets/css/product.css'
  import NavHeader from '@/components/header'
  import NavFooter from '@/components/footer'
  import NavBread from '@/components/NavBread'
  import Modal from '@/components/Modal'
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
        mdShow: false,
        mdShowCart: false,

        page: 1,
        pageSize: 8
      }
    },

    components: {
      NavHeader,
      NavFooter,
      NavBread,
      Modal
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
        axios.get('/goods/list', {
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
        axios.post('/goods/addCart', {
          productId: productId
        }).then((res) => {
          if (res.data.status === '0') {
            this.mdShowCart=true;
          } else {
            this.mdShow = true;
          }
        })
      },

      //这个方式是弹框叉叉按钮关闭弹窗
      closeModal(){
        this.mdShow = false;
        this.mdShowCart=false;
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

  .sort-up {
    -webkit-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    transform: rotate(180deg);

    -webkit-transition: all .3s;
    -moz-transition: all .3s;
    -ms-transition: all .3s;
    -o-transition: all .3s;
    transition: all .3s;
  }

  .btn:hover {
    background-color: #ffe5e6;
    -webkit-transition: all .3s ease-out;
    -moz-transition: all .3s ease-out;
    -ms-transition: all .3s ease-out;
    -o-transition: all .3s ease-out;
    transition: all .3s ease-out;
  }
</style>
