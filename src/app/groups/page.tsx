"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { group } from "@prisma/client";

export default function Groups() {
  const [groups, setGroups] = useState([] as group[]);
  useEffect(() => {
    fetch("/api/groups")
      .then((response) => response.json())
      .then((data) => setGroups(data));
  }, []);
  return (
    <>
      <div>
        <h1>Groups</h1>
        <ul>
          {groups.map((group) => (
            <li key={group.id}>{group.groupName}</li>
          ))}
        </ul>
      </div>

      <div>Add a group</div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          //perform a post request to /api/groups
          fetch("/api/groups", {
            method: "POST",
            body: JSON.stringify({
              groupName: e.currentTarget.groupName.value,
              numberOfStudents: e.currentTarget.numberOfStudents.value,
              notes: e.currentTarget.notes.value,
            }),
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              setGroups([...groups, data]);
            });
        }}
      >
        <input type="text" name="groupName" />
        <input type="text" name="numberOfStudents" />
        <input type="text" name="notes" />
        <button type="submit">Add</button>
      </form>
    </>
  );
}
