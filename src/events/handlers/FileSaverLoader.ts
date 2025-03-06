import { singletonInstance } from '../../common/utils/class.util';

export class FileSaverLoader {
  public static getInstance = singletonInstance(this);
  public saveAsFile(content: string, fileName: string): void {
    const textFileAsBlob = new Blob([content], { type: 'text/plain' });

    const downloadLink = document.createElement('a');
    downloadLink.download = fileName;
    downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
    downloadLink.click();
  }
  public loadFile(callBackForSuccess: (content: string) => void): void {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.setAttribute('accept', 'plain/text');
    fileInput.onchange = async (event): Promise<void> => {
      const { files } = event.target as HTMLInputElement;
      const readFile = files!.item(0);
      const content = await readFile!.text();
      callBackForSuccess(content);
    };
    fileInput.click();
  }
}
