import { defineStore } from "pinia";
import axios from 'axios'

export const useFunds = defineStore('myStore', {
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
                
            } catch(error) {
                this.error = error
              
            } finally {
                this.loading = false
            }
        }
    }
})


