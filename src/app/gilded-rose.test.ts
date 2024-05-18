import { Item, GildedRose } from "@/app/gilded-rose";
import { describe, expect, it } from "vitest";

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

    describe("updateQuality", () => {
      it("reduces item `sellIn` by 1", () => {
        const name = "Rune platebody";
        const sellIn = 10;
        const quality = 20;

        const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);

        gildedRose.updateQuality();

        expect(gildedRose.items[0].sellIn).toBe(sellIn - 1);
      });

      it("reduces regular item `quality` by 1", () => {
        const name = "Rune platebody";
        const sellIn = 10;
        const quality = 20;

        const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);

        gildedRose.updateQuality();

        expect(gildedRose.items[0].quality).toBe(quality - 1);
      });

      it("reduces regular item `quality` by 2 when `sellIn` is 0 or lower", () => {
        const name = "Rune platebody";
        const sellIn = 0;
        const quality = 20;

        const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);

        gildedRose.updateQuality();

        expect(gildedRose.items[0].quality).toBe(quality - 2);
      });

      it("does not reduce regular item quality below 0", () => {
        const name = "Rune platebody";
        const sellIn = 10;
        const quality = 0;

        const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);

        gildedRose.updateQuality();

        expect(gildedRose.items[0].quality).toBeGreaterThanOrEqual(0);
      });

      it.skip("does not reduce regular item quality below 0 when `sellIn` is 0 or lower", () => {
        const name = "Rune platebody";
        const sellIn = -5;
        const quality = 0;

        const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);

        gildedRose.updateQuality();

        expect(gildedRose.items[0].quality).toBeGreaterThanOrEqual(0);
      });

      it("increases `Aged Brie` quality by 1", () => {
        const name = "Aged Brie";
        const sellIn = 10;
        const quality = 20;

        const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);

        gildedRose.updateQuality();

        expect(gildedRose.items[0].quality).toBe(quality + 1);
      });

      it("increases `Aged Brie` quality by 2 when `sellIn` is 0 or lower", () => {
        const name = "Aged Brie";
        const sellIn = 0;
        const quality = 20;

        const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);

        gildedRose.updateQuality();

        expect(gildedRose.items[0].quality).toBe(quality + 2);
      });

      it("does not increase `Aged Brie` quality above 50", () => {
        const name = "Aged Brie";
        const sellIn = 10;
        const quality = 50;

        const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);

        gildedRose.updateQuality();

        expect(gildedRose.items[0].quality).toBeLessThanOrEqual(50);
      });

      it("does not increase `Aged Brie` quality above 50 when `sellIn` is 0 or lower", () => {
        const name = "Aged Brie";
        const sellIn = 0;
        const quality = 50;

        const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);

        gildedRose.updateQuality();

        expect(gildedRose.items[0].quality).toBeLessThanOrEqual(50);
      });

      it("does not change `Sulfuras, Hand of Ragnaros` `sellIn` value", () => {
        const name = "Sulfuras, Hand of Ragnaros";
        const sellIn = 10;
        const quality = 80;

        const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);

        gildedRose.updateQuality();

        expect(gildedRose.items[0].sellIn).toBe(sellIn);
      });

      it("does not change `Sulfuras, Hand of Ragnaros` `quality` value, it should always be 80", () => {
        const name = "Sulfuras, Hand of Ragnaros";
        const sellIn = 10;
        const quality = 80;

        const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);

        gildedRose.updateQuality();

        expect(gildedRose.items[0].quality).toBe(quality);
      });

      it("increases `Backstage passes to a TAFKAL80ETC concert` quality by 1 when `sellIn` is greater than 10", () => {
        const name = "Backstage passes to a TAFKAL80ETC concert";
        const sellIn = 11;
        const quality = 20;

        const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);

        gildedRose.updateQuality();

        expect(gildedRose.items[0].quality).toBe(quality + 1);
      });

      it("increases `Backstage passes to a TAFKAL80ETC concert` quality by 2 when `sellIn` is 10 or lower", () => {
        const name = "Backstage passes to a TAFKAL80ETC concert";
        const sellIn = 10;
        const quality = 20;

        const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);

        gildedRose.updateQuality();

        expect(gildedRose.items[0].quality).toBe(quality + 2);
      });

      it("increases `Backstage passes to a TAFKAL80ETC concert` quality by 3 when `sellIn` is 5 or lower", () => {
        const name = "Backstage passes to a TAFKAL80ETC concert";
        const sellIn = 5;
        const quality = 20;

        const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);

        gildedRose.updateQuality();

        expect(gildedRose.items[0].quality).toBe(quality + 3);
      });

      it("does not increase `Backstage passes to a TAFKAL80ETC concert` quality above 50 when `sellIn` is greater than 10", () => {
        const name = "Backstage passes to a TAFKAL80ETC concert";
        const sellIn = 11;
        const quality = 50;

        const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);

        gildedRose.updateQuality();

        expect(gildedRose.items[0].quality).toBeLessThanOrEqual(50);
      });

      it("does not increase `Backstage passes to a TAFKAL80ETC concert` quality above 50 when `sellIn` is greater than 10", () => {
        const name = "Backstage passes to a TAFKAL80ETC concert";
        const sellIn = 11;
        const quality = 50;

        const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);

        gildedRose.updateQuality();

        expect(gildedRose.items[0].quality).toBeLessThanOrEqual(50);
      });

      it("does not increase `Backstage passes to a TAFKAL80ETC concert` quality above 50 when `sellIn` is 10 or lower", () => {
        const name = "Backstage passes to a TAFKAL80ETC concert";
        const sellIn = 10;
        const quality = 50;

        const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);

        gildedRose.updateQuality();

        expect(gildedRose.items[0].quality).toBeLessThanOrEqual(50);
      });

      it("does not increase `Backstage passes to a TAFKAL80ETC concert` quality above 50 when `sellIn` is 5 or lower", () => {
        const name = "Backstage passes to a TAFKAL80ETC concert";
        const sellIn = 5;
        const quality = 50;

        const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);

        gildedRose.updateQuality();

        expect(gildedRose.items[0].quality).toBeLessThanOrEqual(50);
      });

      it("sets `Backstage passes to a TAFKAL80ETC concert` quality to 0 when `sellIn` is 0 or lower", () => {
        const name = "Backstage passes to a TAFKAL80ETC concert";
        const sellIn = 0;
        const quality = 20;

        const gildedRose = new GildedRose([new Item(name, sellIn, quality)]);

        gildedRose.updateQuality();

        expect(gildedRose.items[0].quality).toBe(0);
      });
    });
  });
});
