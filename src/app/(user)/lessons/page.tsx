"use client";

import { useEffect, useState } from "react";
import { lesson } from "@prisma/client";
import AddLessonModal from "@/components/AddLessonModal";

export default function Lessons() {
  const [open, setOpen] = useState(false);
  const [lessons, setLessons] = useState([] as lesson[]);

  useEffect(() => {
    fetch("/api/lessons")
      .then((response) => response.json())
      .then((data) => setLessons(data));
  }, [open]);

  return (
    <>
      <div>
        <h1>Lessons </h1>
        <ul>
          {lessons.map((lesson) => (
            <li key={lesson.id}>{lesson.title}</li>
          ))}
        </ul>
      </div>

      <button onClick={() => setOpen(true)}>Add a Lesson</button>
      {open && <AddLessonModal setOpen={setOpen} />}
    </>
  );
}
