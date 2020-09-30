<template>
  <div class="bingo">
    <h1>Bingo</h1>
    <div>
      <button @click="undo" :disabled="!bingo.canUndo">Undo</button>
      <button @click="redo" :disabled="!bingo.canRedo">Redo</button>
      <button @click="add">+</button>
      <button @click="remove">-</button>
    </div>

    <div class="card-container">
      <div class="card-item" v-for="card in bingo.cards" :key="card">
        <Card :card="card" :isDebug="isDebug" @punch-out="punchOut" />
      </div>
    </div>

    <div class="history">
      <History :history="bingo.history" @punch-out="punchOut" />
      <button @click="clearHistory">Clear</button>
    </div>

    <div class="is-debug">
      <input type="checkbox" id="isDebug" v-model="isDebug" />
      <label for="isDebug">Debug: {{ isDebug }}</label>
    </div>

    <div class="modal">
      <Modal @close="closeModal" v-if="isOpenModal">
        <CardInput @regist="regist" />
        <template v-slot:footer>
          <button @click="doSend">送信</button>
        </template>
      </Modal>
      <button @click="openModal">開く</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from 'vue';
import Card from './Card.vue';
import History from './History.vue';
import Modal from './Modal.vue';
import CardInput from './CardInput.vue';
import { Bingo } from '@/lib/Bingo';
import { CardInfo } from '@/lib/CardInfo';

export default defineComponent({
  name: 'Bingo',
  components: {
    Card,
    History,
    Modal,
    CardInput
  },
  setup() {
    const bingo = reactive(new Bingo());
    const input = ref('');
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

    const undo = () => bingo.undo();

    const redo = () => bingo.redo();

    const addHistory = () => {
      const value = Number(input.value);
      if (Number.isInteger(value) && 1 <= value && value <= 75) {
        bingo.addHistory(value);
        input.value = '';
      }
    };

    const clearHistory = () => {
      bingo.clearHistory();
      input.value = '';
    };

    const punchOut = (value: number) => {
      bingo.addHistory(value);
    };

    add();

    const save = () => {
      const bingoInfo = bingo.export();
      localStorage.setItem('cards', JSON.stringify(bingoInfo.cards));
      localStorage.setItem('history', JSON.stringify(bingoInfo.history));
    };

    const load = () => {
      const cardsString = localStorage.getItem('cards');
      const historyString = localStorage.getItem('history');
      if (!cardsString || !historyString) {
        return;
      }

      const cards = JSON.parse(cardsString) as Array<CardInfo>;
      const history = JSON.parse(historyString) as Array<number>;

      const bingoInfo = {
        cards,
        history
      };
      bingo.import(bingoInfo);
    };

    watch(
      () => bingo,
      () => save(),
      { deep: true }
    );

    load();

    const isOpenModal = ref(false);
    const openModal = () => {
      isOpenModal.value = true;
    };
    const closeModal = () => {
      isOpenModal.value = false;
    };

    const regist = (cardInfo: CardInfo) => {
      console.log('regist');
      bingo.addCard(cardInfo);
    };

    return {
      bingo,
      input,
      isDebug,
      add,
      remove,
      undo,
      redo,
      addHistory,
      clearHistory,
      punchOut,
      isOpenModal,
      openModal,
      closeModal,
      regist
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
