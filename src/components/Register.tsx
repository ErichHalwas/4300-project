"use client";

import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import Link from 'next/link';

const Register = () => {
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    try {
      const formData = new FormData(event.currentTarget);

      const username = formData.get("username") as string | null;
      const email = formData.get("email") as string | null;
      const password = formData.get("password") as string | null;

      if (!username || !email || !password) {
        throw new Error("All fields are required.");
      }

      const response = await fetch(`/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      if (response.status === 201) {
        router.push("/login");
      } else {
        console.log(`Failed to register: ${response.statusText}`);
      }
    } catch (e: any) {
      console.log(e.message || "An error occurred during registration.");
    }
  }

  return (
    <>
        <div className="className=text-bulldog grid mt-8 justify-items-center"> 
            <div className="shadow-lg p-5 rounded-lg border-t-4 bg-chapel border-red-700">
                <h1 className="text-xl text-stegeman font-bold my-4">Signup</h1>
      <form
  onSubmit={handleSubmit}
  className="my-8 max-w-md mx-auto flex flex-col gap-4 border p-6 border-stegeman rounded-md shadow-sm bg-chapel"
>
  <div className="flex flex-col">
    <label htmlFor="username" className="mb-1 text-sm font-medium text-stegeman">
      Username
    </label>
    <input
      className="border border-stegeman rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-bulldog  text-stegeman"
      type="text"
      name="username"
      id="username"
      required
    />
  </div>

  <div className="flex flex-col">
    <label htmlFor="email" className="mb-1 text-sm font-medium text-stegeman">
      Email Address
    </label>
    <input
      className="border border-stegeman rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-bulldog text-stegeman"
      type="email"
      name="email"
      id="email"
      required
    />
  </div>

  <div className="flex flex-col">
    <label htmlFor="password" className="mb-1 text-sm font-medium text-stegeman">
      Password
    </label>
    <input
      className="border border-stegeman rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-bulldog  text-stegeman"
      type="password"
      name="password"
      id="password"
      required
    />
  </div>

  <button
    type="submit"
    className="bg-bulldog text-chapel rounded px-4 py-2 mt-2 hover:bg-bulldog transition"
  >
    Signup
  </button>
</form>
<p className="my-3 text-center  text-stegeman">
        Already have an account?
        <Link href="/login" className="mx-2 underline">Login</Link>
      </p>
      </div>
     </div>
    </>
  );
};

export default Register;