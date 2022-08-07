---
slug: static-generation-vs-server-side-rendering
title: Static Generation vs Server Side Rendering
authors: andres
tags: [Static Generation, Next.js, Server Side Rendering]
keywords: [Static Generation, Next.js, Server Side Rendering]
---

![image info](./ssg-vs-ssr.png)

<!-- truncate  -->

Next.js currently supports two forms of pre-rendering your content with **Static Generation** or **Server-side Rendering**. Both are techniques that improve SEO and render HTML for your app i n advance. Even though both accomplish the same thing they have some major differences when it comes to how they accomplish it. Each technique has its use case for the type of application you create. Before we take a look, lets see how Next.js **pre-renders** every page by default, regardless of **Static Generation** or **Server-side Generation**.

## Pre-rendering in Next.js

Out of the box Next.js pre-renders every page head of time, instead of having it all done by client side javascript. The way it does it is by a process known as **hydration**. Initially, each HTML is rendered with the minimal JavaScript necessary. This way your users have something to look at while your JavaScript loads. Then the JavaScript behavior (event handlers, interactivity, etc.) is added back to the HTML page, it becomes "**hydrated**".

![hydration](./hydration.png)

In contrast to a client only rendered app (rendered by a browser) your users have to wait until all of the JavaScript is loaded in order to see something on the page. If your JavaScript is large your users will not be happy staring at a blank page for some time.

![image info](./spa.png)

Now let's see the two forms of **pre-rendering**.

## Static Generation

![ssg](./ssg.png)

With **Static Generation** the HTML will be generated at **build time**, the same HTML will be used for each request. Essentially, your site requests are all being generated ahead of time making your site super fast. No need to wait for the server to fetch the requested page. Since your files are being statically generated you can store them in a CDN for even more improved performance (this blog uses Static Generation 😉).

Static site rendering is useful when you know all of the possible requests ahead of time. But what about for sites where you can't exactly predict all of the possible requests? This could be a polling site or a dashboard, basically anything where data is frequently updating. For such cases you will need **Server-side Rendering**.

## Server-side Rendering

![image info](./ssr.png)

In **Server-side Rendering**, the HTML is generated on each request. **Server-side rendering** is always slower than **Static Generation** but your users will always have up-to-date data. Each request is being served on a per-need basis.

**Server-side Rendering** lacks speed but it provides you with flexibility. It allows you to respond to any unexpected requests, show the most recent content from the database, and hide unauthenticated content.

## When to use which?

Of course each technique has its own use-case. It will depend on the type of application you're building. The question you should ask yourself is, can I render the content ahead of a user's request? if yes go for **Static Generation** if not then **Server-side Rendering**.

Some examples for **Static Generation** would be:

- Blog posts
- Documentation
- E-commerce
- Listings

And for **Server-side Rendering** it could be:

- User dashboard
- Polling Site
- Profile page
- Sports page

As always you can read the official docs and read more about the techniques discussed.
