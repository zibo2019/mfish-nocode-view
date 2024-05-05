<!--
 @description: 卡片盒子中间表
 @author: mfish
 @date: 2024-05-05
 @version: V1.3.0
-->
<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" @submit="handleSubmit" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from "vue";
  import { BasicForm, useForm } from "/@/components/general/Form/index";
  import { cardBoxFormSchema } from "./cardBox.data";
  import { BasicModal, useModalInner } from "/@/components/general/Modal";
  import { insertCardBox, updateCardBox } from "/@/api/web/CardBox";

  defineOptions({ name: "CardBoxModal" });
  const emit = defineEmits(["success", "register"]);
  const isUpdate = ref(true);
  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    name: "model_form_item",
    labelWidth: 100,
    baseColProps: { span: 12 },
    schemas: cardBoxFormSchema,
    showActionButtonGroup: false,
    autoSubmitOnEnter: true
  });
  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields().then();
    setModalProps({ confirmLoading: false, width: "800px" });
    isUpdate.value = !!data?.isUpdate;
    if (unref(isUpdate)) {
      setFieldsValue({
        ...data.record
      }).then();
    }
  });
  const getTitle = computed(() => (!unref(isUpdate) ? "新增卡片盒子中间表" : "编辑卡片盒子中间表"));

  async function handleSubmit() {
    let values = await validate();
    setModalProps({ confirmLoading: true });
    if (unref(isUpdate)) {
      saveCardBox(updateCardBox, values);
    } else {
      saveCardBox(insertCardBox, values);
    }
  }

  function saveCardBox(save, values) {
    save(values)
      .then(() => {
        emit("success");
        closeModal();
      })
      .finally(() => {
        setModalProps({ confirmLoading: false });
      });
  }
</script>
