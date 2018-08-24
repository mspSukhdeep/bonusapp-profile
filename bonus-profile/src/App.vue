<template>
  <div class="wrpr">
    <profile-head></profile-head>
    <div class="sctn clearfix">
      <sidebar></sidebar>
      <div class="prfl-wrpr">
        <passbook></passbook>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileHead from './components/ProfileHead';
import Sidebar from './components/Sidebar';
import Passbook from './components/Passbook';

export default {
  name: 'app',
  components: {
    ProfileHead,
    Sidebar,
    Passbook,
  },
};
</script>

<style lang="less">
  @import './style/bonus_profile.less';
</style>
