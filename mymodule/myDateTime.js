
// import multer from 'multer';
// import fs from 'fs';
// import path from 'path';

//===
export function nowLocal() {
  const newDate = new Date();
  const timezoneffsetMinuites = newDate.getTimezoneOffset() // -420 นาที (7 ชม.)
  const timezoneffsetMs = timezoneffsetMinuites * 60000
  const nowLocal = new Date(newDate.getTime() - timezoneffsetMs)
  return nowLocal.toISOString();
}


//==========================================
export function getTimestamp() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}



export function newDateTimeLocal(dateString) {
  if(dateString){
    var newDate = new Date(dateString)  
  }else{
    var newDate = new Date()
  }
  const timezoneffsetMinuites = newDate.getTimezoneOffset()  // -420 นาที (7 ชม.)
  const timezoneffsetMs = timezoneffsetMinuites*60000
  const newDateLocal = new Date(newDate.getTime()-timezoneffsetMs)
  return newDateLocal
}

//=== ไม่ต้องใช้ Offset ก็เป็นเวลาไทยแล้ว
export function tsmsLocal() {
  // const newDate = new Date()  
  // const timezoneffsetMinuites = newDate.getTimezoneOffset();  // -420 นาที (7 ชม.)
  // const timezoneffsetMs = timezoneffsetMinuites*60000;
  // const nowLocal = new Date(newDate.getTime()-timezoneffsetMs)
  // return nowLocal.getTime()
  return new Date().getTime()
}


//===
export function formatDate(date) {
  if (date instanceof Date) {
    const newDate = new Date(date)
    const timezoneffsetMinuites = newDate.getTimezoneOffset() // -420 นาที (7 ชม.)
    const timezoneffsetMs = timezoneffsetMinuites * 60000
    const nowLocal = new Date(newDate.getTime() - timezoneffsetMs)

    const yyyy = newDate.getFullYear().toString().substring(2, 4)
    let mm = nowLocal.getMonth() + 1;
    let dd = nowLocal.getDate()
    if (dd < 10) dd = '0' + dd
    if (mm < 10) mm = '0' + mm
    return dd + '/' + mm + '/' + yyyy
  } else {
    return date;
  }
}
//==
export function formatDateLong(date) {
  if(date instanceof Date){
    const newDate = new Date(date);
    const timezoneffsetMinuites = newDate.getTimezoneOffset();  // -420 นาที (7 ชม.)
    const timezoneffsetMs = timezoneffsetMinuites * 60000;
    const nowLocal = new Date(newDate.getTime()-timezoneffsetMs)
    // 
    const yyyy = newDate.getFullYear().toString() ;
    let mm = nowLocal.getMonth() + 1;
    let dd = nowLocal.getDate();    
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;    
    return dd + '/' + mm + '/' + yyyy;
  }else{ return date }
}

//==
export function formatDateYMD(date) {
  if (date instanceof Date) {
    return date.toLocaleDateString('en-CA');
  } else {
    return date;
  }
}

//==
export function formatDateTime(date) {
  if(date instanceof Date){
    const newDate = new Date(date);
    const timezoneffsetMinuites = newDate.getTimezoneOffset();  // -420 นาที (7 ชม.)
    const timezoneffsetMs = timezoneffsetMinuites * 60000;
    const nowDateLocal = new Date(newDate.getTime()-timezoneffsetMs)

    const yyyy = newDate.getFullYear().toString() ;
    let MM = nowDateLocal.getMonth() + 1;
    let dd = nowDateLocal.getDate();    
    if (dd < 10) dd = '0' + dd;
    if (MM < 10) MM = '0' + MM;
    
    const timeLocal = nowDateLocal.toISOString().split('T')[1] // 12:02:33.451Z
    const time = timeLocal.split(".")[0]    // 12:02:33
    let [h,m] = time.split(":")

    //==== แปลกๆ *** แต่เก็บไว้ก่อน ***
    // var h = Number( (nowDateLocal.getHours()+timezoneffsetMinuites/60)%24 )  ;
    // var m = nowDateLocal.getMinutes();
    // if (h < 10) h = '0' + h;
    // if (m < 10) m = '0' + m;
    // console.log("h ===> " , h)
    // console.log("m ===> " , m)

    return `${yyyy}-${MM}-${dd} ${h}:${m}`
  }else{  // ถ้าไม่ใช่ Date Object 
    return date 
  }
}

//== 
export function formatTime(date) {
  if(date instanceof Date){
    const newDate = new Date(date);    
    const timezoneffset = newDate.getTimezoneOffset()*60000;  
    const localISOTime = (new Date(newDate.getTime() - timezoneffset)).toISOString() // .slice(0, -1);    
    const timeLocal = localISOTime.split('T')[1]
    return timeLocal.split(".")[0]
  }else{ return date }
}

//=======
// แปลงวันที่ไทยแบบเต็มเป็น ISO Date
// thaiDate เช่น  12 สิงหาคม 2568
export function convert_ThaiDate_to_IsoDate(thaiDate) {
  const [day, monthName, year] = thaiDate.split(' ');
  const month = global.MONTH_NAMES.indexOf(monthName)+1;
  return `${year-543}-${String(month).padStart(2,'0')}-${String(day).padStart(2, '0')}`;
}



// //== 
// exports.localDateTime = function (date) {  
//   const newDate = new Date(date);
//   const timezoneffsetMinuites = newDate.getTimezoneOffset();  // -420 นาที (7 ชม.)
//   const timezoneffsetMs = timezoneffsetMinuites * 60000;
//   const nowLocal = new Date(newDate.getTime()-timezoneffsetMs)  
//   return nowLocal
// }

// //===================================================
// // 
// exports.calcStreamChunck = function(obj){
//   const filePath = obj.filePath
//   const range = obj.range
//   const videoSize = fs.statSync(filePath).size
//   const start = Number(range.replace(/\D/g,""))
//   const end = Math.min(start + CHUCKSIZE, videoSize-1)
//   const contentLength = end - start + 1
//   console.log(filePath, start, end, contentLength, (start/videoSize).toFixed(2), videoSize, range)
//   return {
//     start : start,
//     end : end,
//     headers : {
//       "Content-Range" : `bytes ${start}-${end}/${videoSize}`,
//       "Accept-Ranges" : `bytes`,
//       "Content-Length" : contentLength,
//       "Content-Type" : "video/mp4",
//     }
//   }
// }


// //===================================================
// // สร้าง Storage สำหรับ multer. - สำหรับการอัปโหลหไฟล์หลากหลาย
// exports.uploadVideoStorage = function (folderName) {
//   try {
//     var storage = multer.diskStorage({        
//       destination: function (req, file, callback) {
//         const pathFolder = path.join(pathVideos, folderName)
//         callback(null, pathFolder);
//       },
//       filename: function (req, file, callback) {
//         callback(null, file.originalname);
//         // กรณีต้องการเปลี่ยนชื่อใหม่
//         // callback(null, file.fieldname + '-' + Date.now() + file.originalname.match(/\..*$/)[0])
//       }
//     });
//     return storage;
//   } catch (error) {
//     return error;
//   }
// }




// var fs = require('fs');
// // module.exports = function move(oldPath, newPath, callback) {
// exports.move = function (oldPath, newPath, callback) {
//   fs.rename(oldPath, newPath, function (err) {
//     if (err) {
//       if (err.code === 'EXDEV') {
//         copy();
//       } else {
//         callback(err);
//       }
//       return;
//     }
//     callback();
//   });

//   function copy() {
//     var readStream = fs.createReadStream(oldPath);
//     var writeStream = fs.createWriteStream(newPath);
//     readStream.on('error', callback);
//     writeStream.on('error', callback);
//     readStream.on('close', function () {
//       fs.unlink(oldPath, callback);
//     });
//     readStream.pipe(writeStream);
//   }
// }



// //== 
// exports.isOfficialDateTime = function () {
//   //=== วัน จ.-ศ.
//   const now = new Date()

//   //=== ตรวจสอบเวลา
//   const timezoneffsetMinuites = now.getTimezoneOffset();  // -420 นาที (7 ชม.)
//   const timezoneffsetMs = timezoneffsetMinuites * 60000;
//   const nowLocal = new Date(now.getTime()-timezoneffsetMs)
//   // 
//   const daysBoardcast = [1,2,3,4,5]
//   if(daysBoardcast.indexOf(now.getDay()) == -1){
//     console.log("=== Not Date ===") 
//     return false
//   }
//   //
//   const startLocal = new Date(nowLocal)
//   startLocal.setHours(Math.abs(timezoneffsetMinuites/60)+10) // 10:00
//   startLocal.setMinutes(0)
//   startLocal.setSeconds(0)  
//   const breakMorningLocal = new Date(nowLocal)
//   breakMorningLocal.setHours(Math.abs(timezoneffsetMinuites/60)+12) // 12:30
//   breakMorningLocal.setMinutes(30)
//   breakMorningLocal.setSeconds(0)  
//   const startNoonLocal = new Date(nowLocal)
//   startNoonLocal.setHours(Math.abs(timezoneffsetMinuites/60)+13) // 13:50
//   startNoonLocal.setMinutes(50)
//   startNoonLocal.setSeconds(0)
//   const endLocal = new Date(nowLocal)
//   endLocal.setHours(Math.abs(timezoneffsetMinuites/60)+17) // 17:10
//   endLocal.setMinutes(10)
//   endLocal.setSeconds(0)

//   //=== ไม่อยู่ในช่วงเช้า และ ไม่อยู่ในช่วงบ่าย - จบ
//   const checkTime = (nowLocal >= startLocal && nowLocal <= breakMorningLocal) || (nowLocal >= startNoonLocal && nowLocal <= endLocal) 
//   if(!checkTime){
//     // console.log("=== Break ===")
//     return false
//   }
//   return true
// }




// //== V2.2
// exports.formatDateTimeLocal = function (date) {
//   if(date instanceof Date){
//     const newDate = new Date(date);
//     const timezoneffsetMinuites = newDate.getTimezoneOffset();  // -420 นาที (7 ชม.)
//     const timezoneffsetMs = timezoneffsetMinuites * 60000;
//     const nowDateLocal = new Date(newDate.getTime()-timezoneffsetMs)

//     const yyyy = newDate.getFullYear().toString() ;
//     let MM = nowDateLocal.getMonth() + 1;
//     let dd = nowDateLocal.getDate();    
//     if (dd < 10) dd = '0' + dd;
//     if (MM < 10) MM = '0' + MM;
    
//     const timeLocal = nowDateLocal.toISOString().split('T')[1] // 12:02:33.451Z
//     const time = timeLocal.split(".")[0]    // 12:02:33
//     let [h,m] = time.split(":")

//     //==== แปลกๆ *** แต่เก็บไว้ก่อน ***
//     // var h = Number( (nowDateLocal.getHours()+timezoneffsetMinuites/60)%24 )  ;
//     // var m = nowDateLocal.getMinutes();
//     // if (h < 10) h = '0' + h;
//     // if (m < 10) m = '0' + m;
//     // console.log("h ===> " , h)
//     // console.log("m ===> " , m)

//     return `${yyyy}-${MM}-${dd} ${h}:${m}`
//   }else{  // ถ้าไม่ใช่ Date Object 
//     return date 
//   }
// }


// //=== ไม่ต้องใช้ Offset ก็เป็นเวลาไทยแล้ว
// exports.tsmsLocal = function () {
//   // const newDate = new Date()  
//   // const timezoneffsetMinuites = newDate.getTimezoneOffset();  // -420 นาที (7 ชม.)
//   // const timezoneffsetMs = timezoneffsetMinuites*60000;
//   // const nowLocal = new Date(newDate.getTime()-timezoneffsetMs)
//   // return nowLocal.getTime()
//   return new Date().getTime()
// };


// //==
// exports.formatDateLong = function (date) {
//   if(date instanceof Date){
//     const newDate = new Date(date);
//     const timezoneffsetMinuites = newDate.getTimezoneOffset();  // -420 นาที (7 ชม.)
//     const timezoneffsetMs = timezoneffsetMinuites * 60000;
//     const nowLocal = new Date(newDate.getTime()-timezoneffsetMs)
//     // 
//     const yyyy = newDate.getFullYear().toString() ;
//     let mm = nowLocal.getMonth() + 1;
//     let dd = nowLocal.getDate();    
//     if (dd < 10) dd = '0' + dd;
//     if (mm < 10) mm = '0' + mm;    
//     return dd + '/' + mm + '/' + yyyy;
//   }else{ return date }
// }





// const fs = require('fs')
// const CHUCKSIZE = 10**6 ; // 1MB
// const multer = require('multer');
// const path = require('path');

// exports.nowLocal = function () {
//   const newDate = new Date()  
//   const timezoneffsetMinuites = newDate.getTimezoneOffset();  // -420 นาที (7 ชม.)
//   const timezoneffsetMs = timezoneffsetMinuites*60000;
//   const nowLocal = new Date(newDate.getTime()-timezoneffsetMs)
//   return nowLocal.toISOString()
// };

// //=== ไม่ต้องใช้ Offset ก็เป็นเวลาไทยแล้ว
// exports.tsmsLocal = function () {
//   // const newDate = new Date()  
//   // const timezoneffsetMinuites = newDate.getTimezoneOffset();  // -420 นาที (7 ชม.)
//   // const timezoneffsetMs = timezoneffsetMinuites*60000;
//   // const nowLocal = new Date(newDate.getTime()-timezoneffsetMs)
//   // return nowLocal.getTime()
//   return new Date().getTime()
// };

// //==
// exports.formatDateLong = function (date) {
//   if(date instanceof Date){
//     const newDate = new Date(date);
//     const timezoneffsetMinuites = newDate.getTimezoneOffset();  // -420 นาที (7 ชม.)
//     const timezoneffsetMs = timezoneffsetMinuites * 60000;
//     const nowLocal = new Date(newDate.getTime()-timezoneffsetMs)
//     // 
//     const yyyy = newDate.getFullYear().toString() ;
//     let mm = nowLocal.getMonth() + 1;
//     let dd = nowLocal.getDate();    
//     if (dd < 10) dd = '0' + dd;
//     if (mm < 10) mm = '0' + mm;    
//     return dd + '/' + mm + '/' + yyyy;
//   }else{ return date }
// }
// //==
// exports.formatDate = function (date) {
//   if(date instanceof Date){
//     const newDate = new Date(date);
//     const timezoneffsetMinuites = newDate.getTimezoneOffset();  // -420 นาที (7 ชม.)
//     const timezoneffsetMs = timezoneffsetMinuites * 60000;
//     const nowLocal = new Date(newDate.getTime()-timezoneffsetMs)
//     // 
//     const yyyy = newDate.getFullYear().toString().substring(2,4) ;
//     let mm = nowLocal.getMonth() + 1;
//     let dd = nowLocal.getDate();    
//     if (dd < 10) dd = '0' + dd;
//     if (mm < 10) mm = '0' + mm;    
//     return dd + '/' + mm + '/' + yyyy;
//   }else{ return date }
// }
// //== 
// exports.formatTime = function (date) {
//   if(date instanceof Date){
//     const newDate = new Date(date);    
//     const timezoneffset = newDate.getTimezoneOffset()*60000;  
//     const localISOTime = (new Date(newDate.getTime() - timezoneffset)).toISOString() // .slice(0, -1);    
//     const timeLocal = localISOTime.split('T')[1]
//     return timeLocal.split(".")[0]
//   }else{ return date }
// }

// // //== V2.2
// exports.formatDateTime = function (date) {
//   if(date instanceof Date){
//     const newDate = new Date(date);
//     const timezoneffsetMinuites = newDate.getTimezoneOffset();  // -420 นาที (7 ชม.)
//     const timezoneffsetMs = timezoneffsetMinuites * 60000;
//     const nowDateLocal = new Date(newDate.getTime()-timezoneffsetMs)

//     const yyyy = newDate.getFullYear().toString() ;
//     let MM = nowDateLocal.getMonth() + 1;
//     let dd = nowDateLocal.getDate();    
//     if (dd < 10) dd = '0' + dd;
//     if (MM < 10) MM = '0' + MM;
    
//     const timeLocal = nowDateLocal.toISOString().split('T')[1] // 12:02:33.451Z
//     const time = timeLocal.split(".")[0]    // 12:02:33
//     let [h,m] = time.split(":")

//     //==== แปลกๆ *** แต่เก็บไว้ก่อน ***
//     // var h = Number( (nowDateLocal.getHours()+timezoneffsetMinuites/60)%24 )  ;
//     // var m = nowDateLocal.getMinutes();
//     // if (h < 10) h = '0' + h;
//     // if (m < 10) m = '0' + m;
//     // console.log("h ===> " , h)
//     // console.log("m ===> " , m)

//     return `${yyyy}-${MM}-${dd} ${h}:${m}`
//   }else{  // ถ้าไม่ใช่ Date Object 
//     return date 
//   }
// }


// // //== V2.2
// // exports.formatDateTimeLocal = function (date) {
// //   if(date instanceof Date){
// //     const newDate = new Date(date);
// //     const timezoneffsetMinuites = newDate.getTimezoneOffset();  // -420 นาที (7 ชม.)
// //     const timezoneffsetMs = timezoneffsetMinuites * 60000;
// //     const nowDateLocal = new Date(newDate.getTime()-timezoneffsetMs)

// //     const yyyy = newDate.getFullYear().toString() ;
// //     let MM = nowDateLocal.getMonth() + 1;
// //     let dd = nowDateLocal.getDate();    
// //     if (dd < 10) dd = '0' + dd;
// //     if (MM < 10) MM = '0' + MM;
    
// //     const timeLocal = nowDateLocal.toISOString().split('T')[1] // 12:02:33.451Z
// //     const time = timeLocal.split(".")[0]    // 12:02:33
// //     let [h,m] = time.split(":")

// //     //==== แปลกๆ *** แต่เก็บไว้ก่อน ***
// //     // var h = Number( (nowDateLocal.getHours()+timezoneffsetMinuites/60)%24 )  ;
// //     // var m = nowDateLocal.getMinutes();
// //     // if (h < 10) h = '0' + h;
// //     // if (m < 10) m = '0' + m;
// //     // console.log("h ===> " , h)
// //     // console.log("m ===> " , m)

// //     return `${yyyy}-${MM}-${dd} ${h}:${m}`
// //   }else{  // ถ้าไม่ใช่ Date Object 
// //     return date 
// //   }
// // }

// //== 
// exports.localDateTime = function (date) {  
//   const newDate = new Date(date);
//   const timezoneffsetMinuites = newDate.getTimezoneOffset();  // -420 นาที (7 ชม.)
//   const timezoneffsetMs = timezoneffsetMinuites * 60000;
//   const nowLocal = new Date(newDate.getTime()-timezoneffsetMs)  
//   return nowLocal
// }

// //===================================================
// // 
// exports.calcStreamChunck = function(obj){
//   const filePath = obj.filePath
//   const range = obj.range
//   const videoSize = fs.statSync(filePath).size
//   const start = Number(range.replace(/\D/g,""))
//   const end = Math.min(start + CHUCKSIZE, videoSize-1)
//   const contentLength = end - start + 1
//   console.log(filePath, start, end, contentLength, (start/videoSize).toFixed(2), videoSize, range)
//   return {
//     start : start,
//     end : end,
//     headers : {
//       "Content-Range" : `bytes ${start}-${end}/${videoSize}`,
//       "Accept-Ranges" : `bytes`,
//       "Content-Length" : contentLength,
//       "Content-Type" : "video/mp4",
//     }
//   }
// }


// //===================================================
// // สร้าง Storage สำหรับ multer. - สำหรับการอัปโหลหไฟล์หลากหลาย
// exports.uploadVideoStorage = function (folderName) {
//   try {
//     var storage = multer.diskStorage({        
//       destination: function (req, file, callback) {
//         const pathFolder = path.join(pathVideos, folderName)
//         callback(null, pathFolder);
//       },
//       filename: function (req, file, callback) {
//         callback(null, file.originalname);
//         // กรณีต้องการเปลี่ยนชื่อใหม่
//         // callback(null, file.fieldname + '-' + Date.now() + file.originalname.match(/\..*$/)[0])
//       }
//     });
//     return storage;
//   } catch (error) {
//     return error;
//   }
// }

// //===================================================
// //
// exports.uploadImagesStorage = function (imagesAbsPath) {
//   try {
//     var storage = multer.diskStorage({        
//       destination: function (req, file, callback) {
//         callback(null, imagesAbsPath);
//       },
//       filename: function (req, file, callback) {
//         callback(null, file.originalname);
//       }
//     });
//     return storage;
//   } catch (error) {
//     return error;
//   }
// }




// // var fs = require('fs');
// // // module.exports = function move(oldPath, newPath, callback) {
// // exports.move = function (oldPath, newPath, callback) {
// //   fs.rename(oldPath, newPath, function (err) {
// //     if (err) {
// //       if (err.code === 'EXDEV') {
// //         copy();
// //       } else {
// //         callback(err);
// //       }
// //       return;
// //     }
// //     callback();
// //   });

// //   function copy() {
// //     var readStream = fs.createReadStream(oldPath);
// //     var writeStream = fs.createWriteStream(newPath);
// //     readStream.on('error', callback);
// //     writeStream.on('error', callback);
// //     readStream.on('close', function () {
// //       fs.unlink(oldPath, callback);
// //     });
// //     readStream.pipe(writeStream);
// //   }
// // }



// // //== 
// // exports.isOfficialDateTime = function () {
// //   //=== วัน จ.-ศ.
// //   const now = new Date()

// //   //=== ตรวจสอบเวลา
// //   const timezoneffsetMinuites = now.getTimezoneOffset();  // -420 นาที (7 ชม.)
// //   const timezoneffsetMs = timezoneffsetMinuites * 60000;
// //   const nowLocal = new Date(now.getTime()-timezoneffsetMs)
// //   // 
// //   const daysBoardcast = [1,2,3,4,5]
// //   if(daysBoardcast.indexOf(now.getDay()) == -1){
// //     console.log("=== Not Date ===") 
// //     return false
// //   }
// //   //
// //   const startLocal = new Date(nowLocal)
// //   startLocal.setHours(Math.abs(timezoneffsetMinuites/60)+10) // 10:00
// //   startLocal.setMinutes(0)
// //   startLocal.setSeconds(0)  
// //   const breakMorningLocal = new Date(nowLocal)
// //   breakMorningLocal.setHours(Math.abs(timezoneffsetMinuites/60)+12) // 12:30
// //   breakMorningLocal.setMinutes(30)
// //   breakMorningLocal.setSeconds(0)  
// //   const startNoonLocal = new Date(nowLocal)
// //   startNoonLocal.setHours(Math.abs(timezoneffsetMinuites/60)+13) // 13:50
// //   startNoonLocal.setMinutes(50)
// //   startNoonLocal.setSeconds(0)
// //   const endLocal = new Date(nowLocal)
// //   endLocal.setHours(Math.abs(timezoneffsetMinuites/60)+17) // 17:10
// //   endLocal.setMinutes(10)
// //   endLocal.setSeconds(0)

// //   //=== ไม่อยู่ในช่วงเช้า และ ไม่อยู่ในช่วงบ่าย - จบ
// //   const checkTime = (nowLocal >= startLocal && nowLocal <= breakMorningLocal) || (nowLocal >= startNoonLocal && nowLocal <= endLocal) 
// //   if(!checkTime){
// //     // console.log("=== Break ===")
// //     return false
// //   }
// //   return true
// // }
