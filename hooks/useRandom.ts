import { randomBytes } from "crypto";

// add globally
type GuessType = "LUCK" | "SENSE";

export function generateSecureRandom(type: GuessType): number[] {
  const shuffleArray = (array: number[]): number[] => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(randomNumberBetween(0, i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const randomNumberBetween = (min: number, max: number): number => {
    const range = max - min;
    const bytesNeeded = Math.ceil(Math.log2(range) / 8);
    const maxValid = Math.pow(2, bytesNeeded * 8) - 1;
    if (max > maxValid) {
      throw new Error(
        `Maximum value ${max} is out of range for ${bytesNeeded} bytes.`
      );
    }

    let randomValue = maxValid;
    while (randomValue > max) {
      const randomBytesBuffer = randomBytes(bytesNeeded);
      randomValue = randomBytesBuffer.readUIntBE(0, bytesNeeded);
    }

    return (randomValue % range) + min;
  };

  if (type === "LUCK") {
    return shuffleArray([1, 1, 0]);
  } else if (type === "SENSE") {
    return shuffleArray([0, 0, 1]);
  } else {
    throw new Error("Invalid type");
  }
}
