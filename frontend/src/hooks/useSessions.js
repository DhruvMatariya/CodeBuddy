import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useSessionApi } from "../api/sessions";

export const useCreateSession = () => {
  const api = useSessionApi();

  return useMutation({
    mutationFn: api.createSession,
    onSuccess: () => toast.success("Session created successfully!"),
    onError: () => toast.error("Failed to create session"),
  });
};

export const useActiveSessions = () => {
  const api = useSessionApi();
  return useQuery({
    queryKey: ["activeSessions"],
    queryFn: api.getActiveSessions,
  });
};

export const useMyRecentSessions = () => {
  const api = useSessionApi();
  return useQuery({
    queryKey: ["myRecentSessions"],
    queryFn: api.getMyRecentSessions,
  });
};

export const useSessionById = (id) => {
  const api = useSessionApi();
  return useQuery({
    queryKey: ["session", id],
    queryFn: () => api.getSessionById(id),
    enabled: !!id,
  });
};

export const useJoinSession = () => {
  const api = useSessionApi();
  return useMutation({
    mutationFn: api.joinSession,
  });
};

export const useEndSession = () => {
  const api = useSessionApi();
  return useMutation({
    mutationFn: api.endSession,
  });
};
