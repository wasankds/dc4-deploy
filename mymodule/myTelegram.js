// 
// import multer from 'multer';
// import fs from 'fs';
// import path from 'path';
// const qs = require('qs');          // V3.95
// const axios = require('axios');    // V3.95

import qs from 'qs';
import axios from 'axios';
// import * as myDateTime from "./myDateTime.js"

//================================================
//
export async function isValidBot(botToken,groupChatId) {
  let isValid = false
  if(botToken.length > 40 && !isNaN(Number(groupChatId)) ){
    if(Number(groupChatId) < 0){
      isValid = true
    }
  }
  return isValid
}



//===============================
// ส่งข้อความเข้ากลุ่ม Telegram
// 
export async function sendMsgToGroup(message, botToken, groupChatId) {
  try {
    const data = qs.stringify({
      chat_id: groupChatId,
      text: message
    })

    const response = await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, 
      data, 
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } } 
    )
    // console.log('Message sent to group successfully:', response.data)
    return response.data
  } catch (error) {
    console.error('Error sending message to group:', error.message)
    return null
  }
}



// //================================================
// // สถานะเอกสาร 0
// // 
// export async function msg_0(obj) {
//   const { dataNewDoc, userFullname, userId, dataSettings } = obj

//   // ตรวจสอบว่า Bot Token และ Group Chat ID ถูกต้องหรือไม่
//   let botToken = dataSettings.TELEGRAM_BOT_TOKEN
//   let groupChatId = dataSettings.TELEGRAM_GROUP_CHAT_ID
//   const isValidBot = this.isValidBot(botToken, groupChatId)
//   if(!isValidBot){
//     return {isSend: false, msg : `{{sep}}ไม่สามารถส่งข้อความแจ้งเตือนใน Telegram ได้`}
//   }

//   // Title
//   const systemTitle = `${SYS_NAME} ${SYS_NAME2} ${SYS_VERSION}`
//   let message = `\n🦢🦢🦢 ${systemTitle} 🦢🦢🦢\n\n` +
//                 '🆕🆕🆕 สร้างเอกสารใหม่ 🆕🆕🆕\n' + 
//                 `(${myDateTime.formatDateTime(new Date())})\n\n`
//   // User
//   message += "👤ผู้ทำกิจกรรมนี้\n" + `${userFullname}(${userId})\n\n`
//   // BMain
//   const placeName = placeToUse.find( o => o.placeId == dataNewDoc.placeId)?.placeName || 'ไม่พบสถานที่'
//   message += `📄ข้อมูลเอกสาร\n`+ 
//             `เลขที่เอกสาร : ${dataNewDoc.docId}\n` + 
//             `เลขสถานะ : ${dataNewDoc.docStatusNum}\n` +
//             `วันที่ยืม : ${dataNewDoc.dateBorrow}\n` +
//             `เลขที่ Job : ${dataNewDoc.jobId}\n` +
//             `สถานที่ : [${dataNewDoc.placeId}] ${placeName}\n` +
//             `ผู้ยืม : ${dataNewDoc.borrowerId}\n` +
//             `ผู้ให้ยืม(Admin) : ${dataNewDoc.giverId}\n\n`
  
//   // BDetail
//   message += "📃รายการ\n"
//   dataNewDoc.itemsBorrow.forEach( (objx,i) => {
//     message += `${Number(i+1)}.) ${objx.itemId} (${objx.itemStatus})\n`
//   })
  
//   const responseData = await this.sendMsgToGroup(message, botToken,groupChatId) 
//   if(responseData && responseData.ok) { // responseData.result
//     return {isSend: true, msg : `{{sep}}ส่งข้อความแจ้งเตือนใน Telegram สำเร็จ`}
//   } else {
//     return {isSend: false, msg : `{{sep}}ไม่สามารถส่งข้อความแจ้งเตือนใน Telegram ได้`}
//   }

// }




// //================================================
// // 1/cancel
// //
// export async function msg_cancel_1(obj) {
//   const {docOld, userFullname, userId, dataSettings} = obj

//   // ตรวจสอบว่า Bot Token และ Group Chat ID ถูกต้องหรือไม่
//   let botToken = dataSettings.TELEGRAM_BOT_TOKEN
//   let groupChatId = dataSettings.TELEGRAM_GROUP_CHAT_ID
//   const isValidBot = this.isValidBot(botToken, groupChatId)
//   if(!isValidBot){
//     return {isSend: false, msg : `{{sep}}ไม่สามารถส่งข้อความแจ้งเตือนใน Telegram ได้`}
//   }

//   // Title
//   const systemTitle = `${SYS_NAME} ${SYS_NAME2} ${SYS_VERSION}`
//   let message = `\n🦢🦢🦢 ${systemTitle} 🦢🦢🦢\n\n` +
//                 '❌❌❌ ยกเลิกเอกสาร ❌❌❌\n' + 
//                 `(${myDateTime.formatDateTime(new Date())})\n\n`
//   // User
//   message += "👤ผู้ทำกิจกรรมนี้\n" + `${userFullname}(${userId})\n\n`
//   // BMain
//   const placeName = placeToUse.find( o => o.placeId == docOld.placeId)?.placeName || 'ไม่พบสถานที่'
//   message += `📄ข้อมูลเอกสาร\n`+ 
//             `เลขที่เอกสาร : ${docOld.docId}\n` + 
//             `เลขสถานะ : ${docOld.docStatusNum}\n` +
//             `วันที่ยืม : ${docOld.dateBorrow}\n` +
//             `เลขที่ Job : ${docOld.jobId}\n` +
//             `สถานที่ : [${docOld.placeId}] ${placeName}\n` +
//             `ผู้ยืม : ${docOld.borrowerId}\n` +
//             `ผู้ให้ยืม(Admin) : ${docOld.giverId}\n\n`
//   // BDetail
//   message += "📃รายการ\n"
//   docOld.itemsBorrow.forEach( (objx,i) => {
//     message += `${Number(i+1)}.) ${objx.itemId} (${objx.itemStatus})\n`
//   })
  
//   // ส่งข้อความ
//   const responseData = await this.sendMsgToGroup(message, botToken,groupChatId) 
//   if(responseData && responseData.ok) { // responseData.result
//     return {isSend: true, msg : `{{sep}}ส่งข้อความแจ้งเตือนใน Telegram สำเร็จ`}
//   } else {
//     return {isSend: false, msg : `{{sep}}ไม่สามารถส่งข้อความแจ้งเตือนใน Telegram ได้`}
//   }

// }



// //================================================
// // x/1 - ปิดเอกสาร
// //
// export async function msg_x_1(obj) {
//   const {doc, userFullname, userId, dataSettings} = obj

//   // ตรวจสอบว่า Bot Token และ Group Chat ID ถูกต้องหรือไม่
//   let botToken = dataSettings.TELEGRAM_BOT_TOKEN
//   let groupChatId = dataSettings.TELEGRAM_GROUP_CHAT_ID
//   const isValidBot = this.isValidBot(botToken, groupChatId)
//   if(!isValidBot){
//     return {isSend: false, msg : `{{sep}}ไม่สามารถส่งข้อความแจ้งเตือนใน Telegram ได้`}
//   }


//   // Title
//   const systemTitle = `${SYS_NAME} ${SYS_NAME2} ${SYS_VERSION}`
//   let message = `\n🦢🦢🦢 ${systemTitle} 🦢🦢🦢\n\n` +
//                 '🔐🔐🔐 ปิดเอกสาร 🔐🔐🔐\n' + 
//                 `(${myDateTime.formatDateTime(new Date())})\n\n`
//   // User
//   message += "👤ผู้ทำกิจกรรมนี้\n" + `${userFullname}(${userId})\n\n`
//   // BMain
//   const placeName = placeToUse.find(o => o.placeId == doc.placeId)?.placeName || 'ไม่พบสถานที่'
//   message += `📄ข้อมูลเอกสาร\n`+ 
//             `เลขที่เอกสาร : ${doc.docId}\n` + 
//             `เลขสถานะ : ${doc.docStatusNum}\n` +
//             `วันที่ยืม : ${doc.dateBorrow}\n` +
//             `เลขที่ Job : ${doc.jobId}\n` +
//             `สถานที่ : [${doc.placeId}] ${placeName}\n` +
//             `ผู้ยืม : ${doc.borrowerId}\n` +
//             `ผู้ให้ยืม(Admin) : ${doc.giverId}\n\n`

//   // BDetail
//   message += "📃รายการ\n"
//   doc.itemsBorrow.forEach( (objx,i) => {
//     message += `${Number(i+1)}.) ${objx.itemId} (${objx.itemStatus})\n`
//   })

//   // ส่งข้อความ
//   const responseData = await this.sendMsgToGroup(message, botToken,groupChatId) 
//   if(responseData && responseData.ok) { // responseData.result
//     return {isSend: true, msg : `{{sep}}ส่งข้อความแจ้งเตือนใน Telegram สำเร็จ`}
//   } else {
//     return {isSend: false, msg : `{{sep}}ไม่สามารถส่งข้อความแจ้งเตือนใน Telegram ได้`}
//   }

// }



// //================================================
// // 1 - อัปเดทสถานะ 1 
// //
// export async function msg_1(obj) {
//   const {
//     docToUpdate,
//     docOld,
//     docId,
//     docStatusNum,
//     userFullname,
//     userId,
//     dataSettings,
//     arr_itemId_Cancel,
//     arr_itemId_Add,
//   } = obj

//   // ตรวจสอบว่า Bot Token และ Group Chat ID ถูกต้องหรือไม่
//   let botToken = dataSettings.TELEGRAM_BOT_TOKEN
//   let groupChatId = dataSettings.TELEGRAM_GROUP_CHAT_ID
//   const isValidBot = this.isValidBot(botToken, groupChatId)
//   if(!isValidBot){
//     return {isSend: false, msg : `{{sep}}ไม่สามารถส่งข้อความแจ้งเตือนใน Telegram ได้`}
//   }

//   // Title
//   const systemTitle = `${SYS_NAME} ${SYS_NAME2} ${SYS_VERSION}`
//   let message = `\n🦢🦢🦢 ${systemTitle} 🦢🦢🦢\n\n` +
//                 '📝(1)📝 Save Update 📝(1)📝\n' + 
//                 `(${myDateTime.formatDateTime(new Date())})\n\n`
//   // User
//   message += "👤ผู้ทำกิจกรรมนี้\n" +
//              `${userFullname}(${userId})\n\n`
//   // เลขที่เอกสาร
//   message += `📄เลขที่เอกสาร : ${docId}\nเลขสถานะ : ${docStatusNum}\n\n`

//   // BMain New
//   const placeNameNew = placeToUse.find( o => o.placeId == docToUpdate.placeId)?.placeName || 'ไม่พบสถานที่'
//   message += "📄ข้อมูลเอกสารใหม่🟢\n" +
//             `วันที่ยืม : ${docToUpdate.dateBorrow}\n` +
//             `เลขที่ Job : ${docToUpdate.jobId}\n` +
//             `สถานที่ : [${docToUpdate.placeId}] ${placeNameNew}\n` +
//             `ผู้ยืม : ${docToUpdate.borrowerId}\n` +
//             `ผู้ให้ยืม(Admin) : ${docToUpdate.giverId}\n\n`
//   // BMain Old
//   const placeNameOld = placeToUse.find( o => o.placeId == docOld.placeId)?.placeName || 'ไม่พบสถานที่'
//   message += "📄ข้อมูลเอกสารเดิม🔴\n" + 
//             `วันที่ยืม : ${docOld.dateBorrow}\n` +
//             `เลขที่ Job : ${docOld.jobId}\n` +
//             `สถานที่ : [${docOld.placeId}] ${placeNameOld}\n` +
//             `ผู้ยืม : ${docOld.borrowerId}\n` +
//             `ผู้ให้ยืม(Admin) : ${docOld.giverId}\n\n`
//   // BDetail
//   message += "รายการ (ที่อัปเดตแล้ว)\n"
//   docToUpdate.itemsBorrow.forEach( (objx,i) => {
//     message += `${Number(i+1)}.) ${objx.itemId} (${objx.itemStatus})\n`
//   })

//   // แจ้งรายการที่เพิ่มหรือถูกยกเลิก
//   message += "\n🔴 รายการที่ยกเลิก (เบิก => ปกติ)\n"
//   message += arr_itemId_Cancel.join(", ")
//   message += "\n🟢 รายการที่เพิ่ม (ปกติ => เบิก)\n"
//   message += arr_itemId_Add.join(", ")
//   if(arr_itemId_Cancel.length == 0 && arr_itemId_Add.length ==0){
//     message += `\n*** รายการเบิกไม่มีอะไรเปลี่ยนแปลง ***`
//   }

//   // ส่งข้อความ
//   const responseData = await this.sendMsgToGroup(message, botToken,groupChatId) 
//   if(responseData && responseData.ok) { // responseData.result
//     return {isSend: true, msg : `{{sep}}ส่งข้อความแจ้งเตือนใน Telegram สำเร็จ`}
//   } else {
//     return {isSend: false, msg : `{{sep}}ไม่สามารถส่งข้อความแจ้งเตือนใน Telegram ได้`}
//   }
// }






// //================================================
// // 2 -อัปเดทสถานะ 2 - รอคืน
// //
// export async function msg_2(obj) {
//   const {
//     docToUpdate,
//     docOld,
//     docId,
//     docStatusNum,
//     userFullname,
//     userId,
//     dataSettings,
//     itemsBorrow,
//   } = obj

//   // ตรวจสอบว่า Bot Token และ Group Chat ID ถูกต้องหรือไม่
//   let botToken = dataSettings.TELEGRAM_BOT_TOKEN
//   let groupChatId = dataSettings.TELEGRAM_GROUP_CHAT_ID
//   const isValidBot = this.isValidBot(botToken, groupChatId)
//   if(!isValidBot){
//     return {isSend: false, msg : `{{sep}}ไม่สามารถส่งข้อความแจ้งเตือนใน Telegram ได้`}
//   }

//   // Title
//   const systemTitle = `${SYS_NAME} ${SYS_NAME2} ${SYS_VERSION}`
//   let message = `\n🦢🦢🦢 ${systemTitle} 🦢🦢🦢\n\n` +
//                 '📝(2)📝 Save Update 📝(2)📝\n' + 
//                 `(${myDateTime.formatDateTime(new Date())})\n\n`

//   // User
//   message += "👤ผู้ทำกิจกรรมนี้\n" +
//             `${userFullname}(${userId})\n\n`

//   // BMain_New
//   const placeName = placeToUse.find( o => o.placeId == docOld.placeId)?.placeName || 'ไม่พบสถานที่'
//   message += "📄ข้อมูลเอกสาร\n" + 
//               `เลขที่เอกสาร : ${docId}\n` + 
//               `เลขสถานะ : ${docStatusNum}\n` +
//               `เลขที่ Job : ${docOld.jobId}\n` +
//               `สถานที่ : [${docOld.placeId}] ${placeName}\n` +
//               `วันที่ยืม : ${docOld.dateBorrow}\n` +
//               `ผู้ยืม : ${docOld.borrowerId}\n` +
//               `ผู้ให้ยืม(Admin) : ${docOld.giverId}\n`  +
//               // ต้องมีฝั่งคืนด้วย
//               `=== ข้อมูลการคืน ===\n` + 
//               `วันที่คืน : ${docToUpdate.dateReturn}\n` + 
//               `ผู้คืน : ${docToUpdate.returnerId}\n` + 
//               `ผู้รับคืน : ${docToUpdate.receiverId}\n` + 
//               `ผู้ตรวจสอบ : ${docToUpdate.checkerId}\n`

//   // BDetail
//   message += "📃รายการ\n"
//   itemsBorrow.forEach( (objx,i) => {
//     const new_itemId = objx.itemId
//     const new_itemStatus = objx.itemStatus
//     const new_itemRemark = objx.itemRemark
//     const new_itemSavePin = objx.itemSavePin
//     const old_itemStatus = docOld.itemsBorrow[i].itemStatus            
//     if(new_itemStatus != old_itemStatus){ //=== ไม่เหมือนกัน - มีการเปลี่ยนสถานะ (ใส่ p - new_itemSavePin)
//       message += `${Number(i+1)}.) ${new_itemId} (${new_itemStatus})` +
//                 `\n\t(${new_itemRemark})(${old_itemStatus} => ${new_itemStatus}) (${new_itemSavePin})\n`
//     }else{ //=== เหมือนกัน - มีการเปลี่ยนสถานะ
//       message += `${Number(i+1)}.) ${new_itemId} (${new_itemStatus})` + 
//                 `\n\t(${new_itemRemark})(${new_itemSavePin})\n`
//     }
//   })

//   // ส่งข้อความ
//   const responseData = await this.sendMsgToGroup(message, botToken,groupChatId) 
//   if(responseData && responseData.ok) { // responseData.result
//     return {isSend: true, msg : `{{sep}}ส่งข้อความแจ้งเตือนใน Telegram สำเร็จ`}
//   } else {
//     return {isSend: false, msg : `{{sep}}ไม่สามารถส่งข้อความแจ้งเตือนใน Telegram ได้`}
//   }

// }






// //================================================
// // f/2 -จ จบเอกสารสถานะ 2
// //
// export async function msg_f_2(obj) {
//   const {
//     docOld,
//     userFullname,
//     userId,
//     dataSettings,
//   } = obj

//   // ตรวจสอบว่า Bot Token และ Group Chat ID ถูกต้องหรือไม่
//   let botToken = dataSettings.TELEGRAM_BOT_TOKEN
//   let groupChatId = dataSettings.TELEGRAM_GROUP_CHAT_ID
//   const isValidBot = this.isValidBot(botToken, groupChatId)
//   if(!isValidBot){
//     return {isSend: false, msg : `{{sep}}ไม่สามารถส่งข้อความแจ้งเตือนใน Telegram ได้`}
//   }

//   // Title
//   const systemTitle = `${SYS_NAME} ${SYS_NAME2} ${SYS_VERSION}`
//   let message = `\n🦢🦢🦢 ${systemTitle} 🦢🦢🦢\n\n` +
//                 '🏁🏁🏁 จบเอกสาร 🏁🏁🏁\n' + 
//                 `(${myDateTime.formatDateTime(new Date())})\n\n`

//   // User
//   message += "👤ผู้ทำกิจกรรมนี้\n" +
//             `${userFullname}(${userId})\n\n`

//   // BMain_New
//   const placeName = placeToUse.find( o => o.placeId == docOld.placeId)?.placeName || 'ไม่พบสถานที่'
//   message += "📄ข้อมูลเอกสาร\n" + 
//             `เลขที่เอกสาร : ${docOld.docId}\n` + 
//             `เลขสถานะ : ${docOld.docStatusNum} ==> 3 \n` +
//             `เลขที่ Job : ${docOld.jobId}\n` +
//             `สถานที่ : [${docOld.placeId}] ${placeName}\n` +
//             `วันที่ยืม : ${docOld.dateBorrow}\n` +
//             `ผู้ยืม : ${docOld.borrowerId}\n` +
//             `ผู้ให้ยืม(Admin) : ${docOld.giverId}\n`  +
//             // ต้องมีฝั่งคืนด้วย
//             `=== ข้อมูลการคืน ===\n` + 
//             `วันที่คืน : ${docOld.dateReturn}\n` + 
//             `ผู้คืน : ${docOld.returnerId}\n` + 
//             `ผู้รับคืน : ${docOld.receiverId}\n` + 
//             `ผู้ตรวจสอบ : ${docOld.checkerId}\n\n`

//   // BDetail
//   message += "📃รายการ\n"
//   docOld.itemsBorrow.forEach( (objx,i) => {
//     message += `${Number(i+1)}.) ${objx.itemId} (${objx.itemStatus})\n`
//   })


//   // ส่งข้อความ
//   const responseData = await this.sendMsgToGroup(message, botToken,groupChatId)
//   if(responseData && responseData.ok) { // responseData.result
//     return {isSend: true, msg : `{{sep}}ส่งข้อความแจ้งเตือนใน Telegram สำเร็จ`}
//   } else {
//     return {isSend: false, msg : `{{sep}}ไม่สามารถส่งข้อความแจ้งเตือนใน Telegram ได้`}
//   }
// }



/* 

ตัวอย่าว responseData.result

Telegram message sent successfully: {
  message_id: 1037,
  from: {
    id: 8046567910,
    is_bot: true,
    first_name: 'WasankdsBot',
    username: 'wasankds_bot'
  },
  chat: {
    id: -4557511552,
    title: 'wasankds_group',
    type: 'group',
    all_members_are_administrators: true,
    accepted_gift_types: {
      unlimited_gifts: false,
      limited_gifts: false,
      unique_gifts: false,
      premium_subscription: false
    }
  },
  date: 1753484446,
  text: '🦢🦢🦢 EBR -N 2.0🦢🦢🦢\n' +
    '\n' +
    '🆕🆕🆕 สร้างเอกสารใหม่ 🆕🆕🆕\n' +
    '(2025-07-26)\n' +
    '\n' +
    '👤ผู้ทำกิจกรรมนี้\n' +
    'MR Wasan Khunnadiloksawet(1000)\n' +
    '\n' +
    '📄ข้อมูลเอกสาร\n' +
    'เลขที่เอกสาร : 1753484440657\n' +
    'เลขสถานะ : 1\n' +
    'วันที่ยืม : 2025-07-24\n' +
    'เลขที่ Job : 2567/007\n' +
    'สถานที่ : inFactory\n' +
    'ผู้ยืม : 1000\n' +
    'ผู้ให้ยืม(Admin) : 1000\n' +
    '\n' +
    '📃รายการ\n' +
    '1.) 10M70SQ0025 (เบิก)\n' +
    '2.) 12M70DP0015 (เบิก)'
}



*/