import { defineStore } from 'pinia';

export const useModalStore = defineStore('modal', {
  state: () => ({
    isActive: false,
    title: '',
    text: '',
    buttonText: '',
    buttonFunc: () => {},
  }),
  actions: {
    on(params: { title: string; text: string; buttonText: string; buttonFunc: () => void }) {
      this.isActive = true;
      this.title = params.title;
      this.text = params.text;
      this.buttonText = params.buttonText;
      this.buttonFunc = params.buttonFunc;
    },
    off() {
      this.isActive = false;
      this.title = '';
      this.text = '';
      this.buttonText = '';
      this.buttonFunc = () => {};
    },
    notify(message: string) {
      this.on({
        title: '알림',
        text: message,
        buttonText: '닫기',
        buttonFunc: () => {
          this.off;
        },
      });
    },
  },
});
