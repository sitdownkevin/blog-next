import { Message } from "@/lib/types/agent";
import { ChatOpenAI } from "@langchain/openai";
import { AIMessage, HumanMessage, SystemMessage } from "@langchain/core/messages";


const reorganizeMessages = (messages: Message[]) => {
    return messages.map((message) => {
        if (message.role === "user") {
            return new HumanMessage(message.content);
        } else if (message.role === "assistant") {
            return new AIMessage(message.content);
        } else if (message.role === "system") {
            return new SystemMessage(message.content);
        } else {
            throw new Error("Invalid message role");
        }
    });
}


export async function POST(request: Request) {
    const { messages }: { messages: Message[] } = await request.json();


    const model = new ChatOpenAI({
        model: "gpt-4o-mini",
        temperature: 0.7,
    });


    const response = await model.invoke(reorganizeMessages(messages));


    return new Response(
        JSON.stringify({
            success: true,
            data: {
                response: response.content,
            },
        })
    )
}