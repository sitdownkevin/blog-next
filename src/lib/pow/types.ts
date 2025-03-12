export type Task = {
  message: string;
  difficulty: number;
};

export type ValidateParams = {
  task: Task;
  nonce: number;
};

export type ValidateResult = {
  isValid: boolean;
  data?: any;
};