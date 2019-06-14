<template>
  <main>
    <app-masthead/>
    <app-about/>
    <app-contact/>
  </main>
</template>

<script>
import AppAbout from "~/components/AppAbout.vue";
import AppContact from "~/components/AppContact.vue";
import AppMasthead from "~/components/AppMasthead.vue";

export default {
  components: {
    AppAbout,
    AppContact,
    AppMasthead
  }
};
</script>

<style>
</style>
