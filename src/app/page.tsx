import prisma from "@/db/PrismaClient";

export default async function Home() {
  const lessons = await prisma.lesson.findMany({
    where: {
      userId: "2",
    },
  });
  const groups = await prisma.group.findMany({
    where: {
      userId: "2",
    },
  });
  return (
    <main>
      <h1 className="font-bold">Lessons</h1>
      <ul>
        {lessons.map((lesson) => (
          <li key={lesson.id}>{lesson.title}</li>
        ))}
      </ul>

      <h1 className="font-bold">Groups</h1>
      <ul>
        {groups.map((group) => (
          <li key={group.id}>{group.groupName}</li>
        ))}
      </ul>
    </main>
  );
}
