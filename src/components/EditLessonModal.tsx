import { useState, useEffect } from "react";

interface EditLessonModalProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  lesson: Lesson;
}

interface Lesson {
  id: string;
  groupId: string;
  groupName: string;
  title: string;
  dateTime: Date;
  lessonPlan: string | null;
}

interface Group {
  id: string;
  groupName: string;
}

export default function EditLessonModal({
  setOpen,
  lesson,
}: EditLessonModalProps) {
  const [editLesson, setEditLesson] = useState<Lesson>({
    id: lesson.id,
    groupId: lesson.groupId,
    groupName: lesson.groupName,
    title: lesson.title,
    dateTime: lesson.dateTime,
    lessonPlan: lesson.lessonPlan,
  });

  //take editLesson.dateTime and convert it to the format "yyyy-MM-ddThh:mm" followed by optional ":ss" or ":ss.SSS".
  const localDateTimeString = new Date(editLesson.dateTime)
    .toISOString()
    .slice(0, 16);

  const [groupNames, setGroupNames] = useState<Group[]>([]);

  useEffect(() => {
    fetch("/api/groups")
      .then((response) => response.json())
      .then((data) => {
        setGroupNames(data);
      })
      .catch((error) => {
        console.log("Failed to fetch group names:", error);
      });
  }, []);

  useEffect(() => {
    if (groupNames.length > 0) {
      const selectedGroup = groupNames.find(
        (group) => group.groupName === editLesson.groupName
      );
      const updatedGroupId = selectedGroup ? selectedGroup.id : "";
      setEditLesson((prevState) => ({
        ...prevState,
        groupId: updatedGroupId,
      }));
    }
  }, [groupNames, editLesson.groupName]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setEditLesson((prevState) => ({
      ...prevState,
      [name]: value,
      id: lesson.id,
    }));
  };

  const handleEditLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formattedLesson = {
        ...editLesson,
        dateTime: new Date(editLesson.dateTime),
      };
      const response = await fetch("/api/lessons", {
        method: "PATCH",
        body: JSON.stringify(formattedLesson),
      });
      if (response.ok) {
        setOpen(false);
        console.log(formattedLesson);
      } else {
        throw new Error("Failed to edit lesson");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="rounded-lg bg-white p-8 shadow-2xl">
      <form onSubmit={handleEditLesson}>
        <label htmlFor="groupName">Group Name</label>
        <select
          name="groupName"
          value={editLesson.groupName}
          onChange={handleChange}
        >
          <option value={editLesson.groupName}>{editLesson.groupName}</option>
          {groupNames.map((group) => (
            <option key={group.id} value={group.groupName}>
              {group.groupName}
            </option>
          ))}
        </select>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={editLesson.title}
          onChange={handleChange}
        />
        <label htmlFor="dateTime">Date and Time</label>
        <input
          type="datetime-local"
          name="dateTime"
          value={localDateTimeString}
          onChange={handleChange}
        />
        <label htmlFor="lessonPlan">Lesson Plan</label>
        <textarea
          name="lessonPlan"
          placeholder="Lesson Plan"
          value={editLesson.lessonPlan === null ? "" : editLesson.lessonPlan}
          onChange={handleChange}
        ></textarea>
        <button type="submit">Edit</button>
      </form>
    </div>
  );
}
