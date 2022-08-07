---
slug: get-form-data-on-email
title: 'Get Form Data on Email | Next.js + SmtpJS'
authors: andres
tags: [Next.js, SmtpJS, Email Data]
keywords: [Next.js, SmtpJS, Email Data, React, Javascript]
---

![contact logic](./contact-f.png)

<!-- truncate  -->

We are going to create the functionality for receiving form data through a contact page and sending it to any email address. We will only need [Next.js](https://nextjs.org/) and [SmtpJs](https://smtpjs.com/). We are going to send a /POST request from the client with form data, and on the server we are going to receive this data and send it to the desired email address.

## Create Next.js project

`npx create-next-app contact-form`

## Create Api Route

Create a folder called `api` inside the `pages` folder and add a file called `contact.js`. This will create an api route to `/api/contact`

![contact form](./contact-folder.png)

## Write server logic

Install the [XMLHttpRequest](https://github.com/driverdan/node-XMLHttpRequest) package for nodejs:

`npm i xmlhttprequest`

Download the code from [SmtpJS.com](https://smtpjs.com/) copy and paste to the `contact.js` file. Your code should look like this (contact.js):

```javascript title="contact.js"
'use strict'
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

const Email = {
  send: function (a) {
    return new Promise(function (n, e) {
      ;(a.nocache = Math.floor(1e6 * Math.random() + 1)), (a.Action = 'Send')
      var t = JSON.stringify(a)
      Email.ajaxPost('https://smtpjs.com/v3/smtpjs.aspx?', t, function (e) {
        n(e)
      })
    })
  },
  ajaxPost: function (e, n, t) {
    var a = Email.createCORSRequest('POST', e)
    a.setRequestHeader('Content-type', 'application/x-www-form-urlencoded'),
      (a.onload = function () {
        var e = a.responseText
        null != t && t(e)
      }),
      a.send(n)
  },
  ajax: function (e, n) {
    var t = Email.createCORSRequest('GET', e)
    ;(t.onload = function () {
      var e = t.responseText
      null != n && n(e)
    }),
      t.send()
  },
  createCORSRequest: function (e, n) {
    var t = new XMLHttpRequest()
    return (
      'withCredentials' in t
        ? t.open(e, n, !0)
        : 'undefined' != typeof XDomainRequest
        ? (t = new XDomainRequest()).open(e, n)
        : (t = null),
      t
    )
  },
}
```

## Create function handler

Create the function in the same file and put it under the previous code we wrote. You can use async/await to handle any errors:

```javascript title="contact.js"
/* 
...
  previous code 
...
*/

export default async function handler(req, res) {
  try {
    await Email.send({
      Host: process.env.SMTP_HOST,
      Username: process.env.USERNAME,
      Password: process.env.PASSWORD,
      To: 'RECIPIENT EMAIL ADDRESS',
      From: req.body.email,
      Subject: `Email from: ${req.body.name}`,
      Body: req.body.message,
    })

    res.status(200).json({ response: 'Successfully sent email' })
  } catch (error) {
    res.status(500).json({ response: 'Internal server error' })
  }
}
```

To use .env variables create a `.env.local` file at the root level to store your credentials (you can have any smtp host, we will use gmail for this example):

```env
SMTP_HOST=smtp.gmail.com
USERNAME=<your email address>
PASSWORD=<your email password>
```

Then you can access your .env variables via `process.env.<YOUR VARIABLE>`  
**Note**: if you are using gmail you need to turn on "Less secure app access" feature for your gmail account. This will allow the server to authenticate with your credentials.

You `contact.js` file should look like this now:

```javascript title="contact.js"
'use strict'
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest

const Email = {
  send: function (a) {
    return new Promise(function (n, e) {
      ;(a.nocache = Math.floor(1e6 * Math.random() + 1)), (a.Action = 'Send')
      var t = JSON.stringify(a)
      Email.ajaxPost('https://smtpjs.com/v3/smtpjs.aspx?', t, function (e) {
        n(e)
      })
    })
  },
  ajaxPost: function (e, n, t) {
    var a = Email.createCORSRequest('POST', e)
    a.setRequestHeader('Content-type', 'application/x-www-form-urlencoded'),
      (a.onload = function () {
        var e = a.responseText
        null != t && t(e)
      }),
      a.send(n)
  },
  ajax: function (e, n) {
    var t = Email.createCORSRequest('GET', e)
    ;(t.onload = function () {
      var e = t.responseText
      null != n && n(e)
    }),
      t.send()
  },
  createCORSRequest: function (e, n) {
    var t = new XMLHttpRequest()
    return (
      'withCredentials' in t
        ? t.open(e, n, !0)
        : 'undefined' != typeof XDomainRequest
        ? (t = new XDomainRequest()).open(e, n)
        : (t = null),
      t
    )
  },
}

export default async function handler(req, res) {
  try {
    await Email.send({
      Host: process.env.SMTP_HOST,
      Username: process.env.USERNAME,
      Password: process.env.PASSWORD,
      To: 'RECIPIENT EMAIL ADDRESS',
      From: req.body.email,
      Subject: `Email from: ${req.body.name}`,
      Body: req.body.message,
    })

    res.status(200).json({ response: 'Successfully sent email' })
  } catch (error) {
    res.status(500).json({ response: 'Internal server error' })
  }
}
```

And that's it for for the server.

## Calling the function client side

Now you can just call this api route in the client (react app) to receive the form data to your inbox:

```jsx
const submitForm = async (e) => {
  e.preventDefault()
  await fetch('/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, message }),
  })
}
```
