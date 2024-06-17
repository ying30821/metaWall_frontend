<template>
  <Loading :isLoading="isLoadingPage" />
  <section>
    <PostCard
      v-if="Object.keys(post).length > 0 && userData"
      :post="post"
      @fetchData="fetchPost"
    />
  </section>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/vue';
import { getPost } from '@/api';
import Loading from '@/components/Loading.vue';
import PostCard from '@/components/PostCard.vue';

const props = defineProps({
  postId: String,
});

const router = useRouter();
const store = useStore();
const isLoadingPage = ref(false);
const post = reactive({});

const userData = computed(() => store.state.userInfo);

onMounted(() => fetchPost());

const fetchPost = async () => {
  isLoadingPage.value = true;
  const res = await getPost(props.postId);
  if (res?.status === 'success') {
    res.data.isLike = res.data.likes.some(
      (like) => like.user === userData.value.id,
    );
    Object.assign(post, res.data);
    isLoadingPage.value = false;
    return;
  }
  router.go(-1);
};
</script>
