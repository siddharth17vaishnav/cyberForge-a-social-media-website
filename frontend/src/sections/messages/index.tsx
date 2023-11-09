import ChatMessage from './ChatMessage'
import ChatHeader from './Header'
import SendMessage from './SendMessage'
const DUMMY = [
  { id: 1, message: 'HOLA', isSender: true },
  { id: 2, message: 'ONI CHAN', isSender: false }
]

const ConversationSection = () => {
  return (
    <div>
      <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen">
        <ChatHeader />
        <div>
          <div
            id="messages"
            className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
            {DUMMY.map(chat => {
              return <ChatMessage key={chat.id} isSender={chat.isSender} message={chat.message} />
            })}
          </div>
          <SendMessage />
        </div>
      </div>
    </div>
  )
}

export default ConversationSection
