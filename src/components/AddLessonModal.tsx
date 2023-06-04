import { useState, useEffect } from "react";

interface ModalProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Lesson {
  groupId: string;
  groupName: string;
  title: string;
  dateTime: string;
  lessonPlan: string;
}

interface Group {
  id: string;
  groupName: string;
}

export default function AddLessonModal({ setOpen }: ModalProps) {
  const [newLesson, setNewLesson] = useState<Lesson>({
    groupId: "",
    groupName: "",
    title: "",
    dateTime: new Date().toISOString().slice(0, 16),
    lessonPlan: "",
  });

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
        (group) => group.groupName === newLesson.groupName
      );
      const updatedGroupId = selectedGroup ? selectedGroup.id : "";
      setNewLesson((prevState) => ({
        ...prevState,
        groupId: updatedGroupId,
      }));
    }
  }, [groupNames, newLesson.groupName]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setNewLesson((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formattedLesson = {
        ...newLesson,
        dateTime: new Date(newLesson.dateTime),
      };
      const response = await fetch("/api/lessons", {
        method: "POST",
        body: JSON.stringify(formattedLesson),
      });
      if (response.ok) {
        setOpen(false);
        console.log(formattedLesson);
      } else {
        throw new Error("Failed to add lesson");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="rounded-lg bg-white p-8 shadow-2xl">
      <form onSubmit={handleAddLesson}>
        <label htmlFor="groupName">Group Name</label>
        <select
          name="groupName"
          value={newLesson.groupName}
          onChange={handleChange}
        >
          <option value="">Select a group</option>
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
          value={newLesson.title}
          onChange={handleChange}
        />
        <label htmlFor="dateTime">Date and Time</label>
        <input
          type="datetime-local"
          name="dateTime"
          value={newLesson.dateTime}
          onChange={handleChange}
        />
        <label htmlFor="lessonPlan">Lesson Plan</label>
        <textarea
          name="lessonPlan"
          placeholder="Lesson Plan"
          value={newLesson.lessonPlan}
          onChange={handleChange}
        ></textarea>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
