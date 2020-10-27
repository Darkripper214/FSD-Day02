const express = require('express');
const hbs = require('express-handlebars');
const port =
  parseInt(process.argv[2]) || parseInt(process.env.APP_PORT) || 4000;

const app = express();

app.engine(
  'hbs',
  hbs({
    defaultLayout: 'main.hbs',
    helpers: {
      // Function to do basic mathematical operation in handlebar
      math: function (lvalue, operator, rvalue) {
        lvalue = parseFloat(lvalue);
        rvalue = parseFloat(rvalue);
        return {
          '+': lvalue + rvalue,
          '-': lvalue - rvalue,
          '*': lvalue * rvalue,
          '/': lvalue / rvalue,
          '%': lvalue % rvalue,
        }[operator];
      },
    },
  })
);

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

function randomDice() {
  return Math.floor(Math.random() * 6 + 1);
}
app.get('/images/:name', (req, res) => {
  res.sendFile(__dirname + '/images/' + req.params.name);
});

app.get('/roll', (req, res) => {
  res.status(200);
  res.type('text/html');
  res.render('roll', { seed1: randomDice(), seed2: randomDice() });
});

app.get('/', (req, res) => {
  res.status(200);
  res.type('text/html');
  res.render('landing');
});

app.use((req, res) => {
  res.redirect('/');
});

app.listen(port, () => console.log(`Running on http://localhost:${port}`));
