export const downloadFile = (reportUrl, filename) => {
  const link = document.createElement('a');
  link.href = reportUrl;
  link.target = '_blank';
  link.download = filename;
  link.click();
};
