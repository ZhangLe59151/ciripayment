<template>
  <div class="manage-settlement">
    <app-service-management-header :service-type="'Settlement'" />
    <app-service-management-content :service-type="'Settlement'" />
  </div>

</template>

<script>
import AppServiceManagementHeader from "@/components/AppServiceManagementHeader";
import AppServiceManagementContent from "@/components/AppServiceManagementContent";

export default {
  name: "ManageSettlement",
  components: {
    AppServiceManagementHeader,
    AppServiceManagementContent
  }
}
</script>

<style scoped>

</style>
