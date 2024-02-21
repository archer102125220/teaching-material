<template>
  <div class="stepper" :style="cssVariable">
    <template v-for="(item, key) in stepArray" :key="key">
      <div class="stepper-step">
        <div class="stepper-step-step_title">
          <label
            :class="stepClassName('stepper-step-step_title-step_number', key)"
          >
            {{ key + 1 }}
          </label>
          <label
            :class="stepClassName('stepper-step-step_title-step_label', key)"
          >
            {{ item }}
          </label>
          <v-icon
            v-if="activeStep > key + 1"
            color="success"
            icon="mdi-check-circle-outline"
            class="stepper-step-step_success"
          />
        </div>
        <div :class="stepClassName('stepper-step-step_icon', key)" />
      </div>
    </template>
  </div>
</template>
<script setup>
const props = defineProps({
  activeStep: { type: Number, default: 0 },
  stepArray: { type: Array, default: () => [] },
  stepLabelHeight: { type: [String, Number], default: '48px' },
  stepLabelRwdHeight: { type: [String, Number], default: '50px' }
});

const cssVariable = computed(() => {
  const _cssVariable = {};

  if (
    typeof props.stepLabelHeight === 'string' &&
    props.stepLabelHeight !== ''
  ) {
    const stepLabelHeight = props.stepLabelHeight;
    _cssVariable['--step_label_height'] =
      // eslint-disable-next-line unicorn/prefer-includes
      stepLabelHeight.indexOf(/px|vw|vh|\%/) < 0
        ? stepLabelHeight
        : stepLabelHeight + 'px';
  } else if (typeof props.stepLabelHeight === 'number') {
    _cssVariable['--step_label_height'] = props.stepLabelHeight + 'px';
  }

  if (
    typeof props.stepLabelRwdHeight === 'string' &&
    props.stepLabelRwdHeight !== ''
  ) {
    const stepLabelRwdHeight = props.stepLabelRwdHeight;
    _cssVariable['--step_label_rwd_height'] =
      // eslint-disable-next-line unicorn/prefer-includes
      stepLabelRwdHeight.indexOf(/px|vw|vh|\%/) < 0
        ? stepLabelRwdHeight
        : stepLabelRwdHeight + 'px';
  } else if (typeof props.stepLabelRwdHeight === 'number') {
    _cssVariable['--step_label_rwd_height'] = props.stepLabelRwdHeight + 'px';
  }

  return _cssVariable;
});

function stepClassName(defaultClass = '', key = 0) {
  const _stepNumberClass = [defaultClass];
  if (key + 1 === props.activeStep) {
    _stepNumberClass.push('stepper-step-step_current');
  } else if (key + 1 < props.activeStep) {
    _stepNumberClass.push('stepper-step-step_activated');
  }

  return _stepNumberClass;
}
</script>

<style lang="scss" scoped>
.stepper {
  display: flex;
  --step_label_height: 48px;
  --step_label_rwd_height: 50px;
  --step_color: #e6e6e6;
  --step_border_color: #e6e6e6;
  --step_background: #e6e6e6;
  &-step {
    flex: 1;
    margin: 0 1px;
    &-step_current {
      --step_color: #808080;
      --step_border_color: #808080;
      --step_background: #808080;
    }
    &-step_activated {
      --step_color: #5885e9;
      --step_border_color: #5885e9;
      --step_background: #5885e9;
    }
    &-step_title {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 5px;
      @include tablet {
        margin-bottom: 10px;
      }
      &-step_number {
        color: var(--step_color);
        text-align: center;
        font-size: 0.75rem;
        // font-family: Font Awesome 6 Pro;
        font-family: Noto Sans TC;
        padding: 0px 5px;
        border-radius: 30px;
        border-color: var(--step_border_color);
        border-style: solid;
        border-width: 2px;
        margin-right: 10px;
        @include tablet {
          margin-right: 0px;
        }
      }
      &-step_label {
        word-wrap: break-word;
        // width: 70%;
        width: 65%;
        // height: 48px;
        height: var(--step_label_height);
        display: flex;
        flex-wrap: wrap;
        align-content: center;
        color: var(--step_color);
        font-size: 1rem;
        // font-family: Taipei Sans TC Beta;
        font-family: Noto Sans TC;
        flex-shrink: 0;
        @include tablet {
          font-size: 0.75rem;
          // height: 50px;
          height: var(--step_label_rwd_height);
        }
      }
    }
    &-step_icon {
      height: 10px;
      border-radius: 100px;
      background: var(--step_background);
    }
    &-step_success {
      margin-left: 8px;
      @include tablet {
        margin-left: 0px;
      }
    }
  }
}
</style>
