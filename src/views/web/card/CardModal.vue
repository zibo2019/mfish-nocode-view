<!--
 @description: 卡片
 @author: mfish
 @date: 2024-05-02
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
  import { cardFormSchema } from "./card.data";
  import { BasicModal, useModalInner } from "/@/components/general/Modal";
  import { insertCard, updateCard } from "/@/api/web/Card";

  defineOptions({ name: "CardModal" });
  const emit = defineEmits(["success", "register"]);
  const isUpdate = ref(true);
  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    name: "model_form_item",
    labelWidth: 100,
    baseColProps: { span: 12 },
    schemas: cardFormSchema,
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
  const getTitle = computed(() => (!unref(isUpdate) ? "新增卡片" : "编辑卡片"));

  async function handleSubmit() {
    let values = await validate();
    setModalProps({ confirmLoading: true });
    if (unref(isUpdate)) {
      saveCard(updateCard, values);
    } else {
      saveCard(insertCard, values);
    }
  }

  function saveCard(save, values) {
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
