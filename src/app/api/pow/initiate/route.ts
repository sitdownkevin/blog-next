import { Task } from "@/lib/pow/types";
import { v4 as uuidv4 } from 'uuid';

export async function POST() {
  const task: Task = {
    message: uuidv4(),
    difficulty: 5,
  };

  return new Response(JSON.stringify(task), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}