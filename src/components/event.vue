<template>
  <div class="feedback-wrapper">
    <div class="feedback">
      Your message has been successfully {{command}}
    </div>
  </div>
</template>

<script>
export default {
    props : ["command"]
}
</script>

<style>

.feedback-wrapper {
  position: absolute;
  width: 95%;
  bottom: 20px;
}
.feedback {
  padding: 16px 20px;
  color: white;
  font-size: 17px;
  background: #4b4b4b;
  border-radius: 20px;
  box-shadow: 1px 3px 5px rgba(0,0,0,0.2);
  max-width: 400px;
  margin: 0 auto;
}

.command-enter-from{
  opacity: 0;
  transform: translateY(60px);
}
 .command-enter-to{
  opacity: 1;
  transform: translateY(0);
} 

 .command-leave-from{
  opacity: 1;
  transform: translateY(0);
} 
.command-leave-to{
  opacity: 0;
  transform: translateY(60px);
}

.command-leave-active,
.command-enter-active{
  transition: all 0.5s ease;
}
</style>