import { useState } from "react";

interface ModalProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Group {
  groupName: string;
  numberOfStudents: string;
  notes: string;
}

export default function AddGroupModal({ setOpen }: ModalProps) {
  const [newGroup, setNewGroup] = useState<Group>({
    groupName: "",
    numberOfStudents: "",
    notes: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewGroup((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/groups", {
        method: "POST",
        body: JSON.stringify(newGroup),
      });
      if (response.ok) {
        setOpen(false);
      } else {
        throw new Error("Failed to add group");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="rounded-lg bg-white p-8 shadow-2xl">
      <form onSubmit={handleAddGroup}>
        <label htmlFor="groupName">Group Name</label>
        <input
          type="text"
          name="groupName"
          placeholder="Group Name"
          value={newGroup.groupName}
          onChange={handleChange}
        />
        <label htmlFor="numberOfStudents">Number of Students</label>
        <input
          type="text"
          name="numberOfStudents"
          placeholder="Number of Students"
          value={newGroup.numberOfStudents}
          onChange={handleChange}
        />
        <label htmlFor="notes">Notes</label>
        <input
          type="text"
          name="notes"
          placeholder="Notes"
          value={newGroup.notes}
          onChange={handleChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
