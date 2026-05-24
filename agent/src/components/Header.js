import React from 'react';
import '../styles/main.css'; // Import the CSS file

function Header() {
  const userName = sessionStorage.getItem('userName') || 'Agent'; // Get the user name from session storage or use a default
  return (
    <header className="top-header">
      <div className="search-bar">
        {/* Added a basic input so the search bar is visible */}
        <input type="text" placeholder="Search..." />
      </div>
      
      <div className="user-profile">
        {/* If you don't have FontAwesome installed, you can replace this <i> tag with an emoji like 👤 */}
        <i className="fa-solid fa-circle-user fa-2x"></i>
        <span className="user-name">{userName}</span>
      </div>
    </header>
  );
}

export default Header;