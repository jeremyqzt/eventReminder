import { v4 as uuidv4 } from "uuid";

export const settingsDarkMode = (darkMode) => ({
  type: "DARK_MODE",
  darkMode: darkMode,
});

export const addContact = (contact) => ({
  type: "ADD_CONTACT",
  contact: {
    ...contact,
    id: uuidv4(),
  },
});

export const updateContact = (contact) => ({
  type: "UPDATE_CONTACT",
  contact: contact,
});

export const deleteContact = (id) => ({
  type: "DELETE_CONTACT",
  toRemove: id,
});

export const addEvent = (event) => ({
  type: "ADD_EVENT",
  event: {
    ...event,
    id: uuidv4(),
  },
});

export const deleteEvent = (id) => ({
  type: "DELETE_EVENT",
  toRemove: id,
});

export const updateEvent = (event) => ({
  type: "UPDATE_EVENT",
  event: event,
});

export const deleteAllEvents = () => ({
  type: "DELETE_ALL_EVENT",
});

export const deleteAllContacts = () => ({
  type: "DELETE_ALL_CONTACTS",
});
