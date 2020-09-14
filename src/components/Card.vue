<template>
  <div class="card">
    <div>
      {{ card.isBingo }}
    </div>
    <div class="column-container">
      <div
        class="column-item"
        v-for="[column, i] in card.columns.map((c, i) => [c, i])"
        :key="column"
      >
        <div>{{ bingo[i] }}</div>
        <div class="square-container">
          <div
            class="square-item"
            v-for="square in column.squares"
            :key="square"
          >
            <Square :square="square" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Square from "./Square.vue";
import { Card } from "@/lib/card";

export default defineComponent({
  name: "Card",
  components: {
    Square
  },
  props: {
    card: {
      type: Object as PropType<Card>,
      required: true
    }
  },
  setup() {
    const bingo = ["B", "I", "N", "G", "O"];
    return { bingo };
  }
});
</script>

<style scoped lang="scss">
.card {
  font-size: 1.5em;
  text-align: center;

  .column-container {
    display: flex;
    flex-wrap: wrap;

    .column-item {
      width: 20%;

      .square-container {
        .square-item {
          height: 20%;
          padding: 0.1em;
        }
      }
    }
  }
}
</style>
