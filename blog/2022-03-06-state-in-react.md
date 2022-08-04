---
slug: react-state-management
title: 'State Management in React'
authors: andres
tags: [react state, UI state, Cache state, Redux]
---

One of hardest problems in a modern web application is being able to effectively manage state. State can be any piece of data, and data is information that changes over time. Most of our applications are interactive and change often, they are never static. For this reason there are probably hundreds of state management libraries today, with the most popular that comes to mind, [React Redux](https://react-redux.js.org/).

<!-- truncate -->

One of the reasons React Redux became popular is because it solved the problem of **prop drilling**, but it also added complexity. Do we really need _everything_ to be global? probably not. Global state is hard to maintain (think about global state touching hundreds of components, not maintainable in the long term).

To manage state effectively you have to stop and think twice about the current data at hand and how it relates to the application as a whole. Always start with the simplest solution and gradually introduce libraries when needed. One thing for sure is that we can categorize two types of state in a client side application: **Cache state** (server state) and **UI state**, these two need to be treated separately.

- **Cache state**: state that is owned by the server and not the client. It is only stored in the client for quick access. We don't want to make a request to the server every time we navigate to a page, so we store it for later retrieval. You also have to keep it in sync with the original owner (server) as cache state becomes stale instantly. One library that handles this kind of state effectively is [React Query](https://react-query.tanstack.com/).

- **UI State**: state that is only used by the UI for controlling the interactive parts of our app. This could be a modal state (open or closed) or menu state. This kind of sate is owned by the client. In a React application you would use something like `useState()` or `createContext()`.

# Avoid Global State (whenever possible)

Global state often leads to application maintenance and performance problems. It can trigger unnecessary renders for your app. You have to keep track where the global sate is being used (can be hundreds of components). Sure, you know where exactly your state lives but do you know where the code that manges this state lives? it could be anywhere.

### Lift State Up

One basic technique that if often used in React is to **lift state up** to the least common parent. For example say we have the following code structure:

```jsx
const Profile = () => {
  const [user, setUser] = React.useState('user')

  return (
    <div>
      <h1>{user}</h1>
      <label>set user</label>
      <input value={user} id={user} onChange={(e) => setUser(e.target.value)} />
    </div>
  )
}

const Comments = () => {
  return (
    <div>
      <h1>Comments</h1>
    </div>
  )
}

const Home = () => {
  return (
    <>
      <Profile />
      <Comments />
    </>
  )
}
```

And we now need the `user` to be in the `Comments` component, the least common parent (or least common ancestor) in this case it would be the `Home` component so we lift state up to be there (this example is simple but think about what if you had hundreds of components that are nested several layers deep):

```jsx
const Profile = ({ user, setUser }) => {
  return (
    <div>
      <h1>{user}</h1>
      <label>set user</label>
      <input value={user} id={user} onChange={(e) => setUser(e.target.value)} />
    </div>
  )
}

const Comments = ({ user }) => {
  return (
    <div>
      <p>Hello, {user}</p>
      <h1>Comments</h1>
    </div>
  )
}

const Home = () => {
  const [user, setUser] = React.useState('user')

  return (
    <>
      <Profile user={user} setUser={user} />
      <Comments user={user} />
    </>
  )
}
```

### Colocation

What if now you don't need the `user` in the `Comments` component anymore? well you would move state **down the tree**, in this case it is the `Profile` component (what we had initially). **Colocation** is the opposite of **lifting state up**. We move state down only to where it is needed. This idea of keeping state only to where it is needed is a very powerful technique that scales, improves performance, and enables our app to be responsive to changes over time.

### Create Context

We can expand this idea further with `createContext()`. One piece of data can be global only to a certain amount of components that use it (not to our entire app). So we would end up with multiple providers that manage state for a small portion of our app, we would end up with something like this:

```jsx
const UserPage = ({ username }) => {
  return (
    <UserProvider value={username}>
      <UserProfile />
      <UserSettings />
      <DisplayUser />
    </UserProvider>
  )
}

const CommentsPage = ({ commentId }) => {
  return (
    <CommentsProvider value={commentId}>
      <CommentList />
      <CurrentComment />
      <AddRemoveComment />
    </CommentsProvider>
  )
}

const Posts = ({ postId }) => {
  return (
    <PostsProvider value={postId}>
      <PostTitle />
      <Posts />
      <CurrentPost />
    </PostsProvider>
  )
}
```

Each page can has its own provider and enable the children to have access to the data as well. This makes it easier to maintain now you know where exactly to look for the code that manages a certain piece of state (our context provider). Whenever our context changes it will only re-render the components that are enclosed by it, your entire app does not re-render only the components that use the data. This will drastically improve performance and enable our code to be code-split.

### Component Composition

Often enough, passing props one or two level deeps if fine. We might be tempted to use Context but a simpler solution is [Component Composition](https://reactjs.org/docs/context.html). With component composition we can pass components as props, this will enable some components to have "slots" (or holes). This is a useful technique when you want to reduce the amount of props you need to pass through your application and the need to decouple a child from its intermediate ancestors.

# Libraries for Specific Use Cases

There are certain uses cases when you might want to look outside of react, this could be when working with extensive graphics, charts, or graphs. For such cases you can take a look at:

- [Recoil](https://recoiljs.org/docs/introduction/motivation)
- [Jotai](https://jotai.org/)
- [Rematch](https://rematchjs.org/)

# Wrapping Up

To finish off, state management does not have to be hard, only if you make it. Think twice where your state lives and how it interacts with your application as a whole. You can avoid many problems by keeping state close only to where it is needed. Always start with the simplest solution (ex: useState -> component composition -> useContext -> Redux) and gradually introduce libraries when you have no other choice. Lifting state up and colocating it will make your code base smaller and be modular. This way you can move on the next ticket faster 😉 .
