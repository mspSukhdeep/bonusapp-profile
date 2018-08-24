<template>
    
<div class="prfl-sctn">
    <div class="clearfix">
        <div class="prfl-sctn__ttl">Cashback Passbook</div>
        <div class="prfl__fltr-wrpr clearfix">
            <div class="prfl__fltr prfl__fltr--actv">
                ALL
            </div>
            <div class="prfl__fltr">
                CONFIRMED
            </div>
            <div class="prfl__fltr">
                PENDING
            </div>
            <div class="prfl__fltr">
                REDEEMED
            </div>
            <div class="prfl__fltr">
                EXPIRED
            </div>
        </div>
    </div>
    <div class="prfl-tbl">
        <div class="prfl-tbl__hd clearfix">
            <div class="prfl-tbl__date">Transaction Date</div>
            <div class="prfl-tbl__entry">Entry</div>
            <div class="prfl-tbl__cb">Cashback</div>
        </div>
        <div class="prfl-tbl__body">
           
            <div class="prfl-tbl__row clearfix">
                <div class="prfl-tbl__date">05 Jan 2016</div>
                <div class="prfl-tbl__entry"> Amazon order
                    <div class="prfl-tbl__dscrptn">Purchase Amount: <span class="txt--bold">₹4083.00</span></div>
                    <div class="prfl-tbl__dscrptn">Expiry Date: <span class="txt--bold">21 Dec 2019</span></div>
                </div>
                <div class="prfl-tbl__cb txt--grn">₹127</div>
                <div class="prfl-tbl__bns clearfix">
                    <div class="prfl-tbl__date"></div>
                    <div class="prfl-tbl__entry"><span class="bdg--pro">PRO</span>Bonus</div>
                    <div class="prfl-tbl__cb txt--grn">₹127</div>
                </div>
            </div>
            <div class="prfl-tbl__row clearfix">
                <div class="prfl-tbl__date">05 Jan 2016</div>
                <div class="prfl-tbl__entry"> Amazon order
                    <div class="prfl-tbl__dscrptn">Purchase Amount: <span class="txt--bold">₹4083.00</span></div>
                </div>
                <div class="prfl-tbl__cb"><span class="prfl-tbl__cb--pndng">₹43</span></div>
            </div>
            <div class="prfl-tbl__row clearfix">
                <div class="prfl-tbl__date">21 Aug 2018</div>
                <div class="prfl-tbl__entry"> Paytm Cash
                    <div class="prfl-tbl__dscrptn">Amount: <span class="txt--bold">₹250</span></div>
                    <div class="prfl-tbl__sts prfl-tbl__sts--pndng">Processing</div>
                </div>
                <div class="prfl-tbl__cb txt--red">-₹250</div>
            </div>
            <div class="prfl-tbl__row prfl-tbl__row--exprd clearfix">
                <div class="prfl-tbl__date">16 May 2018</div>
                <div class="prfl-tbl__entry"> Cashback Expired
                </div>
                <div class="prfl-tbl__cb txt--red"><span class="txt--red">-₹500</span></div>
            </div>
             <div class="prfl-tbl__row clearfix">
                <div class="prfl-tbl__date">05 Jan 2016</div>
                <div class="prfl-tbl__entry"> Amazon order
                    <div class="prfl-tbl__dscrptn">Purchase Amount: <span class="txt--bold">₹4083.00</span></div>
                    <div class="prfl-tbl__dscrptn">Expiry Date: <span class="txt--bold">21 Dec 2019</span></div>
                </div>
                <div class="prfl-tbl__cb txt--grn">₹127</div>
            </div>
            <div class="prfl-tbl__row prfl-tbl__row--cncld clearfix">
                <div class="prfl-tbl__date">05 Jan 2016</div>
                <div class="prfl-tbl__entry"> Amazon order
                    <div class="prfl-tbl__dscrptn">Purchase Amount: <span class="txt--bold">₹4083.00</span></div>
                    <div class="prfl-tbl__sts prfl-tbl__sts--fld">Order Cancelled</div>
                </div>
                <div class="prfl-tbl__cb txt--strk">₹127</div>
            </div>
             <div class="prfl-tbl__row clearfix">
                <div class="prfl-tbl__date">05 Jan 2016</div>
                <div class="prfl-tbl__entry"> Amazon order
                    <div class="prfl-tbl__dscrptn">Purchase Amount: <span class="txt--bold">₹4083.00</span></div>
                    <div class="prfl-tbl__dscrptn">Expiry Date: <span class="txt--bold">21 Dec 2019</span></div>
                </div>
                <div class="prfl-tbl__cb txt--grn">₹127</div>
            </div>
            <div class="prfl-tbl__row clearfix">
                <div class="prfl-tbl__date">21 Aug 2018</div>
                <div class="prfl-tbl__entry"> Paytm Cash
                    <div class="prfl-tbl__dscrptn">Amount: <span class="txt--bold">₹250</span></div>
                    <div class="prfl-tbl__sts prfl-tbl__sts--fld">Redemption Failed</div>
                </div>
                <div class="prfl-tbl__cb txt--strk">-₹250</div>
            </div>
        </div>
    </div>
</div>    
</template>
<script>
export default {
  name: 'Passbook',
};
</script>
<style lang="less">
@import '../style/bonus_profile.less';
.prfl{
    &__fltr{
        float: left;
        padding: 6px 10px;
        border-radius: 14px;
        transition: .25s ease-in-out;
        border: 1px solid @color-white;
        cursor: pointer;
        &:hover{
            border: 1px solid @fg-color-light;
        }
        &--actv{
            background-color: @color-green;
            color: @color-white;
            border-color: @color-green;
            &:hover{
                border-color: @color-green;    
            }
        }
        & + &{
            margin-left: 20px;
        }
        &-wrpr{
            font-size: @font-size-xs;
            color: @fg-color-light;
            line-height: 15px;
            margin-top: 15px;
        }
    }
    &-tbl {
        clear: both;
        margin-top: 20px;
        &__bns{
            clear: both;
            position: relative;
            top: 18px;
            margin-bottom: 18px;
            .bdg--pro{
                margin-right: 8px;
                top: -1px;
            }
            .prfl-tbl__entry{
                border-top: 1px solid @border-color;
                padding-top: 20px;
            }
            .prfl-tbl__cb{
                border-top: 1px solid @border-color;
                padding-top: 20px;
            }
        }
    &__optn {
      float: left;
      width: 10%;
      height: 20px;
    }
    &__txt {
      &-cncld {
        text-decoration: line-through;
        margin-right: 5px;
        font-size: @font-size-xs;
      }
    }
    &__info {
      font-size: @font-size-xs;
      color: @fg-color-light;
      font-weight: @normal;
      & + & {
        margin-top: 5px;
      }
    }
    &__hd {
      font-size: @font-size-s;
      background-color: @bg-color;
      border-top: 1px solid @border-color;
      border-bottom: 1px solid @border-color;
      padding: 13px;
      font-weight: @bold;
      text-transform: capitalize;
      color: @fg-color-light;
    }
    &__date {
      float: left;
      width: 30%;
      min-height: 1px;
      &--l {
        width: 25%;
      }
    }
    &__issue {
      float: left;
      width: 37.5%;
      &-ttl {
        font-weight: @bold;
        margin-bottom: 5px;
      }
    }
    &__lng-dsc {
      float: left;
      width: 37.5%;
      &--txt {
        line-height: 20px;
        font-size: @font-size-xs;
      }
    }
    &__cb {
      float: left;
      width: 22%;
      padding-right: 5%;
      box-sizing: border-box;
      text-align: right;
      &--sub {
        font-size: @font-size-2xs;
        margin-top: 2px;
      }
      &--pndng{
          .image-2x('https://assets.mspcdn.net/f_auto/bonus_in/icon/wait.png', 15px);
          padding-left: 19px;
          background-position: left center;
          color: @color-grey-2;
      }
    }
    &__entry {
      float: left;
      width: 48%;
      &--l {
        width: 52%;
      }
      &-txt {
        margin-bottom: 5px;
      }
      &-info {
        font-size: @font-size-xs;
        color: @fg-color-light;
      }
    }
    &__clicks {
      float: left;
      width: 17%;
      margin-left: 5%;
    }
    &__exp-date {
      float: left;
      width: 16%;
      margin-right: 2%;
    }
    &__dscrptn {
      color: @fg-color-light;
      font-size: @font-size-xs;
      margin-top: 4px;
    }
    &__sts {
      color: @fg-color-light;
      font-size: @font-size-xs;
      margin-top: 4px;
      &:before {
        content: "";
        width: 8px;
        height: 8px;
        margin: 5px 5px 0 0;
        border-radius: 50%;
        float: left;
      }
      &--pndng {
        &:before {
          background-color: @color-golden;
        }
      }
      &--clsd {
        &:before {
          background-color: @color-green-yellow;
        }
      }
      &--fld {
        &:before {
          background-color: @color-red;
        }
      }
    }
    &__row {
      padding: 20px 13px;
      color: @fg-color;
      text-transform: capitalize;
      min-height: 39px;
      & + &{
          border-top: 1px solid @border-color;
      }
      &--cncld {
          .prfl-tbl__cb{
              color: @color-grey-2;
          }
          > * {
              opacity: .5;
          }
      }
      &--exprd{
          .prfl-tbl__cb{
              color: @color-grey-2;
          }
          > * {
            opacity: .5;
          }
          
          .image-2x('https://assets.mspcdn.net/f_auto/bonus_in/icon/expired-stamp.png', 113px);
            background-position: right 145px center;
      }
    }
  }
}
</style>
