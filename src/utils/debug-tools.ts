import fs from 'fs';
import path from 'path';

export class DebugTools {
  saveDataToFile(data: any, fileName: string): void {
    const dirPath = path.resolve(__dirname, '../../tmp');
    const filePath = path.join(dirPath, fileName);

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
      if (err) {
        console.error('Error writing to file', err);
      } else {
        console.log(`Data saved to ${filePath}`);
      }
    });
  }
}
