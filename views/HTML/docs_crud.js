
var DATA_CUSTOMERS = []
var DATA_ITEMS = []

//============================================================== 
//
document.addEventListener("DOMContentLoaded", () => {  
  fetchData()
})

// Fetch
function fetchData() {

  //=== ล้างข้อมูลเก่า
  DATA_CUSTOMERS = []
  DATA_ITEMS = []

  if(IS_PRODUCTION){
    createSpinner()
    sendHttpRequest('get', PATH_FETCH)
      .then( rtn => {     
        DATA_CUSTOMERS = [...rtn.DATA_CUSTOMERS]
        DATA_ITEMS = [...rtn.DATA_ITEMS]
      }).catch( err => { 
        showToast(err.message,'red')
      }).finally( () => {
        removeSpinner()
      })
  }else{
    DATA_CUSTOMERS = [...DATA_CUSTOMERS_TOLOAD]
    DATA_ITEMS = [...DATA_ITEMS_TOLOAD]
  }
}


/********************************************/
/********************************************/
/********************************************/
/******************** Search *****************/
/********************************************/
/********************************************/
/********************************************/
const btnSearchDocs = document.getElementById("btnSearchDocs");
if(btnSearchDocs){
  btnSearchDocs.addEventListener("click", searchDocs);
}
function searchDocs(e) {
  e.preventDefault();
  const sip = document.getElementById("sip").value;
  const loadDoc = document.getElementById("loadDoc").value;

  if(IS_PRODUCTION){
    createSpinner()
    sendHttpRequest('post', PATH_SEARCH, { sip: sip, loadDoc: loadDoc })
      .then( rtn => {     

      }).catch( err => { 
        showToast(err.message,'red')
      }).finally( () => {
        removeSpinner()
      })
  }else{

  }
}


/********************************************/
/********************************************/
/********************************************/
/******************** Load* *****************/
/********************************************/
/********************************************/
/********************************************/
const btnLoadDoc = document.getElementById("btnLoadDoc");
if(btnLoadDoc){
  btnLoadDoc.addEventListener("click", loadDoc);
}
function loadDoc(e) {
  e.preventDefault();
  const selectDoc = document.getElementById("selectDoc").value;

  if(IS_PRODUCTION){
    createSpinner()
    sendHttpRequest('post', PATH_LOAD, { selectDoc: selectDoc })
      .then( rtn => {     

      }).catch( err => { 
        showToast(err.message,'red')
      }).finally( () => {
        removeSpinner()
      })
  }else{

  }
}

/***************************************************/
/***************************************************/
/***************************************************/
/*********************** New Docs*******************/
/***************************************************/
/***************************************************/
/***************************************************/

const btnNewDoc = document.getElementById("btnNewDoc");
if(btnNewDoc){
  btnNewDoc.addEventListener("click", newDoc);
}
function newDoc(e) {
  e.preventDefault();
  window.location.href= PATH_MAIN;
}

/********************************************/
/********************************************/
/********************************************/
/******************** Save *****************/
/********************************************/
/********************************************/
/********************************************/


const btnSaveDoc = document.getElementById("btnSaveDoc");
if(btnSaveDoc){
  btnSaveDoc.addEventListener("click", saveDocJs)
}
function saveDocJs(e) {
  e.preventDefault()
  const btn = e.target;

  const paperForm = document.getElementById("paperForm");

  //=== 1.) ตรวจสอบ required fields ว่า valid หรือไม่ 
  let isValid = true;
  const requiredFields = paperForm.querySelectorAll("[required]");
  // console.log(requiredFields);

  requiredFields.forEach(field => {
    if (
      ( field.type === "checkbox" && !field.checked) ||
      ( field.type !== "checkbox" && !field.value.trim())
    ) {
      field.classList.add("vd-n");
      isValid = false;
    } else {
      field.classList.remove("vd-n");
    }
  });
  if (!isValid) {
    // showToast("กรุณากรอกข้อมูลให้ครบถ้วน", "red", 2000);
    setTimeout(() => {
      requiredFields.forEach(field => {
         field.classList.remove("vd-n");
      });
    }, 1000);
    return;
  }

  //=== 2.) จับข้อมูลหลัก (ไม่รวมตาราง)
  const mainFields = {};
  [...paperForm.elements].forEach(el => {
    if (el.closest('[name="orderRow"]')) return;    
    if (el.name && !el.disabled) {
      if (el.type === "checkbox") {
        mainFields[el.name] = el.checked;
      } else if (el.type === "radio") {
        if (el.checked) mainFields[el.name] = el.value;
      } else {
        mainFields[el.name] = el.value;
      }
    }
  });

  //=== 3.) จับข้อมูลตาราง (แยกตามแถว)
  const tableRows = [];
  const orderRows = paperForm.querySelectorAll('[name="orderRow"]');
  orderRows.forEach((row, index) => {
    const rowData = {};
    // const inputs = row.querySelectorAll('input, select, textarea');
    const inputs = row.querySelectorAll('input');
    inputs.forEach(input => {
      if (input.name) {
        rowData[input.name] = input.value;
      }
    });
    // เพิ่มข้อมูลแถวเฉพาะที่มีข้อมูล
    // if (Object.values(rowData).some(val => val && val.trim())) {
    tableRows.push({
      index: index,
      ...rowData
    });
    // }
  });

  //=== แปลงเป็นวันที่ในรูปแบบ iso
  if(mainFields.quotationDateTh){
    mainFields.quotationDate = convert_ThaiDate_to_IsoDate(mainFields.quotationDateTh);
  }
  if(mainFields.approverDateTh){
    mainFields.approverDate = convert_ThaiDate_to_IsoDate(mainFields.approverDateTh);
  }
  if(mainFields.proposerDateTh){
    mainFields.proposerDate = convert_ThaiDate_to_IsoDate(mainFields.proposerDateTh);
  }
  function convert_ThaiDate_to_IsoDate(thaiDate) {
    // thaiDate = 12 สิงหาคม 2568
    const [day, monthName, year] = thaiDate.split(' ');
    const month = MONTH_NAMES.indexOf(monthName)+1;
    return `${year-543}-${String(month).padStart(2,'0')}-${String(day).padStart(2, '0')}`;
  }

  // console.log(mainFields);
  // console.log(tableRows);
  // console.log("mainFields.quotationId ===> " , mainFields.quotationId);  

  createSpinner()
  sendHttpRequest('post', PATH_SAVE, {
      quotationId: mainFields.quotationId, // มีใน mainFields แล้วแต่แยกออกมาเพื่อความสะดวก
      docstatusNumber: mainFields.docstatusNumber, // มีใน mainFields แล้วแต่แยกออกมาเพื่อความสะดวก
      mainFields: mainFields,
      tableRows: tableRows  
    }).then( rtn => {
      // อาจไม่ต้องมาตรงนี้ เพราะจะ redirect 
      console.log(rtn)
    }).catch( err => { 
      console.log(err)
      showToast(err.message,'red')
    }).finally( () => {
      removeSpinner()
    })
}

/*************************************************/
/*************************************************/
/*************************************************/
/************************* Cancel *****************/
/**************************************************/
/**************************************************/
/**************************************************/
const btnCancelDoc = document.getElementById("btnCancelDoc");
if(btnCancelDoc){
  btnCancelDoc.addEventListener("click", finishDocJs)
}
function finishDocJs(e) {
  e.preventDefault()
  const btn = e.target;
  // const form = btn.closest('form');

  // //=== ตรวจสอบฟิลด์ required
  // const requiredFields = form.querySelectorAll("[required]");
  // let isValid = true;
  // requiredFields.forEach(field => {
  //   if (!field.value.trim()) {
  //     field.classList.add("input-error");
  //     isValid = false;
  //   } else {
  //     field.classList.remove("input-error");
  //   }
  // });
  // if (!isValid) {
  //   showToast("กรุณากรอกข้อมูลให้ครบถ้วน", "red", 2000);
  //   return;
  // }

  if (typeof Swal !== "undefined") {
    Swal.fire({
      title: "ยืนยันการยกเลิก",
      text: "พิมพ์คำว่า 'confirm' เพื่อยืนยันการยกเลิก",
      icon: "warning",
      input: "text",
      inputPlaceholder: "พิมพ์ confirm",
      showCancelButton: true,
      confirmButtonText: "ยืนยัน",
      cancelButtonText: "ยกเลิก",
      preConfirm: (value) => {
        if (value !== "confirm") {
          Swal.showValidationMessage("กรุณาพิมพ์คำว่า 'confirm' ให้ถูกต้อง");
        }
      }
    }).then((result) => {
      if (result.isConfirmed && result.value === "confirm") {
        //== แสดง loading spinner ของ SweetAlert2
        Swal.fire({
          title: "กำลังดำเนินการ...",
          text: "โปรดรอสักครู่",
          allowOutsideClick: false,
          didOpen: () => { Swal.showLoading() }
        })

        // //=== แนบปุ่ม btnCancelDocConfirm
        // // - เสมือนว่าคลิกปุ่ม btnCancelDocConfirm
        // // - ต้องใช้ในการจำแนกการ submit form ว่าเป็นการยกเลิกเอกสาร
        // const hiddenInput = document.createElement('input');
        // hiddenInput.type = 'hidden';
        // hiddenInput.name = 'btnCancelDocConfirm';
        // hiddenInput.value = '1';

        // const form = btn.closest('form');
        // if (form) {
        //   form.appendChild(hiddenInput);
        //   form.submit();
        // }
      }
    });
  }
}


/********************************************/
/********************************************/
/********************************************/
/******************** Print *****************/
/********************************************/
/********************************************/
/********************************************/


//==========================================
// 
// 
const btnPrintDoc = document.getElementById("btnPrintDoc");
if(btnPrintDoc){
  btnPrintDoc.addEventListener("click", downloadPDF)
}
function downloadPDF(btn){  

  // const docIdElm = document.getElementById("docId")
  // const docId = docIdElm.value
  // if(!docId){
  //   onBtnClicked(btn, "CANCEL")
  //   docIdElm.classList.add("vd-n")
  //   setTimeout( () => { docIdElm.classList.remove("vd-n") },1000)
  //   return
  // }

  createSpinner()
  sendHttpRequest('post', PATH_PRINT, {docId:docId})
    .then( rtn => {
      const htmlPage = rtn.htmlPage
      const blobHtml = new Blob([htmlPage], { type: 'text/html' })
      const urlBlob = URL.createObjectURL(blobHtml)
      // const windowFeatures = 'width=800,height=1122,resizable=yes,scrollbars=yes'
      const windowFeatures = 'width=850,height=1122,resizable=yes,scrollbars=yes'
      window.open(urlBlob, '_blank', windowFeatures) 
    }).catch( err => { 
      console.log(err)
      showToast(err.message,'red')
    }).finally( () => {
      removeSpinner()
    })
}




/********************************************/
/********************************************/
/********************************************/
/*****************  Util ********************/
/********************************************/
/********************************************/
/********************************************/

// //===============================================================
// // ล้างค่าช่องค้นหาไอเท็ม
// function clearSearchItems(){
//   const searhElm = document.getElementById("searchItems")
//   searhElm.value = '';
//   searhElm.focus()
// }

//============================================================
// ล้างผลการค้นหาเอกสาร
function clearSearchDocRes(){
  const sipElm = document.getElementById("sip")
  const selectElm = document.getElementById("loadDoc")
  const searhDocResNumElm = document.getElementById("searhDocResNum")
  sipElm.value = ""
  selectElm.textContent = ""
  searhDocResNumElm.value = ''
}





/***************************************************/
/***************************************************/
/***************************************************/
/***************************************************/
/***************************************************/
/*********************** Utils *********************/
/***************************************************/
/***************************************************/
/***************************************************/
/***************************************************/
/***************************************************/
function clearForms(){  
  const forms = document.querySelectorAll("form");
  forms.forEach(form => {
    form.reset();

    // ล้าง value ของทุก elements ใน form
    const inputs = form.querySelectorAll("input, select, textarea");
    inputs.forEach(input => {
      input.value = '';
    });
  });
}


