export type SeedMode = "planner" | "widget" | "plan";

export type SeedMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export type SeedPrompt = {
  label: string;
  prompt: string;
};
