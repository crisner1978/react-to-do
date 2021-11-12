import create from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      resetUser: () => set({ user: null }),
    }),
    {
      name: "todo-rise",
    }
  )
);

export default useStore;
