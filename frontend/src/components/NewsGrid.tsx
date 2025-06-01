"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { Tweet } from "../types";
interface NewsGridProps {
  tweets: Tweet[];
}

const NewsGrid = ({ tweets }: NewsGridProps) => {
  function convertDate(date: string) {
    return new Date(date).toLocaleDateString("en-UK", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  const getFullUrl = (url: string) => {
    if (!/^https?:\/\//i.test(url)) {
      return `http://${url}`;
    }
    return url;
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow"></header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tweets.map((tweet, index) => (
                <Card key={index} className="overflow-hidden">
                  {/* <CardHeader className="p-0">
                    {article.img && (
                      <Image
                        src={article.img}
                        alt={article.title || "Article image"}
                        width={400}
                        height={300}
                        className="w-full h-48 object-cover"
                      />
                    )}
                  </CardHeader> */}
                  <CardContent className="p-4">
                    <h2 className="text-xl font-semibold mb-2">
                      {tweet.tweet_content}
                    </h2>
                  </CardContent>
                  <CardFooter className="bg-gray-50 px-4 py-3 flex items-center justify-between">
                    {tweet.url && (
                      <a
                        href={getFullUrl(tweet.url || "")}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-blue-600 hover:text-blue-500"
                      >
                        Read More
                      </a>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewsGrid;
