# Two-Candle Patterns

A two-candle pattern shows a change of control between one period and the next. The first candle shows who was winning. The second shows whether the other side fought back, and how hard.

---

## Combining two candles into one

A quick way to judge any two-candle pattern is to merge the two candles into one imaginary candle:

- Open = the first candle's open
- High = the higher of the two highs
- Low = the lower of the two lows
- Close = the second candle's close

If the merged candle looks like a hammer, the pattern is bullish. If it looks like a shooting star or a hanging man, it is bearish. Step 4 uses this idea more.

**Example.** A bearish engulfing at a bottom merges into a candle with a long lower wick, like a hammer. That is why a bearish engulfing at a low often fails. A bullish engulfing at a top merges into a candle with a long lower wick near the high, like a hanging man, which is a warning.

**Number example.** After a long rise, candle 1 is red: open 110, close 104, low 103. Candle 2 is green and engulfs it: open 103, close 112, high 113.

```candles
title: Bullish engulfing at a top, merged into one candle
axis: true
panel: Two candles
candle: 110 110 103 104 1
candle: 103 113 103 112 2
panel: Merged
candle: 110 113 103 112 Merged
```

Open 110, high 113, low 103, close 112. The merged candle has a small body near the top and a long lower wick, so the "bullish" pattern is really a warning at a top.

---

## Bullish engulfing and bearish engulfing

`Reversal` · `Two candles` · `Core`

```candles
panel: Bullish engulfing
candle: 104 105 100 101 1
candle: 100 108 99 107 2 engulfs 1
panel: Bearish engulfing
candle: 101 105 100 104 1
candle: 105 106 99 100 2 engulfs 1
```

**Story.** In a bullish engulfing, a red candle is followed by a larger green candle whose body covers the whole red body. Sellers controlled the first period. Buyers then undid all of it and more. A bearish engulfing is the opposite: a green candle is swallowed by a larger red one.

**Where it counts.**

- A bullish engulfing counts only near the bottom of a decline, at support. A bearish engulfing counts only near the top of a rise, at resistance.
- The size of the second body matters most. The more it covers, the stronger the signal.
- Ignore engulfing candles inside a range or a flag, where they do not confirm a turn.

**Trigger, stop, and target.** For a bullish engulfing, enter on the close of the engulfing candle, or on a break of its high. Stop below the lower of the two lows. Target the next resistance. Mirror this for a bearish engulfing.

**Checklist**

- [ ] A clear prior trend is there to reverse
- [ ] It formed at support for a bullish one, or resistance for a bearish one
- [ ] The second body fully covers the first body
- [ ] Volume on the second candle is above average
- [ ] The next candle does not immediately undo it

**Number example.** A stock falls from 720 to 650, a support level. Day 1 is red: open 662, close 652. Day 2 opens at 649 and closes at 670, a green body covering 649 to 670, which engulfs the 652 to 662 body. Volume is 1.8 times average. Buy at 670, stop at 646, below day 2's low. Target 718. Risk is 24, reward 48, so the ratio is 2 to 1.

**When it fails.** A bearish engulfing at a top is cancelled if the next candle gaps up and opens above the red candle's open. Buyers have taken back control. Cover the short.

**Chart hunt.** On a daily index chart, find three engulfing patterns at clear swing lows or highs, and three in the middle of a range. Compare what happened next.

---

## Piercing line, bearish piercing, and dark cloud cover

`Reversal` · `Two candles` · `Core`

```candles
panel: Piercing line
level: 105.5 Red midpoint | info
candle: 110 111 100 101 1
candle: 99 107 98 106.5 2
panel: Dark cloud cover
level: 104.5 Green midpoint | info
candle: 100 110 99 109 1
candle: 111 112 102 103 2
```

**Story.** These are softer cousins of the engulfing pattern. The second candle does not fully cover the first, but it pushes well into it.

- **Piercing line (bullish).** A red candle is followed by a green candle that opens at or below the red candle's close, often with a gap down, and closes above the midpoint of the red body. Sellers opened weak, but buyers reclaimed more than half of the previous loss.
- **Bearish piercing.** A green candle is followed by a red candle that opens at or above the green candle's close and closes below the midpoint of the green body.
- **Dark cloud cover.** A strict form of bearish piercing. The red candle opens above the green candle's high, then closes below the midpoint of the green body. The gap up failed completely, so it is stronger than a plain bearish piercing.

**Where it counts.** A piercing line after a decline, at support. A bearish piercing or dark cloud after a rise, at resistance.

**Trigger, stop, and target.** For a piercing line, buy on a close above the second candle's high. Stop below the pattern's low. For a dark cloud, sell on a close below the second candle's low. Stop above the pattern's high.

**Checklist**

- [ ] The second candle closes beyond the midpoint of the first candle's body
- [ ] It formed at the right level after a clear move
- [ ] The confirmation candle follows through

**Number example (piercing line).** A stock drops to 400. Day 1 opens at 418 and closes at 402. The midpoint is 410. Day 2 opens at 397 and closes at 413, above 410. Day 3 closes at 416. Buy at 416, stop at 395, target 460.

**Number example (dark cloud cover).** A stock rises to 900. Day 1 opens at 870 and closes at 896, with a high of 898. Day 2 opens at 905, above 898, and closes at 880, below the midpoint of 883. Day 3 closes at 874. Sell at 874, stop at 908, target 820.

**When it fails.** The second candle closes only a little into the first body, well short of the midpoint. That is too weak. Or the third candle reverses the pattern.

---

## Harami and harami cross

`Reversal warning` · `Two candles` · `Useful`

```candles
panel: Bullish harami
candle: 110 111 98 99 1
candle: 102 106 101 105 2
panel: Bearish harami
candle: 99 111 98 110 1
candle: 107 108 103 104 2
panel: Harami cross (bearish)
candle: 99 111 98 110 1
candle: 105 107 103 105 2
```

**Story.** A harami is a large candle followed by a small candle whose body sits inside the large body. The word means "pregnant" in Japanese: a small candle inside a big one. The strong move of the first candle has stalled.

- **Bullish harami.** A large red candle, then a small candle inside its body. Selling has paused.
- **Bearish harami.** A large green candle, then a small candle inside its body. Buying has paused.
- **Harami cross.** The small second candle is a doji. The pause is even more complete.

**Harami compared with a doji.** At a top, which is more bearish: a doji alone, or a harami? A harami cross is more bearish than either, because it shows a strong green candle followed by complete indecision. A plain harami with a meaningful red second body is usually more bearish than a lone doji, because sellers have actually started to win.

**Where it counts.** At the end of a clear trend, at a level. A harami is a warning, not an entry. It needs a confirming candle.

**Trigger, stop, and target.** For a bearish harami, sell when price breaks below the small candle's low. Stop above the large candle's high. Mirror this for a bullish harami.

**Number example.** A stock rallies to 1,250. Day 1 is a big green candle from 1,200 to 1,248. Day 2 opens at 1,240 and closes at 1,232, inside the first body. Day 3 breaks below 1,228, day 2's low. Sell at 1,227, stop at 1,256, target 1,170.

**When it fails.** Price breaks the other way, above the large candle's high. The pause was a rest before continuation.

---

## Tweezer top and tweezer bottom

`Reversal` · `Two or more candles` · `Useful`

```candles
panel: Tweezer top
level: 110 Same high | bad
candle: 100 110 99 108 1
candle: 108 110 101 102 2
panel: Tweezer bottom
level: 100 Same low | good
candle: 110 111 100 102 1
candle: 102 108 100 107 2
```

**Story.** Two or more nearby candles reach almost the same high, at a top, or the same low, at a bottom. Price tested a level twice and was rejected both times. The colors often flip, for example green then red at a top.

**Where it counts.** At the end of a trend, at a support or resistance level. Tweezers work on any timeframe, and they are common on hourly charts.

**Trigger, stop, and target.** For a tweezer top, sell below the low of the second candle. Stop above the matched highs. For a tweezer bottom, buy above the high of the second candle. Stop below the matched lows.

**Number example.** Crude oil futures on an hourly chart rise to 6,480 twice in a row: the first candle's high is 6,481 and the second's is 6,480. The second candle closes red at 6,452. Sell below 6,445, stop at 6,490, target 6,380.

**When it fails.** A later candle closes above the matched highs. The level has been broken.

---

## Bull counter attack and bear counter attack

`Reversal` · `Two candles` · `Useful`

```candles
panel: Bull counter attack
level: 101 Same close | info
candle: 110 111 100 101 1
candle: 94 101.5 93 101 2
panel: Bear counter attack
level: 109 Same close | info
candle: 100 110 99 109 1
candle: 116 117 108.5 109 2
```

**Story.** A counter attack is two candles of opposite color that close at nearly the same price, after the second candle opened far away.

- **Bull counter attack.** After a fall, a red candle closes. The next candle opens much lower, often below a major support, which looks like a breakdown. Buyers then push price all the way back up to close near the prior close. The breakdown was rejected in one period.
- **Bear counter attack.** After a rise, a green candle closes. The next candle opens much higher, above a major resistance, which looks like a breakout. Sellers push price back down to close near the prior close.

**Where it counts.** Near major support, for a bull counter attack, or major resistance, for a bear counter attack. The opening gap should cross the level. After a successful bull counter attack, price often finds support at that low, and later hammers there confirm it.

**Trigger, stop, and target.**

- Bull counter attack: enter once price trades back above the broken support. The stop goes below the counter-attack candle's low. Target the next resistance or a chart-pattern target.
- Bear counter attack: enter once price trades back below the broken resistance. The stop goes above the counter-attack candle's high. Target the next support.

Extra evidence: a candle that pokes outside the Bollinger Band and closes back inside it on high volume.

**Number example.** Support at 1,000 has held for a month. Day 1 closes at 1,008. Day 2 opens at 985, a breakdown gap, falls to 978, then rallies to close at 1,007 on high volume. Buy above 1,000 once day 3 holds there. The stop goes below 978, and the target is 1,060.

**When it fails.** The next candle falls back below the support and closes there. The counter attack did not hold.

---

## Bullish kicker and bearish kicker

`Strong reversal` · `Two candles` · `Advanced`

```candles
panel: Bullish kicker
candle: 108 109 100 101 1
candle: 110 118 109.5 117 2 gaps up
panel: Bearish kicker
candle: 101 109 100 108 1
candle: 99 99.5 91 92 2 gaps down
```

**Story.** A candle in one direction is followed by a candle that gaps the other way, opening beyond the first candle's open, and never looks back. Something changed sharply between the two periods, often news. A bullish kicker is a red candle, then a gap up and a strong green candle. A bearish kicker is a green candle, then a gap down and a strong red candle.

**Where it counts.** Anywhere, but it is strongest after a trend and on high volume. It is rare, which is why it is listed as advanced.

**Trigger, stop, and target.** Enter on the close of the second candle, or on the first small pullback. The stop goes beyond the gap. For a bullish kicker, below the first candle's open.

**Number example.** A stock closes red at 300 after opening at 308. Next morning it opens at 318, above 308, and closes at 332. Buy at 332, or on a dip toward 320. Stop at 306. Target 370.

**When it fails.** Price falls back into the gap and closes below the first candle's open.

---

## A hammer at the low of a bullish engulfing

`Bullish reversal combination` · `Two or three candles` · `Useful`

```candles
title: Number example: an engulfing candle with a hammer-like wick at support
axis: true
level: 206 Defended low | good
level: 226 Buy above | info
candle: 230 231 221 222
candle: 222 223 212 216 Red
candle: 215 226 206 225 Engulfing
```

**Story.** A bullish engulfing forms at support, and one of the candles, or the next one, has a long lower wick like a hammer at the same low. Two signals point to the same price: buyers engulfed the sellers, and they also rejected the low.

**Where it counts.** At major support after a decline.

**Trigger, stop, and target.** Buy above the engulfing candle's high. Stop below the hammer's low, which is the defended price. Target the next resistance.

**Number example.** A stock drops to 212. A red candle closes at 216. The next candle dips to 206, then closes at 225 and engulfs the red body. The long wick from 206 shows the defended low. Buy above 226, stop at 205, target 268.

**When it fails.** A later candle closes below the wick low of 206.

---

## Practice

1. A red candle is followed by a green candle that closes just above the red candle's open, after a long decline to support. What pattern is this, and do you buy right away?
2. What makes a dark cloud cover stronger than a plain bearish piercing?
3. A harami cross forms at the top of a rally. What do you need before you sell?
4. Support is at 500. A candle opens at 488 and closes at 503, after the previous candle closed at 504. What is this, and where does the stop go?
5. Why does a bearish engulfing at the bottom of a fall often fail?

### Answers

1. It is a bullish engulfing, if the green body covers the red body. It is a valid signal at support. Enter on the close or on a break of the green candle's high, with a stop below the low.
2. The red candle opens above the green candle's high, not just above its close. The gap up failed completely, which is a stronger rejection.
3. A break below the low of the doji or of the pattern, preferably on a red candle close.
4. It is a bull counter attack. The open broke support, and price closed back near the prior close. The stop goes below that candle's low.
5. Merge the two candles and the result often looks like a hammer, with a long lower wick near the low. Sellers pushed, but buyers held the low.
