<!--
 @description: 卡片
 @author: mfish
 @date: 2024-05-02
 @version: V1.3.0
-->
<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate" v-auth="'sys:card:insert'">新增</a-button>
        <a-button color="warning" @click="handleExport" v-auth="'sys:card:export'">导出</a-button>
        <a-button color="error" @click="handleBatchDelete" v-auth="'sys:card:delete'">批量删除</a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
                  :actions="[
              {
                icon: 'ant-design:edit-outlined',
                onClick: handleEdit.bind(null, record),
                auth: 'sys:card:update',
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
                auth: 'sys:card:delete',
                tooltip: '删除'
              }
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <CardModal @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts" setup>
  import { BasicTable, useTable, TableAction } from "/@/components/general/Table";
  import { deleteBatchCard, deleteCard, exportCard, getCardList } from "/@/api/web/Card";
  import { useModal } from "/@/components/general/Modal";
  import CardModal from "./CardModal.vue";
  import { columns, searchFormSchema } from "./card.data";
  import { Card } from "/@/api/web/model/CardModel";
  import { TableProps } from "ant-design-vue";
  import { ref } from "vue";
  import { useMessage } from "/@/hooks/web/UseMessage";

  defineOptions({ name: "CardManagement" });
  const [registerModal, { openModal }] = useModal();
  const selectedRowKeys = ref<string[]>([]);
  const rowSelection: TableProps["rowSelection"] = {
    onChange: (rowKeys: string[]) => {
      selectedRowKeys.value = rowKeys;
    }
  };
  const [registerTable, { reload, getForm }] = useTable({
    title: "卡片列表",
    api: getCardList,
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
    exportCard({ ...getForm().getFieldsValue(), pageNum: 1, pageSize: 1000 });
  }

  /**
   * 修改
   * @param card 卡片对象
   */
  function handleEdit(card: Card) {
    openModal(true, {
      record: card,
      isUpdate: true
    });
  }

  /**
   * 删除
   * @param card 卡片对象
   */
  function handleDelete(card: Card) {
    if(card.id){
      deleteCard(card.id).then(() => {
        handleSuccess();
      });
    }
  }

  /**
   * 批量删除
   * @param card 卡片对象
   */
  function handleBatchDelete() {
    if (selectedRowKeys.value.length > 0) {
      deleteBatchCard(selectedRowKeys.value.join(",")).then(() => {
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
