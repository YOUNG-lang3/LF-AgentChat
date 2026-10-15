<template>
  <main class="home-page">
    <SideMenu />
    <div class="composer-container">
      <div class="chat-content" ref="chatContent">
        <div v-for="item in chatsStore.activeChat?.messages ?? []" :key="item.id" class="message"
          :class="`message--${item.role}`">
          {{ item.content }}
        </div>
        <div
          v-if="isLoading && loadingChatId === chatsStore.activeChatId"
          class="message message--assistant message--loading"
          v-loading="true"
          element-loading-background="rgba(58, 57, 65, 0.92)"
        />
      </div>
      <UserInput v-model="currentDraft" @send="handleSend" />
    </div>
  </main>
</template>

<script setup>
import { computed, nextTick, ref, watch } from 'vue';
import SideMenu from '../components/SideMenu.vue';
import UserInput from '../components/UserInput.vue';
import { useChatsStore } from '../store/chats.js';
import { assistantReply } from '../mock/mockchat.js';

const chatsStore = useChatsStore()
const chatContent = ref(null)
const isLoading = ref(false)
const loadingChatId = ref(null)
const currentDraft = computed({
  get: () => chatsStore.userDraft[chatsStore.activeChatId] ?? '',
  set: (text) => {
    let chatId = chatsStore.activeChatId
    if (!chatId) {
      chatId = chatsStore.createChat().id
    }
    chatsStore.setUserDraft(chatId, text)
  },
})

watch(
  [
    () => chatsStore.activeChatId,
    () => chatsStore.activeChat?.messages.length ?? 0
  ],
  async() => {
    await nextTick()
    const element = chatContent.value
    if(!element) return
    element.scrollTo({
      top: element.scrollHeight,
      behavior: 'smooth'
    })
  },
  {flush: 'post'}
)
const handleSend = async (content) => {
  let chat = chatsStore.activeChat
  if (!chat) {
    chat = chatsStore.createChat()
  }

  const chatId = chat.id
  chatsStore.addMessage('user', content, chatId)
  loadingChatId.value = chatId
  isLoading.value = true
  try {
    const reply = await assistantReply(content)
    chatsStore.addMessage('assistant', reply, chatId)
  } finally {
    isLoading.value = false
    loadingChatId.value = null
  }
}
</script>

<style scoped>
.home-page {
  position: relative;
  min-height: 100svh;
  background: #100d18;
  color: #d3bcff;
}

.composer-container {
  position: fixed;
  top: 24px;
  right: 0;
  bottom: 24px;
  left: 240px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 0 32px;
  box-sizing: border-box;
}

.chat-content {
  display: flex;
  width: min(100%, 850px);
  min-height: 0;
  flex: 1;
  flex-direction: column;
  align-items: flex-end;
  gap: 14px;
  overflow-y: auto;
  padding: 20px 8px;
  box-sizing: border-box;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.chat-content::-webkit-scrollbar {
  display: none;
}

.message {
  max-width: min(78%, 680px);
  padding: 12px 16px;
  border: 1px solid #c9a9ff;
  border-radius: 18px 18px 5px 18px;
  background: #e8dcff;
  box-shadow: 0 8px 24px rgb(0 0 0 / 18%);
  color: #30213f;
  font-size: 15px;
  line-height: 1.65;
  overflow-wrap: anywhere;
  white-space: pre-wrap;
}

.message--user {
  align-self: flex-end;
}

.message--assistant {
  align-self: flex-start;
  border-color: #62616a;
  border-radius: 18px 18px 18px 5px;
  background: #3a3941;
  color: #eeeeF2;
}

.message--loading {
  position: relative;
  width: min(78%, 240px);
  min-height: 52px;
  box-sizing: border-box;
}

:deep(.message--loading .el-loading-mask) {
  border-radius: inherit;
}

:deep(.message--loading .el-loading-text) {
  color: #eeeeF2;
}

h1 {
  color: inherit;
  font-size: clamp(24px, 6vw, 30px);
}

@media (max-width: 600px) {
  .composer-container {
    top: 16px;
    bottom: 16px;
    left: 0;
    gap: 12px;
    padding: 0 16px;
  }

  .chat-content {
    padding: 12px 2px;
  }

  .message {
    max-width: 88%;
  }
}
</style>