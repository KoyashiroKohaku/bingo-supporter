import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Modal',
  setup(_, context) {
    const close = () => context.emit('close');

    return { close };
  }
});
