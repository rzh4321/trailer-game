import type { Metadata } from "next";
import "@/app/globals.css";
// import Provider from "@/components/Provider";
import NavBar from "@/components/NavBar";
// import QueryProvider from "@/components/QueryProvider";
// import { Toaster } from "@/components/ui/toaster";
import { db } from "@/db";
import { categories, movieCategory, movies } from "@/schema";
import { eq } from "drizzle-orm";

export const metadata: Metadata = {
  title: "Trailermeter",
  description: "The Rotten Tomatoes Guessing Game",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const users = await db.select().from(movies).innerJoin(movieCategory, eq(movies.id, movieCategory.movieId)).innerJoin(categories, eq(movieCategory.categoryId, categories.id)).where(eq(movies.movieName, 'Mad Max: Fury Road'));
  // console.log(users);
  return (
    <html lang="en">
      {/* <Provider> */}
      <body className="dark font-primary flex flex-col h-screen justify-between items-center">
        <div className="bg-inherit w-full">
          <NavBar />
          <div className="p-5 relative">{children}</div>
        </div>
        {/* <Toaster /> */}
        {/*
              <Footer /> */}
      </body>
      {/* </Provider> */}
    </html>
  );
}
