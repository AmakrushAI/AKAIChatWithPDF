export const getInitialMsgs = (pdfID: any): any => {
  switch (pdfID) {
    case "207e343b-4d94-4d03-af6b-d276e79c5b72":
      return {
        choices: [
          { text: 'When was Taj Mahal built?', key: "1" },
          { text: 'What is this file about?', key: "2" },
          { text: 'When was Great wall of China built?', key: "3" },
        ],
      };
    case "b75cdad8-ddd0-48f1-956a-777b507d38f1":
      return {
        choices: [
          { text: 'What is the objective of NEP?', key: "1" },
          { text: 'What is this file about?', key: "2" },
          { text: 'Can you explain about NEP?', key: "3" },
        ],
      };
  }
};
