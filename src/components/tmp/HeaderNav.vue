<template>
  <div class="base">
    <div class="tool-bar">
      <div class="logo">
        <RouterLink class="route-link" to="/">
          <div class="title">PING PONG</div>
        </RouterLink>
        <div class="ball" />
      </div>
      <nav class="menu">
        <RouterLink class="route-link" to="/chat">Chat</RouterLink>
        <RouterLink class="route-link" to="/game">Game</RouterLink>
        <RouterLink class="route-link" to="/friend">Friend</RouterLink>
        <!-- <RouterLink class="route-link" :to="'/users/' + userName()">Profile</RouterLink> -->
        <RouterLink class="route-link" to="/users"><slot></slot></RouterLink>
      </nav>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';

const props = defineProps({
  user_id: { type: String, default: undefined },
});

const userName = (): String => {
  const id = props.user_id ? '/' + props.user_id : '';
  return id;
};
</script>

<style scoped>
.base {
  width: 100vw;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 15px;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
}

.tool-bar {
  display: flex;
  flex-direction: row;
  gap: 41px;
  align-items: center;
  /* align-items: flex-end; */
  align-self: stretch;
  justify-content: flex-start;
  flex-shrink: 0;
  position: relative;
  padding: 10px 30px 10px 24px;
  background: var(--base-pink, #e0afa0);
}

.logo {
  flex-shrink: 0;
  width: 387px;
  height: 71px;
  position: relative;
  box-sizing: border-box;

  .title {
    color: var(--base-ivory, #f4f3ee);
    text-align: left;
    font: 900 64px 'Inter', sans-serif;
    position: absolute;
    left: 0px;
    top: 0px;
    width: 516px;
    height: 71.37px;
  }
  .ball {
    background: var(--base-pink, #e0afa0);
    border-radius: 50%;
    width: 53px;
    height: 54.33px;
    position: absolute;
    left: 334px;
    top: -8px;
    padding: -10px 0px 0px 0px;
    box-sizing: border-box;
  }
}

.menu {
  display: flex;
  flex-direction: row;
  gap: 104px;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
  position: relative;

  .route-link {
    color: var(--brown, #463f3a);
    text-align: left;
    font: 700 32px/32px 'Inter', sans-serif;
    position: relativ;
  }
}

a:link {
  text-decoration: none !important;
}
a:visited {
  text-decoration: none !important;
}
a:hover {
  text-decoration: none !important;
}
a:active {
  text-decoration: none !important;
}
</style>
