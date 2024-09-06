<template>
    <div class="header">
        <AppSearch />
        <div>
            <ul class="header-nav">
                <li>
                    <a class="header-nav__link" href="#">
                        <IconHelpCenter />
                    </a>
                </li>
                <li>
                    <a class="header-nav__link" href="#">
                        <IconChat />
                    </a>
                </li>
                <li>
                    <a class="header-nav__link" href="#">
                        <IconNotification />
                        <span class="header-nav__indicator"></span>
                    </a>
                </li>
            </ul>
        </div>
        <div class="user-nav">
            <span class="username">John Doe</span>
            <AppButton type="button">
                <IconChevronDown />
            </AppButton>
            <div class="avatar">
                <img class="avatar-img" src="../assets/img/avatar.png" alt="">
            </div>
        </div>
    </div>
</template>

<script setup>
import IconChat from '@/components/UI/icons/IconChat.vue';
import IconHelpCenter from '@/components/UI/icons/IconHelpCenter.vue';
import IconNotification from '@/components/UI/icons/IconNotification.vue';
import IconChevronDown from '@/components/UI/icons/IconChevronDown.vue';
</script>

<style lang="scss" scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    font-size: 13px;
    line-height: 20px;
    padding: 10px 20px;
    background-color: #fff;
    box-shadow: 0px 2px 6px #0000000A;
}

.header-nav {
    display: flex;
    gap: 32px;
    list-style: none;
    color: #BCBCCB;
}

.user-nav {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    gap: 12px;
    margin-left: 10px;
    padding-left: 6px;

    &:before {
        content: '';
        width: 1px;
        height: 28px;
        background-color: #EBEBF2;
    }
}

.header-nav__link {
    position: relative;
    color: #BCBCCB;
}

.header-nav__indicator {
    position: absolute;
    top: -7px;
    right: -4px;
    width: 12px;
    height: 12px;
    background-color: var(--orange);
    border: 2px solid #FFFFFF;
    border-radius: 50%;
}

.avatar {
    width: 38px;
    height: 38px;
    overflow: hidden;
    border-radius: 50%;
}

.avatar-img {
    object-fit: cover;
}
</style>