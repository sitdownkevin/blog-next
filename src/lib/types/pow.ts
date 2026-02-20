type Task = {
  message: string;
  difficulty: number;
};

type ValidateParams = {
  task: Task;
  nonce: number;
};

type ValidateResult = {
  isValid: boolean;
  data?: any;
};

export type { Task, ValidateParams, ValidateResult };
