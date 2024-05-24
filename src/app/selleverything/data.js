import fs from 'fs';
import path from 'path';

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


export async function getData() {
    const filePath = path.join(process.cwd(), 'src/app/selleverything/data.json');
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(jsonData);
  
    // Shuffle the data
    const shuffledData = shuffleArray(data);
  
    return shuffledData;
}
