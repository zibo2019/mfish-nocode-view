<template>
  <Card title="快捷导航">
    <CardGrid v-for="item in navItems" :key="item.title" class="cursor-pointer" @click="clickCard(item)">
      <span class="flex flex-col items-center">
        <Icon :icon="item.icon" :color="item.color" size="20" />
        <span class="text-md mt-2 truncate">{{ item.title }}</span>
      </span>
    </CardGrid>
  </Card>
</template>
<script lang="ts" setup>
  import { Card, CardGrid } from "ant-design-vue";
  import { navItems } from "./Data";
  import { Icon } from "@/components/general/Icon";
  import { useGo } from "@/hooks/web/UsePage";
  const go = useGo();
  function clickCard(item) {
    go(item.url);
  }
</script>
