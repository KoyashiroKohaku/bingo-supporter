<template>
  <div class="bingo">
    <h1>Bingo</h1>
    <div>
      <button @click="add">+</button>
      <button @click="remove">-</button>
    </div>
    <div v-for="card in bingo.cards" :key="card">
      <Card :card="card" />
    </div>
    <div>
      <input type="text" v-model="input" />
      <button @click="addHistory">Add</button>
      {{ Array.from(bingo.history) }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import Card from "./Card.vue";
import { Bingo } from "@/lib/bingo";

export default defineComponent({
  name: "Bingo",
  components: {
    Card
  },
  setup() {
    const bingo = reactive(new Bingo());
    const input = ref("");

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
      const number = Number(input.value);
      bingo.addHistory(number);
    };

    add();

    return { bingo, input, add, remove, addHistory };
  }
});
</script>

<style scoped lang="scss"></style>
