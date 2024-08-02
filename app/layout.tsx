import type { Metadata } from "next";
import "@/app/globals.css";
// import Provider from "@/components/Provider";
import NavBar from "@/components/NavBar";
import { CategoryProvider } from "@/hooks/CategoryContext";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/react";

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
      <body className="font-primary flex flex-col h-screen justify-between items-center">
        <div id="container" className="bg-inherit w-full flex flex-col">
          <CategoryProvider>
            <Suspense>
              <NavBar />
              <div className="p-5 relative flex-1">{children}</div>
              <Analytics />
            </Suspense>
          </CategoryProvider>
        </div>
        {/* <Toaster /> */}
        {/*
              <Footer /> */}
      </body>
      {/* </Provider> */}
    </html>
  );
}
