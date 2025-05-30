"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import Navbar from "../../components/common/Navbar"
import Button from "../../components/common/Button"
import { useAuth } from "../../contexts/AuthContext"
import { mockMessages, mockUsers } from "../../data/mockData"
import { Search, Send, User, MessageSquare } from "lucide-react"
import { format } from "date-fns"

const MessagesPage = () => {
  const { currentUser } = useAuth()
  const [conversations, setConversations] = useState<any[]>([])
  const [activeConversation, setActiveConversation] = useState<any>(null)
  const [newMessage, setNewMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      // Get all conversations for the current user
      const userConversations = mockMessages.filter((convo) => convo.participants.includes(currentUser?.id || ""))

      setConversations(userConversations)

      // Set the first conversation as active by default
      if (userConversations.length > 0 && !activeConversation) {
        setActiveConversation(userConversations[0])
      }

      setLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [currentUser, activeConversation])

  useEffect(() => {
    // Scroll to bottom of messages
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [activeConversation])

  const getOtherParticipant = (conversation: any) => {
    const otherId = conversation.participants.find((id: string) => id !== currentUser?.id)
    return mockUsers.find((user) => user.id === otherId)
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()

    if (!newMessage.trim() || !activeConversation) return

    // Create a new message
    const message = {
      id: `msg-${Date.now()}`,
      senderId: currentUser?.id,
      text: newMessage,
      timestamp: new Date().toISOString(),
      read: false,
    }

    // Update the active conversation
    const updatedConversation = {
      ...activeConversation,
      messages: [...activeConversation.messages, message],
      lastUpdated: new Date().toISOString(),
    }

    // Update the conversations list
    setConversations((prevConversations) =>
      prevConversations.map((convo) => (convo.id === activeConversation.id ? updatedConversation : convo)),
    )

    // Update the active conversation
    setActiveConversation(updatedConversation)

    // Clear the input
    setNewMessage("")
  }

  const filteredConversations = conversations.filter((convo) => {
    if (!searchTerm) return true

    const otherParticipant = getOtherParticipant(convo)
    return otherParticipant?.name.toLowerCase().includes(searchTerm.toLowerCase())
  })

  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()

    // If the message is from today, just show the time
    if (date.toDateString() === now.toDateString()) {
      return format(date, "h:mm a")
    }

    // If the message is from this year, show month and day
    if (date.getFullYear() === now.getFullYear()) {
      return format(date, "MMM d")
    }

    // Otherwise show the full date
    return format(date, "MMM d, yyyy")
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar userType="client" />

      <main className="flex-grow flex flex-col max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-600 mt-1">Communicate with service providers</p>
        </div>

        <div className="flex-grow bg-white rounded-lg shadow-md overflow-hidden flex flex-col md:flex-row">
          {/* Conversations List */}
          <div className="w-full md:w-80 border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div className="flex-grow overflow-y-auto">
              {loading ? (
                <div className="p-4 space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center p-2 animate-pulse">
                      <div className="w-12 h-12 rounded-full bg-gray-200"></div>
                      <div className="ml-3 flex-grow min-w-0">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : filteredConversations.length === 0 ? (
                <div className="text-center py-8">
                  <User size={48} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-gray-500">No conversations found</p>
                </div>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {filteredConversations.map((conversation) => {
                    const otherParticipant = getOtherParticipant(conversation)
                    const lastMessage = conversation.messages[conversation.messages.length - 1]

                    return (
                      <li key={conversation.id}>
                        <button
                          className={`w-full text-left px-4 py-3 hover:bg-gray-50 focus:outline-none transition-colors ${
                            activeConversation?.id === conversation.id ? "bg-blue-50" : ""
                          }`}
                          onClick={() => setActiveConversation(conversation)}
                        >
                          <div className="flex items-center">
                            <img
                              src={otherParticipant?.avatar || "/placeholder.svg"}
                              alt={otherParticipant?.name}
                              className="h-12 w-12 rounded-full object-cover"
                            />
                            <div className="ml-3 flex-grow min-w-0">
                              <div className="flex justify-between items-baseline">
                                <h3 className="text-sm font-medium text-gray-900 truncate">{otherParticipant?.name}</h3>
                                <span className="text-xs text-gray-500">
                                  {formatMessageTime(lastMessage.timestamp)}
                                </span>
                              </div>
                              <p className="text-sm text-gray-500 truncate">
                                {lastMessage.senderId === currentUser?.id ? "You: " : ""}
                                {lastMessage.text}
                              </p>
                            </div>
                          </div>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          </div>

          {/* Conversation */}
          <div className="flex-grow flex flex-col">
            {activeConversation ? (
              <>
                {/* Conversation Header */}
                <div className="px-6 py-4 border-b border-gray-200 flex items-center">
                  <img
                    src={getOtherParticipant(activeConversation)?.avatar || "/placeholder.svg"}
                    alt={getOtherParticipant(activeConversation)?.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div className="ml-3">
                    <h2 className="text-lg font-medium text-gray-900">
                      {getOtherParticipant(activeConversation)?.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {getOtherParticipant(activeConversation)?.userType === "provider" ? "Service Provider" : "Client"}
                    </p>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-grow p-6 overflow-y-auto">
                  <div className="space-y-4">
                    {activeConversation.messages.map((message: any) => {
                      const isCurrentUser = message.senderId === currentUser?.id
                      const sender = isCurrentUser ? currentUser : getOtherParticipant(activeConversation)

                      return (
                        <div key={message.id} className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}>
                          <div className="flex max-w-xs md:max-w-md">
                            {!isCurrentUser && (
                              <img
                                src={sender?.avatar || "/placeholder.svg"}
                                alt={sender?.name}
                                className="h-8 w-8 rounded-full object-cover mr-2 self-end"
                              />
                            )}
                            <div>
                              <div
                                className={`px-4 py-2 rounded-lg ${
                                  isCurrentUser ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
                                }`}
                              >
                                <p className="text-sm">{message.text}</p>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">{formatMessageTime(message.timestamp)}</p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                    <div ref={messagesEndRef} />
                  </div>
                </div>

                {/* Message Input */}
                <div className="px-4 py-3 border-t border-gray-200">
                  <form onSubmit={handleSendMessage} className="flex">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                    <Button type="submit" variant="primary" className="rounded-l-none" disabled={!newMessage.trim()}>
                      <Send size={18} />
                    </Button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex-grow flex flex-col items-center justify-center p-6 text-center">
                <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                  <MessageSquare size={32} className="text-blue-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Your Messages</h3>
                <p className="text-gray-500 max-w-md">
                  Select a conversation to view messages or start a new conversation with a service provider.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default MessagesPage
