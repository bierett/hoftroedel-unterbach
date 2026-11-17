// SPDX-FileCopyrightText: 2026 D. Bierett – Hoftrödel Unterbach
// SPDX-License-Identifier: Apache-2.0

import { describe, expect, it } from "vitest";
import { getEventDates } from "./event";

describe("event calendar", () => {
    it("derives weekday, display dates and the deadline across month boundaries", () => {
        expect(getEventDates("2027-03-01")).toMatchObject({
            eventDate: "1. März 2027",
            eventDayDate: "Montag, 1. März 2027",
            eventShortDate: "01.03.2027",
            deadline: "28. Februar 2027",
            startDate: "2027-03-01T11:00:00+01:00"
        });
        expect(getEventDates("2028-03-01").deadline).toBe("29. Februar 2028");
        expect(getEventDates("2027-01-01").deadline).toBe("31. Dezember 2026");
    });
    it("uses the Berlin offset on both daylight saving change dates", () => {
        expect(getEventDates("2027-03-28").startDate).toBe("2027-03-28T11:00:00+02:00");
        expect(getEventDates("2027-10-31").startDate).toBe("2027-10-31T11:00:00+01:00");
    });
    it("rejects invalid calendar dates instead of publishing an incorrect event", () => {
        for (const date of ["2027-02-29", "2027-13-01", "19.09.2027", "not-a-date"]) {
            expect(() => getEventDates(date)).toThrow("Invalid event date");
        }
    });
});
