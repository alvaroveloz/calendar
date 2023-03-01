export const events = [
  {
    id: '1',
    start: new Date('2023-01-21 13:00:00'),
    end: new Date('2023-01-21 15:00:00'),
    title: 'Test title 1',
    notes: 'Test note 1',
  },
  {
    id: '2',
    start: new Date('2023-01-21 16:00:00'),
    end: new Date('2023-01-21 18:00:00'),
    title: 'React course test 2',
    notes: 'Hooks, redux, Firebase, etc...',
  },
];

export const initialState = {
  isLoadingEvents: true,
  events: [],
  activeEvent: null,
};

export const calendarWithEventsState = {
  isLoadingEvents: false,
  events: [...events],
  activeEvent: null,
};

export const calendarWithActiveEventState = {
  isLoadingEvents: false,
  events: [...events],
  activeEvent: { ...events[0] },
};
