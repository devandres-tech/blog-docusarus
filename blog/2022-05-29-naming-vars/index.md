---
slug: naming-variables
title: 'On the Nomenclature of Variables'
authors: andres
tags: [Naming Variables]
keywords: [Naming Variables, Javascript]
---

Being able to effectively give a descriptive name to a variable is probably one of the hardest decisions you will make as a programmer (besides choosing tabs vs spaces). You just can't name variables as you would with your offsprings (because it sounds good or it holds a special meaning in your life). Unlike your offsprings and its name, which represent different entities, a variable and its name are essentially the same thing.

<!-- truncate  -->

Here is an example with bad variable naming convention:

```js
let x = q * p
let t = x + slsTx(x) - d
let c = getCB(id) - t
saveCB(id, c)
```

What in the world is going on? what do `x`, `q`, `p` mean? what does `slsTx` or `getCB` do? What if you wanted to print the total bill amount to a customer for a given purchase, which variable would you use? So many questions left unanswered.

Here is the same code but with good variable naming conventions:

```js
let amountTotal = quantity * price
let billTotal = amountTotal + salesTax(amountTotal) - discount
let currentBalance = getCurrentBalance(customerId) - billTotal
saveCurrentBalance(customerId, currentBalance)
```

See how easy it is to decipher what is actually happening, we can clearly see what each variable represents and what each function does. It's memorable and descriptive.

## Considerations in Choosing Variable Names

### 1 - Most Important Consideration

To effectively name a variable we must accurately describe what entity it represents. One way to do this is to state in words what the variable represents, this usually is the best option. For example, say we want to name a variable that represents the total number of people a football stadium can hold we can name it `stadiumCapacity`. A variable that represents the score of the away team would be `awayTeamScore`. A variable that holds the total number of teams in a league is better named `numberOfTeamsInLeague` rather than say, `y` or `x`.

Notice there is no need to decipher what they mean, we simply read them to understand what they represent. Of course there are some exceptions such as having long variables names. We will also talk about the optimal variable length. Let's take a look at this table which shows examples of good and bad variable names:

| Purpose of Variable           | Good Descriptors                          | Bad Descriptors                        |
| ----------------------------- | ----------------------------------------- | -------------------------------------- |
| Current date                  | _currentDate_, _todaysDate_               | _cd_, _current_, _d_, _dt_, _x1_, _x2_ |
| Velocity of a cheetah         | _cheetahVelocity_, _cheetahVelocityInMph_ | _tv_, _vlc_ _v1_ _cheetah_             |
| Molecules per drop of water   | _moleculesPerWaterDroplet_                | _m_, _p1_, _mpwd_, _molecules_, _y_    |
| Running total of goals scored | _totalGoalsScored_, _goalsScored_         | _total_, _x1_, _y2_, _goals_, _currGS_ |

The names `totalGoalsScored` and `goalsScored` are good names because they accurately and descriptively capture the idea of "the running total of goals scored", in fact they use precisely these words. Usually, ordinary words are your best options. `x1`, and `y2` are bad because they are too short and don't represent anything. `total` is bad because it does not tell you what the total is. `goals` is also bad because by itself it could mean something different - like goals as in a personal accomplishment in life. We can derive from this that good descriptors are usually specific as possible, names like `x`, `i`, and `average` are general, they are used for more than one purpose.

### 2 - Optimum Name Length

Studies have shown that the effort required to debug a program is minimized when a variable has an average of 10 to 16 characters long. Names that are too short, `x1`, `x2`, don't convey any meaning. Names that are too long are prone to syntax errors and can muddle the visual structure of a program. Of course not every variable will have 10 to 16 characters, it just means that if your variables are too short you should try to be more descriptive and if your variables are too long, you should try to trim it (for example by using commonly used abbreviations).

Let us take a look at the following table to illustrate the point:

| Too long                                                                                                                | Too Short                 | Just Right                                                                    |
| ----------------------------------------------------------------------------------------------------------------------- | ------------------------- | ----------------------------------------------------------------------------- |
| _numberOfPlayersInFootballTeam_, _numberOfSetsInTheStadium_, _maximumNumberOfSubstitutes_, _statisticsForASinglePlayer_ | _npt_, _nst_, _ms_, _sfp_ | _numTeamMembers_, _stadiumSeatCapacity_, _substitutesMax_, _playerStatistics_ |

### 3 - Variable Scope

There are instances where naming a short variable `i` is helpful. This could be a variable with a limited scope of operation, it could be used for the current iteration in a loop or as an array index. When naming a variable `i`, the programmer is saying, "This variable is not used outside these few lines of code".

There has been studies that found longer names are better suited for global variables and shorter names are better for suited for local variables or loop variables. Global variables can clutter the global namespace and are prone to name collisions. One way to remedy this is to partition the global namespace by using the _namespace_ keyword, most programming languages support this but JavaScript does not. To mimic namespaces in JavaScript we can use objects.

```js
let DatabaseSubsystem = {
  getCustomer: () => {},
  // more local declarations...
}

let UserInterfaceSubsystem = {
  getCustomer: () => {},
  // more local declarations...
}
```

We have defined a function called `getCustomer` in both the `DatabaseSubsystem` and the `UserInterfaceSubsystem` objects. Now we can identify which function we want to refer to by saying `DatabaseSubsystem.getCustomer()` or `UserInterfaceSubsystem.getCustomer()`. This minimizes the risk of global-namespace collisions and makes your program more readable.

### 4 - Computer-Value Qualifiers

Most programs make use of variables containing computed values: totals, maximums, minimums, averages, etc. A good convention is to put the modifier at the end of the variable name: `distanceTotal`, `speedAverage`. This is good practice because the part that gives the variable most of its meaning, is at the front, it will get read first and will be easy to find. This will also avoid the confusion if you were to have `speedAverage` and `averageSpeed` in the same program. Both are semantically equivalent but by using this convention they will get treated differently. Another benefit this convention has is the use of symmetry. Using `speedTotal`, `distanceTotal`, `speedAverage`, and `distanceAverage` is pleasing to the eye. In contrast to the variables like `totalSpeed`, `distanceTotal`, `speedAverage`, and `averageDistance` does not invoke order. By being consistent we improve readability and maintenance in our programs.

### 5 - Common Opposites

Using symmetry also helps when using opposites. Naming conventions for opposites helps consistency, which improves readability and maintenance. Using pairs like _up/down_ are easy to read and remember. Using pairs that depart from the common language are hard to remember and can be confusing. Here are some common opposites:

- begin/end
- first/last
- locked/unlocked
- up/down
- min/max
- next/previous
- open/closed
- source/destination
- clean/dirty
- empty/full
- inner/outer

## Naming Data Types

This section provides insight into naming specific kinds of data, such as loop variables, temporary variables, boolean variables, and named constants.

### 1 - Loop Indexes

Loops are used frequently in programming that certain guidelines have emerged such as using `i`, `j`, or `k` for the counter:

```js
for (let i = 0; i < data.length; i++) {
  data[i] = 0
}
```

When variables are used outside the loop, we should probably give them a more meaningful name than `i`, `j`, or `k`. For example, if we need to remember how many goals a team has scored, a name like `teamGoalCount` would be ideal:

```js
let teamGoalCount = 0
while (moreScores()) {
  score[teamGoalCount] = getNextScore()
  teamGoalCount++
}

/*
lines using teamGoalCount
...
*/
```

If your code inside your loop is longer than a few lines you are most likely to forget what `i`, `j`, or `k` is supposed to stand for. It would be wise to give that variable a meaningful name. Most of the time code changes, expands, or is copied into other programs. Giving the variable a descriptive name will make your code more readable.

One common scenario loops grow longers is due to being nested. If we have several nested loops, giving meaningful and descriptive names to loop variables will ease readability.

```jsx
for (let teamIndex = 0; teamIndex < teamCount; teamIndex++) {
  for (let matchIndex = 0; matchIndex < matchCount[teamIndex]; matchIndex++) {
    score[teamIndex][matchIndex] = 0
  }
}
```

By applying this guideline we avoid confusing `i` with `j` or vice versa when trying to talk to other programmers. We also access the array elements in more clearer fashion `score[teamIndex][matchIndex]`, than something like this `score[i][j]`

### 2 - Temporary Variables

Temporary variables are used to hold intermediate results of calculations, often as placeholders, and told housekeeping values. In most programs they are called `temp`, `x` or some other obscure name. This is usually the result of the programmer not fully understanding the problem. We must be cautious of _temporary_ variables, calling them as such might indicate we are not sure of their true purpose. Let's us consider the following example:

```js
// computes the volume of a cylinder by using the area of a circle
let temp = radius ** 2 * pie
let cylinderVolume = temp * height
```

It's ok to store the expression of `radius ** 2 * pie` in a variable since we might use it again. But by calling it _temp_ we don't know anything about it. A better approach would be to give git a descriptive name:

```js
// computes the volume of a cylinder by using the area of a circle
let area = radius ** 2 * pie
let cylinderVolume = area * height
```

It's the same code, but now it's more readable and we actually know the meaning of the variable.

### 2 - Boolean Variables

Booleans usually describe the status of your program, here are some basic guidelines to consider when naming them:

- `done`: Done typically indicates whether something is done. For example, it can indicate whether a loop is done (it could be any other operation). We can set _done_ to _false_ before something is completed and set it to _true_ when it is completed.
- `error`: indicates that an error has occurred. You can set the variable to _false_ when no error has occurred. Set it to _true_ when an error has occurred.
- `found`: You can use _found_ when search an array for a value, a player with an Id in a team, finding the greater amount in a calculation, and so on. Set _found_ to _false_ when the value has not been found and to _true_ when the value is found.
- `success` or `ok`: Use _success_ or _ok_ when an operation has been successful. Set the variable to _false_ when the operation failed and to _true_ when it succeeded.

### 3 - Constants

Usually when we name constants (values that never change in your program, ex: days of the week) we uppercase all letters and use snake case. We should try to name the entity it represents rather than the number the constant it refers to. For example _SEVEN_ is a bad name for a constant (yes, even if its value represents 7.0). A better name is _GOALS_NEEDED_, which can equal 5.0 or 7.0. `SEVEN = 5.0` would not be accurate. By the same manner, _APPLE_DOZEN_ is a poor constant name; _APPLE_MAX_ is a good constant name.

## Conclusion

I hope you found this blog post useful and start to incorporate some of the conventions mentioned into your programs. It will help you become a better programmer and minimize the occurrences of bugs, it will also make your programs more readable and maintainable. Software is always changing and we need to constantly make changes to the source code. We want to be able to understand the code we wrote 5 years ago and what better way to start by giving your variables a descriptive name!
