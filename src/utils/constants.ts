export const vscodeDebugConfig = {
  configurations: [
    {
      command: "npm run dev --inspect",
      name: "npm run dev --inspect",
      request: "launch",
      type: "node-terminal",
    },
  ],
};

