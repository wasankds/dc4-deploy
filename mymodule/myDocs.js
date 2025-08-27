
import { MongoClient } from 'mongodb';
import { formatNumber_as_Thai } from  "./myModule.js"



//================================================
// ใช้สำหรับจับชื่อ collection จาก docTitle
// เช่น docTitle === global.PAGE_QUOTATION จะได้ global.dbColl_quotation
// 
export function getCollName_by_DocTitle(docTitle) {

  //=== เอกสาร
  if(docTitle === global.PAGE_QUOTATION){
    var collName = global.dbColl_quotation
  }else  if(docTitle === global.PAGE_INVOICE){
    var collName = global.dbColl_invoice
  }else if(docTitle === global.PAGE_RECEIPT){
    var collName = global.dbColl_receipt
  }else if(docTitle === global.PAGE_BILL){
    var collName = global.dbColl_bill
  }
  //=== รายงาน
  else if(docTitle === global.PAGE_REPORT_QUOTATION){
    var collName = global.dbColl_quotation
  }else if(docTitle === global.PAGE_REPORT_INVOICE){
    var collName = global.dbColl_invoice
  }else if(docTitle === global.PAGE_REPORT_RECEIPT){
    var collName = global.dbColl_receipt
  }else if(docTitle === global.PAGE_REPORT_BILL){
    var collName = global.dbColl_bill
  }
  //=== อื่นๆ - ไม่ควรมีแบบนี้ 
  else{
    var collName = ''
  }
  return collName
}



//============================================= 
// แปลงชนิดข้อมูล พร้อมสำหรับการเขียนลง DB
// - ใช้กับ quotation/invoice
// - ไม่ได้เแปลงทุกตัว แปลงเฉพาะที่ต้องเป็นตัวเลข
export function convert_DocDataType(doc) {
  doc.docStatusNumber = doc.docStatusNumber ? Number(doc.docStatusNumber) : doc.docStatusNumber 
  doc.customerId = doc.customerId ? Number(doc.customerId) : doc.customerId 
  doc.proposerId = doc.proposerId ? Number(doc.proposerId) : doc.proposerId  
  doc.totalAmount = doc.totalAmount ? Number(doc.totalAmount) : doc.totalAmount
  doc.vatAmount = doc.vatAmount ? Number(doc.vatAmount) : doc.vatAmount
  doc.netAmount = doc.netAmount ? Number(doc.netAmount) : doc.netAmount
  //=== แก้ type ใน tableRows
  doc.tableRows = doc.tableRows.map(row => {
    return {
      index : !isNaN(row.index) ? Number(row.index) : row.index , // เป็นตัวเลขตั้งแต่แรกอยู่แล้ว
      itemId: row.itemId, // สตริง
      no: row.no,         // สตริง
      description: row.description, // สตริง
      unit: row.unit ,    // สตริง
      price: !isNaN(row.price) ? Number(row.price) : row.price, // ตัวเลข ***
      quantity: !isNaN(row.quantity) ? Number(row.quantity) : row.quantity, // ตัวเลข ***
      amount: !isNaN(row.amount) ? Number(row.amount) : row.amount // ตัวเลข ***
    }
  })
  return doc
}

//============================================= 
// แปลงชนิดข้อมูล พร้อมสำหรับการเขียนลง DB
// - ใช้กับ quotation/invoice
// - ไม่ได้เแปลงทุกตัว แปลงเฉพาะที่ต้องเป็นตัวเลข
export function convert_DocPrint(doc) {
  doc.totalAmount = formatNumber_as_Thai(doc.totalAmount);
  doc.vatAmount = formatNumber_as_Thai(doc.vatAmount);
  doc.netAmount = formatNumber_as_Thai(doc.netAmount);
  // จัดรูปแบบตัวเลขใน tableRow
  doc.tableRows = doc.tableRows.map( row => {
    // ถ้าเป็นเซลล์ว่าง ให้เป็นเซลล์ว่างต่อไป
    row.quantity = row.quantity && row.quantity != 0 ? row.quantity : '';  
    row.price = row.price && row.price != 0 ? formatNumber_as_Thai(row.price) : '';
    row.amount = row.amount && row.amount != 0 ? formatNumber_as_Thai(row.amount) : '';
    return row;
  });

  return doc;
}



//============================================= 
// จับคบามเปลี่ยนแปลงในเอกสาร 
// หา key อัตโนมัติ ยกเว้น tableRows
// - ใช้กับ quotation
// 
export function getChangeHistory(oldDoc, newDoc) {
  const changes = [];
  for (const key in newDoc) {

    //=== 1.) เป็น table row
    if (key === "tableRows") {
      // ตรวจสอบการเปลี่ยนแปลงในแต่ละแถวของ tableRows
      const oldRows = oldDoc.tableRows || [];
      const newRows = newDoc.tableRows || [];
      // เปรียบเทียบจำนวนแถว
      if (oldRows.length !== newRows.length) {
        changes.push({
          field: "tableRows",
          oldValue: oldRows,
          newValue: newRows
        });
      } else { // เปรียบเทียบแต่ละแถวและแต่ละฟิลด์
        for (let i = 0; i < newRows.length; i++) {
          const oldRow = oldRows[i] || {};
          const newRow = newRows[i] || {};
          for (const rowKey in newRow) {
            if (newRow[rowKey] != oldRow[rowKey]) {
              changes.push({
                field: `tableRows[${i}].${rowKey}`,
                oldValue: oldRow[rowKey],
                newValue: newRow[rowKey]
              });
            }
          }
        }
      }
    } 
    //===
    else {
      if (newDoc[key] !== oldDoc[key]) {
        changes.push({
          field: key,
          oldValue: oldDoc[key],
          newValue: newDoc[key]
        });
      }
    }
  }

  return changes;
}


//================================================
// จับข้อมูลผู้ใช้ทั้งหมด  - สำหรับใช้ทำ Modal
// 
export async function getCustomers_for_Modal() {
  const client = new MongoClient(global.dbUrl)
  try{
    await client.connect()
    const db = client.db(global.dbName)
    const collection = db.collection(global.dbColl_customers)
    var DATA_CUSTOMERS =  await collection.find(
      { customerStatus: 'active' },
      { projection : { 
          _id : 0 ,
          customerId: 1,         //  10004,
          customerStatus: 1,     //  'active',
          customerName: 1,       //  'ห้างหุ้นส่วนจำกัด สมาร์ทเทค',
          customerType: 1,       //  
          customerAddress1: 1,   //  '12/34 ถนนรามคำแหง แขวงหัวหมาก เขตบางกะปิ',
          customerAddress2: 1,   //  'กรุงเทพมหานคร 10240',
          customerTaxId: 1,      //  '3456789012345',
          customerIdentityId: 1, //  '',
          customerWebsite: 1,    //  'www.ssssmmmmttttt.com',
          customerPhone: 1,      //  'โทรฯ 012-012-0123',
          customerEmail: 1,      //  'ssssmmmmttttt@smt.co.th',
          customerContactPerson: 1, 
        }
      }
    ).toArray()

    return DATA_CUSTOMERS
  }catch(err){
    console.log(err)
    throw err
  }finally{
    client.close()
  }
}


//================================================
// จับข้อมูลผู้ใช้ทั้งหมด  - สำหรับใช้ทำรายงาน
// 
export async function getUsers_for_report() {
  const client = new MongoClient(global.dbUrl)
  try{
    await client.connect()
    const db = client.db(global.dbName)
    const collection = db.collection(global.dbColl_users)

    var dataUsers =  await collection.find(
      { userIsActive: 'active' },
      { projection : { 
          _id: 0 , 
          userIsActive: 1 ,
          userId: 1 , 
          userAuthority: 1 , 
          userFullname: { $concat: ["$userPrefix"," ","$userFirstname"," ","$userLastname"] },
        }
      }
    ).toArray()
    // console.log(dataUsers)

    return dataUsers
  }catch(err){
    console.log(err)
    throw err
  }finally{
    client.close()
  }
}



//================================================
// จับข้อมูลไอเท็มทั้งหมด  - สำหรับใช้ทำ Modal
//
export async function getItems_for_Modal() {
  const client = new MongoClient(global.dbUrl)
  try{
    await client.connect()
    const db = client.db(global.dbName)
    const coll_items = db.collection(global.dbColl_items)

    var DATA_ITEMS =  await coll_items.find(
      { itemStatus: 'active' },
      { projection : { 
          _id : 0 ,
          itemId: 1,             //  '001-011',
          itemStatus: 1,         //  'active',
          itemName: 1,           //  'Test',
          itemPrice: 1,          //
          itemUnit: 1,           //  'คอร์ส',
        }
      }
    ).toArray()

    return DATA_ITEMS
  }catch(err){
    console.log(err)
    throw err
  }finally{
    client.close()
  }
}


//================================================
// จับข้อมูลไอเท็มทั้งหมด  - สำหรับใช้ทำรายงาน
//
export async function getItems_for_report() {
  const client = new MongoClient(global.dbUrl)
  try{
    await client.connect()
    const db = client.db(global.dbName)
    const coll_items = db.collection(global.dbColl_items)

    const dataItems = await coll_items.aggregate([
      // { $match: {} },
      { $project: { _id: 0 } },
      { $sort: { itemId: 1 } }
    ]).toArray()
    dataItems.forEach( obj => {
      for( let key in obj){
        if (key == 'itemName' || key == 'itemDesc') {
          obj[key] = obj[key].replace(/"/g, `\\"`).replace(/\r\n|\r|\n/g,"\\n")
        }
      }
    })

    return dataItems
  }catch(err){
    console.log(err)
    throw err
  }finally{
    client.close()
  }
}



//================================================
// จับเดือนที่ไม่ซ้ำในเอกสาร
// ผลลัพธ์ เช่น 
// monthDocs ===>  [ { month: '2025-08', monthName: 'สิงหาคม 2025' } ]
//
export async function getDocs_MonthUnique(collDocName) {
  const client = new MongoClient(global.dbUrl)
  try{
    await client.connect()
    const db = client.db(global.dbName)
    const collection = db.collection(collDocName)

    //=== 2.) คำนวณเดือนใน docs ทั้งหมด -  Month
    const datesDocs = await collection.distinct("docDate", {})
    const monthDocsUnique = [...new Set(datesDocs.map(date => date.slice(0, 7)))]
    //== 2.1) เพิ่มชื่อเดือนและปีเข้าไป 
    const monthDocs = monthDocsUnique.map( month => {
      const [year, monthNum] = month.split("-");
      return { month, monthName: `${global.MONTH_NAMES[parseInt(monthNum)-1]} ${year}` }
    })
    monthDocs.sort( (a,b) => {
      return a.month > b.month ? -1 : 1
    })

    return monthDocs
  }catch(err){
    console.log(err)
    throw err
  }finally{
    client.close()
  }
}


//================================================
//
//
export async function getDocs_Conclude(collDocName) {
    const client = new MongoClient(global.dbUrl)
  try{
    await client.connect()
    const db = client.db(global.dbName)
    const collection = db.collection(collDocName)
    const dataDocConclude = await collection.find(
      {},
      { projection : { 
          _id: 0, 
          docId:1, 
          docDate:1, 
          docStatusNumber:1, 
          customerName:1 
        } 
      }
    ).toArray()

    return dataDocConclude
  }catch(err){
    console.log(err)
    throw err
  }finally{
    client.close()
  }
}