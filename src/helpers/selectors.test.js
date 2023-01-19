import selectors from "helpers/selectors";

const state = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2, 3],
      interviewers: [2],
      spots: 2,
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [4, 5],
      interviewers: [2],
    },
    {
      id: 3,
      name: "Wednesday",
      appointments: [6],
      interviewers: [3],
    },
  ],
  appointments: {
    1: { id: 1, time: "12pm", interview: null },
    2: { id: 2, time: "1pm", interview: null },
    3: {
      id: 3,
      time: "2pm",
      interview: { student: "Archie Cohen", interviewer: 2 },
    },
    4: { id: 4, time: "3pm", interview: null },
    5: {
      id: 5,
      time: "4pm",
      interview: { student: "Chad Takahashi", interviewer: 2 },
    },
    6: {
      id: 6,
      time: "2pm",
      interview: { student: "Kobayashi Maru", interviewer: 1 },
    },
  },
  interviewers: {
    1: {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png",
    },
    2: {
      id: 2,
      name: "Tori Malcolm",
      avatar: "https://i.imgur.com/Nmx0Qxo.png",
    },
  },
};

describe("countSpotsForDay", () => {
  test("countSpotsForDay returns a number", () => {
    const result = selectors.countSpotsForDay(state, "Monday");
    expect(result).not.toBeNaN();
  });

  test("countSpotsForDay returns a number matching the number of slots for that day", () => {
    const result = selectors.countSpotsForDay(state, "Tuesday");
    expect(result).toEqual(1);
  });

  test("countSpotsForDay returns 0 if no slots for that day", () => {
    const result = selectors.countSpotsForDay(state, "Wednesday");
    expect(result).toEqual(0);
  });

  test("countSpotsForDay returns 0 when the day is not found", () => {
    const result = selectors.countSpotsForDay(state, "Sunday");
    expect(result).toEqual(0);
  });

  test("countSpotsForDay returns 0 when the days data is empty", () => {
    const result = selectors.countSpotsForDay(state, []);
    expect(result).toEqual(0);
  });
});

describe("getInterviewersForDay", () => {
  test("getInterviewersForDay returns an array", () => {
    const result = selectors.getInterviewersForDay(state, "Monday");
    expect(Array.isArray(result)).toBe(true);
  });

  test("getInterviewersForDay returns an array with a length matching the number of interviewers for that day", () => {
    const result = selectors.getInterviewersForDay(state, "Monday");
    expect(result.length).toEqual(1);
  });

  test("getInterviewersForDay returns an array containing the correct interviewer objects", () => {
    const [first, second] = selectors.getInterviewersForDay(state, "Tuesday");
    expect(first).toEqual(state.interviewers["2"]);
  });

  test("getInterviewersForDay returns an empty array when the days data is empty", () => {
    const result = selectors.getInterviewersForDay({ days: [] }, "Monday");
    expect(result.length).toEqual(0);
  });

  test("getInterviewersForDay returns an empty array when the day is not found", () => {
    const result = selectors.getInterviewersForDay(state, "Sunday");
    expect(result.length).toEqual(0);
  });
});

describe("getInterview", () => {
  test("getInterview returns an object with the interviewer data", () => {
    const result = selectors.getInterview(
      state,
      state.appointments["3"].interview
    );
    expect(result).toEqual(
      expect.objectContaining({
        student: expect.any(String),
        interviewer: expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          avatar: expect.any(String),
        }),
      })
    );
  });
});

describe("getAppointmentsForDay", () => {
  test("getAppointmentsForDay returns an array", () => {
    const result = selectors.getAppointmentsForDay(state, "Monday");
    expect(Array.isArray(result)).toBe(true);
  });

  test("getAppointmentsForDay returns an array with a length matching the number of appointments for that day", () => {
    const result = selectors.getAppointmentsForDay(state, "Monday");
    expect(result.length).toEqual(3);
  });

  test("getAppointmentsForDay returns an array containing the correct appointment objects", () => {
    const [first, second] = selectors.getAppointmentsForDay(state, "Tuesday");
    expect(first).toEqual(state.appointments["4"]);
    expect(second).toEqual(state.appointments["5"]);
  });

  test("getAppointmentsForDay returns an empty array when the days data is empty", () => {
    const result = selectors.getAppointmentsForDay({ days: [] }, "Monday");
    expect(result.length).toEqual(0);
  });

  test("getAppointmentsForDay returns an empty array when the day is not found", () => {
    const result = selectors.getAppointmentsForDay(state, "Sunday");
    expect(result.length).toEqual(0);
  });

  test("getInterview returns null if no interview is booked", () => {
    const result = selectors.getInterview(
      state,
      state.appointments["2"].interview
    );
    expect(result).toBeNull();
  });
});
