<template>
  <div :class="getWrapClass">
    <Tabs
      type="editable-card"
      size="small"
      :animated="false"
      :hide-add="true"
      :tab-bar-gutter="3"
      :active-key="activeKeyRef"
      @change="handleChange"
      @edit="handleEdit"
    >
      <template v-for="item in getTabsState" :key="item.query ? item.fullPath : item.path">
        <TabPane :closable="!(item && item.meta && item.meta.affix)">
          <template #tab>
            <TabContent :tab-item="item" />
          </template>
        </TabPane>
      </template>

      <template #rightExtra v-if="getShowRedo || getShowQuick">
        <TabRedo v-if="getShowRedo" />
        <TabContent is-extra :tab-item="$route" v-if="getShowQuick" />
        <FoldButton v-if="getShowFold" />
      </template>
    </Tabs>
  </div>
</template>
<script lang="ts">
  import type { RouteLocationNormalized, RouteMeta } from "vue-router";
  import { defineComponent, computed, unref, ref } from "vue";
  import { Tabs } from "ant-design-vue";
  import TabContent from "./components/TabContent.vue";
  import FoldButton from "./components/FoldButton.vue";
  import TabRedo from "./components/TabRedo.vue";
  import { useGo } from "@/hooks/web/UsePage";
  import { useMultipleTabStore } from "@/store/modules/MultipleTab";
  import { useUserStore } from "@/store/modules/User";
  import { initAffixTabs, useTabsDrag } from "./UseMultipleTabs";
  import { useDesign } from "@/hooks/web/UseDesign";
  import { useMultipleTabSetting } from "@/hooks/setting/UseMultipleTabSetting";
  import { REDIRECT_NAME } from "@/router/Constant";
  import { listenerRouteChange } from "@/logics/mitt/RouteChange";
  import { useRouter } from "vue-router";

  export default defineComponent({
    name: "MultipleTabs",
    components: {
      TabRedo,
      FoldButton,
      Tabs,
      TabPane: Tabs.TabPane,
      TabContent
    },
    setup() {
      const affixTextList = initAffixTabs();
      const activeKeyRef = ref("");

      useTabsDrag(affixTextList);
      const tabStore = useMultipleTabStore();
      const userStore = useUserStore();
      const router = useRouter();

      const { prefixCls } = useDesign("multiple-tabs");
      const go = useGo();
      const { getShowQuick, getShowRedo, getShowFold } = useMultipleTabSetting();

      const getTabsState = computed(() => {
        return tabStore.getTabList.filter((item) => !item.meta?.hideTab);
      });

      const unClose = computed(() => unref(getTabsState).length === 1);

      const getWrapClass = computed(() => {
        return [
          prefixCls,
          {
            [`${prefixCls}--hide-close`]: unref(unClose)
          }
        ];
      });

      listenerRouteChange((route) => {
        const { name } = route;
        if (name === REDIRECT_NAME || !route || !userStore.getToken) {
          return;
        }

        const { path, fullPath, meta = {} } = route;
        const { currentActiveMenu, hideTab } = meta as RouteMeta;
        const isHide = hideTab ? currentActiveMenu : null;
        const p = isHide || fullPath || path;
        if (activeKeyRef.value !== p) {
          activeKeyRef.value = p as string;
        }

        if (isHide) {
          const findParentRoute = router.getRoutes().find((item) => item.path === currentActiveMenu);

          findParentRoute && tabStore.addTab(findParentRoute as unknown as RouteLocationNormalized);
        } else {
          tabStore.addTab(unref(route));
        }
      });

      function handleChange(activeKey: any) {
        activeKeyRef.value = activeKey;
        go(activeKey, false);
      }

      // Close the current tab
      function handleEdit(targetKey: string) {
        // Added operation to hide, currently only use delete operation
        if (unref(unClose)) {
          return;
        }

        tabStore.closeTabByKey(targetKey, router);
      }

      return {
        getWrapClass,
        handleEdit,
        handleChange,
        activeKeyRef,
        getTabsState,
        getShowQuick,
        getShowRedo,
        getShowFold
      };
    }
  });
</script>
<style lang="less">
  @import "./index.less";
</style>
