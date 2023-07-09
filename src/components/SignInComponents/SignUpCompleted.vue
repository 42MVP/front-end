<script setup lang="ts">
import { ref } from 'vue';
</script>

<template>
  <div class="message">
    <h1>Thank you for signing up!</h1>
    <h3>Log in and enjoy the fun our PINGPONG game</h3>
    <RouterLink class="redirect" to="/signIn">Back to SignIn!</RouterLink>
  </div>
</template>

<style scoped>
.message {
  display: flex;
  flex-flow: column;
  margin-left: 60px;
  color: var(--brown, #463f3a);
  align-items: center;
}

.message h1 {
  font-size: 40px;
  font-style: normal;
  font-weight: 700;
  line-height: 56px;
  letter-spacing: -0.88px;
}
.message h3 {
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 32px;
  letter-spacing: -0.456px;
}
.redirect {
  color: #463f3a;
  font-size: 24px;
  font-style: normal;
  font-weight: 500;
  line-height: 32px;
  font-style: italic;
}
</style>
