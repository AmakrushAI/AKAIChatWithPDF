import React, { useContext, useEffect } from 'react';
// import Dropzone from 'react-dropzone';
import styles from './index.module.css';
import messageIcon from '../../assets/icons/message.svg';
import BurgerIcon from '../../assets/icons/burger-menu';
import Image from 'next/image';
import { AppContext } from '../../context';
import axios from 'axios';
import toast from 'react-hot-toast';
import { getInitialMsgs } from '../../utils/textUtility';

const LeftSide = () => {
  const context = useContext(AppContext);
  const {
    pdfList,
    setPdfList,
    selectedPdf,
    setSelectedPdf,
    setUploadingPdf,
    setUploadProgress,
    setProcessingPdf,
    setMessages,
    collapsed,
    setCollapsed,
  } = context;

  const handleToggleCollapse = () => {
    setCollapsed((prevCollapsed: any) => !prevCollapsed);
  };

  useEffect(() => {
    let pdfListTemp: any[] = [];

    const fetchPdf = async (path: string, name: string, id: number) => {
      const response = await fetch(path);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      pdfListTemp.push({
        file: new File([blob], name),
        preview: blobUrl,
        id: id,
      });
    };

    fetchPdf('/pdfs/farmerbook.pdf', 'farmerbook', 1)
      .then(() => fetchPdf('/pdfs/schemes.pdf', 'schemes', 2))
      .then(() => setPdfList(pdfListTemp));
  }, []);

  // Method to select a PDF
  const selectPdf = (pdf: any) => {
    //Dont let select pdf unless response came
    if (context?.loading) {
      toast.error('Please wait for response');
      return;
    }

    // Revoke the URL of the currently-selected PDF, if there is one and clear the messages
    if (selectedPdf) {
      URL.revokeObjectURL(selectedPdf.preview);
      setMessages([]);
    }

    // Create a new object URL for the selected PDF
    const newPreview = URL.createObjectURL(pdf.file);

    // Update the preview for the selected PDF and set it as selected
    const newPdf = { ...pdf, preview: newPreview };
    setSelectedPdf(newPdf);
    setMessages([getInitialMsgs(pdf.id)]);

    // Update the preview in the pdfList
    const newPdfList = pdfList.map((p: any) =>
      p.file.name === pdf.file.name ? newPdf : p
    );
    setPdfList(newPdfList);

    // Run only for mobile view
    window.innerWidth < 768 && setCollapsed((prev: any) => !prev);
  };

  return (
    <div className={styles.main}>
      <div>
        <div
          className={styles.pdflist}
          style={{ margin: collapsed ? '20% 0' : '' }}>
            <p className={styles.mobileView} style={{textAlign: 'center'}}>PDF List</p>
            <p style={{textAlign: 'center'}}>{collapsed ? '':'PDF List'}</p>
          {pdfList.map((pdf: any, i: number) => (
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
          ))}
        </div>
      </div>
      <div className={styles.burgerIcon} onClick={handleToggleCollapse}>
        <BurgerIcon color="white" />
      </div>
    </div>
  );
};

export default LeftSide;
