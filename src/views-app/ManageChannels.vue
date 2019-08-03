<template>
  <div class="manage-channels">
    <app-service-management-header :service-type="'Channels'" />
    <app-service-manage-channels />
  </div>

</template>

<script>
import AppServiceManagementHeader from "@/components/AppServiceManagementHeader";
import AppServiceManageChannels from "@/components/AppServiceManageChannels";

export default {
  name: "ManageChannels",
  components: {
    AppServiceManagementHeader,
    AppServiceManageChannels
  }
}
</script>

<style scoped>

</style>
