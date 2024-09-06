<template>
    <input class="search" type="text" placeholder="Search transactions, invoices or help">
</template>

<style lang="scss" scoped>
.search {
    width: 100%;
    padding: 10px 26px 6px;
    color: #4D4F5C;
    font-size: 12px;
    line-height: 20px;
    border: none;
    background: url(../../assets/img/icon_search.png) no-repeat 0 50%;

    &:focus {
        outline: none;
    }
}
</style>
