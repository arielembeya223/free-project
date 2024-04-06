import React, { useState } from 'react';

const tweetStyle = {
  width: '60%',
};

const tweetContentStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
};

const buttonContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
};

const svgStyle = {
  width: '20px',
  height: '20px',
  marginRight: '5px',
};

export function TweetZone() {
  // Simuler des données de tweets avec le nom de l'utilisateur et le contenu du tweet
  const [likes, setLikes] = useState(Array(5).fill(0));

  const tweets = [
    { user: 'John', content: 'Ceci est un tweet de John.' },
    { user: 'Jane', content: 'Ceci est un tweet de Jane.' },
    { user: 'Alice', content: 'Ceci est un tweet de Alice.' },
    { user: 'Bob', content: 'Ceci est un tweet de Bob.' },
    { user: 'Eve', content: 'Ceci est un tweet de Eve.' }
  ];

  const handleLike = (index) => {
    const updatedLikes = [...likes];
    updatedLikes[index] += 1;
    setLikes(updatedLikes);
  };

  const handleDislike = (index) => {
    const updatedLikes = [...likes];
    updatedLikes[index] -= 1;
    setLikes(updatedLikes);
  };

  return (
    <div id="TweetZone" className="col-md-6" style={tweetStyle}>
      <div className="card">
        <div className="card-body" style={tweetContentStyle}>
          {tweets.map((tweet, index) => (
            <div key={index} className="mb-3" style={{ marginBottom: '20px', width: '80%' }}>
              <h5 className="card-title">{tweet.user}</h5>
              <p className="card-text">{tweet.content}</p>
              <div style={buttonContainerStyle}>
                <button type="button" className="btn" onClick={() => handleLike(index)}>
                  <svg xmlns="http://www.w3.org/2000/svg" style={svgStyle} viewBox="0 0 24 24">
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                  </svg>
                  {likes[index]}
                </button>
                <button type="button" className="btn" onClick={() => handleDislike(index)}>
                  <svg xmlns="http://www.w3.org/2000/svg" style={svgStyle} viewBox="0 0 24 24">
                    <path d="M0 0h24v24H0z" fill="none"/>
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zM7 11h10v2H7z"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TweetZone;
