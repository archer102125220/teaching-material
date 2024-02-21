<template>
  <div
    v-ripple.value="disable === false"
    class="image_upload"
    :style="{ '--preview_bg_color': previewBgColor }"
    @click="handeChange"
    @dragenter.stop.prevent="dragenter"
    @dragover.stop.prevent="dragover"
    @drop.stop.prevent="drop"
    @dragleave.stop.prevent="dragleave"
  >
    <slot>
      <v-btn
        color="primary"
        variant="tonal"
        class="image_upload-btn"
        @click.stop="handeChange"
      >
        上傳圖片
      </v-btn>

      <label class="image_upload-label">點擊或拖拉圖片到此區塊上傳</label>
    </slot>

    <img
      v-ripple
      class="image_upload-preview"
      :src="previewImg"
      :style="previewImg !== '' ? '--preview_opacity: 1;' : ''"
    />

    <div
      class="image_upload-mask"
      :style="
        (showMask === true ? '--mask_opacity: 0.8;' : '') +
        (disable === true ? 'cursor: not-allowed;' : '')
      "
    >
      <p>拖拉圖片到此區塊上傳</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  src: { type: [Object, String], default: '' },
  previewBgColor: { type: String, default: '#fff' },
  maxSize: { type: Number, default: 2 * 1024 * 1024 },
  fileCheck: { type: Function, default: null },
  disable: { type: Boolean, default: false }
});

const emit = defineEmits(['change', 'fileTypeError']);

const showMask = ref(false);
const previewImg = ref('');

watch(
  () => props.src,
  (newValue) => {
    if (typeof newValue === 'string' && newValue !== '') {
      previewImg.value = newValue;
    } else if (typeof newValue === 'object' && newValue !== null) {
      handleFileReader(null, newValue, false);
    }
  },
  { immediate: true, deep: true }
);

function handeChange() {
  if (props.disable === true) return;
  const fileSelector = document.createElement('input');
  fileSelector.type = 'file';
  fileSelector.setAttribute('accept', 'image/*');
  fileSelector.addEventListener('change', handleFileReader);
  fileSelector.click();
}
function handleFileReader(e, _file, needAsync = true) {
  const file = e?.target?.files?.[0] || _file;

  if (typeof file !== 'object' || file === null) return;
  const URL = window.URL || window.webkitURL;
  const img = new Image();
  const objectUrl = URL.createObjectURL(file);
  img.addEventListener('load', async function () {
    file.width = this.width;
    file.height = this.height;

    let fileChecked = true;
    if (typeof props.fileCheck === 'function') {
      fileChecked = await props.fileCheck(file);
    } else {
      fileChecked = checkIconImg(file);
    }
    if (fileChecked !== true) {
      if (typeof fileChecked === 'string' && fileChecked !== '') {
        emit('fileTypeError', fileChecked);
      }
      return;
    }
    if (needAsync === true) {
      emit('change', file);
    }
    handlePreviewImg(file);

    URL.revokeObjectURL(objectUrl);
  });
  img.src = objectUrl;
}
function checkIconImg(img) {
  if (typeof props.maxSize === 'number' && img?.size > props.maxSize) {
    // 2M
    return '圖片不可超過2M';
  } else if (
    img?.type?.includes?.('image') === false ||
    img?.type?.includes?.('gif') === true
  ) {
    return '只可上傳靜態圖片';
  }
  return true;
}

function handlePreviewImg(newPreviewImg) {
  const reader = new FileReader();
  reader.addEventListener('load', function (e) {
    previewImg.value = e.target.result;
  });
  reader.readAsDataURL(newPreviewImg);
}

// https://hackmd.io/@c36ICNyhQE6-iTXKxoIocg/HkSdHcJ9U
function dragenter() {
  showMask.value = true;
}
function dragover() {
  if (props.disable === true) return;
  console.log('dragover');
}
function dragleave() {
  if (props.disable === true) return;
  showMask.value = false;
}
function drop(e) {
  if (props.disable === true) return;
  const dt = e.dataTransfer;
  const file = dt.files[0];

  const URL = window.URL || window.webkitURL;
  const img = new Image();
  const objectUrl = URL.createObjectURL(file);
  img.addEventListener('load', async function () {
    file.width = this.width;
    file.height = this.height;

    if (typeof props.fileCheck === 'function') {
      const fileChecked = await props.fileCheck(file);
      if (fileChecked === false) return;
    }
    emit('change', file);
    handlePreviewImg(file);

    URL.revokeObjectURL(objectUrl);
  });
  img.src = objectUrl;

  showMask.value = false;
}
</script>

<style lang="scss" scoped>
.image_upload {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  border-radius: 2px;
  border: 1px solid #d9d9d9;
  cursor: pointer;
  --mask_opacity: 0;
  --preview_opacity: 0;
  &-btn {
    // font-family: Taipei Sans TC Beta;
    font-family: Noto Sans TC;
    font-size: 20px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    min-width: 144px;
    min-height: 52px;
  }
  &-label {
    color: #2c64e3;
    text-align: center;
    // font-family: Taipei Sans TC Beta;
    font-family: Noto Sans TC;
    font-size: 1rem;
    font-style: normal;
    font-weight: 400;
    line-height: 24px; /* 150% */
  }
  &-preview {
    // background-color: #fff;
    background-color: var(--preview_bg_color);
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    object-fit: contain;
    opacity: var(--preview_opacity);
  }
  &-mask {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    color: #2c64e3;
    text-align: center;
    // font-family: Taipei Sans TC Beta;
    font-family: Noto Sans TC;
    font-size: 2rem;
    font-style: normal;
    font-weight: 700;
    line-height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    cursor: pointer;
    background-color: #fff;
    border: 3px dashed #d9d9d9;
    // opacity: 0.8;
    opacity: var(--mask_opacity);
  }
}
</style>
