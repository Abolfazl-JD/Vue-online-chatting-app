<template>
  <div class="new-message">
      <form @submit.prevent="addMessage">
          <div class="sender">
            <input type="text" name="new-message" v-model="newMessage">
            <button @click.prevent="addMessage">
                <span class="material-icons">send</span>
            </button>
          </div>          
          <transition name="toast">
              <p v-if="feedback" class="red-text">{{feedback}}</p>
          </transition>
      </form>
  </div>
</template>

<script>
import db from '@/database/init.js'

export default {
    props : ["name"],
    data(){
        return{
            newMessage : null,
            feedback : null,
        }
    },
    methods : {
        addMessage(){
            if(this.newMessage){
                db.collection('chatroom').add({
                    name : this.name,
                    message : this.newMessage,
                    time : Date.now()
                })
                this.newMessage = null
            }
            else{
                this.feedback = 'You should write your message first'
                setTimeout(() => {
                    this.feedback = null
                }, 5000)
            }
        }
    }
}
</script>

<style scoped>

 input{
    margin-top: 20px !important;
}

.sender{
    display: flex;
    width: 100%;
    flex-direction: row;
    align-content: center;
}

.sender input{
     flex-grow: 14;
     width: auto;
}

.sender button{
    flex-grow: 1;
    height: 52px;
    width: 12px;
    font-size: 14px;
    margin-left: 23px;
    color: #fff;
    margin-top: 14px;
    background: #009688;
    border: 0;
    border-radius: 50px;
    padding: 0;
    cursor: pointer;
}

</style>