
import path from 'path'
// ใช้หลายหน้า
global.SYS_NAME = 'DC4'
global.SYS_NAME2 = ''
global.SYS_VERSION = '2.0'
// ใช้ในหน้า term and conditions
global.SYS_OWNER_FULLNAME = 'นายวสันต์ คุณดิลกเศวต'
global.SYS_OWNER_EMAIL = 'wasankds@gmail.com'
global.SYS_OWNER_PHONE = '081-459-8343'
// Database 
// global.dbUrl = 'mongodb://localhost:27017'
// global.dbName = 'docsCreator' // ดึงจาก .dnv
global.dbColl_settings = 'settings'
global.dbColl_settings_Quotation = 'settings_Quotation'
global.dbColl_settings_Invoice = 'settings_Invoice'
global.dbColl_settings_Receipt = 'settings_Receipt'
global.dbColl_settings_Bill = 'settings_Bill'
global.dbColl_settingsSystem = 'settingsSystem'
global.dbColl_sessions = 'sessions'
global.dbColl_users = 'users'
global.dbColl_usersResetPassword = 'usersResetPassword'
global.dbColl_items = 'items' 
global.dbColl_itemsCategories = 'itemsCategories' 
global.dbColl_customers = 'customers' 
global.dbColl_quotation = 'quotation' 
global.dbColl_invoice = 'invoice' 
global.dbColl_receipt = 'receipt'
global.dbColl_bill = 'bill'
// ระบบ
global.PAGE_HOME = 'DC4'
global.PAGE_TERM = 'ข้อกำหนดและเงื่อนไข'
global.PAGE_SYSTEM_MANUAL = 'การใช้งานระบบ'
global.PAGE_LOGIN = 'เข้าสู่ระบบ'
global.PAGE_MANAGE_USERS = 'จัดการผู้ใช้งาน'
global.PAGE_MANAGE_SETTINGS = 'ตั้งค่า'
global.PAGE_MANAGE_SETTINGS_SYSTEM = 'ตั้งค่าระบบครั้งแรก'
global.PAGE_MANAGE_SESSIONS = 'จัดการเซสชั่น'
global.PAGE_USERS = 'ผู้ใช้งาน'
global.PAGE_USER_INFO = 'ข้อมูลผู้ใช้งาน'
global.PAGE_PASSWORD_FORGOT = 'ลืมรหัสผ่าน'
global.PAGE_PASSWORD_RESET = 'รีเซ็ตรหัสผ่าน'
// เอนทิตี้
global.PAGE_CUSTOMERS = 'ลูกค้า'
global.PAGE_ITEMS = 'ไอเท็ม'
global.PAGE_ITEMS_CATEGORIES = 'หมวดหมู่ไอเท็ม'  
// เอกสารและรายงาน
global.PAGE_QUOTATION = 'ใบเสนอราคา'
global.PAGE_INVOICE = 'ใบแจ้งหนี้'
global.PAGE_RECEIPT = 'ใบเสร็จรับเงิน'
global.PAGE_BILL = 'บิลเงินสด'
global.PAGE_REPORT_QUOTATION = 'รายงานใบเสนอราคา'
global.PAGE_REPORT_INVOICE = 'รายงานใบแจ้งหนี้'
global.PAGE_REPORT_RECEIPT = 'รายงานใบเสร็จรับเงิน'
global.PAGE_REPORT_BILL = 'รายงานบิลเงินสด'
// ค่าคงที่
global.SYSTEM_START = {
  PORT_SERVER: 80, // ทดสอบกับ tualeklek ใช้ 80 เท่านั้น - แก้ให้ตรงกับใช้งานจริง
  PORT_DEV: 80,    // ทดสอบกับ tualeklek ใช้ 80 เท่านั้น - แก้ให้ตรงกับใช้งานจริง
  DEPLOY: 1,       // 0 = dev, 1 = prod-ต้องเป็น 1 เลย ไม่เช่นนั้นเข้าจากโดเมนไม่ได้  
  LOCALHOST_ALLOW: 'http://localhost',
  DOMAIN_ALLOW: 'https://tualeklek.com', 
}
// ค่าคงที่ - EBR
global.USER_AUTHORITIES = ["O", "A", "U"]
const docStatus = [
  { statusNumber : 0, statusName : 'ว่าง' } , 
  { statusNumber : 1, statusName : 'สร้าง' } , 
  { statusNumber : 2, statusName : 'จบ' } , 
  { statusNumber : 10, statusName : 'ยกเลิก' } 
]
global.DOC_STATUS = docStatus
global.DOC_STATUS_TITLE = docStatus.reduce( (acc, obj) => {  
  acc += `${obj.statusNumber} : ${obj.statusName}` + '\n'
  return acc
}, '');


// Message ต่างๆ
global.USERNAME_PATTERN = "^[a-z0-9_.]{6,}$"
global.USERNAME_DESCRIPTION = "อักษรที่สามารถใช้เป็นชื่อยูสเซอร์ได้ a-z, 0-9, . หรือ _ อย่างน้อย 6 ตัวอักษร"
global.USER_SIGNATURE_DESCRIPTION = "ไฟล์ภาพ .png ไม่เกิน 1MB เท่านั้น ขนาดที่แนะนำ 330x120px"
global.PASSWORD_PATTERN = "^[a-zA-Z0-9._!@#%&*+\\-=]{6,}$"
global.PASSWORD_DESCRIPTION = "อักษรที่สามารถใช้เป็นพาสเวิร์ดได้ a-z, A-Z, 0-9, ., _, !, @, #, %, &, *, -, +, = อย่างน้อย 6 ตัวอักษร"
global.EMAIL_PATTERN = "^[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
global.PHONE_PATTERN = "^[0-9]{10}$"
global.PHONE_DESCRIPTION = "เบอร์โทรศัพท์ 9-10 หลัก"
global.ITEM_TYPE_PATTERN = "^[a-zA-Z0-9_\\-]{5,}$"
global.ITEM_TYPE_DESCRIPTION = "อักษรที่สามารถใช้เป็นประเภทไอเท็มได้ a-z, A-Z, 0-9, _, - อย่างน้อย 5 ตัวอักษร"
// global.CUSTOMER_PATTERN = "^(?=.*[a-zA-Z0-9ก-ฮ_+\\/\\-\\(\\)])([a-zA-Z0-9ก-ฮ,_+\\/\\-\\s\\(\\)]{4,})$"
// global.CUSTOMER_DESCRIPTION = "อักษรที่สามารถใช้เป็นชื่องานได้ ก-ฮ, a-z, A-Z, 0-9, _, +, -, ช่องว่าง อย่างน้อย 4 ตัวอักษร"
global.CUSTOMER_TAXID_PATTERN = "^(?=.*[0-9]{13,})[0-9]{13,}$"
global.CUSTOMER_TAXID_DESCRIPTION = "ตัวเลข 13 หลักขึ้นไป"
global.CUSTOMER_IDENTITYID_PATTERN = "^[0-9]{13}$"
global.CUSTOMER_IDENTITYID_DESCRIPTION = "ตัวเลข 13 หลัก"
global.MONTH_NAMES = ['มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน','กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'];
global.MONTH_NAMES_SHORT = ["ม.ค.","ก.พ.","มี.ค.","เม.ย.","พ.ค.","มิ.ย.","ก.ค.","ส.ค.","ก.ย.","ต.ค.","พ.ย.","ธ.ค."]
// ชื่อไฟล์ต่างๆ
global.SIGNATURE_SUFFIX = "_SIGNATURE" // คำลงท้ายภาพลายเซ็น
global.LOGO_QUOTATION_FILENAME = 'HEADER_QUOTATION_LOGO.png'
global.LOGO_INVOICE_FILENAME = 'HEADER_INVOICE_LOGO.png'
global.LOGO_RECEIPT_FILENAME = 'HEADER_RECEIPT_LOGO.png'
global.LOGO_BILL_FILENAME = 'HEADER_BILL_LOGO.png'

// ไฟล์และโฟลเดอร์
global.folderPublic = pathToFolder('public')
global.folderImages = pathToFolder('public','images')
global.folderViews = pathToFolder('views')
global.folderUsers = pathToFolder('users')
global.folderDocs = pathToFolder('docs')
global.folderItems = pathToFolder('items')
global.folderPartials = pathToFolder('views','partials')
global.folderForm = pathToFolder('views','forms')
global.file404 = pathToFolder('public','static', '404.html')
global.folderScreenshot = pathToFolder('public','images', 'screenshot')
function pathToFolder( ...args){  
  const rootFolder = process.cwd()
  return path.join(rootFolder, ...args)
}


global.NAV_LEFT_1 = [
  { // หน้าแรก ==================
    path: '/', 
    title: PAGE_HOME,
    icon: 'fas fa-house' ,
    userAuthorities: ['O', 'A', 'U'],
    separator: false,    
  },
  {
    path: '/quotation',
    title: PAGE_QUOTATION,
    icon: 'fas fa-file-signature',
    userAuthorities: ['O', 'A', 'U'],
    separator: false, 
  },
  {
    path: '/invoice',
    title: PAGE_INVOICE,
    icon: 'fas fa-file-invoice-dollar',
    userAuthorities: ['O', 'A', 'U'],
    separator: false, 
  },
  {
    path: '/receipt',
    title: PAGE_RECEIPT,
    icon: 'fas fa-receipt',
    userAuthorities: ['O', 'A', 'U'],
    separator: false, 
  },
  {
    path: '/bill',
    title: PAGE_BILL,
    icon: 'fas fa-money-bill',
    userAuthorities: ['O', 'A', 'U'],
    separator: false, 
  },
]

global.NAV_LEFT_2 = [
  {
    path: '/items',
    title: PAGE_ITEMS,
    icon: 'fas fa-box',
    userAuthorities: ['O', 'A'],
    separator: false, 
  },
  {
    path: '/items-categories',
    title: PAGE_ITEMS_CATEGORIES,
    icon: 'fas fa-layer-group',
    userAuthorities: ['O', 'A'],
    separator: false, 
  },
  {
    path: '/customers',
    title: PAGE_CUSTOMERS,
    icon: 'fas fa-users',
    userAuthorities: ['O', 'A'],
    separator: false, 
  },
]






  // {
  //   path: '/files-manager',
  //   title: PAGE_FILES_MANAGER,
  //   icon: 'fas fa-file-alt me-1',
  //   userAuthorities: ['O'],
  //   separator: false    
  // },
  // {
  //   path: '/manage/users',
  //   title: PAGE_MANAGE_USERS,
  //   icon: 'fas fa-users',
  //   userAuthorities: ['O'],
  //   separator: false    
  // },
  // {
  //   path: '/manage/users',
  //   title: PAGE_MANAGE_USERS,
  //   icon: 'fas fa-users',
  //   userAuthorities: ['O'],
  //   separator: false    
  // },
  // {
  //   path: '/manage/settings',
  //   title: PAGE_MANAGE_SETTINGS,
  //   icon: 'fas fa-sliders-h',
  //   userAuthorities: ['O'],
  //   separator: false
  // },
  // {
  //   path: '/manage/settings/system',
  //   title: PAGE_MANAGE_SETTINGS_SYSTEM,
  //   icon: 'fas fa-gear',
  //   userAuthorities: ['O'],
  //   separator: false
  // },












  