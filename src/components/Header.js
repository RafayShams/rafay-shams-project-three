function Header() {
  return (
    <header>
      {/* The two divs will act as search lights during animation */}
      <div className="leftLight"></div>
      <div className="rightLight"></div>
        <h1>Movie Reviewer</h1>
        <h2>All your movie reviews in one place!</h2>
    </header>
  )
}

export default Header;