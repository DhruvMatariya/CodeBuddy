import axiosInstance from "../lib/axios";
import { useAuth } from "@clerk/clerk-react";

export const useSessionApi = () => {
  const { getToken } = useAuth();

  const withAuth = async () => {
    const token = await getToken();
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  };

  return {
    createSession: async (data) => {
      const config = await withAuth();
      const res = await axiosInstance.post("/sessions", data, config);
      return res.data;
    },

    getActiveSessions: async () => {
      const config = await withAuth();
      const res = await axiosInstance.get("/sessions/active", config);
      return res.data;
    },

    getMyRecentSessions: async () => {
      const config = await withAuth();
      const res = await axiosInstance.get("/sessions/my-recent", config);
      return res.data;
    },

    getSessionById: async (id) => {
      const config = await withAuth();
      const res = await axiosInstance.get(`/sessions/${id}`, config);
      return res.data;
    },

    joinSession: async (id) => {
      const config = await withAuth();
      const res = await axiosInstance.post(`/sessions/${id}/join`, {}, config);
      return res.data;
    },

    endSession: async (id) => {
      const config = await withAuth();
      const res = await axiosInstance.post(`/sessions/${id}/end`, {}, config);
      return res.data;
    },

    getStreamToken: async () => {
      const config = await withAuth();
      const res = await axiosInstance.get("/chat/token", config);
      return res.data;
    },
  };
};
