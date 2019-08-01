<template>
  <div class="manage-channels">
    <app-service-management-header :service-type="'Channels'" />
    <app-service-management-content :service-type="'Channels'"/>
  </div>

</template>

<script>
import AppServiceManagementHeader from "@/components/AppServiceManagementHeader";
import AppServiceManagementContent from "@/components/AppServiceManagementContent";

export default {
  name: "ManageChannels",
  components: {
    AppServiceManagementHeader,
    AppServiceManagementContent
  }
}
</script>

<style scoped>

</style>
