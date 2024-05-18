# Gilded rose

This is a project based on the [Gilded Rose kata](https://github.com/emilybache/GildedRose-Refactoring-Kata). The core technologies chosen are

- Vite
- TypeScript
- React
- Vitest
- ESLint

This provides a solid, performant, type-safe foundation, yet remains simple and easy to use.

<details>
  <summary>Requirements</summary>
  <h2>Gilded Rose Requirements Specification</h2>
  Hi and welcome to team Gilded Rose. As you know, we are a small inn with a prime location in a
  prominent city ran by a friendly innkeeper named Allison. We also buy and sell only the finest goods.
  Unfortunately, our goods are constantly degrading in `Quality` as they approach their sell by date.

  We have a system in place that updates our inventory for us. It was developed by a no-nonsense type named
  Leeroy, who has moved on to new adventures. Your task is to add the new feature to our system so that
  we can begin selling a new category of items. First an introduction to our system:

  - All `items` have a `SellIn` value which denotes the number of days we have to sell the `items`
  - All `items` have a `Quality` value which denotes how valuable the item is
  - At the end of each day our system lowers both values for every item

  Pretty simple, right? Well this is where it gets interesting:

  - Once the sell by date has passed, `Quality` degrades twice as fast
  - The `Quality` of an item is never negative
  - __"Aged Brie"__ actually increases in `Quality` the older it gets
  - The `Quality` of an item is never more than `50`
  - __"Sulfuras"__, being a legendary item, never has to be sold or decreases in `Quality`
  - __"Backstage passes"__, like aged brie, increases in `Quality` as its `SellIn` value approaches;
    - `Quality` increases by `2` when there are `10` days or less and by `3` when there are `5` days or less but
    - `Quality` drops to `0` after the concert

  We have recently signed a supplier of conjured items. This requires an update to our system:

  - __"Conjured"__ items degrade in `Quality` twice as fast as normal items

  Feel free to make any changes to the `UpdateQuality` method and add any new code as long as everything
  still works correctly. However, do not alter the `Item` class or `Items` property as those belong to the
  goblin in the corner who will insta-rage and one-shot you as he doesn't believe in shared code
  ownership (you can make the `UpdateQuality` method and `Items` property static if you like, we'll cover
  for you).

  Just for clarification, an item can never have its `Quality` increase above `50`, however __"Sulfuras"__ is a
  legendary item and as such its `Quality` is `80` and it never alters.
</details>

## Planning

The first step is understanding the requirements, current state of the code, and setting the goals appropriately. There is an inventory system which tracks item quality and days left until item should be sold. There are special items that have different `quality` and `sellIn` behaviour. Current code works correctly, but it is quite confusing and difficult to modify. Our goal is to _refactor_  the existing code, add a new item type, and test the code to make sure it works correctly.

Here are the principles I will try to follow during this excercise:

- <details>
  <summary>Readability</summary>

  To me readable code means _other_ developers can understand what the code does in short amount of _time_. This does not mean _less lines of code_, I find often the opposite is true. The main signs of readable code are thoughtful naming, easy navigation, and single responsibility principle.
  </details>

- <details>
  <summary>Maintainability</summary>

  Maintainable code is easy to change. It should not be difficult to add new features or change existing ones. Tests should bring confidence that your changes do not break existing functionality.
  </details>

- <details>
  <summary>Performance</summary>

  Premature optimization and over-optimization with diminishing returns are common pitfalls. However, taking some precautions to make sure code performs well can improve user experience.
  </details>

- <details>
  <summary>Testability</summary>

  It is easier to test code which is modularized and has clearly defined inputs and outputs. It should be trivial to inject or mock all necessary dependencies.
  </details>

- <details>
  <summary>Reusability</summary>

  This might be a hot take, but I often see the DRY principle followed blindly, which causes too many [unnecessary abstractions](https://overreacted.io/goodbye-clean-code/). In my opinion there should be a balance between code reusability and _readability_.
  </details>

According to the requirements, I have prepared the following plan:

- [x] Fix type errors in the current code
- [x] Write unit tests for current code to gain a better understanding of the requirements and prepare for the refactoring
- [ ] Refactor the code according to the principles above
- [ ] Create a CRUD UI for the inventory using React
- [ ] Add e2e tests
- [ ] Deploy the project

## Progress notes

I have written basic unit tests for all cases described in the requirements. The test coverage is `100%` in all categories, but I don't think the tests are bulletproof. For example, if I change the `Backstage pass` logic like this:

```diff
- if (item.sellIn < 6)
+ if (item.sellIn < 7)
```

The tests will still pass. This is a good usecase for `it.each` pattern.

Additionally, there is a lot of repetition in each test. I believe the tests are still going to change a bit, so I will address this issue later.

And finally, all current tests use a single item. In theory, I should repeat each test with multiple items to ensure every feature works with multiple items, but that will result in extremely verbose test file.
