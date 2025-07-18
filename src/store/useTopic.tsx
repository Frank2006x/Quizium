import axios from "axios";
import { create } from "zustand";

 export type TopicType = {
  topic: string;
  id: string;
};

type TopicStore = {
  topic: TopicType[];
  isLoading: boolean;
  setTopic: () => Promise<void>;
};

const useTopic = create<TopicStore>((set) => ({
  topic: [],
  isLoading: false,
  setTopic: async () => {
    try {
      set({ isLoading: true });
      const res = await axios.get("/api/topics");
      
      const temp = res.data.map((e: { topic: string; _id: string }) => {

        return {
          topic: e.topic,
          id: e._id
        }
      });
      set({ topic: temp });
    } catch (error) {
      console.error("Failed to fetch topics:", error);
    }
    set({ isLoading: false });
  },
}));

export default useTopic;
