export interface Article {
  title?: string;
  description?: string;
  source?: string;
  content?: string;
  date?: string;
  link?: string;
  img?: string;
  author?: string;
  searchTerm?: string;
}

export interface Tweet {
  tweet_id: string,
    author_id: string,
    url: string,
    tweet_content: string,
    created_at: string,
}