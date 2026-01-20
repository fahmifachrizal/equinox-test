import { User } from "./columns"
import { UserTable } from "./user-table"
import { MainLayout } from "@/components/layout/main-layout";

async function getData(): Promise<User[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      name: "John Doe",
      status: "pending",
      email: "m@example.com",
      role: "user",
    },
    {
        id: "728ed52f",
         name: "Jane Smith",
        status: "pending",
        email: "example@gmail.com",
        role: "admin",
      },
      {
        id: "728ed52f",
        name: "Bob Johnson",
        status: "active",
        email: "bob@example.com",
        role: "user",
      },
       {
        id: "728ed52f",
        name: "Alice Brown",
        status: "inactive",
        email: "alice@example.com",
        role: "guest",
      },
      {
        id: "728ed52f",
        name: "Charlie Wilson",
        status: "active",
        email: "charlie@example.com",
        role: "user",
      },
      {
        id: "728ed52f",
        name: "David Lee",
        status: "pending",
        email: "david@example.com",
        role: "admin",
      },
       {
        id: "728ed52f",
        name: "Eva Green",
        status: "inactive",
        email: "eva@example.com",
        role: "user",
      },
      {
        id: "728ed52f",
        name: "Frank White",
        status: "active",
        email: "frank@example.com",
        role: "guest",
      },
      {
        id: "728ed52f",
         name: "Grace Hall",
        status: "pending",
        email: "grace@example.com",
        role: "user",
      },
      {
        id: "728ed52f",
        name: "Henry Turner",
        status: "inactive",
        email: "henry@example.com",
        role: "admin",
      },
  ]
}

export default async function Page() {
  const data = await getData()

  return (
    <MainLayout>
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-5">User Management</h1>
            <UserTable data={data} />
        </div>
    </MainLayout>
  )
}
