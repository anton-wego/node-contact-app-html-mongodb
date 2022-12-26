const methodOverride = require('method-override')
const express = require('express')
const expresslayout = require('express-ejs-layouts')
const app = express()
const port = 3500

require('./model/db')
const Contact = require('./model/contact')



// setup ejs 
app.set('view engine', 'ejs')
app.use(expresslayout) // one of thrid-party middleware
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

// setup method-override
app.use(methodOverride('_method')) 

// setup flash
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')
// config flash
app.use(cookieParser('secret'))
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
)
app.use(flash())

const { body, validationResult, check } = require('express-validator')



// home
app.get('/', (req, res) => {
  res.render('index', { layout: 'layouts/app-layout', name: 'anton effendi'})
})

// about
app.get('/about-youduan', (req, res) => {
  res.render('about-youduan', { layout: 'layouts/app-layout' })
})

// contact
app.get('/contact', async (req, res) => {
  const contacts = await  Contact.find();

  res.render('contact', { layout: 'layouts/app-layout', contacts, msg: req.flash('msg') })
})

// add contact page
app.get('/contact/new', (req, res) => {
  // const contacts = loadContact();

  res.render('contact_new', { layout: 'layouts/app-layout' })
})

// process save contact
app.post('/contact', [
  body('name').custom(async (value) => {
    const duplicate = await Contact.findOne({ name: value})
    if (duplicate){
      throw new Error('Name already exits')
    } 
    return true
  }),
  check('email', 'Email is not valid').isEmail(),
  body('hp', 'Hp is not valid').isMobilePhone('id-ID')
  ], 
  (req, res) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()){
      res.render('contact_new', { layout: 'layouts/app-layout', errors: errors.array() })
    } else {
      Contact.insertMany(req.body, (err, result) => {
        req.flash('msg', 'Contact has been successfully saved')
        res.redirect('/contact')    
      })
      
    }
  }
)

// detail contact
app.get('/detail/:name', async (req, res) => {
  const contact = await Contact.findOne({ name: req.params.name });

  res.render('detail_contact', { layout: 'layouts/app-layout', contact })
})

// edit contact
app.get('/contact/edit/:name', async (req, res) => {
  const contact = await Contact.findOne({ name: req.params.name });

  res.render('contact_edit', { layout: 'layouts/app-layout', contact })
})


// update contact
app.put('/contact', [
  body('name').custom(async (value, { req }) => {
    const duplicate = await Contact.findOne({name: value})
    if (value !== req.body.oldName && duplicate){
      throw new Error('Name already exits')
    }
    return true
  }),
  check('email', 'Email is not valid').isEmail(),
  body('hp', 'Hp is not valid').isMobilePhone('id-ID')
  ], 
  (req, res) => {

    const errors = validationResult(req)

    if (!errors.isEmpty()){
      res.render('contact_edit', { layout: 'layouts/app-layout', errors: errors.array(), contact: req.body })
    } else {
      Contact.updateOne( {_id: req.body._id},
        { 
          $set: {
            name: req.body.name,
            email: req.body.email,
            hp: req.body.hp
          }
        }
      ).then((result) => {
        // updateContact(req.body.oldName, req.body)
        req.flash('msg', 'Contact has been successfully updated')
        res.redirect('/contact')  
      }).catch((err) => {

    console.log(err)
  })
    }
  }
)

// delete contact example 1 --> using a href
app.get('/contact/delete/:name', async(req, res) => {
  const contact = await Contact.findOne({name: req.params.name})
  if (!contact) {
    res.status = 404 
    res.send('<h1> not found - 404 </h1>')
  } else {
    Contact.deleteOne(contact, (err, r) => {
      req.flash('msg', 'contact has been successfully deleted')
      res.redirect('/contact')
    })
  }
})

// delete contact example 2 --> using form
app.delete('/contact', async(req, res) => {
  const contact = await Contact.findOne({name: req.body.name})
  if (!contact) {
    res.status = 404 
    res.send('<h1> not found - 404 </h1>')
  } else {
    Contact.deleteOne(contact, (err, r) => {
      req.flash('msg', 'contact has been successfully deleted')
      res.redirect('/contact')
    })
  }
})

app.use('/', (req, res) => {
  res.status = 404
  res.send('<h1>404</h1>')
})


app.listen(port, () => {
  console.log(`Contact app listening on port ${port}`)
})
