"use client";
import { group, lesson } from "@prisma/client";
import { ChangeEvent, useEffect, useState } from "react";

const LessonForm = () => {
  const [groups, setGroups] = useState([] as group[]);
  const [lessons, setLessons] = useState([] as lesson[]);
  const [title, setTitle] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [lessonPlan, setLessonPlan] = useState("");
  const [groupName, setGroupName] = useState("");
  const [groupId, setGroupId] = useState("");

  useEffect(() => {
    fetch("/api/lessons")
      .then((response) => response.json())
      .then((data) => setLessons(data));
  }, []);

  const handleGroupChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedGroupName = e.target.value;
    const selectedGroup = groups.find(
      (group) => group.groupName === selectedGroupName
    );

    if (selectedGroup) {
      setGroupId(selectedGroup.id);
      setGroupName(selectedGroupName);
    } else {
      // Handle the error when the selected group is null
      // For example, you can show an error message or perform some fallback action
      console.log("Error: Selected group not found");
    }
  };

  // const handleChange = (e: { target: { name: any; value: any } }) => {
  //   const { name, value } = e.target;
  //   if (name === "groupName") {
  //     setLessonData((prevState) => ({
  //       ...prevState,
  //       [name]: value,
  //     }));
  //   } else {
  //     setLessonData((prevState) => ({
  //       ...prevState,
  //       [name]: value,
  //       groupName: lessonData.groupName, // Add this line to retain the selected groupName
  //     }));
  //   }
  // };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const prismaDateTime = new Date(dateTime);
    fetch("/api/lessons", {
      method: "POST",
      body: JSON.stringify({
        groupName: groupName,
        title: title,
        dateTime: prismaDateTime,
        lessonPlan: lessonPlan,
        groupId: groupId,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setLessons([...lessons, data]);
      });
    console.log(
      "groupName: " +
        groupName +
        " title: " +
        title +
        " dateTime: " +
        dateTime +
        " lessonPlan: " +
        lessonPlan +
        " groupId: " +
        groupId
    );
  };

  useEffect(() => {
    fetch("/api/groups")
      .then((response) => response.json())
      .then((data) => setGroups(data));
  }, []);

  return (
    <>
      {" "}
      <div>
        <h1>Lessons</h1>
        <ul>
          {lessons.map((lesson) => (
            <li key={lesson.id}>{lesson.title}</li>
          ))}
        </ul>
      </div>
      <form onSubmit={handleSubmit}>
        <label>
          Group Name:
          <select name="groupName" onChange={(e) => handleGroupChange(e)}>
            {groups.map((group) => (
              <option key={group.id} value={group.groupName}>
                {group.groupName}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Title:
          <input
            type="text"
            name="title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <br />
        <label>
          Date and Time:
          <input
            type="datetime-local"
            name="dateTime"
            onChange={(e) => setDateTime(e.target.value)}
          />
        </label>
        <br />
        <label>
          Lesson Plan:
          <textarea
            name="lessonPlan"
            onChange={(e) => setLessonPlan(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default LessonForm;
