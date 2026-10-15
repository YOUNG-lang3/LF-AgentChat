<template>
    <aside class="side-menu">
        <span class="brand">LF</span>
        <el-button class="btnNewChat" @click="chatsStore.createChat()">开启新对话</el-button>
        <el-menu class="chats-menu">
            <el-menu-item v-for="(item, index) in conversations" :key="item.id" @click="chatsStore.selectChat(item.id)">
                <div class="chat-row">
                    <span class="chat-title">{{ item.title }}</span>
                    <div class="chat-actions">
                        <el-dropdown trigger="click" placement="bottom-end" popper-class="chat-dropdown-popper"
                            @command="(command) => handleCommand(command, item.id)">
                            <el-button class="more-button">
                                ...
                            </el-button>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item command="rename">重命名</el-dropdown-item>
                                    <el-dropdown-item command="delete" divided>删除</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </div>
                </div>
            </el-menu-item>
        </el-menu>

        <div class="avatar-box">
            <el-dropdown trigger="click" placement="top-end" popper-class="avatar-dropdown-popper"
                @command="(command) => handleLogout(command)">
                <el-button class="avatar-trigger">
                    <el-avatar class="user-avatar">LF</el-avatar>
                    <span class="avatar-label">个人中心</span>
                    <span class="avatar-arrow" aria-hidden="true">⌃</span>
                </el-button>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </aside>
</template>

<script setup>
import router from '../router';
import { useChatsStore } from '../store/chats';
import { ElMessageBox } from 'element-plus';

const chatsStore = useChatsStore()
const conversations = chatsStore.$state.conversations

const handleCommand = (command, chatId) => {
    if (command === 'rename') {
        chat_rename(chatId)
    } else if (command === 'delete') {
        chatsStore.deleteChat(chatId)
    }
}

const chat_rename = async (chatId) => {
    const chat = conversations.find((item) => item.id === chatId)
    if (!chat) return
    const { value } = await ElMessageBox.prompt(
        '请输入新的对话名称',
        '重命名对话',
        {
            inputValue: chat.title,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            customClass: 'chat-rename-message-box',
            confirmButtonClass: 'chat-rename-confirm-button',
            cancelButtonClass: 'chat-rename-cancel-button',
            inputValidator: (value) =>
                Boolean(value.trim()) || '名称不能为空',
        },
    )
    chatsStore.renameChat(chatId, value)
}

const handleLogout = (command) => {
    if(command === 'logout') {
        router.push('/')
    }
}

</script>

<style scoped>
.side-menu {
    --el-menu-bg-color: transparent;
    --el-menu-text-color: #b8a9d0;
    --el-menu-hover-bg-color: #211a2d;
    --el-menu-active-color: #d3bcff;
    --el-menu-border-color: transparent;

    position: fixed;
    inset: 0 auto 0 0;
    z-index: 2;
    display: flex;
    width: 240px;
    flex-direction: column;
    gap: 16px;
    overflow: hidden auto;
    padding: 18px 12px 20px;
    border-right: 1px solid #2b2336;
    background: #100d18;
    color: #d3bcff;
    box-sizing: border-box;
    scrollbar-width: none;
    -ms-overflow-style: none;
}

.side-menu::-webkit-scrollbar {
    display: none;
}

.brand {
    display: flex;
    min-height: 26px;
    align-items: center;
    padding: 0 8px;
    color: #d3bcff;
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 1px;
}

.btnNewChat {
    width: 100%;
    min-height: 40px;
    justify-content: flex-start;
    margin: 0;
    border: 1px solid #392d4b;
    border-radius: 10px;
    background: #1a1523;
    color: #d3bcff;
    font-size: 14px;
}

.btnNewChat:hover,
.btnNewChat:focus-visible {
    border-color: #7656a0;
    background: #241b31;
    color: #e4d5ff;
}

.chats-menu {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;
}

.chats-menu::-webkit-scrollbar {
    display: none;
}

.chats-menu :deep(.el-menu-item) {
    height: 40px;
    margin: 2px 0;
    padding: 0 12px;
    border-radius: 8px;
    font-size: 14px;
}

.chats-menu :deep(.el-menu-item:hover) {
    color: #e4d5ff;
}

.chat-row {
    display: flex;
    width: 100%;
    min-width: 0;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
}

.chat-title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.chat-actions {
    display: flex;
    flex: none;
    align-items: center;
    margin-left: auto;
    opacity: 0;
    pointer-events: none;
}

.el-menu-item:hover .chat-actions,
.el-menu-item:focus-within .chat-actions {
    opacity: 1;
    pointer-events: auto;
}

.chat-actions :deep(.more-button) {
    width: 30px;
    height: 30px;
    padding: 0;
    border: 0;
    border-radius: 7px;
    background: transparent;
    color: #b995ff;
    font-size: 18px;
    line-height: 1;
}

.chat-actions :deep(.more-button:hover),
.chat-actions :deep(.more-button:focus-visible) {
    background: #352746;
    color: #e4d5ff;
}

:global(.chat-dropdown-popper.el-popper) {
    min-width: 132px;
    padding: 5px;
    border: 1px solid #392d4b;
    border-radius: 10px;
    background: #1a1523;
    box-shadow: 0 10px 28px rgb(0 0 0 / 35%);
}

:global(.chat-dropdown-popper.el-popper .el-popper__arrow::before) {
    border: 1px solid #392d4b;
    background: #1a1523;
}

:global(.chat-dropdown-popper .el-dropdown-menu) {
    padding: 0;
    background: transparent;
}

:global(.chat-dropdown-popper .el-dropdown-menu__item) {
    min-height: 36px;
    border-radius: 6px;
    color: #d3bcff;
    font-size: 13px;
}

:global(.chat-dropdown-popper .el-dropdown-menu__item:not(.is-disabled):hover),
:global(.chat-dropdown-popper .el-dropdown-menu__item:not(.is-disabled):focus) {
    background: #352746;
    color: #e4d5ff;
}

:global(.chat-dropdown-popper .el-dropdown-menu__item--divided) {
    border-top-color: #392d4b;
}

:global(.chat-dropdown-popper .el-dropdown-menu__item--divided::before) {
    background: transparent;
}

:global(.el-message-box.chat-rename-message-box) {
    --el-messagebox-title-color: #d3bcff;
    --el-messagebox-content-color: #b8a9d0;
    --el-messagebox-bg-color: #1a1523;
    width: min(420px, calc(100vw - 32px));
    border: 1px solid #392d4b;
    border-radius: 14px;
    background: #1a1523;
    box-shadow: 0 18px 48px rgb(0 0 0 / 45%);
}

:global(.chat-rename-message-box .el-message-box__header) {
    padding: 22px 22px 10px;
}

:global(.chat-rename-message-box .el-message-box__title) {
    color: #d3bcff;
    font-size: 16px;
    font-weight: 600;
}

:global(.chat-rename-message-box .el-message-box__headerbtn) {
    color: #9f91b5;
}

:global(.chat-rename-message-box .el-message-box__headerbtn:hover) {
    color: #e4d5ff;
}

:global(.chat-rename-message-box .el-message-box__content) {
    padding: 10px 22px 4px;
    color: #b8a9d0;
}

:global(.chat-rename-message-box .el-message-box__input .el-input__wrapper) {
    border: 1px solid #392d4b;
    border-radius: 9px;
    background: #100d18;
    box-shadow: none;
}

:global(.chat-rename-message-box .el-message-box__input .el-input__wrapper.is-focus) {
    border-color: #9470cc;
    box-shadow: 0 0 0 3px rgb(185 149 255 / 10%);
}

:global(.chat-rename-message-box .el-message-box__input .el-input__inner) {
    color: #e5d9f8;
}

:global(.chat-rename-message-box .el-message-box__input .el-input__inner::placeholder) {
    color: #746a80;
}

:global(.chat-rename-message-box .el-message-box__btns) {
    padding: 18px 22px 20px;
}

:global(.chat-rename-cancel-button) {
    border: 1px solid #392d4b;
    border-radius: 8px;
    background: #241b31;
    color: #d3bcff;
}

:global(.chat-rename-cancel-button:hover) {
    border-color: #7656a0;
    background: #352746;
    color: #e4d5ff;
}

:global(.chat-rename-confirm-button) {
    border: 0;
    border-radius: 8px;
    background: linear-gradient(100deg, #8054c5, #a16de3);
    color: #fff;
}

:global(.chat-rename-confirm-button:hover) {
    border: 0;
    background: linear-gradient(100deg, #8d62d0, #ad7bef);
    color: #fff;
}

.avatar-box {
    flex: none;
    padding-top: 12px;
    border-top: 1px solid #2b2336;
}

.avatar-box :deep(.el-dropdown) {
    display: block;
    width: 100%;
}

.avatar-box :deep(.avatar-trigger) {
    display: flex;
    width: 100%;
    height: 52px;
    align-items: center;
    gap: 10px;
    padding: 0 10px;
    border: 1px solid transparent;
    border-radius: 10px;
    background: transparent;
    color: #d3bcff;
}

.avatar-box :deep(.avatar-trigger:hover),
.avatar-box :deep(.avatar-trigger:focus-visible) {
    border-color: #392d4b;
    background: #1a1523;
    color: #e4d5ff;
}

.avatar-box :deep(.user-avatar) {
    flex: none;
    background: linear-gradient(140deg, #8054c5, #a16de3);
    color: #fff;
    font-size: 13px;
    font-weight: 600;
}

.avatar-label {
    overflow: hidden;
    flex: 1;
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 13px;
}

.avatar-arrow {
    color: #9f91b5;
    font-size: 16px;
}

:global(.avatar-dropdown-popper.el-popper) {
    min-width: 180px;
    padding: 5px;
    border: 1px solid #392d4b;
    border-radius: 10px;
    background: #1a1523;
    box-shadow: 0 10px 28px rgb(0 0 0 / 35%);
}

:global(.avatar-dropdown-popper.el-popper .el-popper__arrow::before) {
    border: 1px solid #392d4b;
    background: #1a1523;
}

:global(.avatar-dropdown-popper .el-dropdown-menu) {
    padding: 0;
    background: transparent;
}

:global(.avatar-dropdown-popper .el-dropdown-menu__item) {
    min-height: 38px;
    border-radius: 6px;
    color: #d3bcff;
    font-size: 13px;
}

:global(.avatar-dropdown-popper .el-dropdown-menu__item:not(.is-disabled):hover),
:global(.avatar-dropdown-popper .el-dropdown-menu__item:not(.is-disabled):focus) {
    background: #352746;
    color: #e4d5ff;
}
</style>