<template>
  <div class="square" v-bind:class="style" @click="punchOut">
    {{ text }}
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue';

export default defineComponent({
  name: 'Square',
  props: {
    square: {
      type: Object as PropType<{ value: number; hasPunchedOut: boolean }>,
      required: true
    }
  },
  setup(props, context) {
    const text = computed(() => {
      return props.square.value;
    });

    const style = computed(() => {
      if (props.square.hasPunchedOut) {
        return 'punched-out';
      }
    });

    const punchOut = () => {
      console.log(props.square.value);
      context.emit('punch-out', props.square.value);
    };

    return { text, style, punchOut };
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
