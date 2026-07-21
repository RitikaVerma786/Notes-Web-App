import type { FormData } from "../types/notes.tsx";
import api from "./api.ts";

const getNotesReq = () => {
  const token = localStorage.getItem("token");
  console.log("notesApi");
  return api.get("/notes", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const createNotesReq = (data: FormData) => {
  console.log(data)
  const token = localStorage.getItem("token");
  console.log("post api note data..", data);
  return api.post("/notes", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const editNotesReq = (id: String, data: FormData) => {
  const token = localStorage.getItem("token");
  return api.put(`/notes/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const deleteNotesReq = (id: String) => {
  const token = localStorage.getItem("token");
  return api.delete(`/notes/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const favsToggleReq = (id: String) => {
  const token = localStorage.getItem("token");
  return api.post(
    `/notes/favourites/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
};

const getFavNotes = () => {
  const token = localStorage.getItem("token");
  return api.get("/notes/favourites", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export {
  getNotesReq,
  createNotesReq,
  editNotesReq,
  deleteNotesReq,
  favsToggleReq,
  getFavNotes,
};
