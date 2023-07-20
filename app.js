const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000; // Change this to your preferred port number

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the HTML form page
app.get('/', (req, res) => {
  res.send(`
    <html>
    <body>
      <h3>Subscribe to my Weekly Newsletter</h3>
      <form action="/subscribe" method="post">
        <input type="text" name="name" placeholder="Name (e.g. John Doe)" required><br>
        <input type="email" name="email" placeholder="Email (e.g. johndoe@mail.com)" required><br>
        <button type="submit">Subscribe</button>
      </form>
    </body>
    </html>
  `);
});

// Handle form submission
app.post('/subscribe', (req, res) => {
  const { name, email } = req.body;

  // Send email using nodemailer
  const transporter = nodemailer.createTransport({
    service: 'Gmail', // e.g., 'Gmail', 'Outlook'
    auth: {
      user: 'sakshiporwal2002@gmail.com',
      pass: 'PorwalSakshi@321'
    }
  });

  const mailOptions = {
    from: 'your_email@example.com',
    to: 'sakshiporwal2002@gmail.com', // Replace with your email to receive the subscribers' emails
    subject: 'New Subscriber',
    text: `New subscriber: ${name} - ${email}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.send('Error submitting the form. Please try again later.');
    } else {
      console.log('Email sent:', info.response);
      res.send('Thank you for subscribing to our newsletter!');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
