# Single Candles

One candle is the smallest unit of price action. Alone it is a weak signal. At the right place, and confirmed by the next candle, it can mark a turning point or give a precise stop.

---

## How to read any candle

Ask three questions about every candle.

1. **Who won?** A green body means buyers closed it higher. A red body means sellers closed it lower.
2. **By how much?** A long body is a clear win. A small body is a draw.
3. **Where was someone rejected?** A long lower wick means sellers pushed down and failed. A long upper wick means buyers pushed up and failed.

| What you see | What it means |
|---|---|
| Long green body, small wicks | Buyers controlled almost the whole period |
| Long red body, small wicks | Sellers controlled almost the whole period |
| Small body, small wicks | Nobody moved price. Quiet and undecided. |
| Long lower wick | Sellers had control for a while, then buyers made a strong comeback |
| Long upper wick | Buyers had control for a while, then sellers made a strong comeback |
| Long wicks on both sides, small body | Both sides had their moments, and neither could win. A standoff. |

### Wicks mark support and resistance

The low of a long lower wick is a price where buyers defended hard. That low often becomes support, and it is a natural place for a stop. The high of a long upper wick is a price where sellers defended hard, so it often becomes resistance.

A longer wick is a stronger signal than a short one. If two hammers form at the same support, the one with the longer lower wick shows the harder rejection.

Candles that help you find support and resistance: hammer, shooting star, long-legged doji, gravestone doji, dragonfly doji, and any candle with an unusually long wick.

---

## Plain bullish candle and plain bearish candle

`Direction` · `Single candle` · `Core`

```candles
panel: Bullish candle
candle: 100 112 97 110 Close above open
panel: Bearish candle
candle: 110 113 98 100 Close below open
```

**Story.** A long green candle means buyers dominated most of the period. A long red candle means sellers dominated.

**Where it counts.** At the edge of a level. A long green candle closing above resistance, or bouncing off support, carries weight. A long red candle closing below support, or falling away from resistance, carries weight.

**Trigger, stop, and target.** For a long, enter on the close, or on a break of the candle's high in the next candle. Stop below the candle's low, or below its midpoint if the candle is very long. Target the next resistance. Mirror this for a short.

**Checklist**

- [ ] The body is clearly longer than the recent average body
- [ ] It formed at a support, resistance, or breakout level
- [ ] Volume is above average
- [ ] It agrees with the higher-timeframe trend

**Number example.** A stock has stalled under 500 for two weeks. Today it opens at 498 and closes at 518, near its high of 519, on twice the usual volume. That is a strong bullish candle closing above resistance. A trader buys at 518 with a stop at 508, the candle's midpoint, and targets 540, the next resistance.

**When it fails.** The next candle opens lower and closes back below 500. The big candle was a trap. Exit at the stop.

---

## Marubozu

`Continuation or strong reversal` · `Single candle` · `Useful`

```candles
panel: Bullish marubozu
candle: 100 112 100 112 No wicks
panel: Bearish marubozu
candle: 112 112 100 100 No wicks
```

**Story.** A candle with no wicks, or almost none. For a bullish marubozu, the open is the low and the close is the high. Buyers were in charge from the first trade to the last. A bearish marubozu is the opposite.

**Where it counts.** Breaking out of a range, or at the start of a new trend. Inside a quiet trend, it signals the trend is speeding up.

**Trigger, stop, and target.** For a long, enter on the close or on the next candle's first pullback. Stop below the midpoint of the marubozu. Target the next major level or a chart-pattern target.

**Checklist**

- [ ] Wicks are tiny compared with the body
- [ ] Body is among the largest of the last 10 to 20 candles
- [ ] It breaks a level or starts a move from a base

**Number example.** Gold futures range between 71,000 and 71,600 for five sessions. Then a candle opens at 71,580 and closes at 72,300, its high, with no lower wick. Buy at 72,300, stop at 71,940, which is the middle of the body, and target 73,000.

**When it fails.** A marubozu after a long, stretched move can mark exhaustion. The last buyers rush in, and the next candle reverses. Be careful when a marubozu comes after five or more candles in the same direction.

---

## Hammer and hanging man

These two candles have the same shape. Their names change with location.

```candles
title: Same shape, different place: the trend before it decides the name
panel: Hammer (after a fall)
candle: 120 121 112 113
candle: 113 114 106 107
candle: 107 108 100 101
candle: 99 101.5 90 101 Hammer
panel: Hanging man (after a rise)
candle: 90 97 89 96
candle: 96 103 95 102
candle: 102 109 101 108
candle: 108 110.5 99 110 Hanging man
```

### Hammer

`Bullish reversal` · `Single candle` · `Core`

**Story.** Price has been falling. During this period, sellers push price well lower. Then buyers step in and push it back up near the open. Sellers have lost their grip, at least for now.

**Where it counts.** After a clear decline, at support, at a rising moving average in an uptrend pullback, or at a Fibonacci retracement level. Ignore hammers in the middle of a range or in the middle of a fall with no support nearby.

**Trigger, stop, and target.** Enter when the next candle closes above the hammer's high, or buy a break of the hammer's high. Stop below the hammer's low. Target the next resistance.

**Checklist**

- [ ] A clear decline came before it
- [ ] It formed at support, at a rising EMA, or at a Fibonacci level
- [ ] Lower wick is at least twice the body
- [ ] Little or no upper wick
- [ ] Next candle confirms with a close above the hammer's high
- [ ] Reward is at least twice the risk

**Number example.** A stock falls from 300 to 250 over three weeks. Support is at 250. A candle opens at 252, drops to 241, and closes at 253. The body is 1 point, and the lower wick is 11 points. The next day closes at 258, above the hammer's high of 254. Buy at 258, stop at 240, target 294. Risk is 18, reward is 36, so the ratio is 2 to 1.

**When it fails.** The next candle closes below the hammer's low. The buyers who showed up were not enough. Stay out, or exit at the stop.

The color of the body matters less than the location. A green hammer is slightly stronger than a red one.

### Hanging man

`Bearish warning` · `Single candle` · `Useful`

**Story.** Price has been rising. During this period, sellers push price well lower before buyers recover it. That dip is the first sign that sellers are testing the top.

**Where it counts.** After a clear rise, at resistance. It is only a warning until a red candle follows it.

**Trigger, stop, and target.** Sell when the next candle closes below the hanging man's low. Stop above the hanging man's high. Target the nearest support.

**Checklist**

- [ ] A clear rise came before it
- [ ] It formed at resistance
- [ ] The next candle is red and closes below the hanging man's body or low

**Number example.** A stock rises from 400 to 480. A candle opens at 479, dips to 468, and closes at 481. The next day opens at 478 and closes at 466, below the hanging man's low. Sell at 466, stop at 483, target 432.

**When it fails.** The next candle closes to a new high. The warning was wrong, and the trend continues.

---

## Inverted hammer and shooting star

These two also share a shape, with the long wick on top.

```candles
title: Long upper wick, small body near the bottom
panel: Shooting star (after a rise)
candle: 90 97 89 96
candle: 96 103 95 102
candle: 102 109 101 108
candle: 110 121 108 108.5 Shooting star
panel: Inverted hammer (after a fall)
candle: 120 121 112 113
candle: 113 114 106 107
candle: 107 108 100 101
candle: 99 110 98.5 100 Inverted hammer
```

### Shooting star

`Bearish reversal` · `Single candle` · `Core`

**Story.** Price has been rising. During this period, buyers push it much higher. Then sellers push it back down near the open. Buyers could not hold the high.

**Where it counts.** After a clear rise, at resistance, at a falling EMA in a downtrend rally, or at the upper Bollinger Band. A shooting star that fails to reach the upper band, while sitting at resistance, confirms that resistance.

**Trigger, stop, and target.** Sell when the next candle closes below the shooting star's low. Stop above its high. Target the next support.

**Checklist**

- [ ] A clear rise came before it
- [ ] It formed at resistance or at a falling EMA
- [ ] Upper wick is at least twice the body
- [ ] Little or no lower wick
- [ ] Next candle confirms with a close below the shooting star's low

**Number example.** A stock rallies from 150 to 190 into old resistance at 190. A candle opens at 188, spikes to 199, and closes at 187. The next day closes at 183. Sell at 183, stop at 200, target 150. Risk is 17, reward is 33, just under 2 to 1. A trader might wait for a small bounce toward 188 to improve the ratio.

**When it fails.** Price closes above the shooting star's high. The sellers were overpowered, and a breakout may follow.

### Inverted hammer

`Bullish warning` · `Single candle` · `Useful`

**Story.** Price has been falling. During this period, buyers try a push higher. They are pushed back, but the attempt shows buyers are starting to test the low.

**Where it counts.** After a clear decline, at support. It is weaker than a hammer and needs a green confirmation candle.

**Trigger, stop, and target.** Buy when the next candle closes above the inverted hammer's high. Stop below its low. Target the next resistance.

**Number example.** A stock falls to 90, a support level. A candle opens at 90.5, rises to 95, and closes at 91. The next day closes at 96. Buy at 96, stop at 89, target 110.

**When it fails.** The next candle makes a new low. The buyers' test failed.

Some traders call the same shape a shooting star at a top and an inverted hammer at a bottom. Always name the candle by where it is, because the location is what gives it meaning.

---

## Doji

A doji has an open and close that are equal, or almost equal. The body is a thin line. Buyers and sellers ended the period in a tie. A doji means the market is undecided.

```candles
title: Open and close are equal; the wicks tell the story
panel: Standard
candle: 100 104 96 100 Doji
panel: Long-legged
candle: 100 108 92 100 Doji
panel: Dragonfly
candle: 100 100 90 100 Doji
panel: Gravestone
candle: 100 110 100 100 Doji
```

`Indecision` · `Single candle` · `Core`

**The four kinds**

- **Standard doji.** Short wicks on both sides. A quiet pause.
- **Long-legged doji.** Long wicks on both sides. A big fight with no winner.
- **Dragonfly doji.** Long lower wick, and the open and close at the high. It acts like a strong hammer. Bullish at a bottom.
- **Gravestone doji.** Long upper wick, and the open and close at the low. It acts like a strong shooting star. Bearish at a top.

**Where it counts.**

- At the end of a trend, at a major support or resistance level. A doji after a long rise to resistance warns that buyers are tiring.
- A doji at the second test of a top is a strong warning. So is a doji at the second test of a bottom.
- Ignore dojis in the middle of a range, inside a flag, or in the middle of a trend with no follow-through. They are common there and mean nothing.

**Trigger, stop, and target.** A doji needs the next candle. At a top, sell when the next candle closes below the doji's low, with a stop above the doji's high. At a bottom, buy when the next candle closes above the doji's high, with a stop below the doji's low.

**Checklist**

- [ ] A clear trend came before it
- [ ] It formed at a major level
- [ ] The next candle confirms direction by closing beyond the doji's high or low

**Number example.** An index rallies from 21,000 to 22,500 into resistance. A doji forms with open 22,480, high 22,560, low 22,410, and close 22,482. The next day closes at 22,300, below the doji's low. Sell at 22,300, stop at 22,570, target 21,800.

**When it fails.** Price breaks above the doji's high. The pause was only a rest, and the trend continues.

**A doji at resistance is not a short by itself.** Many traders sell the moment a doji appears at a top and get caught when the trend resumes. Always wait for the confirming candle.

---

## Spinning top and high wave

`Indecision` · `Single candle` · `Useful`

```candles
panel: Spinning top
candle: 100 106 94 102 Small body
panel: High wave
candle: 100 112 88 101 Very long wicks
```

**Story.** A spinning top has a small body and short to medium wicks. Neither side made progress. A high wave has a small body and very long wicks on both sides. Both sides swung price a long way and ended where they started. The market has lost its sense of direction.

**Where it counts.** After a strong trend. A high wave after a long rise or fall often marks the turn, because the side that was winning has lost control. In a range, both are noise.

**Trigger, stop, and target.** Treat both like a doji. Trade the break of the candle's high or low in the direction of the next confirming candle. The stop goes beyond the opposite end of the candle.

**Number example.** A stock rallies for six weeks to 820. A high-wave candle forms: open 815, high 845, low 790, close 818. The next candle closes at 785, below the high wave's low. Sell at 785, stop at 846, target 700.

**When it fails.** Price closes beyond the high wave in the trend's direction. The pause resolves as a continuation.

---

## Belt hold

`Reversal` · `Single candle` · `Advanced`

```candles
panel: Bullish belt hold
candle: 100 112 100 110 Opens at the low
panel: Bearish belt hold
candle: 112 112 100 102 Opens at the high
```

**Story.** A bullish belt hold opens at the low of the period, often after a gap down, and then rises all period to close near the high. Sellers expected more weakness, but buyers took over from the first minute. A bearish belt hold opens at the high, often after a gap up, and falls all period.

**Where it counts.** After a clear trend, at a level. It is stronger when the body is long and it closes above the midpoint of the prior candle for a bullish one, or below it for a bearish one.

**Trigger, stop, and target.** Enter on a break of the belt hold's high for a bullish one, or low for a bearish one. Stop beyond the opposite end.

**Number example.** After a fall to support at 60, a stock gaps down to open at 58.5, which is also the day's low, and closes at 62. Buy above 62.2, stop at 58.3, target 70.

**When it fails.** The next candle closes below the belt hold's open.

---

## Practice

1. A candle with a long lower wick forms in the middle of a sideways range. Is it a hammer signal?
2. A shooting star forms at resistance. The next candle closes above the shooting star's high. What do you do?
3. What is the difference between a hammer and a hanging man?
4. Which is more bearish at a top after a long rally: a gravestone doji, or a small spinning top?
5. A hammer forms at support. Its low is 480, and its high is 492. The next day closes at 495. Where are the entry and the stop?

### Answers

1. No. A hammer needs a prior decline and a support level. In the middle of a range, it is noise.
2. Do not sell. The pattern failed. If you were already short, exit.
3. The shape is the same. A hammer comes after a fall, and it is bullish. A hanging man comes after a rise, and it is a bearish warning that needs a red confirming candle.
4. The gravestone doji. Its long upper wick shows a strong rejection of higher prices. A spinning top shows only mild indecision.
5. Enter at about 495, after the confirming close. The stop goes below 480, for example at 479.
