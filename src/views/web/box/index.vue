<!--
 @description: 盒子
 @author: mfish
 @date: 2024-05-05
 @version: V1.3.0
-->
<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate" v-auth="'sys:box:insert'">新增</a-button>
        <a-button color="warning" @click="handleExport" v-auth="'sys:box:export'">导出</a-button>
        <a-button color="error" @click="handleBatchDelete" v-auth="'sys:box:delete'">批量删除</a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
                  :actions="[
              {
                icon: 'ant-design:edit-outlined',
                onClick: handleEdit.bind(null, record),
                auth: 'sys:box:update',
                tooltip: '修改'
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                popConfirm: {
                  title: '是否确认删除',
                  placement: 'left',
                  confirm: handleDelete.bind(null, record)
                },
                auth: 'sys:box:delete',
                tooltip: '删除'
              }
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <BoxModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable, TableAction } from "/@/components/general/Table";
  import { deleteBatchBox, deleteBox, exportBox, getBoxList } from "/@/api/web/Box";
  import { useModal } from "/@/components/general/Modal";
  import BoxModal from "./BoxModal.vue";
  import { columns, searchFormSchema } from "./box.data";
  import { Box } from "/@/api/web/model/BoxModel";
  import { TableProps } from "ant-design-vue";
  import { ref } from "vue";
  import { useMessage } from "/@/hooks/web/UseMessage";

  defineOptions({ name: "BoxManagement" });
  const [registerModal, { openModal }] = useModal();
  const selectedRowKeys = ref<string[]>([]);
  const rowSelection: TableProps["rowSelection"] = {
    onChange: (rowKeys: string[]) => {
      selectedRowKeys.value = rowKeys;
    }
  };
  const [registerTable, { reload, getForm }] = useTable({
    title: "盒子列表",
    api: getBoxList,
    rowKey: "id",
    columns,
    formConfig: {
      name: "search_form_item",
      labelWidth: 100,
      schemas: searchFormSchema,
      autoSubmitOnEnter: true
    },
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: false,
    rowSelection: rowSelection,
    actionColumn: {
      width: 80,
      title: "操作",
      dataIndex: "action"
    }
  });
  const { createMessage } = useMessage();
  /**
   * 新建
   */
  function handleCreate() {
    openModal(true, {
      isUpdate: false
    });
  }

  /**
   *  导出自动生成支持导出1000条可自行修改
   */
  function handleExport() {
    exportBox({ ...getForm().getFieldsValue(), pageNum: 1, pageSize: 1000 });
  }

  /**
   * 修改
   * @param box 盒子对象
   */
  function handleEdit(box: Box) {
    openModal(true, {
      record: box,
      isUpdate: true
    });
  }

  /**
   * 删除
   * @param box 盒子对象
   */
  function handleDelete(box: Box) {
    if(box.id){
      deleteBox(box.id).then(() => {
        handleSuccess();
      });
    }
  }

  /**
   * 批量删除
   * @param box 盒子对象
   */
  function handleBatchDelete() {
    if (selectedRowKeys.value.length > 0) {
      deleteBatchBox(selectedRowKeys.value.join(",")).then(() => {
        handleSuccess();
      });
    } else {
      createMessage.warning("请勾选要删除的数据");
    }
  }

  /**
   * 处理完成
   */
  function handleSuccess() {
    reload();
  }
</script>
