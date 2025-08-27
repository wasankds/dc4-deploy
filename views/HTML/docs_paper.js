const OPTS2 = { minimumFractionDigits: 2,maximumFractionDigits: 2 };
const OPTS0 = { minimumFractionDigits: 0,maximumFractionDigits: 0 };
const BLANK_ROWS_NUMBER = 1


//============================================================== 
//
// ตอนโหลดเอกสาร
document.addEventListener("DOMContentLoaded", () => {  

  //=== สร้างแถวว่างเริ่มต้นจำนวน BLANK_ROWS_NUMBER
  function startAddRows(){
    const ctn = document.getElementById('listCtn');  
    for (let i = 0; i < START_ROWS; i++) {
      const isLr = i === START_ROWS-1;
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = create_Row(isLr);
      const newRow = tempDiv.firstChild;
      ctn.appendChild(newRow);
    }
  } 
  startAddRows()

  //=== สร้าง date picker สำหรับแต่ละ input
  if (window.flatpickr) {
    const today = new Date();
    // สร้าง date picker สำหรับแต่ละ input
    createThaiDatePicker("#quotationDateTh", 'bottom', today);
    createThaiDatePicker("#approverDateTh", 'top-right');
    createThaiDatePicker("#proposerDateTh", 'top-right', today);
  }

  // //=== คำนวณในตาราง
  // calculate_Table()

  // //=== ทดสอบ - ไม่เวิร์ค
  // setTimeout( () => {    
  //   const searchItems = document.getElementById('searchItems')
  //   searchItems.focus()
  //   // setTimeout( () => {
  //   //   document.querySelectorAll('.row.modal-p')[0].click()
  //   // },10)
  // },10)


})


/***************************************************/
/***************************************************/
/***************************************************/
/***************************************************/
/***************************************************/
/********************** ตาราง **********************/
/***************************************************/
/***************************************************/
/***************************************************/
/***************************************************/
/***************************************************/


//==============================================================
// สร้างแถวใหม่
// 
function create_Row(isLr=false, obj={}) {
  // const borderClass = isLr ? 'bb' : 'bb-d';
  const borderClass = 'bb' // isLr ? 'bb' : 'bb-d';
  let sameClass1 = 'lh-xs bl pd-l-s'
  let sameClass2 = 'lh-xs bl pd-l-s br'
  let sameAttr = 'autocomplete="off"'

  const val_itemId = obj.itemId || '';
  const val_no = obj.no || '';
  const val_description = obj.description || '';
  const val_unitprice = obj.unitprice || 0;
  const val_quantity = obj.quantity || 1;
  const val_amount = obj.amount || 0;

  // กรณีเลือกจาก Items ให้เป็น readonly 3 ตัวนี้
  const readOnly_description = val_description ? 'readonly' : '';
  const readOnly_unitprice = val_unitprice ? 'readonly' : '';
  const readOnly_amount = val_amount ? 'readonly' : '';

  return `
    <div class="row ${borderClass} orderRow" name="orderRow" style="position: relative;">
      <!-- ปุ่มเลื่อนแถว -->
      <button class="up-row-btn" onclick="moveRow_Up(event)">&uarr;</button>
      <button class="dn-row-btn" onclick="moveRow_Down(event)">&darr;</button>
      
      <input name="itemId" type="hidden" value="${val_itemId}">

      <input class="col-07 al-c ${sameClass1}" name="no" type="text"
             ${sameAttr} value="${val_no}">
      <input class="col-50 al-l ${sameClass1}" name="description" type="text"
             ${sameAttr} value="${val_description}" ${readOnly_description}>
      <input class="col-13 al-r ${sameClass1}" name="unitprice" type="number" step='1' min='0'
             ${sameAttr} value="${val_unitprice}" ${readOnly_unitprice}>
      <input class="col-15 al-r ${sameClass1}" name="quantity" type="number" step='1' min='0'
             ${sameAttr} value="${val_quantity}">
      <input class="col-15 al-r ${sameClass2}" name="amount" type="number" step='1' min='0'
             ${sameAttr} value="${val_amount}" ${readOnly_amount}>
      <!-- ปุ่มลบ -->
      <button class="delete-row-btn" onclick="removeRow(event)">&times;</button>
    </div>`.trim();
};
//==============================================================
// เพิ่มแถวว่างทีละแถว 
// 
const btnAddRow = document.getElementById("btnAddRow");
if(btnAddRow){
  btnAddRow.addEventListener("click", (event) => {
    event.preventDefault();
    const ctn = document.getElementById('listCtn');  
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = create_Row(true);
    const newRow = tempDiv.firstChild;
    ctn.appendChild(newRow);
  });
}

//==============================================================
// ติ๊กเลือกการคำนวณ Vat
// 
const selectVatCalculating = document.getElementById('selectVatCalculating');
if(selectVatCalculating){
  selectVatCalculating.addEventListener('change', () => { calculate_Table() });
}


//==============================================================
// ฟังก์ชันสำหรับคำนวณ amount และ totalAmount เมื่อมีการเปลี่ยนแปลง unitprice หรือ quantity
//
function calculate_Table() {

  const listCtn = document.getElementById('listCtn');
  if (!listCtn) return;

  //=== ฟังก์ชันคำนวณผลรวมทั้งหมด
  // - คำนวณผลรวมของ amount ทั้งหมดใน orderRow
  function updateTotalAmount() {
    const rows = listCtn.querySelectorAll('[name="orderRow"]');

    //=== คำนวณผลรวมของ amount ทั้งหมดใน orderRow
    let sumRows = 0;
    rows.forEach(row => {
      const amountInput = row.querySelector('[name="amount"]');
      const val = parseFloat((amountInput && amountInput.value || '').replace(/,/g, ''));
      if (!isNaN(val)) sumRows += val;
    });

    //=== คำนวณ Vat
    // - checkboxNoVat ถูกติ๊กไม่คำนวณ
    // - checkboxVatIn: VAT รวมอยู่ใน totalAmount แล้ว (netAmount = totalAmount, vatAmount = totalAmount * 0.07 / 1.07)
    // - checkboxVatOut: VAT เป็นยอดเพิ่มจาก totalAmount (netAmount = totalAmount + VAT, vatAmount = totalAmount * 0.07)
    let vat = 0;
    let netAmount = sumRows;

    //= VAT รวมอยู่ใน sum แล้ว
    if (selectVatCalculating.value == 'noVat') {
      vat = 0;
      netAmount = sumRows;
      // แก้ข้อความ
      document.querySelector('#totalCtn span').textContent = 'รวม'
    }else if (selectVatCalculating.value == 'vatIn') {
      vat = sumRows * 0.07/1.07;
      netAmount = sumRows;
      sumRows = netAmount-vat
      // แก้ข้อความ
      document.querySelector('#totalCtn span').textContent = 'รวมก่อน VAT'
    } 
    //= VAT เป็นยอดเพิ่ม
    else if (selectVatCalculating.value == 'vatOut') {
      vat = sumRows * 0.07;         
      netAmount = sumRows + vat;    
      // แก้ข้อความ
      document.querySelector('#totalCtn span').textContent = 'รวม'
    }

    //=== Total Amount
    const totalAmountElm = document.getElementById('totalAmount');
    if (totalAmountElm) {
      totalAmountElm.value = sumRows.toFixed(2); // .toLocaleString('th-TH', OPTS2);
    }
    //=== Vat
    const vatAmountElm = document.getElementById('vatAmount');
    if (vatAmountElm) {
      vatAmountElm.value = vat.toFixed(2); // .toLocaleString('th-TH', OPTS2);
    }
    //=== Net Amount
    const netAmountElm = document.getElementById('netAmount');
    if (netAmountElm) {
      netAmountElm.value = netAmount.toFixed(2); // .toLocaleString('th-TH', OPTS2);
    }

  }

  //=== ฟังก์ชันคำนวณ amount ของแถวเดียว
  // - คำนวณ amount ของแถวเดียวจาก unitprice และ quantity
  function calcRowAmount(row) {
    const unitpriceInput = row.querySelector('[name="unitprice"]');
    const quantityInput = row.querySelector('[name="quantity"]');
    const amountInput = row.querySelector('[name="amount"]');
    if (!unitpriceInput || !quantityInput || !amountInput) return;

    let quantity = quantityInput.value;
    // แยกกรณี quantity มีหน่วย เช่น "2 ชิ้น"
    // if (typeof quantity === 'string') {
    //   quantity = quantity.split(' ')[0];
    // }
    const price = parseFloat((unitpriceInput.value || '').replace(/,/g, ''));
    const qty = parseFloat((quantity || '').replace(/,/g, ''));
    if (!isNaN(price) && !isNaN(qty)) {
      const amount = price * qty;
      amountInput.value = amount.toFixed(2); // toLocaleString('th-TH', OPTS2);
      
    } else {
      amountInput.value = '';
    }
  }

  //=== Event delegation(การมอบหมาย) สำหรับ input ภายใน orderRow
  // - ถ้ากรอก unitprice หรือ quantity ให้คำนวณ amount ของแถว
  // 
  listCtn.addEventListener('input', function (e) {
    const target = e.target;
    if (!target.closest('[name="orderRow"]')) return;
    if (target.name === 'unitprice' || target.name === 'quantity') {
      const row = target.closest('[name="orderRow"]');
      calcRowAmount(row);
      updateTotalAmount();
    }
  });

  // เรียกคำนวณครั้งแรก (กรณีมีค่าเดิม)
  setTimeout(() => {
    const rows = listCtn.querySelectorAll('[name="orderRow"]');
    rows.forEach(row => calcRowAmount(row));
    updateTotalAmount();
  }, 100);
}



//==============================================================
// ลบแถวออก
// 
const DELETED_ROWS = [];
function removeRow(event){
  event.preventDefault();
  const btn = event.target;

  // นับจำนวน row ทั้งหมดก่อนลบ
  const ctn = document.getElementById('listCtn');
  const rows = ctn.querySelectorAll('[name="orderRow"]');
  if (rows.length <= 1) {
    showToast(`ต้องมีอย่างน้อย 1 แถว`,'yellow', 2000);
    return;
  }

  const row = btn.closest('.row');
  if (row) {

    // บันทึกสถานะก่อนลบ
    DELETED_ROWS.push({
      no: row.querySelector('[name="no"]').value,
      description: row.querySelector('[name="description"]').value,
      unitprice: Number(row.querySelector('[name="unitprice"]').value),
      quantity: Number(row.querySelector('[name="quantity"]').value),
      amount: Number(row.querySelector('[name="amount"]').value)
    })

    // ลบแถว
    row.remove();

    // คำนวณในตารางใหม่
    calculate_Table();
  }
}
//==============================================================
// เพิ่มแถวว่างทีละแถว 
// 
const btnUndoDeleteRow = document.getElementById("btnUndoDeleteRow");
if(btnUndoDeleteRow){
  btnUndoDeleteRow.addEventListener("click", (event) => {
    event.preventDefault();
    if (DELETED_ROWS.length === 0) {
      showToast(`ไม่มีแถวที่ถูกลบ`, 'yellow', 2000);
      return;
    }

    // นำข้อมูลแถวสุดท้ายที่ถูกลบกลับมา
    const lastDeletedRow = DELETED_ROWS.pop();
    const ctn = document.getElementById('listCtn');

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = create_Row(true, lastDeletedRow);
    const newRow = tempDiv.firstChild;
    ctn.appendChild(newRow);

    calculate_Table();
  });
}
//==============================================================
//
//
function moveRow_Up(event){
  event.preventDefault();
  const row = event.target.closest('[name="orderRow"]');
  if (!row) return;
  const prevRow = row.previousElementSibling;
  if (prevRow && prevRow.classList.contains('orderRow')) { 
    row.parentNode.insertBefore(row, prevRow); 
  }
}
//==============================================================
//
//
function moveRow_Down(event){
  event.preventDefault();
  const row = event.target.closest('[name="orderRow"]');
  if (!row) return;
  const nextRow = row.nextElementSibling;  
  if (nextRow && nextRow.classList.contains('orderRow')) { 
    row.parentNode.insertBefore(nextRow, row); 
  }
}



/***************************************************/
/***************************************************/
/***************************************************/
/***************************************************/
/***************************************************/
/**************** สำหรับ modal **********************/
/***************************************************/
/***************************************************/
/***************************************************/
/***************************************************/
/***************************************************/


//============================================= 
// ถ้าคลิกนอก .mocalCtn ให้ปิด .modalCtn
document.addEventListener('click', (e) => {
  if (!e.target.closest('.modalCtn')) {
    document.querySelectorAll('.modalCtn .modal').forEach(modal => {
      modal.classList.remove('show');
    });
  }
})
//===============================================================
function clearModalsAll(){  
  const ctns = document.querySelectorAll('.modalCtn')
  if(ctns.length > 0){
    ctns.forEach( ctn => {
      const modal = ctn.querySelector('.modal')
      if(modal){ modal.classList.remove('show') }
    })
  }
}
//============================================== 
// 
function popModalItems(e){
  clearModalsAll()

  //=== คำค้นหา
  const srhInput = e.target.value.toString().toLowerCase()
  //=== modal - ขนาด/ตำแหน่ง/แสดง
  const rect = e.target.getBoundingClientRect()
  const modal = e.target.parentNode.parentNode.querySelector('.modal')
  if(!modal){ return }
  modal.style.minWidth = rect.width + "px"
  const modalList = e.target.parentNode.parentNode.querySelector('.modal-list')
  modalList.textContent = ''

  //=== กรอง - แสดง 30 ลำดับเท่านั้น และ สถานะปกติเท่านั้น 
  const searchKeys = [ 'itemId', 'itemName']
  const filter = DATA_ITEMS.filter( r => {
    return searchKeys.some( keyName => {
      return r[`${keyName}`].toString().toLowerCase().indexOf(srhInput) !== -1 ;
    })
  })
  const res = filter.slice(0,30)
  if(res.length == 0){
    return  modal.classList.remove('show')
  }

  // 
  modal.classList.add('show')
  modal.style.maxWidth = (document.body.clientWidth - rect.left) + "px"
  res.forEach( (obj,i) => {
    const itemId = obj.itemId
    const itemName = obj.itemName
    const itemPrice = obj.itemPrice

    const p = document.createElement('p')
    p.classList.add('row','modal-p')
    { // itemId
      const span = document.createElement('span')
      span.textContent = `${itemId}`
      span.title = itemId
      span.classList.add("col-20",'fc-lime')
      p.appendChild(span)
    }
    { // itemName
      const span = document.createElement('span')      
      const itemNameSlice = itemName.length > 30 ? itemName.slice(0, 30) + '...' : itemName
      const itemNameShow = `[${itemPrice}] ${itemNameSlice}`
      span.textContent = itemNameShow
      span.title =  `[${itemPrice}]${itemNameSlice}`
      span.classList.add("col-65","mg-l-l")
      p.appendChild(span)
    }
    { // ลำดับ
      const span = document.createElement('span')
      span.textContent = `${i+1}/${filter.length}`
      span.classList.add("col-15","al-r","mg-l-xxl")
      p.appendChild(span)
    }

    //=== เมื่อคลิกเลือก
    p.onclick = () => {       
      const ctn = document.getElementById('listCtn');  

      //=== 0.) ตรวจสอบ name=itemId ว่าซ้ำหรือไม่ 
      // ถ้าซ้ำให้เพิ่ม name="quantity" อีก 1 โดยไม่ต้องเพิ่มแถวลงไป
      const existingRow = Array.from(ctn.children).find(row => {
        const itemIdInput = row.querySelector('input[name="itemId"]');
        return itemIdInput && itemIdInput.value == itemId;
      });

      //=== 1.) พบ itemId(hidden) ที่ซ้ำ เพิ่มจำนวนเป็น 1
      if (existingRow) {
        const quantityInput = existingRow.querySelector('input[name="quantity"]');
        if (quantityInput) {
          quantityInput.value = Number(quantityInput.value) + 1;
        }
      }
      //=== 2.) ไม่เพิ่ม เพิ่มแถวลงในตาราง
      else{
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = create_Row(true,{
          itemId: itemId, // ไม่แสดงในตารางแต่ใช้ในการบันึก
          no: null,        
          description: itemName,
          unitprice: Number(itemPrice),
          quantity: 1,
          amount: Number(itemPrice)
        });
        const newRow = tempDiv.firstChild;
        ctn.appendChild(newRow);
      }

      //=== 3.) คำนวณในตารางใหม่
      calculate_Table()   

      //=== 4.) ลบโมดัล
      modal.classList.remove('show')

      //=== 5.) Focus กลับไปที่ input
      setTimeout( () => e.target.focus(), 100 )
      showToast(`เพิ่มไอเท็ม "${itemId}"` ,"blue", 1500)
    }
    modalList.appendChild(p)
  })
}

//============================================== 
// 
function popModalCustomers(e){
  clearModalsAll()

  //=== คำค้นหา
  const srhInput = e.target.value.toString().toLowerCase()
  //=== modal - ขนาด/ตำแหน่ง/แสดง
  const rect = e.target.getBoundingClientRect()
  const modal = e.target.parentNode.parentNode.querySelector('.modal')
  if(!modal){ return }
  modal.style.minWidth = rect.width + "px"
  const modalList = e.target.parentNode.parentNode.querySelector('.modal-list')
  modalList.textContent = ''

  //=== กรอง - แสดง 30 ลำดับเท่านั้น และ สถานะปกติเท่านั้น 
  const searchKeys = [ 'customerId', 'customerName']
  const filter = DATA_CUSTOMERS.filter( r => {
    return searchKeys.some( keyName => {
      return r[`${keyName}`].toString().toLowerCase().indexOf(srhInput) !== -1 ;
    })
  })
  const res = filter.slice(0,30)
  if(res.length == 0){
    return  modal.classList.remove('show')
  }

  // 
  modal.classList.add('show')
  modal.style.maxWidth = (document.body.clientWidth - rect.left) + "px"
  res.forEach( (obj,i) => {
    const customerId = obj.customerId
    const customerName = obj.customerName
    const customerAddress1 = obj.customerAddress1
    const customerAddress2 = obj.customerAddress2
    const customerContact = obj.customerContact
    const customerTaxId = obj.customerTaxId

    const p = document.createElement('p')
    p.classList.add('row')
    p.style.minWidth = "400px";
    { // customerId
      const span = document.createElement('span')
      span.textContent = `${customerId}`
      span.title = customerId
      span.classList.add("col-20",'fc-lime')
      p.appendChild(span)
    }
    { // customerName
      const span = document.createElement('span')      
      const customerNameSlice = customerName.length > 55 ? customerName.slice(0, 55) + '...' : customerName
      span.textContent = customerNameSlice
      span.title = customerName
      span.classList.add("col-70","mg-l-l")
      p.appendChild(span)
    }
    { // ลำดับ
      const span = document.createElement('span')
      span.textContent = `${i+1}/${filter.length}`
      span.classList.add("col-10","al-r","mg-l-xxl")
      p.appendChild(span)
    }

    //=== เมื่อคลิกเลือก
    p.onclick = () => { 
      
      customer_formAction('clear')
      customer_formAction('fill-readOnly', {
        customerId, 
        customerName,
        customerAddress1,
        customerAddress2,
        customerContact,
        customerTaxId
      })
      //= ลบโมดัล
      modal.classList.remove('show')
    }
    modalList.appendChild(p)
  })
}


/***************************************************/
/***************************************************/
/***************************************************/
/***************************************************/
/***************************************************/
/****************** Form Action ********************/
/***************************************************/
/***************************************************/
/***************************************************/
/***************************************************/
/***************************************************/

//=====================================================
const btnClearCustomer = document.getElementById("btnClearCustomer");
if(btnClearCustomer){
  btnClearCustomer.onclick = (event) => {
    event.preventDefault();
    customer_formAction('clear');
  }
}
//=====================================================
// ส่วนของ customer
// 
function customer_formAction(action, obj){
  const elementsId = [
    "customerId",
    "customerName",
    "customerAddress1",
    "customerAddress2",
    "customerContact",
    "customerTaxId"
  ]
  if(action == 'clear'){
    elementsId.forEach( id => {
      const el = document.getElementById(id);
      if(el){
        el.value = '';
        el.readOnly = false;
      }
    })
  }else if(action == 'fill'){
    elementsId.forEach( id => {
      const el = document.getElementById(id);
      if(el){
        el.value = obj[id] || '';
      }
    })
  }else if(action == 'fill-readOnly'){
    elementsId.forEach( id => {
      const el = document.getElementById(id);
      if(el){
        el.value = obj[id] || '';
        el.readOnly = true;
      }
    })
  }
}


//=====================================================
// ส่วนของ docDetail - บนและล่าง
//
function docDetail_formAction(action, obj){
  const elementsId = [
    "docId",
    "docStatusNumber",
    "docDate",
    "docRefNo",
    // 
    "totalAmount",
    "vatAmount",
    "selectVatCalculating",
    "netAmount"
  ]
  if(action == 'clear'){
    elementsId.forEach( id => {
      const el = document.getElementById(id);
      if(el){
        el.value = '';
        el.readOnly = false;
      }
    })
  }else if(action == 'fill'){
    elementsId.forEach( id => {
      const el = document.getElementById(id);
      if(el){
        el.value = obj[id] || '';
      }
    })
  // }else if(action == 'fill-readOnly'){
  //   elementsId.forEach( id => {
  //     const el = document.getElementById(id);
  //     if(el){
  //       el.value = obj[id] || '';
  //       el.readOnly = true;
  //     }
  //   })
  }
}






/***************************************************/
/***************************************************/
/***************************************************/
/***************************************************/
/***************************************************/
/*********************** Sort **********************/
/***************************************************/
/***************************************************/
/***************************************************/
/***************************************************/
/***************************************************/






//============================================================
// *** Sort จาก element เลย ***
// 
function sortItemsTableJs(sortColumnIndex, type='asc') { 
  const tableHeader = document.getElementById('tableHeader')
  if(tableHeader){
    const q='label span:first-child, label span:last-child'
    tableHeader.querySelectorAll(q).forEach( span => {
      span.style.opacity = 0.2
    })
  }
  // if(event.target.tagName == 'SPAN'){
  //   event.target.style.opacity = 1
  // }
  console.log('sortItemsTableJs', sortColumnIndex, type)
  
  const ctn = document.getElementById('listCtn')
  const rowElms = Array.from(ctn.querySelectorAll('[name=orderRow]'))

  //=== 1. Determine the column to sort by
  // - column not found by index
  if (sortColumnIndex === -1) { return}

  //=== 2. Extract the values from each row to be sorted
  const extractedValues = rowElms.map( row => {
    //=== จับ element ในแถว
    const cells = Array.from(row.querySelectorAll('input, select'))
    let value = ''
    if (cells[sortColumnIndex]) { // check if exist then access it.
      value = cells[sortColumnIndex].value.trim()
    }
    if(!value){
      var valueParse = ''
    }else if(!isNaN(value)){
      var valueParse = parseFloat(value)
    }else{
      var valueParse = value
    }
    return { row, value : valueParse} // เรียงลำดับตามสตริงอย่างเดียว
  })

  //=== 3. Sort based on the type
  extractedValues.sort((a, b) => {
    if (a.value < b.value) { return type === 'asc' ? -1 : 1 }
    if (a.value > b.value) { return type === 'asc' ? 1 : -1 }
    return 0
  })  

  //=== 4. Re-append sorted rows to the table
  rowElms.forEach( row => row.remove() ) // Remove all rows from the table
  extractedValues.forEach( item => ctn.appendChild(item.row) )// Append all row

  //=== 5. รีเซตอลัมน์ Order (ไม่เรียงลำดับคอลัมน์นี้)
  const rowElmsNew = Array.from(ctn.querySelectorAll('[name=orderRow]'))
  // rowElmsNew.forEach( (row,i) => row.querySelectorAll("input")[1].value = i+1 )
}



