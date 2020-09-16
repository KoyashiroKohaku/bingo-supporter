<template>
  <div class="bingo">
    <h1>Bingo</h1>
    <div>
      <button @click="add">+</button>
      <button @click="remove">-</button>
    </div>
    <div class="card-container">
      <div class="card-item" v-for="card in bingo.cards" :key="card">
        <Card :card="card" :isDebug="isDebug" @punch-out="punchOut" />
      </div>
    </div>
    <div>
      <input type="text" v-model="input" />
      <button @click="addHistory">Add</button>
      <button @click="clearHistory">Clear</button>
    </div>
    <div>
      {{ Array.from(bingo.history) }}
    </div>
    <div class="is-debug">
      <input type="checkbox" id="isDebug" v-model="isDebug" />
      <label for="isDebug">Debug: {{ isDebug }}</label>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import Card from "./Card.vue";
import { Bingo } from "@/lib/Bingo";

export default defineComponent({
  name: "Bingo",
  components: {
    Card
  },
  setup() {
    const bingo = reactive(new Bingo());
    const input = ref("");
    const isDebug = ref(false);

    const add = () =>
      bingo.addCard({
        b: [1, 2, 3, 4, 5],
        i: [16, 17, 18, 19, 20],
        n: [31, 32, 33, 34, 45],
        g: [46, 47, 48, 49, 50],
        o: [61, 62, 63, 64, 65]
      });

    const remove = () => bingo.removeCard();

    const addHistory = () => {
      const value = Number(input.value);
      if (Number.isInteger(value) && 1 <= value && value <= 75) {
        bingo.addHistory(value);
        input.value = "";
      }
    };

    const clearHistory = () => {
      bingo.clearHistory();
      input.value = "";
    };

    const punchOut = (value: number) => {
      bingo.addHistory(value);
    };

    add();

    return {
      bingo,
      input,
      isDebug,
      add,
      remove,
      addHistory,
      clearHistory,
      punchOut
    };
  }
});
</script>

<style scoped lang="scss">
h1 {
  font-size: 3em;
}

.card-container {
  display: flex;
  flex-wrap: wrap;

  .card-item {
    padding: 1em;
  }
}

.is-debug {
  position: absolute;
  top: 0%;
  right: 0%;
}
</style>
