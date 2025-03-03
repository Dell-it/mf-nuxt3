<script lang="ts">
import {ref, version} from "vue";

export default {
  name: "TestComponent",
  mounted() {
    console.log("Vue version (TestComponent):", version);
  },
  setup() {
    const versionRef = ref(version)

    return {
      versionRef
    }
  }
};
</script>

<template>
  <div class="test-component">
    TEST REMOTE COMPONENT FROM NUXT: {{ versionRef }}
    <div>
    <slot>Default slot content 2</slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.test-component {
  font-size: 20px;
}
</style>
