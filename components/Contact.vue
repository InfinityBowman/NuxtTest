<template>
  <section
    id="contact"
    class="py-20 bg-gray-50"
  >
    <div class="max-w-4xl mx-auto px-8">
      <div
        class="text-center mb-12"
        v-motion
        :initial="{ opacity: 0, y: 50 }"
        :enter="{ opacity: 1, y: 0 }"
      >
        <h2 class="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
        <div class="w-20 h-1 bg-indigo-600 mx-auto"></div>
      </div>
      <form
        class="space-y-6"
        v-motion
        :initial="{ opacity: 0, y: 50 }"
        :enter="{ opacity: 1, y: 0 }"
        @submit="handleSubmit"
      >
        <div class="grid md:grid-cols-2 gap-6">
          <div>
            <label
              for="name"
              class="block text-sm font-medium text-gray-700 mb-2"
              >Name</label
            >
            <input
              type="text"
              id="name"
              name="name"
              v-model="name"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label
              for="email"
              class="block text-sm font-medium text-gray-700 mb-2"
              >Email</label
            >
            <input
              type="email"
              id="email"
              name="email"
              v-model="email"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
        </div>
        <div>
          <label
            for="message"
            class="block text-sm font-medium text-gray-700 mb-2"
            >Message</label
          >
          <textarea
            id="message"
            name="message"
            rows="4"
            v-model="message"
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            required
          ></textarea>
        </div>
        <div class="text-center">
          <button
            type="submit"
            class="bg-indigo-600 text-white px-8 py-3 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Send Message
          </button>
        </div>
      </form>

      <div
        v-if="messages.length > 0"
        class="mt-12 space-y-6"
        v-motion
        :initial="{ opacity: 0, y: 50 }"
        :enter="{ opacity: 1, y: 0 }"
      >
        <h3 class="text-2xl font-semibold text-gray-900 mb-6">Recent Messages</h3>
        <div class="space-y-4">
          <div
            v-for="msg in messages"
            :key="msg.id"
            class="bg-white p-4 rounded-lg shadow"
          >
            <div class="flex justify-between items-start mb-2">
              <h4 class="font-semibold text-gray-900">{{ msg.name }}</h4>
              <span class="text-sm text-gray-500">{{ new Date(msg.date).toLocaleDateString() }}</span>
            </div>
            <p class="text-gray-700">{{ msg.message }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useMotion } from '@vueuse/motion';
import { ref, onMounted } from 'vue';

const name = ref('');
const email = ref('');
const message = ref('');
const messages = ref([]);

const fetchMessages = async () => {
  const response = await fetch('/api/messages');
  messages.value = await response.json();
};

const handleSubmit = async (e) => {
  e.preventDefault();

  const response = await fetch('/api/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name.value,
      email: email.value,
      message: message.value,
    }),
  });

  if (response.ok) {
    name.value = '';
    email.value = '';
    message.value = '';
    await fetchMessages();
  }
};

onMounted(() => {
  fetchMessages();
});
</script>
