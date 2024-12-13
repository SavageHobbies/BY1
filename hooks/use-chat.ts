"use client";

import { create } from 'zustand';

interface ChatState {
  isOpen: boolean;
  openChat: () => void;
  closeChat: () => void;
}

export const useChat = create<ChatState>((set) => ({
  isOpen: false,
  openChat: () => {
    const glhfChat = document.createElement('script');
    glhfChat.src = 'https://cdn.glhf.chat/chat.js';
    glhfChat.async = true;
    glhfChat.setAttribute('data-glhf', 'glhf_65471af1f642e67d693d6cac707e6c19');
    document.body.appendChild(glhfChat);
    set({ isOpen: true });
  },
  closeChat: () => set({ isOpen: false }),
}));