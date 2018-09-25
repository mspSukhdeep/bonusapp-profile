<template>
    <div>
        <div v-display="'desktop'">
            <passbook></passbook>
        </div>
        <div v-display="'mobile'">
            <profile-head></profile-head>
            <sidebar></sidebar>
        </div>
    </div> 
</template>
<script>
import Passbook from './Passbook';
import ProfileHead from "./ProfileHead";
import Sidebar from "./Sidebar";


export default {
  name: "HomePage",
  components: {
      Passbook,
      ProfileHead,
      Sidebar
  },
};
</script>
