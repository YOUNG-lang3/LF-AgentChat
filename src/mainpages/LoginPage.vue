<template>
  <main class="login-page">
    <a
      class="github-link"
      href="https://github.com/YOUNG-lang3"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="在新窗口打开 GitHub"
    >
      GitHub
      <span aria-hidden="true">↗</span>
    </a>

    <section class="login-card" aria-labelledby="login-title">
      <h1 id="login-title">智能问答机器人</h1>

      <el-form class="login-form" @submit.prevent="login()">
        <el-input
          v-model="username"
          size="large"
          placeholder="请输入用户名"
          aria-label="用户名"
          autocomplete="username"
        />
        <el-input
          v-model="password"
          size="large"
          type="password"
          placeholder="请输入密码"
          aria-label="密码"
          autocomplete="current-password"
          show-password
        />
        <el-button class="login-button" type="primary" size="large" native-type="submit">
          进入
        </el-button>
      </el-form>
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore, USERNAME, PASSWORD } from '../store/auth.js'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const username = ref('')
const password = ref('')
const router = useRouter()

const login = () => {
  authStore.authLogin(username.value, password.value)
  router.push('/home')
}

</script>

<style scoped>
.login-page {
  --purple: #b995ff;
  --purple-bright: #c9a9ff;
  position: relative;
  display: grid;
  min-height: 100svh;
  place-items: center;
  overflow: hidden;
  padding: 80px 24px 32px;
  box-sizing: border-box;
  background:
    radial-gradient(ellipse at 50% 42%, rgb(87 49 139 / 20%), transparent 48%),
    #100d18;
  color: var(--purple);
}

.login-page::before,
.login-page::after {
  position: absolute;
  width: 360px;
  height: 360px;
  border: 1px solid rgb(185 149 255 / 8%);
  border-radius: 50%;
  content: '';
  pointer-events: none;
}

.login-page::before {
  top: -220px;
  left: -180px;
}

.login-page::after {
  right: -220px;
  bottom: -240px;
  width: 480px;
  height: 480px;
}

.github-link {
  position: absolute;
  top: 28px;
  right: 36px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--purple);
  font-size: 14px;
  text-decoration: none;
  transition: color 160ms ease;
}

.github-link:hover {
  color: #fff;
}

.github-link span {
  font-size: 16px;
}

.login-card {
  z-index: 1;
  width: min(100%, 420px);
  padding: 40px;
  text-align: center;
  box-sizing: border-box;
}

h1 {
  margin: 0;
  color: #d3bcff;
  font-size: clamp(24px, 6vw, 30px);
  font-weight: 650;
  letter-spacing: 1px;
  margin-bottom: 28px;
}

.login-form {
  display: grid;
  gap: 16px;
}

.login-form :deep(.el-input__wrapper) {
  min-height: 48px;
  padding: 0 16px;
  border: 1px solid #393047;
  border-radius: 10px;
  background: #171320;
  box-shadow: none;
  transition: border-color 160ms ease, box-shadow 160ms ease;
}

.login-form :deep(.el-input__wrapper:hover),
.login-form :deep(.el-input__wrapper.is-focus) {
  border-color: #9470cc;
  box-shadow: 0 0 0 3px rgb(185 149 255 / 10%);
}

.login-form :deep(.el-input__inner) {
  color: #e5d9f8;
}

.login-form :deep(.el-input__inner::placeholder) {
  color: #746a80;
}

.login-form :deep(.el-input__suffix) {
  color: #9e88bc;
}

.login-button {
  width: 100%;
  min-height: 48px;
  margin-top: 6px;
  border: 0;
  border-radius: 10px;
  background: linear-gradient(100deg, #8054c5, #a16de3);
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 2px;
  transition: filter 160ms ease, transform 160ms ease;
}

.login-button:hover {
  background: linear-gradient(100deg, #8d62d0, #ad7bef);
  color: #fff;
  filter: brightness(1.06);
  transform: translateY(-1px);
}

@media (max-width: 480px) {
  .github-link {
    top: 20px;
    right: 22px;
  }

  .login-card {
    padding: 32px 24px;
  }
}
</style>