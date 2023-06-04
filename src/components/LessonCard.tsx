import { lesson } from "@prisma/client";

export default function LessonCard({ lesson }: { lesson: lesson }) {
  return (
    <div>
      <a
        href="#"
        className="relative block rounded-sm border-t-4 border-pink-600 p-4 shadow-xl sm:p-6 lg:p-8"
      >
        <div className="flex items-center gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-pink-600 sm:h-8 sm:w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>

          <h3 className="text-3xl font-bold sm:text-4xl">{lesson.title}</h3>
        </div>

        <p className="mt-4 font-medium text-gray-500">
          {lesson.groupName} students
        </p>
        <p className="mt-4 font-medium text-gray-500">
          {lesson.dateTime.toLocaleString()}
        </p>
        <p className="mt-4 font-medium text-gray-500">{lesson.lessonPlan}</p>
      </a>
    </div>
  );
}
