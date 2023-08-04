import React from 'react';
import '../styles/Home.css';

function Home() {
  return (
    <div className="Home">
      <header className="Home-header">
        <h1>מסך ביתי פשוט ב-React</h1>
        <p>ברוך הבא לאפליקציה שלי!</p>
      </header>
      <main>
        <p>כאן תוכל להוסיף תוכן נוסף ולבנות את האפליקציה שלך.</p>
      </main>
    </div>
  );
}

export default Home;
