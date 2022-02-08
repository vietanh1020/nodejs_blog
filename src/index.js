const path = require('path')
const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override')
const handlebars = require('express-handlebars')
const SortMiddleware = require('./app/middlewares/SortMiddleware')


const app = express()
const port = 3000

// ghi đè phương thức post từ form => Delete/ put
app.use(methodOverride('_method'))

const route = require('./routes')
const db = require('./config/db')

// connect db
db.connect();



app.use(express.urlencoded({
  extended: true
}))
app.use(express.json())

// với những file tĩnh nó sẽ lao vào thư mục public
app.use(express.static(path.join(__dirname, 'public')))

// Midlleware
app.use(SortMiddleware)

// http logger
app.use(morgan('combined'))

// teplate engine
app.engine('hbs', handlebars({
  extname: '.hbs',  // đổi đuôi handlebars thành hbs
  helpers: {
    sum(a, b) { return a + b; },
    sortable: (field, sort) => {
      const sortType = field === sort.column ? sort.type : 'default'
      
      const icons = {
        default: 'fas fa-sort',
        asc: 'fas fa-sort-amount-up-alt',
        desc: 'fas fa-sort-amount-down',
      }

      const types = {
        default: 'asc',
        asc: 'desc',
        desc: 'asc',
      }

      const type = types[sortType]
      const icon = icons[sortType]

      return `<a href="?sort&column=${field}&type=${type}">
      <i class="${icon}"></i>
  </a>`
    }
  }

}));
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources/views'))


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


route(app);

