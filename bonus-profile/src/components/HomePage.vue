<template>
  <div>
  <div class="wrpr">
    <how-it-works></how-it-works>
  </div>
  <Footer></Footer>
  </div>
</template>
<script>
import HowItWorks from "./HowItWorks";
import Footer from "./Footer";

export default {
  name: "HomePage",
  components: {
    HowItWorks,
    Footer
  }
};
</script>
