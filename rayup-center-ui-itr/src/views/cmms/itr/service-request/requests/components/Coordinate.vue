<template>
    <el-dialog
        v-dialogDrag 
        title="选择地点"
        :visible="visible"
        width="800px"
        :before-close="handleClose"
    >
        <el-descriptions>
            <el-descriptions-item label="经度">
                {{ lng }}
            </el-descriptions-item>
            <el-descriptions-item label="纬度">
                {{ lat }}
            </el-descriptions-item>
            <el-descriptions-item label="地址">
                {{ address }}
            </el-descriptions-item>
        </el-descriptions>
        <div id="container" style="winth: 100%; height: 400px"></div>
        <div slot="footer">
            <el-button type="primary" @click="handleSubmit">确定</el-button>
            <el-button @click="handleClose">关闭</el-button>
        </div>

    </el-dialog>
</template>

<script>
// import TMap from 'TMap';
export default {
    name: "Coordinate",
    props: {


    },
    data() {
        return {
            lat:  35.580914,
            lng: 104.610564,
            address:"",
            visible:false,
            map: {},
            markerLayer: {}
        }
    },
    mounted() {},
    methods: {
        edit(){
            this.visible = true;
            this.initMap();
        },
        initMap() {
            this.$nextTick(() => {
                this.map = new TMap.Map(document.getElementById('container'), {
                    center: new TMap.LatLng(this.lat, this.lng), //设置地图中心点坐标
                    zoom: 12 //设置地图缩放级别
                    // pitch: 43.5, //设置俯仰角
                    // rotation: 45 //设置地图旋转角度
                })
                this.markerLayer = new TMap.MultiMarker({
                    id: 'marker-layer',
                    map: this.map
                })
                this.markerLayer.add({
                    position: new TMap.LatLng(this.lat, this.lng)
                })



                //监听点击事件添加marker
                this.map.on('click', (evt) => {
                    if (this.markerLayer.setMap) {
                        this.markerLayer.setMap(null)
                        this.markerLayer = null
                    }
                    this.markerLayer = new TMap.MultiMarker({
                        id: 'marker-layer',
                        map: this.map
                    })
                    this.markerLayer.add({
                        position: evt.latLng
                    })

                    this.lat = evt.latLng.lat;
                    this.lng = evt.latLng.lng;
                    this.getAreaCode();
                })
            })
        },
        getAreaCode() {
            //这里可以直接this.$jsonp地址传入你的经纬度;
            this.$jsonp("https://apis.map.qq.com/ws/geocoder/v1/?", {
                location: `${this.lat},${this.lng}`, // 经纬度
                key: "3F3BZ-NTAK4-KYKUJ-XQ6NZ-KFFAF-INBZM", //这里就是要开启那个service不然会报错让你开启
                output: "jsonp", // output必须jsonp   不然会超时
            }).then((res) => {
            //获取到的res 就是继续的地址的所有信息;
                this.address = res.result.address;
            });
        },
        async handleSubmit() {
            this.$emit("changePosition", {address: this.address, lat:this.lat,lng:this.lng})
            this.handleClose()
        },
        handleClose() {

            if (this.map.destroy) this.map.destroy()
            this.visible = false;
        }
    }
}
</script>
