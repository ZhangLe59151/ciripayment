<template>
  <div class="manage-settlement">
    <app-service-management-header :service-type="'Settlement'" />
    <app-service-manage-settlement />
  </div>

</template>

<script>
import AppServiceManagementHeader from "@/components/AppServiceManagementHeader";
import AppServiceManageSettlement from "@/components/AppServiceManageSettlement"
export default {
  name: "ManageSettlement",
  components: {
    AppServiceManagementHeader,
    AppServiceManageSettlement
  }
}
</script>

<style scoped>

</style>
