<template>
  <div class="card">
    <div>
      {{ card.isBingo }}
    </div>
    <table>
      <tr>
        <th>B</th>
        <th>I</th>
        <th>N</th>
        <th>G</th>
        <th>O</th>
      </tr>
      <tr v-for="i in [0, 1, 2, 3, 4]" :key="i">
        <td v-for="j in [0, 1, 2, 3, 4]" :key="j">
          <Square :square="card.columns[j].squares[i]" />
        </td>
      </tr>
    </table>
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
  }
});
</script>

<style scoped lang="scss"></style>
