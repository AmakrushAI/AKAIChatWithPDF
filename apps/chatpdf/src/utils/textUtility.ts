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
  }
};
