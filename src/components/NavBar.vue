<template>
  <div class="header">
    <div class="header-left">
      <RouterLink to="/"> <h1 class="navLogo">PING PONG</h1></RouterLink>
      <div class="ball" />
      <nav class="navItems">
        <RouterLink v-for="(link, idx) in links" :key="idx" class="navItem" :to="link.to">{{ link.text }}</RouterLink>
      </nav>
    </div>
    <div v-if="!loginStore.isLogin" class="userInfo">
      <p>비로그인</p>
    </div>
    <div v-else class="userInfo" @mouseleave="isUserDropdownMenu = false" @mouseenter="isUserDropdownMenu = true">
      <AvatarItem class="userInfo-img" :avartarUrl="loginStore?.avatarURL" imgSize="55" />
      <p>
        {{ loginStore?.name }}
        <DropdownMenu v-if="isUserDropdownMenu" style="width: 100%">
          <template #dropdown-item>
            <DropdownMenuItem
              text="내 정보"
              @click="
                () => {
                  router.push(`/users/${loginStore?.name}`);
                  isUserDropdownMenu = false;
                }
              "
            />
            <DropdownMenuItem
              text="로그아웃"
              @click="
                () => {
                  loginStore.logout();
                  isUserDropdownMenu = false;
                }
              "
            />
          </template>
        </DropdownMenu>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import AvatarItem from '@/components/common/AvatarItem.vue';
import DropdownMenu from '@/components/dropdown-component/DropdownMenu.vue';
import DropdownMenuItem from '@/components/dropdown-component/DropdownMenuItem.vue';

const isUserDropdownMenu = ref<boolean>(false);
import { useLoginStore } from '@/stores/login.store';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const loginStore = useLoginStore();
const router = useRouter();

const links = [
  {
    to: '/chats',
    text: 'Chats',
  },
  {
    to: '/friends',
    text: 'Friends',
  },
  {
    to: '/matching',
    text: 'Game',
  },
];
</script>

<style scoped>
.header {
  width: 100%;
  height: 90px;
  background-color: #e0afa0;
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: space-between;
  padding: 0px 30px;
}

.header-left {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.navItems {
  display: flex;
  justify-content: space-between;
}

.navItems a {
  font-weight: 900;
  font-size: 32px;
  color: #463f3a;
  margin-right: 30px;
  cursor: pointer;
  text-decoration: none;
}

.navItems a:hover {
  opacity: 0.5;
  transition: 0.1s ease-out;
}

.navLogo {
  color: #f4f3ee;
  font-weight: 900;
  font-size: 64px;
  font-style: italic;
  cursor: pointer;
  margin-right: 50px;
  min-width: max-content;
}

.ball {
  background: var(--base-pink, #e0afa0);
  border-radius: 50%;
  width: 53px;
  height: 54.33px;
  position: absolute;
  left: 370px;
  top: -8px;
  padding: -10px 0px 0px 0px;
  box-sizing: border-box;
}

.userInfo {
  display: flex;
  flex-flow: row;
  align-items: center;
}

.userInfo p {
  position: relative;
  font-weight: 800;
  font-size: 26px;
  color: black;
  color: #463f3a;
  text-decoration: none;
}

.userInfo-img {
  height: 55px;
  width: 55px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 20px;
}

a:link,
a:visited,
a:hover,
a:active {
  text-decoration: none !important;
}
</style>
