"use server";

// Importing necessary functions and modules for server-side operations
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Define an asynchronous function named 'addArticle' that takes form data as input
export async function addArticle(formData: any) {
  // Extract title and content from the provided form data
  const title = formData.get("title");
  const content = formData.get("content");

  if (!title || !content) {
    console.error("Title or content is missing");
    return { message: "Title or content is missing" };
  }

  // Retrieve cookies from the HTTP headers
  const cookieStore = cookies();

  // Create a Supabase client configured with the provided cookies
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  // Insert the article data into the 'articles' table on Supabase
  const { data, error } = await supabase.from("articles").insert([
    {
      title,
      content,
    },
  ]);

  // Check for errors during the insertion process
  if (error) {
    console.error("Error inserting data", error);
    return { message: "Error inserting data" };
  }

  // Redirect the user to the home page after successfully adding the article
  redirect("/");

  // Return a success message
  return { message: "Success" };
}
