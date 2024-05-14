import * as fs from 'fs';
import * as path from 'path';

const directoryPath = path.join(__dirname, '../images');

export function getImageForNews(id: string): Promise<Buffer | boolean> {
    return new Promise((resolve, reject) => {
        fs.readdir(directoryPath, async (err, files) => {
            if (err) {
                console.error('Ошибка при чтении директории:', err);
                reject(err);
            }

            const matchingFile = files.find(file => file.startsWith(`${id}-`));

            if (matchingFile) {
                console.log('Найдено изображение:', matchingFile);
                const imagePath = path.join(directoryPath, matchingFile);
                try {
                    const imageBuffer = await fs.promises.readFile(imagePath);
                    resolve(imageBuffer);
                } catch (error) {
                    console.error('Ошибка при чтении изображения:', error);
                    reject(error);
                }
            } else {
                console.log('Изображение не найдено для id:', id);
                resolve(false);
            }
        });
    });
}
