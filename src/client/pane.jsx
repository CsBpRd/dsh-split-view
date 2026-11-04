function FixedChatView(props) {
  return props.renderSlot("conversation.session", { view: "chat" })
}

export default function PaneConversation(props) {
  const { renderFactorySlot, useSession, useConversation, useSessions, sessionId } = props
  const session = useSession((value) => value)
  const conversation = useConversation((value) => value)
  const summaryBlank = useSessions((state) => state.byId[sessionId]?.blank)
  const shellPhase =
    conversation.activeTargets.size > 0 || (!session.blank && !session.awaitingFirstTurn) || session.running
      ? "active"
      : session.promptAttempted
        ? "engaging"
        : "blank"
  const settling = shellPhase === "blank" && session.openState === "loading" && summaryBlank !== true
  const hero = shellPhase === "blank" && (session.openState === "open" || summaryBlank === true)
  return renderFactorySlot(
    "conversation.content",
    { variant: "embedded", phase: settling ? "settling" : hero ? "hero" : "active", hero },
    { slots: { views: FixedChatView } },
  )
}
