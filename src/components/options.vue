<template>
    <div class="options">
        <div class="actions" v-if="!show_edited_message">
            <button @click="show_edited_message = true" class="butt green-btn actions-btn">Edit</button>
            <button @click="deleteMessage" class="butt green-btn actions-btn">Delete</button>
        </div>
        <div v-else>
            <input type="text" v-model="selectedMessage.text" autofocus>
            <button @click="editMessage" class="butt green-btn editing">Apply</button>
            <button class="butt cancle editing" @click="show_edited_message = false">Cancle</button>
        </div>
    </div>
</template>

<script>
import db from '@/database/init.js'

export default {
    props: ['selectedMessage'],
    data(){
        return{
            show_edited_message : false,
            feedback : null
        }
    },
    methods : {
        deleteMessage(){
            db.collection("chatroom").doc(this.selectedMessage.id).delete()
            this.$emit("hideOptions")
            this.$emit("changeCommand", "deleted")
        },
        editMessage(){
            this.show_edited_message = false
            db.collection("chatroom").doc(this.selectedMessage.id).update({
                message : this.selectedMessage.text
            })
            this.$emit('hideOptions')
            this.$emit("changeCommand", "edited")
        },
    },
}
</script>

<style scoped>


.options div{
    margin-top: 15px;
        display: flex;
    justify-content: space-around;
}

.butt{
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.3s ease;
}

.green-btn{
    background: #009688;
    border: 2px solid #009688;
}

.green-btn:hover{
    color: #009688;
    background: #fff;
    font-weight: bold;
}

.actions-btn{
    font-size: 17px;
    padding: 11px 28px;
}

.editing{
    padding: 11px 18px;
    font-size: 16px;
}

.cancle{
    background: #fe0e5bd1;
    border: 0;
    margin-left: 14px;
}

.cancle:hover{
    background: #d10e4cd1;
    color: #fff;
}

input{
    margin-right: 25px  !important;
}

</style>