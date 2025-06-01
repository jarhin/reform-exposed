"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Constituency from "./Constituency";
import { Tweet } from "@/types";

interface SearchProps {
  setTweets: (tweets: Tweet[]) => void;
}

const tweets = [
  {
    tweet_id: "600935419447005184",
    author_id: "25984418",
    url: "https://x.com/bbcnickrobinson/status/600935419447005184",
    tweet_content: "Anyone who thinks @UKIP going away is deluding themselves : 4 m votes, 2nd in 120 seats, led by one of best communicators in the business",
    created_at: "2015-05-20 8:05:43",
  },
  {
    tweet_id: "664381606422044672",
    author_id: "19017675",
    url: "https://x.com/Nigel_Farage/status/664381606422044672",
    tweet_content: "Number of Romanians and Bulgarians in Britain tops 200,000. I warned against surge - do people believe me now? https://t.co/66XiTJAbio",
    created_at: "2015-11-11 9:58:13",
  },
  {
    tweet_id: "1777708843591495965",
    author_id: "1429400366819512323",
    url: "https://x.com/RadioGenoa/status/1777708843591495965",
    tweet_content: "The Spanish Christian patriots rise up: \"You have transformed our land into a dunghill, time has come to take back what is ours!\" https://t.co/voUmZL7LbN",
    created_at: "2024-04-09 14:43:11",
  },
  {
    tweet_id: "1814571086727479510",
    author_id: "20045947",
    url: "https://x.com/reformexposed/status/1814571086727479510",
    tweet_content: "Reform UK, @Nigel_Farage & the Far-Right...\n\nHere's an endorsement video by Nigel for Diagolon, a Canadian alt-right organization. The US Department of State's Bureau of Counterterrorism has classified Diagolon a far-right extremist group.\n\nhttps://t.co/9WDmGzDPNg",
    created_at: "2024-07-20 8:00:34",
  },
  {
    tweet_id: "1832329982279843992",
    author_id: "20045947",
    url: "https://x.com/reformexposed/status/1832329982279843992",
    tweet_content: "Reform UK have announced area ‘branches’ and appointed chairs.\n\nHere’s Amelia Randall - Herne Bay. “A self-proclaimed psychic who sold spells for up to £200 on Facebook while offering 'mystic psychic readings' for £14.99 on her now-deleted OnlyFans.”\n\nhttps://t.co/AqV4GkdzqF https://t.co/HKl9LV1hJj",
    created_at: "2024-09-07 8:08:05",
  },
  {
    tweet_id: "1840388743191986412",
    author_id: "20045947",
    url: "https://x.com/reformexposed/status/1840388743191986412",
    tweet_content: "Lee Anderson:\nNottingham Forest v Man U: £630 x1 ticket\nForest v Liverpool: £630 x1 ticket\nEngland vs All Blacks: £1,950\n\nhttps://t.co/EF3Bte0JFi",
    created_at: "2024-09-29 13:50:43",
  }
];


const Search = ({ setTweets }: SearchProps) => {
  const [constituency, setConstituency] = useState("");

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  const appendTerm = async (constituency: string) => {
    const url = `${BASE_URL}/search?constituency=${constituency}}`;
    setTweets(tweets);
    // try {
    //   const response = await axios.get(url);
    //   console.log(
    //     `Found ${response.data.length} articles for ${constituency}.`
    //   );
    //   if (response.data?.length > 0) {
    //   }
    // } catch (error) {
    //   console.error(`Error fetching articles: ${error}`);
    // }
  };

  const getArticles = (constituency: string) => {
    console.log({constituency})
    if (!constituency) return;
    appendTerm(constituency);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col sm:flex-row gap-4 items-end">
        {/* Constituency Input */}
        <div className="flex-1 min-w-[200px]">
          <label
            htmlFor="constituency"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Constituency
          </label>
          {/* Use the Constituency component with autocomplete */}
          <Constituency className="grow" onSelect={setConstituency} />
        </div>

        {/* Search Button */}
        <Button
          onClick={() => getArticles(constituency)}
          className="px-8"
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default Search;
