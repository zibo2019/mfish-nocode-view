<template>
  <div class="account-setting">
    <ATabs
      destroy-inactive-tab-pane
      tab-position="left"
      :tab-bar-style="tabBarStyle"
      :active-key="tabType"
      @change="tabChange"
    >
      <template v-for="item in setting">
        <ATabPane :tab="item.name" class="base-title" :key="item.key" v-if="hasPermission(item.auth)">
          <component :is="components[item.component]" />
        </ATabPane>
      </template>
    </ATabs>
  </div>
</template>

<script lang="ts" setup>
  import { onBeforeMount, ref } from "vue";
  import { Tabs as ATabs } from "ant-design-vue";
  import { settingList } from "./setting.data";
  import BaseSetting from "./BaseSetting.vue";
  import SecureSetting from "./SecureSetting.vue";
  import TenantSetting from "./TenantSetting.vue";
  import TenantOrgSetting from "./TenantOrgSetting.vue";
  import TenantRoleSetting from "./TenantRoleSetting.vue";
  import TenantUserSetting from "./TenantUserSetting.vue";
  import { useRoute } from "vue-router";
  import { usePermission } from "@/hooks/web/UsePermission";
  const ATabPane = ATabs.TabPane;
  const components = {
    BaseSetting,
    SecureSetting,
    TenantSetting,
    TenantOrgSetting,
    TenantRoleSetting,
    TenantUserSetting
  };
  const route = useRoute();
  const tabType = ref<number>(1);
  const { isTenant, hasPermission } = usePermission();
  // 如果不是租户，不显示租户配置信息
  const setting: { key: number; name: string; component: string; auth?: string }[] = isTenant()
    ? [...settingList]
    : settingList.filter((set) => set.key <= 3);
  onBeforeMount(() => {
    const index = route.path.lastIndexOf("/");
    if (index) {
      const type = Number.parseInt(route.path.slice(Math.max(0, index + 1)));
      if (!Number.isNaN(type)) {
        tabType.value = type;
      }
    }
  });
  function tabChange(e) {
    tabType.value = e;
  }

  const tabBarStyle = {
    width: "110px",
    height: "calc(100vh - 112px)"
  };
</script>
<style lang="less" scoped>
  [data-theme="dark"] .account-setting {
    background-color: #151515;
  }
  .account-setting {
    margin: 16px;
    background-color: @component-background;

    .base-title {
      padding: 0 16px 0 16px !important;
    }
  }
</style>
