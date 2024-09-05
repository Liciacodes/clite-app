import { defineStore } from "pinia";
import axios from 'axios'

export const useMyStore = defineStore('myStore', {
    state: () => ({
        funds: [],
        loading: false,
        error: null
    }),
    actions: {
        async fetchData(){
            this.loading = true
           this.error = null
            try{
                const response = await axios.get('https://dashboard.cowrywise.com/api/v2/funds/public/')
                this.funds = response.data.data
                console.log(response.data)
            } catch(error) {
                this.error = error
                console.log(error)
            } finally {
                this.loading = false
            }
        }
    }
})


