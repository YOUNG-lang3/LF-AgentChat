export async function assistantReply(message) {
    await new Promise((resolve) => setTimeout(resolve, 800))
    return `这是对${message}的回复`
}