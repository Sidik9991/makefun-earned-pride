// One Line of Earned Pride — entry selector.
// Holds the scored candidate lines, picks the strongest, checks it
// against the gate, and writes it to /output/entry.txt.

import { writeFileSync } from "node:fs";

type Candidate = { text: string; score: number };

const candidates: Candidate[] = [
  { text: "Three winters she copied the master's strokes in a cold room; today the brush moved before she thought.", score: 27 },
  { text: "He failed the driving test eleven times; the twelfth, he parallel-parked without touching the radio.", score: 24 },
  { text: "After two years of night shifts, she read the acceptance letter twice, then set her alarm for work.", score: 22 },
  { text: "The boy who stuttered read the whole page aloud, and nobody in the class looked at the clock.", score: 29 },
  { text: "He kept every receipt from the debt years in a shoebox; today he burned the box in the yard.", score: 28 },
  { text: "Sixty years old, she typed her name into the form herself — slowly, one finger, no mistakes.", score: 26 },
  { text: "The apprentice swept the workshop floor for a year; this morning the old man handed him the keys.", score: 25 },
  { text: "His hands shook the first hundred times; at the sink this morning, the cup didn't rattle.", score: 26 },
  { text: "She practised the chord change in a parked car for a year so the neighbours wouldn't hear; tonight the song never stopped.", score: 27 },
  { text: "Every lunch break for three years he wrote one page; today he wrote 'The End' and ate slowly.", score: 27 },
  { text: "The nurse who failed anatomy twice now teaches it; she still underlines the hard words twice.", score: 25 },
];

function pickWinner(list: Candidate[]): Candidate {
  let best = list[0];
  for (const c of list) {
    if (c.score > best.score) best = c;
  }
  return best;
}

function checkGate(line: string): void {
  if (line.length === 0) throw new Error("gate: line is blank");
  if (line.length > 240) throw new Error(`gate: ${line.length} chars exceeds 240`);
  if (line.includes("\n") || line.includes("\r")) throw new Error("gate: not a single line");
  if (line !== line.trim()) throw new Error("gate: stray surrounding whitespace");
}

const winner = pickWinner(candidates);
checkGate(winner.text);
writeFileSync("/output/entry.txt", winner.text, "utf8");
console.log(`wrote ${winner.text.length} chars, score ${winner.score}`);
