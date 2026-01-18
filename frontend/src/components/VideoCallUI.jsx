import {
  CallControls,
  CallingState,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import {
  Loader2Icon,
  MessageSquareIcon,
  UsersIcon,
  XIcon,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Channel,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import "stream-chat-react/dist/css/v2/index.css";

function VideoCallUI({ chatClient, channel }) {
  const navigate = useNavigate();
  const { useCallCallingState, useParticipantCount } =
    useCallStateHooks();

  const callingState = useCallCallingState();
  const participantCount = useParticipantCount();
  const [isChatOpen, setIsChatOpen] = useState(false);

  if (callingState === CallingState.JOINING) {
    return (
      <div className="h-full flex items-center justify-center bg-[#0b0f14] text-white">
        <div className="text-center">
          <Loader2Icon className="w-12 h-12 mx-auto animate-spin text-orange-400 mb-4" />
          <p className="text-white/70">Joining call…</p>
        </div>
      </div>
    );
  }

  return (
    /* 🔴 REQUIRED STREAM WRAPPERS */
    <div className="h-full str-video str-video--dark">
      <div className="h-full flex gap-3 bg-[#0b0f14] text-white">

        {/* LEFT – VIDEO */}
        <div className="flex-1 flex flex-col gap-3">

          {/* TOP BAR */}
          <div className="flex items-center justify-between bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-3">
            <div className="flex items-center gap-2 text-sm">
              <UsersIcon className="w-5 h-5 text-orange-400" />
              <span className="text-white/80">
                {participantCount}{" "}
                {participantCount === 1 ? "participant" : "participants"}
              </span>
            </div>

            {chatClient && channel && (
              <button
                onClick={() => setIsChatOpen(!isChatOpen)}
                className={`px-4 py-2 rounded-xl text-sm transition ${
                  isChatOpen
                    ? "bg-orange-500/20 text-orange-400 border border-orange-500/40"
                    : "bg-white/5 text-white/70 hover:bg-white/10"
                }`}
              >
                <div className="flex items-center gap-2">
                  <MessageSquareIcon className="w-4 h-4" />
                  Chat
                </div>
              </button>
            )}
          </div>

          {/* VIDEO GRID */}
          <div className="flex-1 rounded-3xl overflow-hidden bg-black border border-white/10">
            <SpeakerLayout />
          </div>

          {/* CALL CONTROLS (MIC / CAM / LEAVE FIXED) */}
          <div className="bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-3 flex justify-center">
            <CallControls onLeave={() => navigate("/dashboard")} />
          </div>
        </div>

        {/* RIGHT – CHAT */}
        {chatClient && channel && (
          <div
            className={`flex flex-col rounded-3xl overflow-hidden bg-[#0b0f14] border border-white/10 transition-all duration-300 ${
              isChatOpen ? "w-80 opacity-100" : "w-0 opacity-0"
            }`}
          >
            {isChatOpen && (
              <>
                {/* CHAT HEADER */}
                <div className="flex items-center justify-between px-4 py-3 bg-black/50 border-b border-white/10">
                  <h3 className="font-semibold">Session Chat</h3>
                  <button
                    onClick={() => setIsChatOpen(false)}
                    className="text-white/60 hover:text-white"
                  >
                    <XIcon className="w-5 h-5" />
                  </button>
                </div>

                {/* CHAT BODY */}
                <div className="flex-1 overflow-hidden stream-chat-dark">
                  <Chat client={chatClient} theme="str-chat__theme-dark">
                    <Channel channel={channel}>
                      <Window>
                        <MessageList />
                        <MessageInput />
                      </Window>
                      <Thread />
                    </Channel>
                  </Chat>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default VideoCallUI;
