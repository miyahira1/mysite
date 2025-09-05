import React from 'react';
import './News.css';

function News() {
  return (
    <div className="News">
      <h2>Latest News</h2>
      <article className="news-article">
        <h3>Article 1</h3>
        <p>This is the first news article.</p>
      </article>
      <article className="news-article">
        <h3>Article 2</h3>
        <p>This is the second news article.</p>
      </article>
    </div>
  );
}

export default News;
