<!--
 @description: 盒子
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
  import { boxFormSchema } from "./box.data";
  import { BasicModal, useModalInner } from "/@/components/general/Modal";
  import { insertBox, updateBox } from "/@/api/web/Box";

  defineOptions({ name: "BoxModal" });
  const emit = defineEmits(["success", "register"]);
  const isUpdate = ref(true);
  const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
    name: "model_form_item",
    labelWidth: 100,
    baseColProps: { span: 12 },
    schemas: boxFormSchema,
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
  const getTitle = computed(() => (!unref(isUpdate) ? "新增盒子" : "编辑盒子"));

  async function handleSubmit() {
    let values = await validate();
    setModalProps({ confirmLoading: true });
    if (unref(isUpdate)) {
      saveBox(updateBox, values);
    } else {
      saveBox(insertBox, values);
    }
  }

  function saveBox(save, values) {
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
