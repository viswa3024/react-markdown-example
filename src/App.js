// pages/pdf.js

import React from 'react';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import PDFDocument from './PDFDocument';

const PDFPage = () => (<>
  <PDFViewer width="100%" height="600px">
    <PDFDocument />
  </PDFViewer>
  <PDFDownloadLink document={<PDFDocument />} fileName="document.pdf">
      {({ blob, url, loading, error }) =>
        loading ? 'Loading document...' : 'Download now!'
      }
    </PDFDownloadLink>
  
</>);

export default PDFPage;
