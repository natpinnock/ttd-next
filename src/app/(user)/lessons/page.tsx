"use client";

import { useEffect, useState } from "react";
import { lesson } from "@prisma/client";
import AddLessonModal from "@/components/AddLessonModal";
import LessonCard from "@/components/LessonCard";

export default function Lessons() {
  const [open, setOpen] = useState(false);
  const [lessons, setLessons] = useState([] as lesson[]);

  const deleteLesson = async (id: string) => {
    const res = await fetch("/api/lessons", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      alert("Lesson deleted");
      setLessons(lessons.filter((lesson) => lesson.id !== id));
    } else {
      alert("Error deleting lesson");
    }
  };

  useEffect(() => {
    fetch("/api/lessons")
      .then((response) => response.json())
      .then((data) => setLessons(data));
  }, [open]);

  return (
    <>
      <div>
        <h1>Lessons </h1>
        <div className="m-4">
          <ul className="grid grid-cols-4 gap-4">
            {lessons.map((lesson) => (
              <LessonCard
                key={lesson.id}
                lesson={lesson}
                deleteLesson={deleteLesson}
              />
            ))}
          </ul>
        </div>
      </div>

      <button onClick={() => setOpen(true)}>Add a Lesson</button>
      {open && <AddLessonModal setOpen={setOpen} />}
    </>
  );
}
