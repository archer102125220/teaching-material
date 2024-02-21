<template>
  <div
    v-for="(message, index) in messageList"
    :id="`message-${message.timeId}`"
    :key="message.timeId"
    class="message"
    :style="{ '--message_top': `${index * 55}px` }"
  >
    <v-snackbar
      v-model="message.snackbar"
      class="message-block"
      :color="message.type"
      :absolute="true"
      :attach="`message-${message.timeId}`"
      :timeout="(index + 1) * timeout"
      location="top"
      position="absolute"
      variant="outlined"
      @update:model-value="handleClose(message.timeId)"
    >
      <v-alert :type="message.type">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <p v-html="message.text" />
        <v-btn
          class="message-block-close_btn"
          icon="mdi-close"
          variant="text"
          size="x-small"
          @click.stop="() => handleClose(message.timeId)"
        />
      </v-alert>
    </v-snackbar>
  </div>
</template>
<script setup>
const props = defineProps({
  timeout: { type: Number, default: 5000 },
  messageState: {
    type: Object,
    default: () => ({ text: '', type: 'success' })
  },
  messageTextReset: {
    type: Function,
    default: () => {}
  }
});
const emit = defineEmits(['resetMessageState']);

const MESSAGE_TIMEOUT_ID_LIST = {};
const messageList = ref([]);
const removeMessageTimeId = ref(-1);
const messageText = computed(() => props.messageState?.text || '');
const messageType = computed(() => props.messageState?.type || 'success');

let timeoutID = -1;

watch(
  () => [messageText.value, messageType.value],
  (newValue) => {
    const [text, type] = newValue || [];
    if (text !== '' && type !== '') {
      if (timeoutID !== -1) {
        clearTimeout(timeoutID);
        timeoutID = -1;
      }
      messageList.value = [
        ...messageList.value,
        { snackbar: true, type, text, timeId: Date.now() }
      ];
      emit('resetMessageState');
    }
  },
  { immediate: true }
);
watch(
  () => messageList.value,
  (newMessageList) => {
    if (newMessageList.length > 4) {
      messageList.value = newMessageList.filter((message, key) => {
        if (key !== 0) {
          return true;
        }

        if (MESSAGE_TIMEOUT_ID_LIST[message.timeId]) {
          clearTimeout(MESSAGE_TIMEOUT_ID_LIST[message.timeId]);
          MESSAGE_TIMEOUT_ID_LIST[message.timeId] = undefined;
        }
        return false;
      });
    } else {
      newMessageList.forEach((message, key) => {
        if (MESSAGE_TIMEOUT_ID_LIST[message.timeId]) {
          clearTimeout(MESSAGE_TIMEOUT_ID_LIST[message.timeId]);
        }
        MESSAGE_TIMEOUT_ID_LIST[message.timeId] = setTimeout(
          () => {
            if (MESSAGE_TIMEOUT_ID_LIST[message.timeId]) {
              removeMessageTimeId.value = message.timeId;
            }
          },
          (key + 1) * props.timeout
        );
      });
    }
  },
  { immediate: true }
);
watch(
  () => removeMessageTimeId.value,
  (newRemoveMessageTimeId) => {
    if (newRemoveMessageTimeId > -1) {
      handleClose(newRemoveMessageTimeId);
    }
  }
);

async function handleClose(removeTimeId) {
  const message = messageList.value.find(
    (_message) => _message.timeId === removeTimeId
  );
  if (message === undefined) {
    return;
  }
  messageList.value = messageList.value.map((_message) =>
    _message.timeId !== removeTimeId
      ? _message
      : { ...message, snackbar: false }
  );
  await nextTick();

  if (MESSAGE_TIMEOUT_ID_LIST[message.timeId]) {
    clearTimeout(MESSAGE_TIMEOUT_ID_LIST[message.timeId]);
    MESSAGE_TIMEOUT_ID_LIST[message.timeId] = undefined;
  }

  setTimeout(() => {
    messageList.value = messageList.value.filter(
      (_message) => _message.timeId !== removeTimeId
    );
  }, 500);
}
</script>

<style lang="scss">
.message {
  z-index: 200000;
  position: fixed;
  top: var(--message_top);
  left: 0;
  width: 100vw;
  &-block {
    z-index: 10;
    .v-snackbar__content {
      padding: 0;
      border-radius: 4px;
      .v-alert__prepend {
        align-self: unset;
      }
      .v-alert__content {
        display: flex;
        align-items: center;
        .v-btn--icon.v-btn--density-default {
          width: auto;
        }
      }
      .v-alert--density-default {
        max-width: 100vw;
        padding: 0 10px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
      }
    }
    .v-snackbar__wrapper {
      // width: 60%;
      min-width: unset;
      max-width: unset;
    }
    &-close_btn {
      margin: 7px;
    }
  }
}
</style>
