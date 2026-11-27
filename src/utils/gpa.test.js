import { calculateQualityPoints,calculateTermGpa,calculateCumulativeGpa } from "./gpa";
import { describe, it, expect } from "vitest";


describe("calculateQualityPoints", () => {
    it("should return 12 for 3 credits with grade A", () => {
        expect(calculateQualityPoints(3, "A")).toBe(12);
    });

    it("should return 9 for 3 credits with grade B", () => {
        expect(calculateQualityPoints(3, "B")).toBe(9);
    });


    it("should return 12 for 3 credits with  grade a", () => {
        expect(calculateQualityPoints(3, "a")).toBe(12);
    });

        it("should return error invalid grade x", () => {
        expect(() => calculateQualityPoints(3, "x"))
            .toThrow("You entered invalid grade!");
    });


    it("should reject negative credits", () => {
    expect(() => calculateQualityPoints(-3, "A"))
        .toThrow("Credits must be a positive number!");
});

it("should reject non-numeric credits", () => {
    expect(() => calculateQualityPoints("3", "A"))
        .toThrow("Credits must be a positive number!");
});


});








describe("calculateTermGpa", () => {

    it("should calculate GPA for a specific term", () => {
        const results = [
            { term: "Fall 2025", credits: 3, grade: "A" },
            { term: "Fall 2025", credits: 3, grade: "B" },
            { term: "Spring 2026", credits: 3, grade: "C" }
        ];

        expect(calculateTermGpa(results, "Fall 2025")).toBe(3.5);
    });

    it("should return 0 when the term has no courses", () => {
        const results = [];

        expect(calculateTermGpa(results, "Fall 2025")).toBe(0);
    });

});


describe("calculateCumulativeGpa", ()=>{
    it("should calculate cumulative GPA across all terms", () => {
    const results = [
        { term: "Fall 2025", credits: 3, grade: "A" },
        { term: "Fall 2025", credits: 3, grade: "B" },
        { term: "Spring 2026", credits: 3, grade: "C" }
    ];

    expect(calculateCumulativeGpa(results)).toBe(3);
});

it("should calculate the reference GPA of 3.80", () => {
    const results = [
        { credits: 3, grade: "A" },
        { credits: 3, grade: "A" },
        { credits: 3, grade: "A" },
        { credits: 3, grade: "A" },
        { credits: 3, grade: "B" }
    ];

    expect(calculateCumulativeGpa(results)).toBe(3.8);
});

})