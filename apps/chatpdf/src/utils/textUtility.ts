export const getInitialMsgs = (pdfID: number): any => {
  switch (pdfID) {
    case 1:
      return {
        choices: [
          { text: 'What are the factors influencing decision of crops?', key: "1" },
          { text: 'What is this file about?', key: "2" },
          { text: 'What are the methods to supply irrigation water to plants?', key: "3" },
        ],
      };
    case 2:
      return {
        choices: [
          { text: 'What is the objective of National Food Security Mission?', key: "1" },
          { text: 'What is this file about?', key: "2" },
          { text: 'Can you explain about KALIA?', key: "3" },
        ],
      };
  }
};
