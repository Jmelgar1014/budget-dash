import { adding } from "@/utilities/utilityFuncs";

describe("adding", () => {
  it("should return sum of 2 numbers", () => {
    expect(adding(2, 3)).toBe(5);
  });
});

describe("adding", () => {
  it("adding -1 to 2 is equal to 1", () => {
    expect(adding(-1, 2)).toBe(1);
  });
});
