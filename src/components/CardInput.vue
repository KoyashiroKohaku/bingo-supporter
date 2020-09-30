<template>
  <div class="card-input">
    <form action="">
      <div class="column-container">
        <div class="column-item" v-for="column in columns" :key="column.id">
          <div class="column-label">
            {{ column.id.toUpperCase() }}
          </div>
          <div class="square-container">
            <div
              class="square-item"
              v-for="square in column.squares"
              :key="square.id"
            >
              <input
                type="number"
                min="1"
                max="75"
                required
                v-model="square.value"
              />
            </div>
          </div>
        </div>
      </div>
      <input type="submit" value="submit" />
    </form>
  </div>
</template>

<script lang="ts" src="./CardInput.ts"></script>
<style scoped lang="scss" src="./CardInput.scss"></style>
