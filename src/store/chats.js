import { defineStore } from "pinia";
const STORAGE_KEY = 'chat-history'

function saveChats(store) {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
            conversations: store.conversations,
            activeChatId: store.activeChatId,
            userDraft: store.userDraft
        })
    )
}

export const useChatsStore = defineStore('chats', {
    state: () => {
        const saved = localStorage.getItem(STORAGE_KEY)
        const data = saved ? JSON.parse(saved) : {}
        return {
            conversations: data.conversations ?? [],
            activeChatId: data.activeChatId ?? null,
            userDraft: data.userDraft ?? {}
        }
    },
    getters: {
        activeChat(state) {
            return state.conversations.find(
                (chat) => chat.id === state.activeChatId
            ) ?? null
        }
    },
    actions: {
        createChat() {
            const chat = {
                id: crypto.randomUUID(),
                title: '新对话',
                messages: [],
                createdAt: Date.now(),
                updateAt: Date.now()
            }
            this.conversations.unshift(chat)
            this.activeChatId = chat.id
            saveChats(this)
            return chat
        },
        selectChat(id) {
            if (this.conversations.some((chat) => chat.id === id)) {
                this.activeChatId = id
            }
        },
        addMessage(role, content, chatId = this.activeChatId) {
            const chat = this.conversations.find((item) => item.id === chatId)
            if (!chat) return
            chat.messages.push({
                id: crypto.randomUUID(),
                role,
                content,
                createAt: Date.now()
            })
            chat.updateAt = Date.now()
            if (role === 'user' && chat.title === '新对话') {
                chat.title = content.slice(0, 30)
            }
            saveChats(this)
        },
        renameChat(id, title) {
            const chat = this.conversations.find((item) => item.id === id)
            const newTitle = title.trim()
            if (!chat || !newTitle) return
            chat.title = newTitle
            chat.updateAt = Date.now()
            saveChats(this)
        },
        deleteChat(id) {
            const index = this.conversations.findIndex((chat) => chat.id === id)
            if (index === -1) return
            this.conversations.splice(index, 1)
            if (this.activeChatId === id) {
                this.activeChatId = this.conversations[0]?.id ?? null
            }
            saveChats(this)
        },
        mockReply(){
            const chat = this.activeChat
            setTimeout(() => {
                chat.messages.push({
                    id: crypto.randomUUID(),
                    role: 'assistant',
                    content: '我收到了消息',
                    createAt: Date.now()
                })
            }, 800);
        },
        setUserDraft(chatId, text) {
            if(!chatId) return
            this.userDraft[chatId] = text
            saveChats(this)          
        }
    }
})