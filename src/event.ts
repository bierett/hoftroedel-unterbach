// SPDX-FileCopyrightText: 2026 D. Bierett – Hoftrödel Unterbach
// SPDX-License-Identifier: Apache-2.0

/** Change date for the next event, then build and publish the website again. */
export const eventConfig = {
    date: "2027-09-01", // YYYY-MM-DD; weekday and registration deadline follow automatically.
    startTime: "11:00",
    registrationDaysBefore: 1,
    timeZone: "Europe/Berlin",
    siteUrl: "https://hoftroedel-unterbach.de/"
};

export function getEventDates(date = eventConfig.date) {
    const day = new Date(`${date}T12:00:00Z`);
    if (
        !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
        !Number.isFinite(day.getTime()) ||
        day.toISOString().slice(0, 10) !== date
    ) {
        throw new Error(`Invalid event date: ${date}; expected YYYY-MM-DD`);
    }
    if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(eventConfig.startTime)) {
        throw new Error("Invalid event startTime; expected HH:mm");
    }
    const deadline = new Date(day);
    deadline.setUTCDate(day.getUTCDate() - eventConfig.registrationDaysBefore);
    const format = (value: Date, options: Intl.DateTimeFormatOptions) =>
        new Intl.DateTimeFormat("de-DE", { ...options, timeZone: "UTC" }).format(value);
    // Determine the Berlin UTC offset at the actual start time, including DST.
    const localTime = Date.parse(`${date}T${eventConfig.startTime}:00Z`);
    const offsetAt = (timestamp: number) => {
        const offset = new Intl.DateTimeFormat("en", {
            timeZone: eventConfig.timeZone,
            timeZoneName: "longOffset"
        })
            .formatToParts(new Date(timestamp))
            .find((part) => part.type === "timeZoneName")?.value;
        const match = offset?.match(/^GMT([+-])(\d{2}):(\d{2})$/);
        if (!match) throw new Error("Cannot determine event time zone offset");
        return {
            text: match[0].slice(3),
            minutes: (Number(match[2]) * 60 + Number(match[3])) * (match[1] === "+" ? 1 : -1)
        };
    };
    const firstOffset = offsetAt(localTime);
    const offset = offsetAt(localTime - firstOffset.minutes * 60_000);
    const [hours, minutes] = eventConfig.startTime.split(":");
    return {
        eventDate: format(day, { day: "numeric", month: "long", year: "numeric" }),
        eventDayDate: format(day, {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        }),
        eventShortDate: format(day, { day: "2-digit", month: "2-digit", year: "numeric" }),
        eventTime: minutes === "00" ? `${Number(hours)}` : eventConfig.startTime,
        deadline: format(deadline, { day: "numeric", month: "long", year: "numeric" }),
        startDate: `${date}T${eventConfig.startTime}:00${offset.text}`
    };
}

export const eventDates = getEventDates();
