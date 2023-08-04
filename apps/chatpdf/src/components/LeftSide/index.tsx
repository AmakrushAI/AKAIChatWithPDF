import React, { useContext, useEffect, useState } from 'react';
import styles from './index.module.css';
import messageIcon from '../../assets/icons/message.svg';
import BurgerIcon from '../../assets/icons/burger-menu';
import Image from 'next/image';
import { AppContext } from '../../context';
import toast from 'react-hot-toast';
import { getInitialMsgs } from '../../utils/textUtility';
import { Spinner } from '@chakra-ui/react';

const LeftSide = () => {
  const context = useContext(AppContext);
  const [spinner, setSpinner] = useState(true);
  const {
    pdfList,
    setPdfList,
    selectedPdf,
    setSelectedPdf,
    setMessages,
    collapsed,
    setCollapsed,
    currentPdfId,
    setCurrentPdfId,
  } = context;

  const handleToggleCollapse = () => {
    setCollapsed((prevCollapsed: any) => !prevCollapsed);
  };

  useEffect(() => {
    let pdfListTemp: any[] = [];

    const fetchPdf = async (path: string, name: string, id: any) => {
      try {
        const response = await fetch(path);
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        pdfListTemp.push({
          file: new File([blob], name),
          preview: blobUrl,
          id: id,
        });
      } catch (error) {
        console.error('Error fetching PDF:', error);
      }
    };

    Promise.all([
      fetchPdf(
        '/pdfs/farmerbook.pdf',
        'farmerbook',
        '54f1a626-1150-4070-b7f5-7f478e60285c'
      ),
    ])
      .then(() => {
        setPdfList(pdfListTemp);
        setSpinner(false);
      })
      .catch((error) => {
        toast.error('Error fetching PDFs');
        console.error('Error fetching PDFs:', error);
        setSpinner(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Method to select a PDF
  const selectPdf = (pdf: any, clearMsg?: boolean) => {
    if (clearMsg === undefined) clearMsg = true; // Don't clear messages only if explicitly false passed
    //Dont let select pdf unless response came
    if (context?.loading) {
      toast.error('Please wait for response');
      return;
    }

    // Revoke the URL of the currently-selected PDF, if there is one and clear the messages
    if (selectedPdf) {
      if (pdf.id === currentPdfId) return; // If current selected pdf is selected again, return
      URL.revokeObjectURL(selectedPdf.preview);
      clearMsg && setMessages([]);
    }

    // Create a new object URL for the selected PDF
    const newPreview = URL.createObjectURL(pdf.file);

    // Update the preview for the selected PDF and set it as selected
    const newPdf = { ...pdf, preview: newPreview };
    setSelectedPdf(newPdf);
    setCurrentPdfId(pdf.id);
    // Just change the options for new pdf rest keep the history
    // prevMessages would be empty if clearMsgs is not passed false
    setMessages((prevMessages: any) => [
      getInitialMsgs(pdf.id),
      ...prevMessages.slice(1),
    ]);

    // Update the preview in the pdfList
    const newPdfList = pdfList.map((p: any) =>
      p.file.name === pdf.file.name ? newPdf : p
    );
    setPdfList(newPdfList);

    // Run only for mobile view
    window.innerWidth < 768 && setCollapsed((prev: any) => !prev);
  };

  useEffect(() => {
    if (selectedPdf && selectedPdf.id !== currentPdfId) {
      const pdf = pdfList.filter((p: any) => p.id === currentPdfId); // Select pdf whose context is latest
      selectPdf(pdf[0], false); // Pass false so that even if pdf changes, history remains
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPdfId]);

  return (
    <div className={styles.main}>
      <div style={{ height: '90%' }}>
        <div
          className={styles.pdflist}
          style={{ margin: collapsed ? '20% 0' : '' }}>
          <p className={styles.mobileView} style={{ textAlign: 'center' }}>
            PDF List
          </p>
          <p style={{ textAlign: 'center' }}>{collapsed ? '' : 'PDF List'}</p>
          {spinner ? (
            <div style={{ textAlign: 'center' }}>
              {/*  @ts-ignore */}
              <Spinner />
            </div>
          ) : (
            pdfList.map((pdf: any, i: number) => (
              <div
                className={styles.pdfElement}
                key={i}
                onClick={() => selectPdf(pdf)}>
                <div
                  className={styles.imageContainer}
                  style={{ width: collapsed ? '100%' : '20%' }}>
                  <Image src={messageIcon} alt="" width={25} height={25} />
                </div>
                <div className={styles.mobileView}>{pdf.file.name}</div>
                {!collapsed && (
                  <div className={styles.pdfName}>{pdf.file.name}</div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
      <div className={styles.burgerIcon} onClick={handleToggleCollapse}>
        <BurgerIcon color="white" />
      </div>
    </div>
  );
};

export default LeftSide;
