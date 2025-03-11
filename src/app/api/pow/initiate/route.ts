type Task = {
    message: string;
    difficulty: number;
}


export async function GET() {
  // 生成随机消息
  const randomMessage = generateRandomMessage();
  
  const task: Task = {
    message: randomMessage,
    difficulty: 4,
  };

  return new Response(JSON.stringify(task), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}


// 生成随机消息的函数
function generateRandomMessage(): string {
  const timestamp = Date.now().toString();
  const randomPart = Math.random().toString(36).substring(2, 15);
  const additionalRandom = Math.random().toString(36).substring(2, 15);
  const randomMessage = `${timestamp}-${randomPart}-${additionalRandom}`;

  return randomMessage;
}