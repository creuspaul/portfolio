import { useState, useEffect } from "react";
import projects from "./projectsData.js";

export default function PortfolioGrid() {
  const [active, setActive] = useState("PRINT");
  const [selected, setSelected] = useState(null);
  const [index, setIndex] = useState(0);

  const [loadedImages, setLoadedImages] = useState({});
  const [visibleProjects, setVisibleProjects] = useState(4);

  const [isMobile, setIsMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const categoryColors = {
    PRINT: "#DDE8D5",
    EDITION: "#D9EEFF",
    VOLUME: "#FFF4C9",
    INFO: "#FFDCE8"
  };

  const categoryAccent = {
    PRINT: "#5D7A54",
    EDITION: "#4A79A8",
    VOLUME: "#A78528",
    INFO: "#A25A74"
  };

  const currentBg = categoryColors[active] || "#111";
  const currentAccent = categoryAccent[active];

  const filtered = projects.filter((p) => p.category === active);
  const isInfo = active === "INFO";

  // ======================
  // MOBILE DETECTION
  // ======================
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // ======================
  // GRID ANIMATION
  // ======================
  useEffect(() => {
    setVisibleProjects(4);

    const interval = setInterval(() => {
      setVisibleProjects((prev) => {
        if (prev >= filtered.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 2;
      });
    }, 250);

    return () => clearInterval(interval);
  }, [active]);

  // ======================
  // PROJECT PAGE
  // ======================
  if (selected) {
    const gallery = Array.from(
      { length: selected.images },
      (_, i) => `/images/${selected.folder}/${i + 1}.jpg`
    );

    return (
      <div
        style={{
          minHeight: "100vh",
          width: "100%",
          background: "#111",
          color: "#fff",
          overflowX: "hidden"
        }}
      >
        {/* HEADER */}
        <div
          style={{
            width: "100%",
            maxWidth: "900px",
            padding: isMobile ? "20px" : "40px",
            boxSizing: "border-box"
          }}
        >
          <button onClick={() => setSelected(null)}>← Back</button>

          <h2>{selected.title}</h2>

          <p style={{ opacity: 0.7 }}>{selected.description}</p>
        </div>

        {/* IMAGE */}
        <div
          style={{
            width: "100%",
            height: "80vh",
            position: "relative",
            padding: isMobile ? "0 10px" : "0 40px"
          }}
        >
          <img
            src={gallery[index]}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain"
            }}
          />

          <button
            onClick={() =>
              setIndex((index - 1 + gallery.length) % gallery.length)
            }
            style={navBtnLeft}
          >
            ‹
          </button>

          <button
            onClick={() => setIndex((index + 1) % gallery.length)}
            style={navBtnRight}
          >
            ›
          </button>
        </div>
      </div>
    );
  }

  // ======================
  // INFO PAGE
  // ======================
  if (isInfo) {
    return (
      <div style={wrapperStyle(currentBg, currentAccent)}>
        <Menu
          isMobile={isMobile}
          active={active}
          setActive={setActive}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          currentAccent={currentAccent}
          currentBg={currentBg}
        />

        <div style={contentStyle(isMobile)}>
          <h2 style={{ color: currentAccent }}>Informations</h2>

          <p style={{ lineHeight: 1.8, opacity: 0.8 }}>
            Diplômé en 2016 des Arts Décoratifs de Strasbourg, Paul Creus est un
            artiste visuel dont la pratique mêle image imprimée, création numérique...
          </p>

          <div style={{ marginTop: 40, fontSize: 14, opacity: 0.7 }}>
            creuspaul@gmail.com <br />
            @paul.creus
          </div>
        </div>
      </div>
    );
  }

  // ======================
  // HOME PAGE
  // ======================
  return (
    <div style={wrapperStyle(currentBg, currentAccent)}>
      <Menu
        isMobile={isMobile}
        active={active}
        setActive={setActive}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        currentAccent={currentAccent}
        currentBg={currentBg}
      />

      {/* GRID */}
      <div style={gridStyle(isMobile)}>
        {filtered.slice(0, visibleProjects).map((p) => {
          const isLandscape = p.orientation === "landscape";

          return (
            <div
              key={p.id}
              style={{
                flexBasis: isMobile
                  ? "100%"
                  : isLandscape
                  ? "440px"
                  : "260px"
              }}
            >
              <div style={{ position: "relative", height: 320, overflow: "hidden" }}>

  {/* 1. TINY (blur background) */}
  <img
    src={`/images/${p.folder}/tiny.jpg`}
    style={{
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      filter: "blur(20px)",
      transform: "scale(1.08)",
      opacity: loadedImages[p.id] ? 0 : 1,
      transition: "opacity 0.6s ease"
    }}
  />

  {/* 2. THUMB / HD */}
  <img
    src={`/images/${p.folder}/thumb.jpg`}
    loading="lazy"
    onLoad={() =>
      setLoadedImages((prev) => ({
        ...prev,
        [p.id]: true
      }))
    }
    onClick={() => {
      setSelected(p);
      setIndex(0);
    }}
    style={{
      position: "relative",
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
      cursor: "pointer",

      opacity: loadedImages[p.id] ? 1 : 0,
      transition: "opacity 0.7s ease, transform 0.35s ease",
      transform: "scale(1)"
    }}

    onMouseEnter={(e) => {
      if (!isMobile) {
        e.currentTarget.style.transform = "scale(1.015)";
      }
    }}

    onMouseLeave={(e) => {
      if (!isMobile) {
        e.currentTarget.style.transform = "scale(1)";
      }
    }}
  />
</div>

              <p style={{ fontSize: 12, opacity: 0.6 }}>{p.title}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ======================
// MENU COMPONENT
// ======================
function Menu({
  isMobile,
  active,
  setActive,
  menuOpen,
  setMenuOpen,
  currentAccent,
  currentBg
}) {
  return (
    <>
      {/* HAMBURGER */}
      {isMobile && (
        <button style={hamburgerStyle(currentAccent)} onClick={() => setMenuOpen(true)}>
          ☰
        </button>
      )}

      {/* DESKTOP MENU */}
      {!isMobile && (
        <div style={menuStyle}>
          <h2 style={{ color: currentAccent, marginBottom: 30 }}>Paul Creus</h2>

          {["PRINT", "EDITION", "VOLUME", "INFO"].map((item) => {
            const isActive = active === item;

            return (
              <button
                key={item}
                onClick={() => setActive(item)}
                style={{
  width: "100%",
  textAlign: "left",

  padding: "16px 0",

  fontSize: "20px",
  letterSpacing: isActive ? "0.8px" : "0.3px",
  lineHeight: 1.2,
  background: "transparent",
  border: "none",
  color: isActive ? currentAccent : "#333",
  fontWeight: isActive ? "500" : "300",
  letterSpacing: isActive ? "0.8px" : "0.4px",
  opacity: isActive ? 1 : 0.6,
  cursor: "pointer",
  borderBottom: "none",
  transition: "all 0.25s ease"
  
}}
              >
                {item}
              </button>
            );
          })}
        </div>
      )}

      {/* MOBILE MENU */}
      {isMobile && menuOpen && (
        <div
          style={overlayStyle(currentBg)}
          onClick={() => setMenuOpen(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setMenuOpen(false)}
              style={{ fontSize: 22, marginBottom: 40, color: currentAccent }}
              
            >
              ✕
            </button>

            {["PRINT", "EDITION", "VOLUME", "INFO"].map((item) => {
              const isActive = active === item;

              return (
                <button
                  key={item}
                  onClick={() => {
                    setActive(item);
                    setMenuOpen(false);
                  }}
                  style={mobileItemStyle(isActive, currentAccent)}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}

// ======================
// STYLES
// ======================
const wrapperStyle = (bg, color) => ({
  display: "flex",
  minHeight: "100vh",
  background: bg,
  color: color,
  overflowX: "hidden"
});

const menuStyle = {
  width: 220,
  padding: 30,
  boxSizing: "border-box"
};

const gridStyle = (isMobile) => ({
  flex: 1,
  padding: isMobile ? 15 : 40,
  display: "flex",
  flexWrap: "wrap",
  gap: 10
});

const contentStyle = (isMobile) => ({
  flex: 1,
  padding: isMobile ? 20 : 60,
  maxWidth: 900
});

const hamburgerStyle = (color) => ({
  position: "fixed",
  top: 15,
  right: 15,
  fontSize: 26,
  background: "transparent",
  border: "none",
  color: color,
  zIndex: 2000,
  cursor: "pointer"
});

const overlayStyle = (bg) => ({
  position: "fixed",
  inset: 0,
  background: bg,
  zIndex: 1500,
  padding: 30
});

const menuItemStyle = (active, color, item) => ({
  width: "100%",
  textAlign: "left",
  background: active ? `${color}20` : "transparent",
  border: "none",
  color: active ? color : "#444",
  padding: "8px 10px",
  opacity: active ? 1 : 0.4,
  borderLeft: active ? `2px solid ${color}` : "2px solid transparent",
  cursor: "pointer"
});

const mobileItemStyle = (active, color) => ({
  fontSize: 20,
  padding: "12px 0",
  background: "transparent",
  border: "none",
  color: active ? color : "#333",
  fontWeight: active ? "500" : "300",
  cursor: "pointer"
});

const navBtnLeft = {
  position: "absolute",
  left: 20,
  top: "50%",
  transform: "translateY(-50%)",
  fontSize: 22,
  background: "transparent",
  border: "none",
  color: "#fff"
};

const navBtnRight = {
  position: "absolute",
  right: 20,
  top: "50%",
  transform: "translateY(-50%)",
  fontSize: 22,
  background: "transparent",
  border: "none",
  color: "#fff"
};