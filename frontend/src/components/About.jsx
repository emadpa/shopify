import React from "react";

const About = () => {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "50px 20px",
        backgroundColor: "#f6f6f7",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <p
        style={{
          fontSize: "12px",
          fontWeight: "600",
          textTransform: "uppercase",
          letterSpacing: "1px",
          margin: "0 0 12px 0",
          color: "#000",
        }}
      >
        Analytics and Reporting
      </p>

      <h1
        style={{
          fontSize: "64px",
          fontWeight: "500",
          lineHeight: "1.1",
          margin: "0 0 24px 0",
          color: "#000",
          maxWidth: "800px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        Make smart business decisions, quickly
      </h1>

      <p
        style={{
          fontSize: "18px",
          color: "#6d7175",
          margin: "0 0 40px 0",
        }}
      >
        Real-time and reliable data about your store, no set-up required
      </p>

      <button
        style={{
          backgroundColor: "#000",
          color: "#fff",
          padding: "12px 24px",
          borderRadius: "24px",
          fontSize: "16px",
          fontWeight: "600",
          border: "none",
          cursor: "pointer",
          transition: "background-color 0.2s",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#333")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#000")}
      >
        View your analytics
      </button>
    </div>
  );
};

export default About;
