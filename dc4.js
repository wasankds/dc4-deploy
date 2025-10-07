import 'dotenv/config'
import express from 'express'
import session from 'express-session'
import cookieParser from 'cookie-parser'
import flash from 'connect-flash'
import MongoDBSession from 'connect-mongodb-session' 
global.dbName = process.env.DB_NAME
global.dbUrl = process.env.DB_URL
global.IS_PRODUCTION = process.env.IS_PRODUCTION == 1 ? true : false
global.PROJECT_DIR = process.cwd()
const PORT = process.env.PORT_DEPLOY == 0 ? process.env.PORT_DEV : process.env.PORT_SERVER
global.DOMAIN_ALLOW = process.env.PORT_DEPLOY == 0 ? `${process.env.LOCALHOST_ALLOW}:${PORT}` : `${process.env.DOMAIN_ALLOW}`
global.dbName = process.env.DB_NAME
global.dbUrl = process.env.DB_URL
global.mymoduleFolder = global.IS_PRODUCTION ? 'mymodule-min' : 'mymodule'
const routesFolder = global.IS_PRODUCTION ? 'routes-min' : 'routes'
import './mymodule/myGlobal.js'
const app = express()
//=== Sessionss
const MongoStore = MongoDBSession(session)
app.use(session({
  secret: 'dc4.creator.node.apps.key.sign.cookie',
  cookie: {
    maxAge: 1000*60*60*24*30 ,  // 30 days
    // Prevent client-side JavaScript from accessing the cookie
    // secure: process.env.DEPLOY == 'dev' ? false : true, 
    httpOnly: IS_PRODUCTION ? true : false,
  },
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    uri: dbUrl,
    databaseName: dbName,
    collection: dbColl_sessions,
  }),
}))
//=== สำหรับการตั้งค่า Express
app.set('view engine', 'ejs')
app.use(flash())
app.use(cookieParser())
app.use(express.json({limit:'50mb'}))
app.use(express.urlencoded({extended:true,limit:'50mb'}))
app.use(express.static(global.folderPublic)) 
app.use((req, res, next) => {
  const allowedOrigins = [ 
    global.DOMAIN_ALLOW, 
    `${process.env.LOCALHOST_ALLOW}:${PORT}` , 
  ]
  const origin = req.headers.origin
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin)
  } else {
    res.header('Access-Control-Allow-Origin', 'null') 
  }
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})
if( process.env.USE_STARTAPP_ROUTER == 1 ) 
app.use((await import(`./${routesFolder}/startAppRouter.js`)).default) 
app.use((await import(`./${routesFolder}/homeRouter.js`)).default) 
app.use((await import(`./${routesFolder}/loginRouter.js`)).default)
app.use((await import(`./${routesFolder}/docsGeneralRouter.js`)).default)
app.use((await import(`./${routesFolder}/docsMainRouter.js`)).default);
app.use((await import(`./${routesFolder}/reportDocsRouter.js`)).default);
app.use((await import(`./${routesFolder}/manageSettingsRouter.js`)).default)
app.use((await import(`./${routesFolder}/manageSettingsSystemRouter.js`)).default)
app.use((await import(`./${routesFolder}/manageSessionsRouter.js`)).default)
app.use((await import(`./${routesFolder}/manageUsersRouter.js`)).default)
app.use((await import(`./${routesFolder}/userInfoRouter.js`)).default);
app.use((await import(`./${routesFolder}/passwordRouter.js`)).default);
app.use((await import(`./${routesFolder}/itemsRouter.js`)).default);
app.use((await import(`./${routesFolder}/itemsCategoriesRouter.js`)).default);
app.use((await import(`./${routesFolder}/customersRouter.js`)).default);
app.use( (err, req, res, next) => {
  res.status(err.status || 500);
  const errHtml = `<h1 style="color:blue">กำลังอัปเดทข้อมูล</h1>
    <p style="color:red">"err.status ===> " ${err.status}</p>
    <p style="color:red">"err.stack ===> " ${err.stack}</p>`
  res.send(errHtml)
  next()
})
app.get('*', (req,res) => {
  res.status(404).sendFile(file404)
})

//=== Start the server
app.listen(PORT, () => {
  console.log(`========== Server@${DOMAIN_ALLOW} ===========`)
  console.log("- IS_PRODUCTION ", global.IS_PRODUCTION)
  console.log("- DOMAIN_ALLOW ", global.DOMAIN_ALLOW)
})






// app.use((await import(`./${routesFolder}/quotationRouter.js`)).default);
// app.use((await import(`./${routesFolder}/invoiceRouter.js`)).default);
// app.use((await import(`./${routesFolder}/receiptRouter.js`)).default);
// app.use((await import(`./${routesFolder}/billRouter.js`)).default);
