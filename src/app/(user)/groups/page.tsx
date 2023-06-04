"use client";

import { useEffect, useState } from "react";
import { group } from "@prisma/client";
import AddGroupModal from "@/components/AddGroupModal";

export default function Groups() {
  const [open, setOpen] = useState(false);
  const [groups, setGroups] = useState([] as group[]);

  useEffect(() => {
    fetch("/api/groups")
      .then((response) => response.json())
      .then((data) => setGroups(data));
  }, [
    //re render when a new group is added
    open,
  ]);

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

      <button onClick={() => setOpen(true)}>Add a group</button>
      {open && <AddGroupModal setOpen={setOpen} />}
    </>
  );
}
