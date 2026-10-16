import { defineStore } from "pinia";

export const USERNAME = 'test'
export const PASSWORD = '123456'

export const useAuthStore = defineStore('auth', {
    state: () => {
        return {
            users: [],
            currentUser: null
        }
    },
    actions: {
        authLogin(username_, password_) {
            const username = username_.trim()
            const password = password_.trim() 
            if(!username || !password) {
                throw new Error('用户名或密码为空')
            }
            // const user = {
            //     username: username_,
            //     uid: crypto.randomUUID(),
            //     createAt: Date.now()
            // }
            // this.users.unshift(user)
            // this.currentUser = user
            if((username != USERNAME) || (password != PASSWORD)) {
                throw new Error('用户名或密码错误')
            }
            return 
        },
        authLogout() {
            this.currentUser = null
        }
    }
})