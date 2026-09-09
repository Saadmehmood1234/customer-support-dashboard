import type { Message } from "../../types/ticket";
import { formatDateTime } from "../../utils/ticketUtils";


interface ConversationProps {
  messages: Message[];
}

export default function Conversation({
  messages
}: ConversationProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <h3 className="text-sm font-semibold text-slate-900">
        Conversation
      </h3>

      <div className="mt-5 space-y-5">
        {messages.map((message) => {
          const isAgent =
            message.role === "agent";

          return (
            <div
              key={message.id}
              className={`flex ${
                isAgent
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] rounded-xl px-4 py-3 ${
                  isAgent
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-800"
                }`}
              >
                <div className="mb-1 flex items-center justify-between gap-4">
                  <span className="text-xs font-semibold">
                    {message.sender}
                  </span>

                  <span
                    className={`text-[11px] ${
                      isAgent
                        ? "text-blue-100"
                        : "text-slate-400"
                    }`}
                  >
                    {formatDateTime(
                      message.timestamp
                    )}
                  </span>
                </div>

                <p className="text-sm leading-6">
                  {message.message}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}