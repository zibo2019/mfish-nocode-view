<template>
  <div :class="prefixCls">
    <span> {{ title }}</span>
    <a-select
      v-bind="getBindValue"
      :class="`${prefixCls}-select`"
      @change="handleChange"
      :disabled="disabled"
      size="small"
      :options="options"
    />
  </div>
</template>
<script lang="ts">
  import { defineComponent, PropType, computed } from "vue";
  import { Select } from "ant-design-vue";
  import { useDesign } from "/@/hooks/web/UseDesign";
  import { baseHandler } from "../Handler";
  import { HandlerEnum } from "../Enum";

  export default defineComponent({
    name: "SelectItem",
    components: { ASelect: Select },
    props: {
      event: {
        type: Number as PropType<HandlerEnum>
      },
      disabled: {
        type: Boolean
      },
      title: {
        type: String
      },
      def: {
        type: [String, Number] as PropType<string | number>
      },
      initValue: {
        type: [String, Number] as PropType<string | number>
      },
      options: {
        type: Array as PropType<LabelValueOptions>,
        default: () => []
      }
    },
    setup(props) {
      const { prefixCls } = useDesign("setting-select-item");
      const getBindValue = computed(() => {
        return props.def ? { value: props.def, defaultValue: props.initValue || props.def } : {};
      });

      function handleChange(e: ChangeEvent) {
        props.event && baseHandler(props.event, e);
      }

      return {
        prefixCls,
        handleChange,
        getBindValue
      };
    }
  });
</script>
<style lang="less" scoped>
  @prefix-cls: ~"@{namespace}-setting-select-item";

  .@{prefix-cls} {
    display: flex;
    justify-content: space-between;
    margin: 16px 0;

    &-select {
      width: 126px;
    }
  }
</style>
