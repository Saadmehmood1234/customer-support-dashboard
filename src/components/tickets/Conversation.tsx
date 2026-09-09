import type { Message } from "../../types/ticket";
import { formatDateTime } from "../../utils/ticketUtils";

interface ConversationProps {
  messages: Message[];
}

export default function Conversation({
  messages,
}: ConversationProps) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h3 className="text-sm font-semibold text-foreground">
        Conversation
      </h3>

      <div className="mt-5 space-y-5">
        {messages.map((message) => {
          const isAgent = message.role === "agent";

          return (
            <div
              key={message.id}
              className={`flex ${
                isAgent ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[85%] rounded-xl px-4 py-3 ${
                  isAgent
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                }`}
              >
                <div className="mb-1 flex items-center justify-between gap-4">
                  <span className="text-xs font-semibold">
                    {message.sender}
                  </span>

                  <span
                    className={`text-[11px] ${
                      isAgent
                        ? "text-primary-foreground/70"
                        : "text-muted-foreground"
                    }`}
                  >
                    {formatDateTime(message.timestamp)}
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