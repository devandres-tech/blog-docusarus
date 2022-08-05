---
title: 'Suspense in React'
authors: andres
slug: react-suspense
tags: [react suspense]
# image: https://i.imgur.com/mErPwqL.png
---

Suspense is currently an experimental feature as per React docs that tells React to declaratively wait for asynchronous tasks. Essentially, components "wait" before they can render.

<!-- truncate  -->

It does not fetches data for you, like axios, rather it's a mechanism for data fetching that tells react that the data a component is reading is not ready yet, once the data is ready, the changes are reflected in the UI. You can use Suspense with any data fetching library of your choice, or use the built in fetch api. So it's up to you to find the right way to build an app with Suspense.

## What problems does it solves?

Suspense solves the problems with the current popular data fetching approaches: **fetch-on-render** and **fetch-then-render**:

- **Fetch-on-render**: When a component mounts, you start fetching the data (for example in the useEffect hook). Since each component has its own lifecycle methods and effects, depending on your tree structure some child components have to wait to start fetching their data, until the parent components have completed their data fetching. This approach lead to the notorious "waterfall" problem.
- **Fetch-then-render**: Start fetching all the data in parallel as early as possible, when all the data is ready, then you can render the screen. You can't do anything until all of your data arrives. Child components will have to wait for data that they will never not need, which is being fetched in the parent component (takes care of all data fetching).

With suspense you **render-as-you-fetch**, as soon as you start fetching you start rendering the screen (loading state) before you even get a network request, once data streams in, React retries rendering components that need the data, until every component is ready.

It also solves the problem of **Race conditions**. Since components have their own lifecycle, so do asynchronous requests (we never how long it will take for the data to arrive). We must find a way to synchronize both of these cases in time which affect each other. With Suspense we set state immediately after firing off a request, components "suspend" until they receive their data, so it's almost impossible to get a **race condition** problem.

## Example with React Query

Let's see suspense in action with [React Query](https://react-query.tanstack.com/). Firstly, we are going to show the typical behavior of an application without Suspense. This is what our `App.js` file looks like:

```jsx
import React from 'react'
import {
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ErrorBoundary } from 'react-error-boundary'

import Match from './components/Match'
import Teams from './components/Teams'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            fallbackRender={({ error, resetErrorBoundary }) => (
              <div>
                There was an error!{' '}
                <button onClick={() => resetErrorBoundary()}>Try again</button>
                <pre style={{ whiteSpace: 'normal' }}>{error.message}</pre>
              </div>
            )}
            onReset={reset}
          >
            <Match />
            <Teams />
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App
```

We have a Teams and Match component and each implement their own data fetching:

```jsx
import React from 'react'
import { useQuery } from 'react-query'

import { fetchTeams } from '../queries'

function Teams() {
  const { data, isLoading } = useQuery('teams', fetchTeams, {
    refetchOnWindowFocus: false,
  })

  return (
    <div>
      {!isLoading ? (
        data.map((item) => {
          return <h1>{item.round.metaData.name}</h1>
        })
      ) : (
        <h1 style={{ backgroundColor: 'blue' }}>loading...</h1>
      )}
    </div>
  )
}

export default Teams
```

```jsx
import React from 'react'
import { useQuery } from 'react-query'

import { fetchMatch } from '../queries'

function Match() {
  const { data, isLoading } = useQuery('match', fetchMatch, {
    refetchOnWindowFocus: false,
  })

  return (
    <div>
      {isLoading ? (
        data.awayTeam.field.slice(0, 3).map((person) => {
          return <img src={person.player.imageUrl} alt='player ' />
        })
      ) : (
        <h1>not loading</h1>
      )}
    </div>
  )
}

export default Match
```

Each component will display a loading component independent of the other. With this approach we show two loading states, not user friendly.

Now if we integrate Suspense, we can load the components at the same time and provide a single loading state by providing a fallback component. We also remove the ternary condition from each component (Match and Team), this is what the App.js file will look like:

```jsx
import React from 'react'
import {
  QueryClient,
  QueryClientProvider,
  QueryErrorResetBoundary,
} from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ErrorBoundary } from 'react-error-boundary'

import './App.css'
import Match from './components/Match'
import Teams from './components/Teams'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      suspense: true,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            fallbackRender={({ error, resetErrorBoundary }) => (
              <div>
                There was an error!{' '}
                <button onClick={() => resetErrorBoundary()}>Try again</button>
                <pre style={{ whiteSpace: 'normal' }}>{error.message}</pre>
              </div>
            )}
            onReset={reset}
          >
            <React.Suspense fallback={<h1>Loading projects...</h1>}>
              <Match />
              <Teams />
            </React.Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default App
```

And this is what the `Match` and `Teams` component will look like:

```jsx
import React from 'react'
import { useQuery } from 'react-query'

import { fetchTeams } from '../queries'

function Teams() {
  const { data } = useQuery('teams', fetchTeams, {
    refetchOnWindowFocus: false,
  })

  return (
    <div>
      {data.map((item) => {
        return <h1>{item.round.metaData.name}</h1>
      })}
    </div>
  )
}

export default Teams
```

```jsx
import React from 'react'
import { useQuery } from 'react-query'

import { fetchMatch } from '../queries'

function Match() {
  const { data } = useQuery('match', fetchMatch, {
    refetchOnWindowFocus: false,
  })

  return (
    <div>
      {data.awayTeam.field.slice(0, 3).map((person) => {
        return <img src={person.player.imageUrl} alt='player ' />
      })}
    </div>
  )
}

export default Match
```

## Take away

With Suspense we get a better user and developer experience. Our jsx is much more expressive and declarative and more modular. We can easily swap a loading component or orchestrate different loading sequences. The possibilities are endless.
