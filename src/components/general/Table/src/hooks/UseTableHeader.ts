import type { ComputedRef, Slots } from "vue";
import type { BasicTableProps, InnerHandlers, InnerMethods } from "../types/Table";
import { unref, computed, h } from "vue";
import TableHeader from "../components/TableHeader.vue";
import { isString } from "@/utils/Is";
import { getSlot } from "@/utils/helper/TsxHelper";
import { Recordable } from "@mfish/types";

export function useTableHeader(
  propsRef: ComputedRef<BasicTableProps>,
  slots: Slots,
  handlers: InnerHandlers,
  methods: InnerMethods
) {
  const getHeaderProps = computed((): Recordable => {
    const { title, showTableSetting, titleHelpMessage, tableSetting, showSelectionBar } = unref(propsRef);
    const hideTitle = !slots.tableTitle && !title && !slots.toolbar && !showTableSetting;
    if (hideTitle && !isString(title)) {
      return {};
    }

    return {
      title: hideTitle
        ? null
        : () =>
            h(
              TableHeader,
              {
                title,
                titleHelpMessage,
                showTableSetting,
                tableSetting,
                onColumnsChange: handlers.onColumnsChange,
                clearSelectedRowKeys: methods.clearSelectedRowKeys,
                count: methods.getSelectRowKeys().length,
                showSelectionBar
              } as Recordable,
              {
                ...(slots.toolbar
                  ? {
                      toolbar: () => getSlot(slots, "toolbar")
                    }
                  : {}),
                ...(slots.tableTitle
                  ? {
                      tableTitle: () => getSlot(slots, "tableTitle")
                    }
                  : {}),
                ...(slots.headerTop
                  ? {
                      headerTop: () => getSlot(slots, "headerTop")
                    }
                  : {})
              }
            )
    };
  });
  return { getHeaderProps };
}
