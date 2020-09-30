<template>
  <transition name="modal" appear>
    <div class="modal modal-overlay" @click.self="close">
      <div class="modal-window">
        <div class="modal-content">
          <slot />
        </div>
        <footer class="modal-footer">
          <slot name="footer">
            <button @click="close">Close</button>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" src="./Modal.ts"></script>
<style scoped lang="scss" src="./Modal.scss"></style>
