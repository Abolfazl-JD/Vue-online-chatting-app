<template>
  <div class="warning-wrapper">
    <div class="warning">
      {{feedback}}
    </div>
  </div>
</template>

<script>

export default {
props : ["feedback"]
}
</script>

<style>
.warning-wrapper {
    position: absolute;
    width: 95%;
    top: 20px;
}
.warning {
    padding: 16px 20px;
    color: white;
    font-size: 17px;
    background: #c7234c;
    border-radius: 20px;
    box-shadow: 1px 3px 5px rgba(0,0,0,0.2);
    max-width: 400px;
    margin: 0 auto;
}
  
.threat-enter-active{
  animation: wobble 0.5s ease;
}
 .threat-leave-from{
  opacity: 1;
  transform: translateY(0);
} 
.threat-leave-to{
  opacity: 0;
  transform: translateY(-60px);
}

.threat-leave-active{
  transition: all 0.5s ease;
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
</style>