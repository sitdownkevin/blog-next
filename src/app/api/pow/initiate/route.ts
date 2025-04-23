import { Task } from "@/lib/pow/types";
import { v4 as uuidv4 } from 'uuid';

export async function POST() {
  const task: Task = {
    message: uuidv4(),
    difficulty: Math.floor(Math.random() * 2) + 4,
  };

  return new Response(JSON.stringify(task), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}