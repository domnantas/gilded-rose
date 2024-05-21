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

### Unit tests

I have written basic unit tests for all cases described in the requirements. The test coverage is `100%` in all categories, but I don't think the tests are bulletproof. For example, if I change the `Backstage pass` logic like this:

```diff
- if (item.sellIn < 6)
+ if (item.sellIn < 7)
```

The tests will still pass. This is a good usecase for `it.each` pattern.

Additionally, there is a lot of repetition in each test. I believe the tests are still going to change a bit, so I will address this issue later.

And finally, all current tests use a single item. In theory, I should repeat each test with multiple items to ensure every feature works with multiple items, but that will result in extremely verbose test file.

---

I have started refactoring the tests by abstracting the `Item` creation. For example:

```ts
const defaultSellIn = 10;
const defaultQuality = 20;

const createRegularItem = ({
  sellIn = defaultSellIn,
  quality = defaultQuality,
} = {}) => new Item("Rune platebody", sellIn, quality);

it("reduces item `sellIn` by 1", () => {
  const sellIn = 10;

  const gildedRose = new GildedRose([createRegularItem({ sellIn })]);

  gildedRose.updateQuality();

  expect(gildedRose.items[0].sellIn).toBe(sellIn - 1);
});
```

However, I have ultimately decided against this idea. Sure, there's less lines of code, it is "cleaner", but now if you read the test _only_, it is not clear what exactly a "regular" item is, and what quality value it has. I prefer explicit tests, with as little of abstractions as possible. They are obviously more verbose, but they are easy to understand and easy to modify.

---

I have tested each type of items with various `sellIn` values and utilized `it.each` to cover all `Backstage passes` cases, which results in 46 tests, which is a bit of an overkill. In reality, it is necessary to balance available time with coverage and test performance. In this case, let's say we have unlimited time and this is a mission critical system that needs to be tested really thoroughly.

### Refactoring

With the unit tests complete, it is time to refactor the code. First, I have added comments on each state modification to understand what each code branch does. I have confirmed this by adding `console.log` next to each comment and seeing which tests have triggered it.

The glaring issue with the code is that the logic is deeply nested and difficult to understand. Additionally, it relies on modifying the `quality` multiple times to reach the desired value. I have simplified the `if` conditions so it is easier follow the code.

---

Next, `updateQuality` name violates single responsibility principle, because it is not only updates the quality, but also decrements the `sellIn` value. I have renamed it to `advanceDay` to better describe its purpose. I have also extracted each item quality update to separate methods. During this I have discovered an edge case – when Aged Brie had a `quality` of 49 and `sellIn` of 0 or lower, its quality would increase to 51. I have added a unit test for this case and fixed it.

I have replaced `for` with `forEach` and `if` statements with `switch`. I find it a bit easier to understand. I have then extracted clamping functions to methods and special item names to constants.
