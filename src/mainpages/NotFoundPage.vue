<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
  <main class="not-found-page">
    <section class="not-found-content" aria-labelledby="not-found-title">
      <p class="error-code">404</p>
      <h1 id="not-found-title">页面走丢了</h1>
      <p class="description">你访问的页面不存在，或已被移至其他位置。</p>
      <el-button class="back-button" type="primary" size="large" @click="router.push('/login')">
        返回登录
      </el-button>
    </section>
  </main>
</template>

<style scoped>
.not-found-page {
  --purple: #b995ff;
  position: relative;
  display: grid;
  min-height: 100svh;
  place-items: center;
  overflow: hidden;
  padding: 32px 24px;
  box-sizing: border-box;
  background:
    radial-gradient(ellipse at 50% 42%, rgb(87 49 139 / 20%), transparent 48%),
    #100d18;
  color: var(--purple);
}

.not-found-page::before,
.not-found-page::after {
  position: absolute;
  width: 360px;
  height: 360px;
  border: 1px solid rgb(185 149 255 / 8%);
  border-radius: 50%;
  content: '';
  pointer-events: none;
}

.not-found-page::before {
  top: -220px;
  left: -180px;
}

.not-found-page::after {
  right: -220px;
  bottom: -240px;
  width: 480px;
  height: 480px;
}

.not-found-content {
  z-index: 1;
  width: min(100%, 480px);
  text-align: center;
}

.error-code {
  margin: 0;
  color: #c5a5ff;
  font-size: clamp(104px, 25vw, 160px);
  font-weight: 750;
  letter-spacing: -8px;
  line-height: 1;
  text-shadow: 0 0 48px rgb(163 112 230 / 28%);
}

h1 {
  margin: 22px 0 10px;
  color: #d3bcff;
  font-size: clamp(24px, 6vw, 30px);
  font-weight: 650;
  letter-spacing: 1px;
}

.description {
  margin: 0 0 28px;
  color: #9f91b5;
  font-size: 14px;
  line-height: 1.7;
}

.back-button {
  min-width: 144px;
  min-height: 46px;
  border: 0;
  border-radius: 10px;
  background: linear-gradient(100deg, #8054c5, #a16de3);
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 1px;
  transition: filter 160ms ease, transform 160ms ease;
}

.back-button:hover {
  border: 0;
  background: linear-gradient(100deg, #8d62d0, #ad7bef);
  color: #fff;
  filter: brightness(1.06);
  transform: translateY(-1px);
}
</style>