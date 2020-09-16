<template>
  <div class="card">
    <div class="column-container">
      <div
        class="column-item"
        v-for="[column, i] in card.columns.map((c, i) => [c, i])"
        :key="column"
      >
        <div class="column-label">{{ bingo[i] }}</div>
        <div class="square-container">
          <div class="square-item" v-for="square in column" :key="square">
            <Square :square="square" @punch-out="punchOut" />
          </div>
        </div>
      </div>
    </div>

    <div class="debug" v-if="isDebug">
      <div>[isBingo]: {{ card.isBingo }}</div>
      <hr />
      <div>[isReach]: {{ card.isReach }}</div>
      <hr />
      <div>[bingoLines]:</div>
      <ul>
        <li v-for="bingoLine in card.bingoLines" :key="bingoLine">
          {{ bingoLine }}
        </li>
      </ul>
      <hr />
      <div>[reachLines]:</div>
      <ul>
        <li v-for="reachLine in card.reachLines" :key="reachLine">
          {{ reachLine }}
        </li>
      </ul>
      <textarea
        name=""
        id=""
        cols="30"
        rows="5"
        :value="JSON.stringify(card.export())"
      ></textarea>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Square from "./Square.vue";
import { Card } from "@/lib/Card";

export default defineComponent({
  name: "Card",
  components: {
    Square
  },
  props: {
    card: {
      type: Object as PropType<Card>,
      required: true
    },
    isDebug: {
      type: Boolean
    }
  },
  setup(_, context) {
    const bingo = ["B", "I", "N", "G", "O"];

    const punchOut = (value: number) => {
      context.emit("punch-out", value);
    };

    return { bingo, punchOut };
  }
});
</script>

<style scoped lang="scss">
$main-color: #268aff;

.card {
  font-size: 1.5em;
  text-align: center;

  .column-container {
    display: flex;
    flex-wrap: wrap;
    color: $main-color;

    .column-item {
      width: 20%;

      .column-label {
        font-size: 1.5em;
      }

      .square-container {
        .square-item {
          height: 20%;
          padding: 0.1em;
        }
      }
    }
  }
}

.debug {
  font-size: 0.5em;
  li {
    text-align: left;
  }
}
</style>
