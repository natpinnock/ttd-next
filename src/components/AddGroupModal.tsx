import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";

interface FormData {
  groupName: string;
  numberOfStudents: number;
  notes: string;
}

export default function Example() {
  const [open, setOpen] = useState(false);
  const [groupName, setGroupName] = useState<string>("");
  const [numberOfStudents, setNumberOfStudents] = useState<number>(0);
  const [notes, setNotes] = useState<string>("");
  const { handleSubmit, register } = useForm<FormData>();
  const onSubmit = async (data: FormData) => {
    setGroupName(data.groupName);
    setNumberOfStudents(data.numberOfStudents);
    setNotes(data.notes);
    console.log(data);

    try {
      const response = await fetch("/api/groups", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          groupName: "7P2",
          numberOfStudents: 31,
          notes: "here are the notes",
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data); // Handle the successful response
      } else {
        console.log("An error occurred");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button
        type="button"
        className="ml-3 inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        onClick={() => setOpen(true)}
      >
        Add a Group
      </button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                  <div>
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100"></div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900"
                      >
                        Add a Group
                      </Dialog.Title>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                          <label htmlFor="groupName">Group Name</label>
                          <input
                            type="text"
                            {...register("groupName", { required: true })}
                          />
                        </div>

                        <div>
                          <label htmlFor="numberOfStudents">
                            Number of Students
                          </label>
                          <input
                            type="number"
                            {...register("numberOfStudents")}
                          />
                        </div>

                        <div>
                          <label htmlFor="notes">Notes</label>
                          <textarea {...register("notes")} />
                        </div>

                        <button type="submit">Submit</button>
                      </form>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      onClick={() => setOpen(false)}
                    >
                      Go back to dashboard
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
