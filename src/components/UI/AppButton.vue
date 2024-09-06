<template>
    <button type="button" class="btn">
        <slot></slot> 
    </button>
</template>

<style lang="scss" scoped>
.btn {
    padding: 5px 10px;
    color: #4D4F5C;
    font-size: 13px;
    line-height: 20px;
    background-color: transparent;
    border: none;
    cursor: pointer;

    &:hover,
    &:focus {
        color: #3B86FF;
    }
}

.btn-danger {
    color: var(--color-danger);
}
</style>