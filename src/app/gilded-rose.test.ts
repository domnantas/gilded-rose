import { Item, GildedRose } from "@/app/gilded-rose";
import { describe, expect, it } from "vitest";
import { range } from "lodash-es";

describe("Gilded Rose inventory", () => {
  describe("Item class", () => {
    it("initializes with provided name, sellIn, and quality values", () => {
      const name = "Rune platebody";
      const sellIn = 10;
      const quality = 20;

      const item = new Item(name, sellIn, quality);

      expect(item.name).toBe(name);
      expect(item.sellIn).toBe(sellIn);
      expect(item.quality).toBe(quality);
    });
  });

  describe("GildedRose class", () => {
    it("initializes with single item provided", () => {
      const name = "Rune platebody";
      const sellIn = 10;
      const quality = 20;

      const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);

      expect(gildedRose.items[0].name).toBe(name);
      expect(gildedRose.items[0].sellIn).toBe(sellIn);
      expect(gildedRose.items[0].quality).toBe(quality);
    });

    describe("advanceDay", () => {
      it("reduces regular item `sellIn` by 1", () => {
        const name = "Rune platebody";
        const sellIn = 10;
        const quality = 20;

        const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);

        gildedRose.advanceDay();

        expect(gildedRose.items[0].sellIn).toBe(sellIn - 1);
      });

      it("reduces regular item `quality` by 1 when `sellIn`is greater than 0", () => {
        const name = "Rune platebody";
        const sellIn = 10;
        const quality = 20;

        const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);

        gildedRose.advanceDay();

        expect(gildedRose.items[0].quality).toBe(quality - 1);
      });

      it("reduces regular item `quality` by 2 when `sellIn` is 0", () => {
        const name = "Rune platebody";
        const sellIn = 0;
        const quality = 20;

        const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);

        gildedRose.advanceDay();

        expect(gildedRose.items[0].quality).toBe(quality - 2);
      });

      it("reduces regular item `quality` by 2 when `sellIn` is lower than 0", () => {
        const name = "Rune platebody";
        const sellIn = -4;
        const quality = 20;

        const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);

        gildedRose.advanceDay();

        expect(gildedRose.items[0].quality).toBe(quality - 2);
      });

      it("does not reduce regular item quality below 0 when `sellIn` is greater than 0", () => {
        const name = "Rune platebody";
        const sellIn = 10;
        const quality = 0;

        const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);

        gildedRose.advanceDay();

        expect(gildedRose.items[0].quality).toBeGreaterThanOrEqual(0);
      });

      it("does not reduce regular item quality below 0 when `sellIn` is 0", () => {
        const name = "Rune platebody";
        const sellIn = 0;
        const quality = 0;

        const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);

        gildedRose.advanceDay();

        expect(gildedRose.items[0].quality).toBeGreaterThanOrEqual(0);
      });

      it("does not reduce regular item quality below 0 when `sellIn` is lower than 0", () => {
        const name = "Rune platebody";
        const sellIn = -5;
        const quality = 0;

        const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);

        gildedRose.advanceDay();

        expect(gildedRose.items[0].quality).toBeGreaterThanOrEqual(0);
      });

      it("reduces `Aged Brie` item `sellIn` by 1", () => {
        const name = "Aged Brie";
        const sellIn = 10;
        const quality = 20;

        const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);

        gildedRose.advanceDay();

        expect(gildedRose.items[0].sellIn).toBe(sellIn - 1);
      });

      it("increases `Aged Brie` quality by 1 when `sellIn` is greater than 0", () => {
        const name = "Aged Brie";
        const sellIn = 10;
        const quality = 20;

        const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);

        gildedRose.advanceDay();

        expect(gildedRose.items[0].quality).toBe(quality + 1);
      });

      it("increases `Aged Brie` quality by 2 when `sellIn` is 0", () => {
        const name = "Aged Brie";
        const sellIn = 0;
        const quality = 20;

        const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);

        gildedRose.advanceDay();

        expect(gildedRose.items[0].quality).toBe(quality + 2);
      });

      it("increases `Aged Brie` quality by 2 when `sellIn` is lower than 0", () => {
        const name = "Aged Brie";
        const sellIn = -3;
        const quality = 20;

        const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);

        gildedRose.advanceDay();

        expect(gildedRose.items[0].quality).toBe(quality + 2);
      });

      it("limits `AgedBrie` quality to 50 when `sellIn` is 0 and quality is 49", () => {
        const name = "Aged Brie";
        const sellIn = 0;
        const quality = 49;

        const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);

        gildedRose.advanceDay();

        expect(gildedRose.items[0].quality).toBe(50);
      });

      it("does not increase `Aged Brie` quality above 50 when `sellIn` is greater than 0", () => {
        const name = "Aged Brie";
        const sellIn = 10;
        const quality = 50;

        const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);

        gildedRose.advanceDay();

        expect(gildedRose.items[0].quality).toBeLessThanOrEqual(50);
      });

      it("does not increase `Aged Brie` quality above 50 when `sellIn` is 0", () => {
        const name = "Aged Brie";
        const sellIn = 0;
        const quality = 50;

        const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);

        gildedRose.advanceDay();

        expect(gildedRose.items[0].quality).toBeLessThanOrEqual(50);
      });

      it("does not increase `Aged Brie` quality above 50 when `sellIn` is lower than 0", () => {
        const name = "Aged Brie";
        const sellIn = -5;
        const quality = 50;

        const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);

        gildedRose.advanceDay();

        expect(gildedRose.items[0].quality).toBeLessThanOrEqual(50);
      });

      it("does not change `Sulfuras, Hand of Ragnaros` `sellIn` value when it is greater than 0", () => {
        const name = "Sulfuras, Hand of Ragnaros";
        const sellIn = 10;
        const quality = 80;

        const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);

        gildedRose.advanceDay();

        expect(gildedRose.items[0].sellIn).toBe(sellIn);
      });

      it("does not change `Sulfuras, Hand of Ragnaros` `sellIn` value when it is 0", () => {
        const name = "Sulfuras, Hand of Ragnaros";
        const sellIn = 0;
        const quality = 80;

        const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);

        gildedRose.advanceDay();

        expect(gildedRose.items[0].sellIn).toBe(sellIn);
      });

      it("does not change `Sulfuras, Hand of Ragnaros` `sellIn` value when it is lower than 0", () => {
        const name = "Sulfuras, Hand of Ragnaros";
        const sellIn = 0;
        const quality = 80;

        const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);

        gildedRose.advanceDay();

        expect(gildedRose.items[0].sellIn).toBe(sellIn);
      });

      it("does not change `Sulfuras, Hand of Ragnaros` `quality` value, when `sellIn` is greater than 0", () => {
        const name = "Sulfuras, Hand of Ragnaros";
        const sellIn = 10;
        const quality = 80;

        const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);

        gildedRose.advanceDay();

        expect(gildedRose.items[0].quality).toBe(quality);
      });

      it("does not change `Sulfuras, Hand of Ragnaros` `quality` value, when `sellIn` is 0", () => {
        const name = "Sulfuras, Hand of Ragnaros";
        const sellIn = 0;
        const quality = 80;

        const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);

        gildedRose.advanceDay();

        expect(gildedRose.items[0].quality).toBe(quality);
      });

      it("does not change `Sulfuras, Hand of Ragnaros` `quality` value, when `sellIn` is lower than 0", () => {
        const name = "Sulfuras, Hand of Ragnaros";
        const sellIn = -5;
        const quality = 80;

        const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);

        gildedRose.advanceDay();

        expect(gildedRose.items[0].quality).toBe(quality);
      });

      it("reduces `Backstage passes to a TAFKAL80ETC concert` item `sellIn` by 1", () => {
        const name = "Backstage passes to a TAFKAL80ETC concert";
        const sellIn = 10;
        const quality = 20;

        const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);

        gildedRose.advanceDay();

        expect(gildedRose.items[0].sellIn).toBe(sellIn - 1);
      });

      it.each([
        {
          sellIn: 11,
          qualityIncrease: 1,
        },
        ...range(10, 5).map((sellIn) => ({ sellIn, qualityIncrease: 2 })),
        ...range(5, 0).map((sellIn) => ({ sellIn, qualityIncrease: 3 })),
      ])(
        "increases `Backstage passes to a TAFKAL80ETC concert` quality by $qualityIncrease when `sellIn` is $sellIn",
        ({ sellIn, qualityIncrease }) => {
          const name = "Backstage passes to a TAFKAL80ETC concert";
          const quality = 20;

          const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);

          gildedRose.advanceDay();

          expect(gildedRose.items[0].quality).toBe(quality + qualityIncrease);
        }
      );

      it.each(range(11, 0))(
        "does not increase `Backstage passes to a TAFKAL80ETC concert` quality above 50 when `sellIn` is %i",
        (sellIn) => {
          const name = "Backstage passes to a TAFKAL80ETC concert";
          const quality = 50;

          const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);

          gildedRose.advanceDay();

          expect(gildedRose.items[0].quality).toBeLessThanOrEqual(50);
        }
      );

      it("sets `Backstage passes to a TAFKAL80ETC concert` quality to 0 when `sellIn` is 0", () => {
        const name = "Backstage passes to a TAFKAL80ETC concert";
        const sellIn = 0;
        const quality = 20;

        const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);

        gildedRose.advanceDay();

        expect(gildedRose.items[0].quality).toBe(0);
      });

      it("sets `Backstage passes to a TAFKAL80ETC concert` quality to 0 when `sellIn` is lower than 0", () => {
        const name = "Backstage passes to a TAFKAL80ETC concert";
        const sellIn = -5;
        const quality = 20;

        const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);

        gildedRose.advanceDay();

        expect(gildedRose.items[0].quality).toBe(0);
      });

      it("updates quality for multiple provided items", () => {
        const regularItem = new Item("Rune platebody", 10, 20);
        const agedBrieItem = new Item("Aged Brie", 10, 20);
        const sulfurasItem = new Item("Sulfuras, Hand of Ragnaros", 10, 80);
        const backstagePassesItem = new Item(
          "Backstage passes to a TAFKAL80ETC concert",
          10,
          20
        );

        const gildedRose = new GildedRose([
          regularItem,
          agedBrieItem,
          sulfurasItem,
          backstagePassesItem,
        ]);

        gildedRose.advanceDay();

        expect(gildedRose.items[0].sellIn).toBe(9);
        expect(gildedRose.items[0].quality).toBe(19);

        expect(gildedRose.items[1].sellIn).toBe(9);
        expect(gildedRose.items[1].quality).toBe(21);

        expect(gildedRose.items[2].sellIn).toBe(10);
        expect(gildedRose.items[2].quality).toBe(80);

        expect(gildedRose.items[3].sellIn).toBe(9);
        expect(gildedRose.items[3].quality).toBe(22);
      });
    });
  });
});
