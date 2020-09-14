<template>
  <div class="square" v-bind:class="style">
    {{ text }}
  </div>
</template>

<script lang="ts">
import { Square } from "@/lib/square";
import { defineComponent, computed, PropType } from "vue";

export default defineComponent({
  name: "Square",
  props: {
    square: {
      type: Object as PropType<Square>,
      required: true
    }
  },
  setup(props) {
    const text = computed(() => {
      return props?.square?.number;
    });

    const style = computed(() => {
      if (props?.square?.hasPunchedOut) {
        return "punched-out";
      }
    });

    return { text, style };
  }
});
</script>

<style scoped lang="scss">
$main-color: #268aff;
$white-color: #ffffff;

.square {
  border: solid;

  width: 2em;
  height: 2em;
  display: flex;
  align-items: center;
  justify-content: center;
  border-color: $main-color;
  color: $main-color;
}

.punched-out {
  background-color: $main-color;
  color: $white-color;
}
</style>
