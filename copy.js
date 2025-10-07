import fs from 'fs';
import path from 'path';

//=== โฟลเดอร์เก็บโปรเจกต์
const __dirname = path.dirname(new URL(import.meta.url).pathname);
let destProjectDir = __dirname;
if (destProjectDir.startsWith('/') && /^[A-Za-z]:/.test(destProjectDir.slice(1, 3))) {
  destProjectDir = destProjectDir.slice(1);
}
console.log(`------------------------------`);
console.log('destProjectDir ===> ' , destProjectDir); // D:/aWK_LeaseSystem/DC4-Deploy

//=== โฟลเดอร์ต้นทางที่จะก๊อปปี้
const sourceProject = 'D:\\aWK_LeaseSystem\\DC4';

//=== โฟลเดอร์ที่จะก๊อปปี้ ใช้กับทั้งต้นทาง และ ปลายทาง
const folderNames = [
  // โฟลเดอร์ระบบ
  'middleware', 'mymodule-min', 'routes-min',  'views', 'commandSystem-min',  
  // โฟลเดอร์ public แยกย่อยด้วย 
  'public/cdn', 'public/css-min', 'public/fonts', 'public/images', 'public/js-min', 'public/static', 
  // โฟลเดอร์สำหรับเก็บข้อมูลเอนทิตี้ 
  'docs', 'items', 'users',                          
];
//=== ไฟล์ที่จะก๊อปปี้ ใช้กับทั้งต้นทาง และ ปลายทาง
const fileNames = [
  'dc4.js',
  '.env-deploy',
  'package.json',
  'README.md',
  // '.gitignore' ,  ไม่เหมือนกันระหว่าง dev กับ deploy
];

//=== สร้าางตัวแปรใหม่ที่มีโครงสร้าง
//  { copyType: 'folder' | 'file', source: 'path', destination: 'path' }
// 
const sourceDir = [
  ...folderNames.map(name => ({
    copyType: 'folder',
    source: path.join(sourceProject, name),
    destination: path.join(destProjectDir, name)
  })),
  ...fileNames.map(name => ({
    copyType: 'file',
    source: path.join(sourceProject, name),
    destination: path.join(destProjectDir, name)
  }))
];


let i=0
for (const obj of sourceDir) {
  const { copyType, source, destination } = obj;
  if (copyType === 'folder') {
    copyFolderRecursiveSync(source, destination);
  } else if (copyType === 'file') {
    fs.copyFileSync(source, destination);
  }
  console.log(`---------------------------------------`);
  console.log(`Copied [${copyType}] ${source} -> ${destination}`);
}

//==============================================
// ฟังก์ชันสำหรับการก๊อปปี้โฟลเดอร์แบบ recursive ***
// - ก๊อปปี้โฟลเดอร์ ย่อยและไฟล์ภายในด้วย 
// 
function copyFolderRecursiveSync(src, dest) {
  i++;
  console.log(`${i}). Copying from ${src} ===> ${dest}`);
  if (!fs.existsSync(src)) return;
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyFolderRecursiveSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}


