import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Sparkles,
  Bot,
  User,
  ArrowRight,
  Loader2,
  DollarSign,
  Clock,
  Star,
  ShieldCheck,
  Award,
  RefreshCw,
} from 'lucide-react';
import { Creator, ChatMessage } from '../types';

interface ClientServiceChatboxProps {
  creators: Creator[];
  onSelectCreator: (creator: Creator) => void;
  onRequestCollaboration: (creator: Creator, customBrief?: string, customBudget?: string) => void;
}

export const ClientServiceChatbox: React.FC<ClientServiceChatboxProps> = ({
  creators,
  onSelectCreator,
  onRequestCollaboration,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      role: 'assistant',
      content:
        "Welcome to SkillBridge AI. Tell me what type of work you need done, your budget, and any aesthetic or timeline requirements. As you share your brief, I'll analyze the scope and present the portfolios of verified creators who have logged in with those skills.",
      timestamp: 'Just now',
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [budgetInput, setBudgetInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const samplePrompts = [
    {
      label: 'Commercial Video Finishing',
      text: 'I need a commercial video editor who specializes in DaVinci Resolve color grading, 35mm film emulation, and high-retention pacing for a 60-second brand anthem. Budget is around $3,000.',
    },
    {
      label: 'Editorial Studio Photography',
      text: 'Looking for an editorial photographer to shoot our luxury architectural stoneware collection in studio with sculptural natural light. Budget is $2,500.',
    },
    {
      label: 'Brand Identity & Packaging',
      text: 'Need a brand identity and packaging graphic designer for a pre-launch apothecary line. Require custom typography and box dielines. Budget around $3,800.',
    },
    {
      label: 'YouTube Documentary Script',
      text: 'Seeking a seasoned narrative scriptwriter for a 20-minute video essay on industrial design. Deep research and high-retention beat mapping required. Budget is $1,800.',
    },
    {
      label: 'Viral Short-Form UGC',
      text: 'Launching studio headphones and need a creator to script, shoot, and edit 6 high-retention 9:16 vertical reels for TikTok and Instagram. Budget around $2,200.',
    },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const content = textToSend || inputText;
    if (!content.trim() || isSending) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: budgetInput ? `${content} (Target Budget: ${budgetInput})` : content,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputText('');
    setIsSending(true);

    try {
      const response = await fetch('/api/client-service-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({ role: m.role, content: m.content })),
          creators,
        }),
      });

      const json = await response.json();
      if (json.success && json.data) {
        const assistantMessage: ChatMessage = {
          id: `asst-${Date.now()}`,
          role: 'assistant',
          content: json.data.replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          matchedCreatorIds: json.data.matchedCreatorIds,
          matchingReasons: json.data.matchingReasons,
        };
        setMessages((prev) => [...prev, assistantMessage]);
      }
    } catch (err) {
      console.error('Error during client chat:', err);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="py-8 bg-[#06141B] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-6">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#9BA8AB] mb-1">
          <Sparkles className="w-3.5 h-3.5 text-[#CCD0CF]" />
          <span>Interactive Client Matchmaking</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#CCD0CF]">
          I Need a Service · AI Talent Chatbox
        </h2>
        <p className="text-xs sm:text-sm text-[#9BA8AB] mt-1">
          Chat directly with the AI Producer. Share the work you need, target budget, and requirements. The AI immediately analyzes your task and assigns matching creator portfolios.
        </p>
      </div>

      {/* Main Chat Container */}
      <div className="max-w-4xl mx-auto bg-[#11212D] border border-[#253745] rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[750px]">
        {/* Chat Header Bar */}
        <div className="p-4 bg-[#06141B] border-b border-[#253745] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#11212D] border border-[#253745] flex items-center justify-center text-[#CCD0CF]">
              <Bot className="w-5 h-5 text-[#CCD0CF]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-[#CCD0CF]">SkillBridge AI Producer</span>
                <span className="text-[10px] font-mono text-[#CCD0CF] bg-[#253745] px-1.5 py-0.5 rounded">
                  Gemini 3.8 Flash
                </span>
              </div>
              <span className="text-[11px] text-[#9BA8AB]">
                Active matching across {creators.length} logged-in creators
              </span>
            </div>
          </div>

          <button
            onClick={() =>
              setMessages([
                {
                  id: 'msg-welcome-fresh',
                  role: 'assistant',
                  content:
                    "Welcome back. Tell me what type of work you need done, your budget, and any aesthetic or timeline requirements.",
                  timestamp: 'Just now',
                },
              ])
            }
            className="flex items-center gap-1.5 text-xs text-[#9BA8AB] hover:text-[#CCD0CF] transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Reset Chat</span>
          </button>
        </div>

        {/* Messages Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';

            return (
              <div key={msg.id} className={`flex gap-3.5 ${isUser ? 'justify-end' : 'justify-start'}`}>
                {!isUser && (
                  <div className="w-8 h-8 rounded-lg bg-[#06141B] border border-[#253745] flex items-center justify-center text-[#CCD0CF] shrink-0 mt-0.5">
                    <Bot className="w-4 h-4 text-[#CCD0CF]" />
                  </div>
                )}

                <div className={`max-w-[85%] space-y-3 ${isUser ? 'items-end' : 'items-start'}`}>
                  {/* Bubble */}
                  <div
                    className={`p-4 rounded-xl text-xs sm:text-sm leading-relaxed ${
                      isUser
                        ? 'bg-[#253745] text-[#CCD0CF] border border-[#4A5C6A] rounded-tr-none'
                        : 'bg-[#06141B] text-[#CCD0CF] border border-[#253745] rounded-tl-none'
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.content}</p>
                    <span className="text-[10px] text-[#9BA8AB] block mt-2 text-right font-mono">
                      {msg.timestamp}
                    </span>
                  </div>

                  {/* If assistant attached matched creator portfolios */}
                  {msg.matchedCreatorIds && msg.matchedCreatorIds.length > 0 && (
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#9BA8AB]">
                        <Award className="w-3.5 h-3.5 text-[#CCD0CF]" />
                        <span>Matched Creator Portfolios Assigned to Your Task:</span>
                      </div>

                      <div className="grid grid-cols-1 gap-3">
                        {msg.matchedCreatorIds.map((cId) => {
                          const creator = creators.find((c) => c.id === cId);
                          if (!creator) return null;

                          const matchReason = msg.matchingReasons?.find((r) => r.creatorId === cId)?.reason;
                          const topWork = creator.portfolioItems[0];

                          return (
                            <div
                              key={creator.id}
                              className="bg-[#06141B] border border-[#253745] hover:border-[#4A5C6A] rounded-xl p-4 transition-all shadow-md flex flex-col sm:flex-row gap-4 items-start justify-between"
                            >
                              <div className="flex items-start gap-3.5 flex-1">
                                <img
                                  src={creator.avatar}
                                  alt={creator.name}
                                  className="w-12 h-12 rounded-lg object-cover border border-[#253745] shrink-0"
                                />
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <h4 className="text-sm font-bold text-[#CCD0CF]">{creator.name}</h4>
                                    {creator.verified && (
                                      <ShieldCheck className="w-3.5 h-3.5 text-[#9BA8AB]" />
                                    )}
                                    {creator.ranking && (
                                      <span className="text-[10px] font-mono text-[#CCD0CF] bg-[#11212D] border border-[#253745] px-1.5 py-0.5 rounded">
                                        Craft Score: {creator.ranking.craftScore}
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-xs text-[#9BA8AB] block">
                                    {creator.disciplineLabel} · ${creator.rate}/hr · {creator.availability}
                                  </span>

                                  {matchReason && (
                                    <p className="text-xs text-[#CCD0CF] bg-[#11212D]/60 p-2 rounded border border-[#253745]/60 mt-1.5 leading-snug">
                                      <strong className="text-[#9BA8AB]">AI Match: </strong>
                                      {matchReason}
                                    </p>
                                  )}

                                  {topWork && (
                                    <div className="text-[11px] text-[#9BA8AB] font-mono pt-1">
                                      Uploaded Work: <span className="text-[#CCD0CF]">{topWork.title}</span> ({topWork.category})
                                    </div>
                                  )}
                                </div>
                              </div>

                              <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#253745]">
                                <div className="text-right text-xs font-mono text-[#CCD0CF]">
                                  <span>Starts at ${creator.startingProjectRate}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => onSelectCreator(creator)}
                                    className="px-2.5 py-1.5 text-xs text-[#CCD0CF] hover:text-white bg-[#11212D] hover:bg-[#253745] rounded border border-[#253745] cursor-pointer"
                                  >
                                    View Portfolio
                                  </button>

                                  <button
                                    onClick={() => onRequestCollaboration(creator, msg.content, budgetInput)}
                                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-[#06141B] bg-[#CCD0CF] hover:bg-white rounded cursor-pointer shadow-xs"
                                  >
                                    <span>Reach Out</span>
                                    <ArrowRight className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {isUser && (
                  <div className="w-8 h-8 rounded-lg bg-[#253745] border border-[#4A5C6A] flex items-center justify-center text-[#CCD0CF] shrink-0 mt-0.5">
                    <User className="w-4 h-4 text-[#CCD0CF]" />
                  </div>
                )}
              </div>
            );
          })}

          {isSending && (
            <div className="flex gap-3.5 items-center text-xs text-[#9BA8AB]">
              <div className="w-8 h-8 rounded-lg bg-[#06141B] border border-[#253745] flex items-center justify-center text-[#CCD0CF]">
                <Loader2 className="w-4 h-4 animate-spin text-[#CCD0CF]" />
              </div>
              <span>AI is analyzing your scope and matching creator portfolios...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Requirement Chips */}
        <div className="p-3 bg-[#06141B]/80 border-t border-[#253745] overflow-x-auto flex gap-2">
          {samplePrompts.map((p, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSendMessage(p.text)}
              className="text-[11px] whitespace-nowrap bg-[#11212D] hover:bg-[#253745] text-[#9BA8AB] hover:text-[#CCD0CF] px-3 py-1.5 rounded border border-[#253745] transition-colors cursor-pointer shrink-0"
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-[#06141B] border-t border-[#253745]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="space-y-3"
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Mention what type of work you want, aesthetic details, deliverables..."
                className="flex-1 bg-[#11212D] border border-[#253745] rounded-lg p-3 text-xs sm:text-sm text-[#CCD0CF] placeholder-[#4A5C6A] focus:outline-none focus:border-[#9BA8AB]"
              />

              <div className="w-36 relative hidden sm:block">
                <DollarSign className="w-3.5 h-3.5 text-[#4A5C6A] absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={budgetInput}
                  onChange={(e) => setBudgetInput(e.target.value)}
                  placeholder="Budget (e.g. $2.5k)"
                  className="w-full bg-[#11212D] border border-[#253745] rounded-lg p-3 pl-7 text-xs text-[#CCD0CF] placeholder-[#4A5C6A] focus:outline-none focus:border-[#9BA8AB]"
                />
              </div>

              <button
                type="submit"
                disabled={isSending || !inputText.trim()}
                className="px-5 bg-[#CCD0CF] hover:bg-white text-[#06141B] rounded-lg transition-colors disabled:opacity-40 cursor-pointer flex items-center justify-center shrink-0"
                title="Send message"
              >
                <Send className="w-4 h-4 text-[#06141B]" />
              </button>
            </div>

            <div className="text-[11px] text-[#9BA8AB] flex items-center justify-between">
              <span>Mention budget & timeline to refine creator portfolio ranking</span>
              <span className="font-mono">Press Enter to send</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
