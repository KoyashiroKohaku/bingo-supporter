<template>
  <div class="square">
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
      if (props?.square?.hasPunchedOut) {
        return "X";
      } else {
        return props?.square?.number;
      }
    });

    return { text };
  }
});
</script>

<style scoped lang="scss"></style>
