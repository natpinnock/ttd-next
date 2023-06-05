import { group } from "@prisma/client";
import { useState } from "react";

interface EditModalProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  group: group;
}

interface Group {
  groupName: string;
  numberOfStudents: string | null;
  notes: string | null;
}

export default function EditGroupModal({ setOpen, group }: EditModalProps) {
  //get the group info
  const [editGroup, setEditGroup] = useState<Group>({
    groupName: group.groupName,
    numberOfStudents: group.numberOfStudents,
    notes: group.notes,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditGroup((prevState) => ({
      ...prevState,
      [name]: value,
      id: group.id,
    }));
  };

  const handleEditGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/groups", {
        method: "PATCH",
        body: JSON.stringify(editGroup),
      });
      if (response.ok) {
        setOpen(false);
      } else {
        throw new Error("Failed to edit group");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="rounded-lg bg-white p-8 shadow-2xl">
      <form onSubmit={handleEditGroup}>
        <h2> Edit a group</h2>
        <label htmlFor="groupName">Group Name</label>
        <input
          type="text"
          name="groupName"
          placeholder="Group Name"
          value={editGroup.groupName}
          onChange={handleChange}
        />
        <label htmlFor="numberOfStudents">Number of Students</label>
        <input
          type="text"
          name="numberOfStudents"
          placeholder="Number of Students"
          value={
            editGroup.numberOfStudents === null
              ? ""
              : editGroup.numberOfStudents
          }
          onChange={handleChange}
        />
        <label htmlFor="notes">Notes</label>
        <input
          type="text"
          name="notes"
          placeholder="Notes"
          value={editGroup.notes === null ? "" : editGroup.notes}
          onChange={handleChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
