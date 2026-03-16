import getElectron from './getElectron';

export function openWebLink(url: string, openInNewWindow?: boolean) {
  const electron = getElectron();
  if (electron) {
    electron.openExternal(url);
  } else {
    if (openInNewWindow) {
      window.open(url, '_blank');
    } else {
      window.location.href = url;
    }
  }
}

export function copyTextToClipboard(text: string) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text);
  } else {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
    document.body.removeChild(textArea);
  }
}
