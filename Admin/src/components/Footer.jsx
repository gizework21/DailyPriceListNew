import React, { useState, useEffect } from "react";
import axios from "axios";

const Footer = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/fetch-news"
        );
        setNews(response.data);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    fetchNews();
  }, []);

  // Filter out restricted news
  const nonRestrictedNews = news.filter((item) => !item.isRestricted);

  return (
    <div className="television-footer">
      <marquee behavior="scroll" direction="left">
        {nonRestrictedNews.map((item) => (
          <span key={item._id}>
            {item.title} - {item.content} |
          </span>
        ))}
      </marquee>
    </div>
  );
};

export default Footer;
