new Vue({
    el:".container",
    data:{
        limitNum:3,
        addressList:[],
        currentIndex:0,
        shippingMethod:1,
        delFlag:false,
        addFlag:false,
        saveKey:false,
        curAddress:'',
        newAddress:{
            addressId:'',
            userName:'',
            streetName:'',
            postCode:'',
            tel:'',
            isDefault:false
        }
    },
    mounted:function (){
        this.$nextTick(()=>{
            this.getAddressList();
        })
    },
    computed:{
      filterAddress:function(){
          return this.addressList.slice(0,this.limitNum);
      }
    },
    methods:{
        getAddressList:function(){
            this.$http.get("data/address.json").then((response) =>{
                var res = response.data;
                if(res.status=="0"){
                    this.addressList = res.result;
                }
            });
        },
        setDefault:function(addressId){
            this.addressList.forEach((item,index)=>{
                if(item.addressId == addressId){
                    item.isDefault = true;
                }else{
                    item.isDefault = false;
                }
            });
        },
        addConfirm:function(){
            this.addFlag = true;
            this.saveKey = true;
            this.newAddress={};
        },
        addAddress:function(){
            this.addressList.push(JSON.parse(JSON.stringify(this.newAddress)));
            this.limitNum = this.addressList.length;
            this.addFlag = false;
            this.saveKey = true;
            console.log("eeeeeeeeeeee",this.addressList);
        },
        delConfirm:function(item){
          this.delFlag = true;
          this.curAddress = item;
        },
        delAddress:function(){
            var index = this.addressList.indexOf(this.curAddress);
            this.addressList.splice(index,1);
            this.delFlag = false;
        },
        editAddress:function(item){
            this.saveKey = false;
            this.addFlag = true;
            this.newAddress=item;
      }
    }
})
