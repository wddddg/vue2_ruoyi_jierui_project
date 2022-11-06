<template>
  <div style="width=100%;height=100%">
    <iframe
      width="100%"
      height="1000px"
      :src="link"
    >
    </iframe>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: "",
      link: "",
      type:null
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.type =this.$route.query.type;
    if(this.type=='2'){
      this.link="https://tfinereport.jereh.cn/webroot/decision/view/report?viewlet=CMMS%252F360%252Fcustomeradvice.cpt&product_item="+this.id
    }
    else if(this.type=='1'){
      this.link="https://tfinereport.jereh.cn/webroot/decision/view/report?viewlet=CMMS%252F360%252Fdevice.cpt&id="+this.id
    }
    else if(this.type=='3'){
      this.link="https://tfinereport.jereh.cn/webroot/decision/view/report?viewlet=CMMS%252FSD%252Fonsite.cpt&product_item="+this.id
    }
    else if(this.type=='4'){
      this.link="https://tfinereport.jereh.cn/webroot/decision/view/report?viewlet=CMMS%252F360%252Fdevice.cpt&service_code="+this.id
    }
    else if(this.type=='5'){
      this.link="https://tfinereport.jereh.cn/webroot/decision/view/report?viewlet=CMMS%252FSD%252FTraining.cpt&id="+this.id
    }
    else if(this.type=='6'){
      this.link="https://tfinereport.jereh.cn/webroot/decision/view/report?viewlet=CMMS%252FSD%252FTrainingsum.cpt&id="+this.id
    }
    else if(this.type=='7'){
      this.link="https://tfinereport.jereh.cn/webroot/decision/view/report?viewlet=CMMS%252FSD%252FDeliverysum.cpt&product_item="+this.id
    }
    else{
      this.link="https://tfinereport.jereh.cn/webroot/decision/view/report?viewlet=CMMS%252FSD%252FDeliverysums.cpt&product_item="+this.id
    }
  },
};
</script>

<style scoped></style>
