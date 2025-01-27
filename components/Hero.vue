<template>
  <section
    class="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-800 text-white p-8"
  >
    <div
      class="max-w-4xl mx-auto text-center"
      v-motion
      :initial="{ opacity: 0, y: 100 }"
      :enter="{ opacity: 1, y: 0 }"
    >
      <h1 class="text-5xl md:text-7xl font-bold mb-6">Hi, I'm Jacob</h1>
      <p class="text-xl md:text-2xl mb-8">Full Stack Developer & Tech Enthusiast</p>
      <div class="flex justify-center gap-4">
        <a
          href="#projects"
          class="bg-white text-indigo-800 px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all"
        >
          View My Work
        </a>
        <a
          href="#contact"
          class="border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-indigo-800 transition-all"
        >
          Contact Me
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useMotion } from '@vueuse/motion';
</script>
