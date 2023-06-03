"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { group } from "@prisma/client";

export default function Groups() {
  const { user } = useUser();
  const [groups, setGroups] = useState([] as group[]);
  useEffect(() => {
    fetch("/api/groups")
      .then((response) => response.json())
      .then((data) => setGroups(data));
  }, []);
  return (
    <div>
      <h1>Groups</h1>
      <ul>
        {groups.map((group) => (
          <li key={group.id}>{group.groupName}</li>
        ))}
      </ul>
    </div>
  );
}
