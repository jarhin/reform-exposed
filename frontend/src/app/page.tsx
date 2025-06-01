"use client";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import React, { useState } from "react";
import Search from "../components/Search";
import News from "../components/NewsGrid";
import { Tweet } from "../types";
export default function Home() {
  const [tweets, setTweets] = useState<Tweet[]>([]);

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-grow overflow-y-auto">
        <main className="flex-grow pl-20 pr-20">
          <h1>Reform Exposed</h1>
          <div className="divider divider-neutral"></div>
          <Search setTweets={setTweets} />
          <News tweets={tweets} />
        </main>
      </div>
      <Footer />
    </div>
  );
}
