---
title: "What's new in React Router v6"
tags: [React router, v6, React]
---

<!-- ![image info](/images/react-router-v6.jpg) -->

React router version 6 is here with lots of improvements! React router now matches the URL against your route config to enable a dynamic layout mechanism. Your UI layouts will reflect segments of the URL allowing you to build a full user interface that maps to your URL.

<!-- truncate  -->

# Route Configuration

Here's a a what a typical route configuration will look like compared to previous versions:

```jsx title="App.js"
import { render } from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { App } from './App'
import { PageLayout, NewPlayerForm, Player, PlayerStats } from './components'
import {
  Home,
  Players,
  Teams,
  Matches,
  Contact,
  NotFound,
  TopScorers,
} from './routes'

const rootElement = document.getElementById('root')
render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route index element={<Home />} />
        <Route path='players' element={<Players />}>
          <Route index element={<PlayerStats />} />
          <Route path=':playerId' element={<Player />} />
          <Route path='new' element={<NewPlayerForm />} />
          <Route path='top-scorers' element={<TopScorers />} />
        </Route>
        <Route path='/teams' element={<Teams />} />
      </Route>
      <Route element={<PageLayout />}>
        <Route path='*' element={<NotFound />} />
        <Route path='/contact-us' element={<Contact />} />
      </Route>
    </Routes>
  </BrowserRouter>,
  rootElement
)
```

Now we are required to wrap our routes in a `<BrowserRouter />` component. We also have the ability to nest routes. In previous versions of react router route configuration was based on ordering and for certain routes you had to add the `exact` prop. In v6 react router will pick the most specific route for you without doing any of that. For example, the URL `/players/new` will match these two routes:

```jsx title="App.js"
<Route path="players/:playerId" element={<Player />} />
<Route path="players/new" element={<Player />} />
```

In this case, `/players/new` is a more specific match than `/players/:playerId` so it will render the `<NewPlayerForm />` component. Notice that the route `/players/new` sits below the route `players/:playerId` so ordering is not taken into account.

# Nested Routes

Nested routes are probably one of the most important features of react router v6. Nested routes
allow for dynamic layouts, so no need to worry about creating complex layout code.

When routes are nested so will their paths (child inheriting the parent). Following our previous example, the defined paths are:

- `"/"`
- `"/players"`
- `"/players/:playerId"`
- `"/players/new"`
- `"/players/top-scorers"`
- `"/teams"`
- `"/contact-us"`

The component tree will change depending on the current path, for example when the URL is `/players/new` the component tree will be

```jsx
<App>
  <Players>
    <NewPlayerForm />
  </Players>
</App>
```

And when the URL changes to `/players/:playerId`, the layout will change to

```jsx
<App>
  <Players>
    <PlayerId />
  </Players>
</App>
```

Parent routes are responsible for rendering child routes, in this case the parent route is `/players` and the child routes are
`/players/new` and `/players/:playerId`. Notice that only the inner component changed as these where child routes.

Parent routes will need the `<Outlet />` component in order to render the child routes:

```jsx
import { Outlet } from 'react-router-dom'

function Players() {
  return (
    <div>
      <h1>Players route</h1>
      <Outlet />
    </div>
  )
}

function NewPlayerForm() {
  return (
    <div>
      <h1>New Player route form</h1>
    </div>
  )
}

function Player() {
  return (
    <div>
      <h1>Player id route</h1>
    </div>
  )
}
```

You will also notice that the `/players` route is a child route of `/`, so the `<App />` component will also need
the `<Outlet />` component:

```jsx
import { Outlet } from 'react-router-dom'

function App() {
  return (
    <div>
      <h1>Players route</h1>
      <Outlet />
    </div>
  )
}

function Players() {
  return (
    <div>
      <h1>Players route</h1>
      <Outlet />
    </div>
  )
}
```

# Pathless routes

In our route config there are 3 types of routes that are pathless:

```jsx
<Route index element={<PlayerStats />} />
<Route path="*" element={<NotFound />}>
<Route element={<PageLayout />}>
```

- ### Index Routes

  The first route is an Index route. They are responsible for rendering content when no child routes are matched.
  You can think of it as the default case for the parent route. At the path `/players` the `<Outlet />` component will be replaced with the `<PlayerStats />` component. Index routes can be at any level of the route hierarchy.

- ### Not Found Routes (catch all)

  The second route will match any URL. When no other URL routes match any of your routes in your config the "not found" route will render. It has the weakest precedence.

- ### Layout routes

  The third route is considered a layout route since it doesn't participate in any of the matching only its children do. It's purpose is to wrap multiple child routes in the same layout. It makes your layouts more manageable, no need to import it on every other component (avoid repetition). At the route `/contact-us` this is what the element tree will look like:

  ```jsx
  <App>
    <PageLayout>
      <Contact />
    </PageLayout>
  </App>
  ```

  The `<NotFound />` component will also have the same layout.

# Relative Links

In v6, relative `<Link to />` links are relative to the parent that rendered them. They automatically inherit their parents' URL. This is useful when you want to change the parent's URL or rearrange your components.

The route `/players/new` is a parent of `/players`. So any links in the `<NewPlayerForm />` component will inherit the `/players` route segment:

```jsx
function NewPlayerForm() {
  return (
    <div>
      <h1>New Player form</h1>
      <nav>
        // navigates to "/players/top-scorers"
        <Link to='top-scorers'>Top Scorers</Link>
      </nav>
    </div>
  )
}
```

# Reading URL Params

To read route params you use the `:param` syntax and `useParam()` hook:

```jsx title="components/Player.js"
import { useParams } from 'react-router-dom'

...
<Route path=':playerId' element={<Player />} />
...

function Player() {
  let params = useParams();
  return (
    <div>
      <h1>Player ID: {params.playerId}</h1>
    </div>
  )
}

```

# Search Params

You can manipulate and read search params with the `useSearchParams` hook. It has the similar behavior as the `useState` hook but stores and sets search params in the URL search params instead of in memory.

```jsx
import { useSearchParams } from 'react-router-dom'

function TopScorers() {
  let [searchPrams, setSearchParams] = useSearchParams()

  return (
    <div>
      <Input
        value={searchParams.get('name')}
          onChange={event => {
            let name = event.target.value
            if (name) setSearchParam({ name })
            else setSearchParam({})
          }}
      />
    <div>
  )
}

```

The `onChange` function is setting the search param "name": `/players/top-scorers?name="<USER_INPUT>"`.

# Navigate Function

You can programmatically navigate to a URL with the `useNavigate` hook, useful for logging users out or after a form submission:

```jsx
import { useNavigate } from 'react-router-dom'

function NewPlayerForm() {
  return (
    <Form
      onSubmit={(event) => {
        even.preventDefault()
        setDate(event.target)
        navigate('/players')
      }}
    >
      ...
    </Form>
  )
}
```

# Diving Deeper

These are the basic features of React Router v6. If you would like to dive deeper and look up some examples such as Authentication, Custom Active Links, Lazy Loading, Modal and much more check out the [offical docs](https://reactrouter.com/docs/en/v6).
