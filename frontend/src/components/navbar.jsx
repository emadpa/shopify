import logo from "../assets/logo.webp";

const Navbar = () => {
  return (
    <nav
      style={{
        height: "80px", // taller navbar
        background: "#ffffff",
        borderBottom: "1px solid #e5e7eb",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}
    >
      {/* Left: Logo */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={logo} // if in public folder
          alt="Spofidy Logo"
          style={{
            width: "160px", // desired width
            height: "50px", // desired height
            objectFit: "contain",
          }}
        />
      </div>

      {/* Right: Dummy text */}
      <div
        style={{
          display: "flex",
          gap: "24px",
          fontSize: "14px",
          color: "#374151",
        }}
      >
        <span>Dashboard</span>
        <span>Analytics</span>
        <span>Reports</span>
        <span>Settings</span>
      </div>
    </nav>
  );
};

export default Navbar;
