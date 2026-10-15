<template>
    <div class="input-box">
        <el-input
            v-model="message"
            class="message-input"
            type="textarea"
            :rows="4"
            placeholder="和我聊天吧"
            resize="none"
            @keydown.enter.exact.prevent="sendMessage"
        />
        <div class="input-toolbar">
            <el-tag class="attachment-button" effect="plain" aria-label="添加附件">+</el-tag>
            <el-button class="send-button" aria-label="发送消息" @click="sendMessage">
                <el-icon><Position /></el-icon>
            </el-button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const message = ref('')

const emit = defineEmits(['send'])

const sendMessage = () => {
    const content = message.value.trim()
    if(!content) return
    emit('send', content)
    message.value = ''
}
</script>

<style scoped>
.input-box {
    display: flex;
    width: min(100%, 850px);
    min-height: 184px;
    flex-direction: column;
    justify-content: space-between;
    padding: 18px;
    border: 1px solid #392d4b;
    border-radius: 24px;
    background: #1a1523;
    box-shadow: 0 12px 30px rgb(0 0 0 / 24%);
    box-sizing: border-box;
    transition: border-color 160ms ease, box-shadow 160ms ease;
}

.input-box:focus-within {
    border-color: #7656a0;
    box-shadow: 0 0 0 3px rgb(185 149 255 / 8%), 0 12px 30px rgb(0 0 0 / 24%);
}

.message-input {
    flex: 1;
}

.message-input :deep(.el-textarea__inner) {
    min-height: 90px !important;
    padding: 4px 0;
    border: 0;
    background: transparent;
    box-shadow: none;
    color: #e5d9f8;
    font: inherit;
    line-height: 1.6;
}

.message-input :deep(.el-textarea__inner::placeholder) {
    color: #9f91b5;
}

.input-toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding-top: 12px;
}

.attachment-button {
    display: inline-flex;
    width: 42px;
    height: 42px;
    align-items: center;
    justify-content: center;
    padding: 0;
    border: 1px solid #392d4b;
    border-radius: 50%;
    background: transparent;
    color: #d3bcff;
    cursor: pointer;
    font-size: 22px;
    line-height: 1;
    transition: border-color 160ms ease, background 160ms ease, color 160ms ease;
}

.attachment-button:hover {
    border-color: #7656a0;
    background: #352746;
    color: #e4d5ff;
}

.send-button {
    width: 44px;
    height: 44px;
    padding: 0;
    border: 0;
    border-radius: 50%;
    background: linear-gradient(140deg, #8054c5, #a16de3);
    color: #fff;
    font-size: 18px;
    transition: filter 160ms ease, transform 160ms ease;
}

.send-button:hover,
.send-button:focus-visible {
    border: 0;
    background: linear-gradient(140deg, #8d62d0, #ad7bef);
    color: #fff;
    filter: brightness(1.06);
    transform: translateY(-1px);
}

@media (max-width: 600px) {
    .input-box {
        min-height: 160px;
        padding: 14px;
        border-radius: 20px;
    }
}
</style>