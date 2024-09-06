<template>
    <div class="sidebar">
        <div class="logo-box">
            <a class="logo" href="#">Impekable</a>
        </div>
        <AppNav/>
    </div>
</template>

<script setup>
import AppNav from '@/components/AppNav.vue'
</script>

<style lang="scss" scoped>
.sidebar {
    width: 260px;
    color: #fff;
    background-color: #43435D;
    box-shadow: 0px 2px 3px #0000000D;
}
.logo-box {
    display: flex;
    align-items: center;
    height: 70px;
    padding: 20px 20px 18px;
    background-color: #3C3B53;
}
.logo {
    color: #fff;
    line-height: 21px;
    font-weight: 700;
    letter-spacing: 3px;
    text-transform: uppercase;
}
</style>
