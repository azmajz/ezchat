<template>
  <AuthLoginForm />
</template>

<script setup>
definePageMeta({ middleware: 'guest', layout: 'auth' })
</script>
