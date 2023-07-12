<template>
  <div class="wrap">
    <h1 class="title">매칭중</h1>
    <div id="spinner"></div>
    <button class="cancelButton">취소</button>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.wrap {
  width: 700px;
  height: 500px;
  background-color: #f4f3ee;
  border-radius: 15px;
  border: 3px solid #463f3a;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border: none;
}
.title {
  font-size: 64px;
  color: #463f3a;
  font-weight: 600;
}

.loadingImg {
  width: 85px;
  height: 85px;
}
.loadingImg svg {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cancelButton {
  width: 100px;
  height: 75px;
  border-radius: 15px;
  background-color: #e0afa0;
  color: #fff;
  border: none;
  font-weight: 600;
  font-size: 24px;
  cursor: pointer;
}

#spinner {
  margin: clac(50% - 25px) auto;
  width: 100px;
  height: 100px;
  border: 7px solid #e0afa0;
  box-sizing: border-box;
  border-top-color: #fff;

  border-radius: 100%;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
</style>
