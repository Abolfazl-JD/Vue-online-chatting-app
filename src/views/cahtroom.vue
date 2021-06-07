<template>
  <div class="chat container">
    <h2 class="center teal-text">{{name}}</h2>
    <div class="card">
      <div class="card-content">
        <p v-if="!messages.length" class="no-message">No messages yet ... </p>
        <transition name="threat">
          <Warning :feedback="feedback" v-if="feedback" />
        </transition>
        <ul class="messages left-align"  v-chat-scroll>
          <li v-for="message of messages" :key="message.time"  @click="name==message.name ? checkInSelecting(message.id,message.message) : null"  :class="{'yourself':name===message.name , 'others' : name!==message.name}" :id="message.id">
            <span class="teal-text" v-if="message.name !== name">{{message.name}}</span>
            <div>
              <span class="text-darken-3">{{message.message}}</span>
              <span class="time">{{message.time}}</span>
            </div>
          </li>
        </ul>
        <transition name="command">
          <Event :command="command" v-if="command"/>
        </transition>
      </div>
      <div class="card-action">
        <NewMessage :name="name" v-if="!options"/>
        <Options :selectedMessage="selectedMessage" @hideOptions="hideOptions" @changeCommand="changeCommand" v-else/>
      </div>
    </div>
  </div>
</template>

<script>
//libraries
import moment from 'moment'
//firebase
import db from '@/database/init.js'
//components
import NewMessage from '../components/newMesssage'
import Options from '../components/options'
import Event from "../components/event"
import Warning from "../components/warning"

export default {
  props : ['name'],
  components : {NewMessage, Options, Event, Warning},
  data(){
    return{
      feedback : null,
      messages : [],
      options : false,
      command : null,
      selectedMessage : {
        id : null,
        text : null
      },
    }
  },
  methods:{
    checkInSelecting(id, text){
      let countinue = this.checkForSelectedItem(id)
      countinue ? this.toogleOptions(id, text) : null
    },

    checkForSelectedItem(id){
      let selected = this.selectedMessage.id
      if(selected && selected !== id){
          this.warn()
          return false
      }
      return true
    },

    toogleOptions(id, text){
      if(!this.selectedMessage.id){
        this.showOptions(id, text)
      }
      else this.hideOptions()
    },

    showOptions(id, text){
      this.selectedMessage.id = id
      this.selectedMessage.text = text
      document.getElementById(id).style.background = "#c3f6f1"
      this.options = true
    },

    //Also emitted from options.vue
    hideOptions(){
      this.options = false
      document.getElementById(this.selectedMessage.id).style.background = "#fff"
      this.selectedMessage.id = null
    },

    warn(){
      this.feedback = "You can't select more than one message"
      setTimeout(() => {
        this.feedback = null
      }, 4000)
    },

      //emited from options.vue
    changeCommand(text){
      this.command = text
      setTimeout(() => {
        this.command = null
      }, 3000)
    },
  },

  created(){
    let ref = db.collection('chatroom')
    //get data from database
    ref.orderBy("time", "asc").onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        let doc = change.doc
        if(change.type === "added"){
          this.messages.push({
            name : doc.data().name,
            message : doc.data().message,
            time : moment(doc.data().time).format('LT'),
            id : doc.id
          })
        }
        else if(change.type === "removed"){
          this.messages = this.messages.filter(e => e.id !== doc.id)
        }
        else if(change.type === "modified"){
          this.messages.forEach(message => {
            if(message.id === doc.id) message.message = doc.data().message
          })
        }
      })
    })
  }
}
</script>

<style>

.chat .card-content{
  background-color: #f4fffe;
  position: relative;
  display: block;
}

.chat h2{
  font-size: 2.6em;
  margin-bottom: 40px;
}

.no-message{
  font-size: 16px;
  color: gray;
}

.chat span{
  font-size: 1.3em;
}

.chat .time{
  display: block;
  font-size: .8em;
  color: #cbcbcb;
}

.chat li{
  margin: 30px 0 11px;
}

.chat li span{
  display: block;
}

.messageBox{
  display: inline-block;
}

.yourself{
  text-align: right;
    margin-right: 36px;
}

li div{
      padding: 7px 31px 4px;
    border-radius: 25px;
}

li .teal-text{
  margin-bottom: 7px;
    margin-left: 13px;
}

.yourself div{
  color: #fff;
  background: #009688;
    display: inline-block;
    border-top-right-radius: 0;
    margin-right: 30px;
    cursor: pointer;
}

.others div{
  display: inline-block;
box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 9px;
background: #fff;
}

.others .time{
  text-align: right;
}

.messages{
  max-height: 340px;
  overflow: auto;
}

::-webkit-scrollbar {
  width: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #ddd; 
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #aaa; 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #777; 
}

.card .card-action{
  box-shadow: 0px -2px 14px #cdcdcd;
  padding-top: 0;
}

</style>