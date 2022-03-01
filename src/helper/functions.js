import jsPDF from 'jspdf';
import { receiptTemplateData } from './receiptTemplateData';

export function decamelize(str, separator) {
  separator = typeof separator === 'undefined' ? '_' : separator;

  return str
    .replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2')
    .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2')
    .replace(/^\w/, (c) => c.toUpperCase());
}

export const isString = (obj) => {
  return Object.prototype.toString.call(obj) === '[object String]';
};

export const formatDate = (date, type) => {
  let day = date.getDate() + '';
  let month = date.getMonth() + 1 + '';
  let year = date.getFullYear() + '';

  const checkZero = (data) => {
    if (data.length === 1) {
      data = '0' + data;
    }
    return data;
  };
  day = checkZero(day);
  month = checkZero(month);
  year = checkZero(year);

  if (type === 'onlyDate') {
    return day + '/' + month + '/' + year + ' ';
  }

  return day + '/' + month + '/' + year + ' '
};

export const generatePDF = (receipts, id) => {
  const printFields = [
    { field: 'id', x: 200, y: 92, value: '' },
    { field: 'amount', x: 298, y: 92, value: '' },
    { field: 'date', x: 378, y: 92, value: '' },
    { field: 'customer', x: 180, y: 170, value: '' },
    { field: 'amountInLetters', x: 230, y: 205, value: '' },
    { field: 'paymentType', x: 75, y: 242, value: '' },
    { field: 'paymentReason', x: 75, y: 316, value: '' },
    { field: 'details', x: 165, y: 322, value: '' },
    { field: 'receivedBy', x: 128, y: 350, value: '' },
    { field: 'branch', x: 475, y: 92, value: '' }
  ];
  const receipt = receipts.find((r) => r.id === id);
  const print = printFields.map((item) => {
    return receipt[item.field] ? { ...item, value: receipt[item.field] } : item;
  });

  const doc = new jsPDF('p', 'pt');
  doc.addImage(receiptTemplateData, 'JPEG', 0, 27.3, 600, 380);
  doc.addImage(receiptTemplateData, 'JPEG', 0, 434.6, 600, 380);
  print.forEach((r) => {
    doc.setFontSize(14);
    doc.setFont('helvetica');
    doc.setFontType('small');
    if (r.field === 'date') r.value = formatDate(new Date(r.value), 'onlyDate');
    if (r.field === 'branch' || r.field === 'customer' || r.field === 'receivedBy') {
      r.value = r.value.name;
    }
    if (r.field === 'paymentType') {
      r.value = r.value.name;
      switch (r.value) {
        case 'Cash':
          doc.text(165, 242, 'X');
          return doc.text(165, 650, 'X');
        case 'Credit/Debit Card':
          doc.text(240, 242, 'X');
          return doc.text(240, 650, 'X');
        case 'Cheque':
          doc.text(388, 242, 'X');
          return doc.text(388, 650, 'X');
        case 'Bank Deposit':
          doc.text(241, 264, 'X');
          return doc.text(241, 672, 'X');
        case 'Bank Transfer':
          doc.text(468, 242, 'X');
          return doc.text(468, 650, 'X');
        case 'Others':
          doc.text(468, 242, 'X');
          return doc.text(468, 650, 'X');
        default:
          doc.text(388, 264, 'X');
          doc.text(388, 672, 'X');
          doc.setFontSize(12);
          doc.text(440, 260, r.value.toString());
          doc.text(440, 668, r.value.toString());
          return doc.setFontSize(14);
      }
    }
    if (r.field === 'paymentReason') {
      r.value = r.value.name;
      switch (r.value) {
        case 'Donation':
          doc.text(142, 297, 'X');
          return doc.text(142, 705, 'X');
        case 'Donation Box':
          doc.text(228, 297, 'X');
          return doc.text(228, 705, 'X');
        case 'Student Fee':
          doc.text(336, 297, 'X');
          return doc.text(336, 705, 'X');
        default:
          doc.text(432, 297, 'X');
          doc.text(432, 705, 'X');
          doc.setFontSize(10);
          doc.text(480, 292, r.value.toString());
          doc.text(480, 700, r.value.toString());
          return doc.setFontSize(14);
      }
    }
    doc.text(r.x, r.y, r.value.toString());
    doc.text(r.x, r.y + 408, r.value.toString());
  });
  doc.setProperties({
    title: `#${print[0].value} ${print[4].value} Receipt`
  });
  doc.output('dataurlnewwindow');
};

export const handleShowHideButtonOnClick = (data, show) => {
  if(!show && data.length > 0) {
    return data.filter(e => {
      if(!e) return e
      if(e.deletedAt){
        return e.deletedAt === null
      }
      return e.status !== 'DEPROVISIONED'})
  }
  return data
}