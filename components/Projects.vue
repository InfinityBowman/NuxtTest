<template>
  <section
    id="projects"
    class="py-20 bg-white"
  >
    <div class="max-w-6xl mx-auto px-8">
      <div
        class="text-center mb-12"
        v-motion
        :initial="{ opacity: 0, y: 50 }"
        :enter="{ opacity: 1, y: 0 }"
      >
        <h2 class="text-4xl font-bold text-gray-900 mb-4">My Projects</h2>
        <div class="w-20 h-1 bg-indigo-600 mx-auto"></div>
      </div>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="project in projects"
          :key="project.title"
          class="bg-white rounded-lg shadow-lg overflow-hidden"
          v-motion
          :initial="{ opacity: 0, y: 50 }"
          :enter="{ opacity: 1, y: 0 }"
        >
          <img
            :src="project.image"
            :alt="project.title"
            class="w-full h-48 object-cover"
          />
          <div class="p-6">
            <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ project.title }}</h3>
            <p class="text-gray-600 mb-4">{{ project.description }}</p>
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                v-for="tech in project.technologies"
                :key="tech"
                class="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm"
              >
                {{ tech }}
              </span>
            </div>
            <a
              :href="project.link"
              target="_blank"
              class="inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
            >
              View Project
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useMotion } from '@vueuse/motion';

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution with real-time inventory management.',
    image: 'https://picsum.photos/800/600?random=1',
    technologies: ['Vue.js', 'Node.js', 'MongoDB'],
    link: '#',
  },
  {
    title: 'Task Management App',
    description: 'A collaborative task management tool with real-time updates.',
    image: 'https://picsum.photos/800/600?random=2',
    technologies: ['React', 'Firebase', 'Tailwind CSS'],
    link: '#',
  },
  {
    title: 'Weather Dashboard',
    description: 'A weather forecasting application with interactive maps.',
    image: 'https://picsum.photos/800/600?random=3',
    technologies: ['Vue.js', 'OpenWeather API', 'Chart.js'],
    link: '#',
  },
];
</script>
