<!-- <template>
  <Modal title="게임 결과">
    <template #body>
      <div class="user-info-div">
        <AvatarItem :username="leftUser?.name" :avartarUrl="leftUser?.avatarURL" imgSize="100" />
        <AvatarItem :username="rightUser?.name" :avartarUrl="rightUser?.avatarURL" imgSize="100" />
      </div>
    </template>
    <template #footer>
      <BasicButton text="확인" />
    </template>
  </Modal>
</template>

<script setup lang="ts">
import AvatarItem from '@/components/common/AvatarItem.vue';
import { type GameUser } from '@/interfaces/game/GameUser.interface';

const props = defineProps<{
  leftUser: GameUser;
  rightUser: GameUser;
  leftPlayerScore: number;
  rightPlayerScore: number;
}>();
</script>

<style></style> -->
