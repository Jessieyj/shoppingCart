
new Vue({
    el:"#app",
    data:{
        totalMoney:0,
        productList:[],
        checkAllFlag:false,
        delFlag:false,
        totalFlag:false,
        curProduct:'',
        payHref:''
    },
    filters:{
        foramtMoney: function (value) {
            return "￥" + value.toFixed(2);
        }
    },
    mounted:function () {
        this.$nextTick(function () {
            this.cartView();
        })
    },
    methods:{
        cartView:function () {
            var _this = this;
            //vue-resource插件的get方法，但它是promise结构的，所以用then方法进行回调
            this.$http.get("data/cartData.json").then(function (res) {
                //console.log("res:",res);
                _this.productList = res.body.result.list;
            })
        },
        changeMoney:function (product,way) {
            if(way>0){
                product.productQuantity++;
            }else{
                product.productQuantity--;
                if(product.productQuantity<1){
                    product.productQuantity=1;
                }
            }
            this.calcTotalPrice();
        },
        selectedProduct:function(item){
            if(typeof item.checked == "undefined"){
                Vue.set(item,"checked",true);      //全局注册
                //this.$set(item,"checked",true);  //局部注册，一般局部变量都通过$来实现
            }else{
                item.checked = !item.checked;
            }
            this.calcTotalPrice();
        },
        checkAll:function(flag){
            this.checkAllFlag = flag;
            var _this = this;
            this.productList.forEach(function (item,index) {
                if (_this.checkAllFlag) {
                    if (typeof item.checked == "undefined") {
                        _this.$set(item, "checked", _this.checkAllFlag);
                    } else {
                        item.checked = _this.checkAllFlag;
                    }
                } else {
                    _this.$set(item, "checked", _this.checkAllFlag);
                }
            });
            this.calcTotalPrice();
        },
        calcTotalPrice:function () {
            var _this = this;
            _this.totalMoney = 0;
            this.productList.forEach(function (item,index) {
                if(item.checked){
                    _this.totalMoney += item.productPrice*item.productQuantity;
                }
            })
          this.showPay(_this.totalMoney);
        },
        delConfirm:function (item) {
            this.delFlag = true;
            this.curProduct = item;

        },
        delProduct:function () {
            var index = this.productList.indexOf(this.curProduct);
            this.productList.splice(index,1);
            this.delFlag = false;
            this.calcTotalPrice();
        },
        showPay:function (totalMoney) {
                if(this.totalMoney==0){
                    this.totalFlag = false;
                }else{
                    this.totalFlag = true;
                }
        }
    }
});

