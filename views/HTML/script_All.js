
//====================================================
//   เมื่อคลิกที่ปุ่ม Login
//====================================================
function loginJs(btnLogin){

  //[]=== Check validity
  var isValidArr = [] ;
  var fieldToValidate = document.querySelectorAll('#frmLogin input') ;
  Array.prototype.forEach.call(fieldToValidate, el => {
    isValidArr.push(el.checkValidity()) ;
    if( el.checkValidity() == false){
      el.style.backgroundColor = "yellow" ;
      //== รีเซ็ตพื้นหลังเป็น "สีขาว" 
      setTimeout( () => {  el.style.backgroundColor = "white" },1000) ;
    }   
  })
  
  //[]=== กรอกครบทุกฟิลด์
  var isValid = isValidArr.every( item => item == true ) ;
  if(isValid){      
    btnLogin.disabled = true ;
    btnLogin.nextElementSibling.disabled = true

    // //=== ส่ง Username Password ไปตรวจสอบที่ Apps Script
    // google.script.run.withSuccessHandler(loginJsRes,btnLogin)
    //                  .withFailureHandler(loginJsRes,btnLogin)
    //                  .withUserObject(btnLogin)
    //                  .loginGas(btnLogin.parentNode) ;
    btnLogin.parentNode.reset()
  }      
} // function


//====================================================
//   ลบ localStorage ที่เก็บคีย์ username ออกไป
//====================================================
function logoutJs(){
    
  //== ลบ Local Storage 
  getSetRemoveLocalStorage("remove")

  //== ล้าง "สวัสดี..."
  var headerReportElm = document.getElementById("headerReport") ;
  headerReportElm.textContent= '' ;

  //=== ลบ dataset ทั้งหมดใน headerReport        
  delete headerReportElm.dataset.username
  delete headerReportElm.dataset.userAuthority
  delete headerReportElm.dataset.empId
  delete headerReportElm.dataset.empName
  delete headerReportElm.dataset.empLastname
  delete headerReportElm.dataset.empPlaceId
  delete headerReportElm.dataset.empPlaceName

  //== โหลดหน้าเริ่มต้นใหม่
  loadWelcomeJs() ;

  //== เปิดใช้ Login
  // loginEnable(true)    

  //== แสดงปุ่มสำหรับ Login ใหม่
  loginInputState("logout") ;

}  // function


//===================================================
// 
function getSetRemoveLocalStorage(action,obj=null){
  if(action == "set"){
    localStorage.setItem("fo_username",obj.username);
    localStorage.setItem("fo_userAuthority",obj.userAuthority);
    localStorage.setItem("fo_empId",obj.empId);
    localStorage.setItem("fo_empName",obj.empName);
    localStorage.setItem("fo_empLastname",obj.empLastname);
    localStorage.setItem("fo_empPlaceId",obj.empPlaceId);
    localStorage.setItem("fo_empPlaceName",obj.empPlaceName);
    return { action : action }
  }else if(action == "remove"){
    localStorage.removeItem("fo_username") ;
    localStorage.removeItem("fo_userAuthority") ;
    localStorage.removeItem("fo_empId") ;
    localStorage.removeItem("fo_empName") ;
    localStorage.removeItem("fo_empLastname") ;
    localStorage.removeItem("fo_empPlaceId") ;
    localStorage.removeItem("fo_empPlaceName") ;
    return { action : action }
  }else if(action == "get"){    
    return {
            action : action ,
            username : localStorage.fo_username == undefined ? null : localStorage.fo_username ,
            userAuthority : localStorage.fo_userAuthority == undefined ? null : localStorage.fo_userAuthority ,
            empId : localStorage.fo_empId == undefined ? null : localStorage.fo_empId ,
            empName : localStorage.fo_empName == undefined ? null : localStorage.fo_empName ,
            empLastname : localStorage.fo_empLastname == undefined ? null : localStorage.fo_empLastname ,
            empPlaceId : localStorage.fo_empPlaceId == undefined ? null : localStorage.fo_empPlaceId ,
            empPlaceName : localStorage.fo_empPlaceName == undefined ? null : localStorage.fo_empPlaceName ,
          } // return
  } // else if 
} // function 

//=======================================================================
// สำหรับ Fade ซ่อน/แสดง - Login/Logout
function loginInputState(state){
  const username = document.getElementById('username') ;
  const password = document.getElementById('password') ;
  const btnLogin = document.getElementById('btnLogin') ;
  const btnLogout = document.getElementById('btnLogout') ;
  // 
  const frmLogin = document.getElementById('frmLogin') ;
  
  //=== Logined - Login อยู่ 
  //    - ซ่อนช่องกรอก Username/Password/Login
  if(state == "login"){
    username.classList.add("dp-n") ;    
    password.classList.add("dp-n") ;    
    btnLogin.classList.add("dp-n") ;    
    
    frmLogin.style.gridTemplateColumns = "auto" ;
    btnLogout.classList.remove("dp-n") ;    
    btnLogout.style.gridColumn = "1/2" ;
    
  }
  //=== Logouted - Logout ไปแล้ว
  // แสดงช่องกรอก Username/Password
  else if(state == "logout"){
    username.classList.remove("dp-n") ;
    password.classList.remove("dp-n") ;
    btnLogin.classList.remove("dp-n") ;

    frmLogin.style.gridTemplateColumns = "120px 120px auto" ;    
    btnLogout.classList.add("dp-n") ;
    btnLogout.style.gridColumn = "3/4" ;
  } // if
} // function

// //=============================================================
// //   DATE FORMAT - สำหรับจัดรูปแบบวันที่และเวลา
// function formatDateAndTime(dateObj=new Date(),
//                            isBuddhist=false,
//                            isMonthLong=true,
//                            isYearLong=true,
//                            isShowTime=false,
//                            isSecond=true){
//   const date = dateObj.getDate()
//   const month = dateObj.getMonth()
//   const monthThaiLong = [ "มกราคม","กุมภาพันธ์","มีนาคม",
//                           "เมษายน","พฤษภาคม","มิถุนายน",
//                           "กรกฎาคม","สิงหาคม","กันยายน",
//                           "ตุลาคม","พฤศจิกายน","ธันวาคม"]
//   const monthThaiShort = ["ม.ค.","ก.พ.","มี.ค.",
//                           "เม.ย.","พ.ค.","มิ.ย.",
//                           "ก.ค.","ส.ค.","ก.ย.",
//                           "ต.ค.","พ.ย.","ธ.ค."]
//   const monthDisplay = isMonthLong == true ? monthThaiLong[month] : monthThaiShort[month]
//   var year = isBuddhist == false ? dateObj.getFullYear() :  dateObj.getFullYear()+543
//   year = isYearLong == false ? year.toString().substring(2,4) : year
//   if(isShowTime == true){
//      const hour = dateObj.getHours() < 10 ? "0"+dateObj.getHours() : dateObj.getHours()
//      const minute = dateObj.getMinutes() < 10 ? "0"+dateObj.getMinutes() : dateObj.getMinutes()
//      if(isSecond == true){
//        const second = dateObj.getSeconds() < 10 ? "0"+dateObj.getSeconds() : dateObj.getSeconds()
//        return `${date} ${monthDisplay} ${year} ${hour}:${minute}:${second}`
//      }else{
//        return `${date} ${monthDisplay} ${year} ${hour}:${minute}`
//      }
//   }else{
//      return `${date} ${monthDisplay} ${year}`
//   } 
// } // function


// //=============================================================
// //   DATE FORMAT - สำหรับจัดรูปแบบวันที่และเวลา
// function formatDateAndTimeAsNum(dateObj=new Date(),isShowTime=true){
//   const date = dateObj.getDate() < 10 ? "0"+dateObj.getDate() : dateObj.getDate()
//   const month = (dateObj.getMonth()+1) < 10 ? "0"+(dateObj.getMonth()+1) : (dateObj.getMonth()+1)
//   const year = dateObj.getFullYear().toString().substring(2,4)
//   if(isShowTime == true){
//     const hour = dateObj.getHours() < 10 ? "0"+dateObj.getHours() : dateObj.getHours()
//     const minute = dateObj.getMinutes() < 10 ? "0"+dateObj.getMinutes() : dateObj.getMinutes()
//     return `${date}-${month}-${year} ${hour}:${minute}`
//   }else{
//     return `${date}-${month}-${year}`
//   } 
// } // function

// //=============================================================
// //  V4
// //
// function formatDTAsNum(dateObj=new Date(), isShowDate=true, isShowTime=true){
//   const date = dateObj.getDate() < 10 ? "0"+dateObj.getDate() : dateObj.getDate()
//   const month = (dateObj.getMonth()+1) < 10 ? "0"+(dateObj.getMonth()+1) : (dateObj.getMonth()+1)
//   const year = dateObj.getFullYear().toString().substring(2,4)
//   if(isShowDate== true && isShowTime == true){
//     const hour = dateObj.getHours() < 10 ? "0"+dateObj.getHours() : dateObj.getHours()
//     const minute = dateObj.getMinutes() < 10 ? "0"+dateObj.getMinutes() : dateObj.getMinutes()
//     return `${date}-${month}-${year} ${hour}:${minute}`  
//   }else if(isShowDate == true  && isShowTime == false){
//     return `${date}-${month}-${year}`  
//   }else if(isShowDate == false  && isShowTime == true){
//     const hour = dateObj.getHours() < 10 ? "0"+dateObj.getHours() : dateObj.getHours()
//     const minute = dateObj.getMinutes() < 10 ? "0"+dateObj.getMinutes() : dateObj.getMinutes()
//     return `${hour}:${minute}`
//   }
// }

