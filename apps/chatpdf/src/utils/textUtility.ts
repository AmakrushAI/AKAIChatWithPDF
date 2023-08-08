export const getInitialMsgs = (pdfID: any): any => {
  switch (pdfID) {
    case '54f1a626-1150-4070-b7f5-7f478e60285c':
      return {
        choices: [
          { text: 'What is soil?', key: '1' },
          { text: 'What is this file about?', key: '2' },
          { text: 'What is the need for drainage?', key: '3' },
        ],
      };
    case '8afc6b4f-6441-4714-b89d-3ca66ec20cac':
      return {
        choices: [
          { text: 'What is national food security mission?', key: '1' },
          { text: 'What is this file about?', key: '2' },
          { text: 'Tell me about one state sector scheme?', key: '3' },
        ],
      };
  }
};
