<template>
  <div class="history">
    <div class="history-container">
      <div
        class="history-item"
        v-for="historySquare in historySquares"
        :key="historySquare"
      >
        <Square :square="historySquare" @punch-out="punchOut" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue';
import Square from './Square.vue';

export default defineComponent({
  name: 'History',
  components: {
    Square
  },
  props: {
    history: {
      type: Object as PropType<Set<number>>,
      required: true
    }
  },
  setup(props, context) {
    console.log(props.history);
    const historySquares = computed(() =>
      [...Array(75).keys()].map(i => ({
        value: i + 1,
        hasPunchedOut: props.history.has(i + 1)
      }))
    );

    const punchOut = (value: number) => {
      context.emit('punch-out', value);
    };

    return { historySquares, punchOut };
  }
});
</script>

<style scoped lang="scss">
.history {
  width: 50em;
  height: 10%;

  .history-container {
    display: flex;
    flex-wrap: wrap;

    .history-item {
      width: 5%;
      margin: 0.2% 0;
    }
  }
}
</style>
