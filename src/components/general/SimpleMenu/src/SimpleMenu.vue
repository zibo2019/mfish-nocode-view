<template>
  <MfishMenu
    v-bind="getBindValues"
    :activeName="activeName"
    :openNames="getOpenKeys"
    :class="prefixCls"
    :activeSubMenuNames="activeSubMenuNames"
    @select="handleSelect"
  >
    <template v-for="item in items" :key="item.path">
      <SimpleSubMenu :item="item" :parent="true" :collapsedShowTitle="collapsedShowTitle" :collapse="collapse" />
    </template>
  </MfishMenu>
</template>
<script lang="ts">
  import type { MenuState } from "./Types";
  import type { Menu as MenuType } from "/@/router/Types";
  import type { RouteLocationNormalizedLoaded } from "vue-router";
  import { defineComponent, computed, ref, unref, reactive, toRefs, watch } from "vue";
  import { useDesign } from "/@/hooks/web/UseDesign";
  import MfishMenu from "./components/MfishMenu.vue";
  import SimpleSubMenu from "./SimpleSubMenu.vue";
  import { listenerRouteChange } from "/@/logics/mitt/RouteChange";
  import { propTypes } from "/@/utils/PropTypes";
  import { REDIRECT_NAME } from "/@/router/Constant";
  import { useRouter } from "vue-router";
  import { isFunction, isUrl } from "/@/utils/Is";
  import { openWindow } from "/@/utils";
  import { useOpenKeys } from "./UseOpenKeys";

  export default defineComponent({
    name: "SimpleMenu",
    components: {
      MfishMenu,
      SimpleSubMenu
    },
    inheritAttrs: false,
    props: {
      items: {
        type: Array as PropType<MenuType[]>,
        default: () => []
      },
      collapse: propTypes.bool,
      mixSider: propTypes.bool,
      theme: propTypes.string,
      accordion: propTypes.bool.def(true),
      collapsedShowTitle: propTypes.bool,
      beforeClickFn: {
        type: Function as PropType<(key: string) => Promise<boolean>>
      },
      isSplitMenu: propTypes.bool
    },
    emits: ["menuClick"],
    setup(props, { attrs, emit }) {
      const currentActiveMenu = ref("");
      const isClickGo = ref(false);

      const menuState = reactive<MenuState>({
        activeName: "",
        openNames: [],
        activeSubMenuNames: []
      });

      const { currentRoute } = useRouter();
      const { prefixCls } = useDesign("simple-menu");
      const { items, accordion, mixSider, collapse } = toRefs(props);

      const { setOpenKeys, getOpenKeys } = useOpenKeys(menuState, items, accordion, mixSider, collapse);

      const getBindValues = computed(() => ({ ...attrs, ...props }));

      watch(
        () => props.collapse,
        (collapse) => {
          if (collapse) {
            menuState.openNames = [];
          } else {
            setOpenKeys(currentRoute.value.path);
          }
        },
        { immediate: true }
      );

      watch(
        () => props.items,
        () => {
          if (!props.isSplitMenu) {
            return;
          }
          setOpenKeys(currentRoute.value.path);
        },
        { flush: "post" }
      );

      listenerRouteChange((route) => {
        if (route.name === REDIRECT_NAME) return;
        currentActiveMenu.value = route.meta?.currentActiveMenu as string;
        handleMenuChange(route);
        if (unref(currentActiveMenu)) {
          menuState.activeName = unref(currentActiveMenu);
          setOpenKeys(unref(currentActiveMenu));
        }
      });

      async function handleMenuChange(route?: RouteLocationNormalizedLoaded) {
        if (unref(isClickGo)) {
          isClickGo.value = false;
          return;
        }
        const path = (route || unref(currentRoute)).path;
        menuState.activeName = path;
        setOpenKeys(path).then();
      }

      async function handleSelect(key: string) {
        if (isUrl(key)) {
          openWindow(key);
          return;
        }
        const { beforeClickFn } = props;
        if (beforeClickFn && isFunction(beforeClickFn)) {
          const flag = await beforeClickFn(key);
          if (!flag) return;
        }

        emit("menuClick", key);

        isClickGo.value = true;
        setOpenKeys(key).then();
        menuState.activeName = key;
      }

      return {
        prefixCls,
        getBindValues,
        handleSelect,
        getOpenKeys,
        ...toRefs(menuState)
      };
    }
  });
</script>
<style lang="less">
  @import "./index.less";
</style>
