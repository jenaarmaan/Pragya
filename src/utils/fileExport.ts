/**
 * PRAGYA File Exporter Utility
 * Generates and triggers real browser downloads of industrial business artifacts.
 */
export function downloadFile(filename: string, content: string, mimeType: string = 'text/plain') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function downloadArtifact(name: string, content: string, format: string) {
  let mimeType = 'text/plain;charset=utf-8';

  switch (format.toUpperCase()) {
    case 'DOCX':
      // For real browser download without requiring binary docx build server,
      // output formatted document file
      mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      // If downloaded as text representation or document
      downloadFile(name, content, 'text/plain;charset=utf-8');
      break;
    case 'PY':
      mimeType = 'text/x-python;charset=utf-8';
      downloadFile(name, content, mimeType);
      break;
    case 'XLSX':
    case 'CSV':
      mimeType = 'text/csv;charset=utf-8';
      downloadFile(name.endsWith('.csv') ? name : name.replace('.xlsx', '.csv'), content, mimeType);
      break;
    case 'JSON':
      mimeType = 'application/json;charset=utf-8';
      downloadFile(name, content, mimeType);
      break;
    case 'PDF':
      mimeType = 'application/pdf';
      downloadFile(name.replace('.pdf', '.txt'), content, 'text/plain;charset=utf-8');
      break;
    default:
      downloadFile(name, content, mimeType);
  }
}
