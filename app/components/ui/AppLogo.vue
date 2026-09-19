<template>
  <svg :width="size" :height="size" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" :class="customClass">
    <path d="M0 0h24v24H0z" fill="none"></path>
    <g fill="none">
      <path fill="var(--color-primary)" fill-opacity=".25" d="M4 12a8 8 0 1 1 16 0v6.667c0 .31 0 .465-.034.592a1 1 0 0 1-.707.707c-.127.034-.282.034-.592.034H12a8 8 0 0 1-8-8"></path>
      <path stroke="var(--color-primary)" stroke-linecap="round" stroke-linejoin="round" d="M8.5 10.5h7m-7 3h5"></path>
    </g>
  </svg>
</template>

<script setup>
defineProps({
  size: {
    type: [Number, String],
    default: 32
  },
  customClass: {
    type: String,
    default: ''
  }
})
</script>
