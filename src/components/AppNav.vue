<template>
    <nav>
        <ul class="nav">
            <li class="nav-item">
                <a class="nav-link" href="#">
                    <span class="nav-icon">
                        <IconHome />
                    </span>
                    Home
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">
                    <span class="nav-icon">
                        <IconHome />
                    </span>
                    Dashboard
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">
                    <span class="nav-icon">
                        <IconInbox />
                    </span>
                    Inbox
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">
                    <span class="nav-icon">
                        <IconHome />
                    </span>
                    Products
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">
                    <span class="nav-icon">
                        <IconInvoices />
                    </span>
                    Invoices
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">
                    <span class="nav-icon">
                        <IconPerson />
                    </span>
                    Customers
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">
                    <span class="nav-icon">
                        <IconChatRightFill />
                    </span>
                    Chat Room
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link nav-link_active" href="#">
                    <span class="nav-icon">
                        <IconCalendar />
                    </span>
                    Calendar
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">
                    <span class="nav-icon">
                        <IconHelpCenter />
                    </span>
                    Help Center
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">
                    <span class="nav-icon">
                        <IconSettings />
                    </span>
                    Settings
                </a>
            </li>
        </ul>
    </nav>
</template>

<script setup>
import IconHome from '@/components/UI/icons/IconHome.vue';
import IconInbox from '@/components/UI/icons/IconInbox.vue';
import IconInvoices from '@/components/UI/icons/IconInvoices.vue';
import IconPerson from '@/components/UI/icons/IconPerson.vue';
import IconChatRightFill from '@/components/UI/icons/IconChatRightFill.vue';
import IconCalendar from '@/components/UI/icons/IconCalendar.vue';
import IconHelpCenter from '@/components/UI/icons/IconHelpCenter.vue';
import IconSettings from '@/components/UI/icons/IconSettings.vue';
</script>

<style lang="scss" scoped>
.nav {
    list-style: none;
    padding: 4px 0 0;
}

.nav-item {
    margin-bottom: 6px;
}

.nav-link {
    display: flex;
    gap: 11px;
    color: #fff;
    padding: 17px 20px;
    border-left: 5px solid transparent;
    transition: all .3s;

    &:hover {
        border-color: #A3A0FB;
        background: #3C3B54;

        .nav-icon {
            fill: #A3A0FB;
        }
    }
}

.nav-icon {
    color: #A5A4BF;
}

.nav-link_active {
    border-color: #A3A0FB;
    background: #3C3B54;

    .nav-icon {
        fill: #A3A0FB;
    }
}
</style>