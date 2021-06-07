<template>
  <div class="welcome container">
    <div class="card">
      <div class="card-content center-align">
          <h2 class="teal-text">Welcome</h2>
          <form @submit.prevent="enterChat">
            <label for="name">Enter your name :</label>
            <input type="text" name="name" v-model="name">
            <transition-group name="toast">
              <p v-show="feedback" class="red-text mt-3" key="1">{{feedback}}</p>
              <button class="btn teal" key="2">Enter chat</button>
            </transition-group>
          </form>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export default {
  name: 'welcome',
  
  setup(){
    const name = ref(null)
    const feedback = ref(null)
    const router = useRouter()
    const route = useRoute()

    const enterChat = (() => {
      if(name.value){
        router.push({name : "chatroom", params : {name : name.value}})
      }
      else{
        feedback.value = "You must enter a name"
        setTimeout(() => {
          feedback.value = null
        }, 3000)
      }
    })

    return {name, feedback, enterChat}
  },
}
</script>

<style>
.welcome{
  max-width: 400px;
  margin-top: 100px;
}

.welcome h2{
  font-size: 3em;
}

.welcome button{
  margin: 30px auto;
}

.welcome .card-content{
  height: 326px;
}


.toast-enter-active{
  animation: wobble 0.5s ease;
  position: relative;
  right: 500px;
}

 .toast-leave-from,
 .toast-enter-to{
  opacity: 1;
  transform: translateY(0);
  position: relative;
  right: 500px;
  
} 
.toast-leave-to,
.toast-enter-from{
  opacity: 0;
  transform: translateY(-60px);
   position: relative;
   right: 500px;
}

.toast-leave-active{
  transition: all 0.3s ease;
  position: relative;
  right: 500px;
}

@keyframes wobble{
  0%{opacity : 0 ; transform: translateY(-60px);}
  50%{opacity : 1 ; transform: translateY(0)}
  60%{transform: translateX(8px);}
  70%{transform: translateX(-8px);}
  80%{transform: translateX(4px);}
  90%{transform: translateX(-4px);}
  100%{transform: translateX(0);}
}
.toast-move{
  transition: all 0.3s ease;
}
</style>
