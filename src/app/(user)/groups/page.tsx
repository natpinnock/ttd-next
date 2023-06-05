"use client";

import { useEffect, useState } from "react";
import { group } from "@prisma/client";
import AddGroupModal from "@/components/AddGroupModal";
import GroupCard from "@/components/GroupCard";

export default function Groups() {
  const [open, setOpen] = useState(false);
  const [groups, setGroups] = useState([] as group[]);

  const deleteGroup = async (id: string) => {
    const res = await fetch("/api/groups", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      alert("Group deleted");
      setGroups(groups.filter((group) => group.id !== id));
    } else {
      alert("Error deleting group");
    }
  };

  useEffect(() => {
    fetch("/api/groups")
      .then((response) => response.json())
      .then((data) => setGroups(data));
  }, [open, groups]);

  return (
    <>
      <div>
        <h1>Groups</h1>
        <div className="m-4">
          <ul className="grid grid-cols-4 gap-4">
            {groups.map((group) => (
              <GroupCard
                key={group.id}
                group={group}
                deleteGroup={deleteGroup}
              />
            ))}
          </ul>
        </div>
      </div>

      <button onClick={() => setOpen(true)}>Add a group</button>
      {open && <AddGroupModal setOpen={setOpen} />}
    </>
  );
}
