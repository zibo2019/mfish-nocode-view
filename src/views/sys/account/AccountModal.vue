<template>
  <BasicModal v-bind="$attrs" @register="registerModal" :title="getTitle" @ok="handleSubmit">
    <BasicForm @register="registerForm" @submit="handleSubmit" @field-value-change="valueChange" />
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from "vue";
  import { BasicModal, useModalInner } from "@/components/general/Modal";
  import { BasicForm, useForm } from "@/components/general/Form/index";
  import { accountFormSchema } from "./account.data";
  import { getOrgRoles, getOrgTree } from "@/api/sys/Org";
  import { getUserRoles, insertUser, updateUser } from "@/api/sys/User";
  import { getAllRoleList } from "@/api/sys/Role";
  import { RoleInfo } from "@/api/sys/model/UserModel";
  import { SsoRole } from "@/api/sys/model/RoleModel";
  import { getTenantOrgTree } from "@/api/sys/SsoTenant";
  import { TreeItem } from "@/components/general/Tree";
  defineOptions({ name: "AccountModal" });

  const props = defineProps({
    source: {
      type: Number,
      default: null
    },
    orgId: {
      type: String
    }
  });
  const emit = defineEmits(["success", "register"]);
  const isUpdate = ref(true);
  let curRow: any;
  const [registerForm, { setFieldsValue, updateSchema, resetFields, validate }] = useForm({
    name: "model_form_item",
    labelWidth: 100,
    baseColProps: { span: 12 },
    schemas: accountFormSchema,
    showActionButtonGroup: false,
    autoSubmitOnEnter: true
  });
  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    resetFields().then();
    setModalProps({ confirmLoading: false, width: "800px" });
    isUpdate.value = !!data?.isUpdate;
    curRow = data.record ? data.record : {};
    let orgRoles: RoleInfo[] = [];
    let roles: SsoRole[] = [];
    if (unref(isUpdate)) {
      setFieldsValue({
        ...data.record
      }).then();
      updateSchema([
        {
          field: "password",
          ifShow: false
        },
        {
          field: "account",
          dynamicDisabled: true
        }
      ]).then();
      if (data.record.orgIds) {
        const orgIds = data.record.orgIds.join(",");
        roles = await getAllRoleList({ orgIds });
        orgRoles = await getOrgRoles(orgIds);
      }
      const userRoles = await getUserRoles({ userId: data.record.id });
      setRole(roles, userRoles, orgRoles);
    } else {
      updateSchema([
        {
          field: "password",
          ifShow: true
        },
        {
          field: "account",
          dynamicDisabled: false
        },
        {
          field: "roleIds",
          componentProps: { options: [], optionFilterProp: "label" }
        }
      ]).then();
      if (props.orgId) {
        setFieldsValue({
          orgIds: [props.orgId]
        }).then();
        roles = await getAllRoleList({ orgIds: props.orgId });
        orgRoles = await getOrgRoles(props.orgId);
        setRole(roles, [], orgRoles);
        valueChange("orgIds", [props.orgId]).then();
      }
    }
    let treeData: TreeItem[];
    if (props.source === 1) {
      updateSchema([
        {
          field: "roleIds",
          dynamicDisabled: true
        }
      ]).then();
      treeData = (await getTenantOrgTree()) as unknown as TreeItem[];
    } else {
      treeData = (await getOrgTree()) as unknown as TreeItem[];
    }
    updateSchema({
      field: "orgIds",
      componentProps: { treeData }
    }).then();
  });
  const getTitle = computed(() => (unref(isUpdate) ? "编辑账号" : "新增账号"));

  function setRole(roles, userRoles, orgRoles) {
    if (!roles) {
      return;
    }
    curRow.userRoles = userRoles;
    const options = roles.reduce((prev, next: Recordable) => {
      if (next) {
        let disable = false;
        if (next.id === "1") {
          disable = true;
        } else {
          for (const role of userRoles) {
            if (next.id !== role.id) {
              continue;
            }
            if (role.source === 1) {
              disable = true;
              break;
            }
          }
        }
        prev.push({
          key: next.id,
          label: next.roleName,
          value: next.id,
          disabled: disable
        });
      }
      return prev;
    }, [] as any);
    // 合并组织拥有的角色，如果已经包含该角色则过滤掉
    const opts = options.concat(
      orgRoles
        .map((orgRole) => ({
          key: orgRole.id,
          label: orgRole.roleName,
          value: orgRole.id,
          disabled: orgRole.source === 1
        }))
        .filter((item) => !options.some((opt) => opt.key === item.key))
    );
    updateSchema({
      field: "roleIds",
      componentProps: { options: opts, optionFilterProp: "label" }
    }).then();
    return opts;
  }

  async function handleSubmit() {
    const values = await validate();
    values.roleIds = values.roleIds
      ? values.roleIds.filter((item) => {
          if (curRow?.userRoles && curRow?.userRoles.length > 0) {
            for (const role of curRow.userRoles) {
              if (role.source !== 1) {
                continue;
              }
              if (item === role.id) {
                return false;
              }
            }
          }
          return true;
        })
      : undefined;
    setModalProps({ confirmLoading: true });
    if (unref(isUpdate)) {
      saveAccount(updateUser, values);
    } else {
      saveAccount(insertUser, values);
    }
  }

  async function valueChange(key, value) {
    if (key !== "orgIds") {
      return;
    }
    let roles: SsoRole[];
    let orgRoles: RoleInfo[];
    if (value && value.length > 0) {
      roles = await getAllRoleList({ orgIds: value.join(",") });
      // 获取组织已设置的角色
      orgRoles = await getOrgRoles(value);
    } else {
      roles = [];
      orgRoles = [];
    }
    let userRoles: RoleInfo[] = [];
    // 移除属于组织的角色
    if (curRow?.userRoles && curRow?.userRoles.length > 0) {
      userRoles = curRow.userRoles.filter((item) => item.source !== 1);
    }
    // 合并新的组织角色
    userRoles = userRoles.concat(orgRoles);
    const opts = setRole(roles, userRoles, orgRoles);
    const roleIds = userRoles
      .map((item) => {
        return item.id;
      })
      .reduce((prev, next: string) => {
        if (next && !prev.includes(next)) {
          prev.push(next);
        }
        return prev;
      }, [] as string[]);
    const roleValues = roleIds.filter((roleId) => opts.some((role) => role.id !== roleId));
    setFieldsValue({ roleIds: roleValues }).then();
  }

  function saveAccount(save, values) {
    save(values)
      .then(() => {
        emit("success", { isUpdate: unref(isUpdate), values: { ...values, id: curRow.id } });
        closeModal();
      })
      .finally(() => {
        setModalProps({ confirmLoading: false });
      });
  }
</script>
