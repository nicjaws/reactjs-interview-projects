import { useEffect, useState } from "react";

export default function RandomColor() {
  // State variable to store the chosen color format ("hex" or "rgb")
  const [typeOfColor, setTypeOfColor] = useState("hex");

  // State variable to store the generated random color code
  const [color, setColor] = useState("#000000");

  // Utility function to generate a random integer between 0 (inclusive) and length (exclusive)
  function randomColorUtility(length) {
    // Generates a random integer using Math.random() and Math.floor()
    return Math.floor(Math.random() * length);
  }

  // Function to generate a random hexadecimal color code
  function handleCreateRandomHexColor() {
    // Array containing hexadecimal characters (0-9, A-F)
    const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
    let hexColor = "#";

    // Loop to generate 6 random hex characters and append them to the color string
    for (let i = 0; i < 6; i++) {
      hexColor += hex[randomColorUtility(hex.length)];
    }

    // Update the color state with the generated hexadecimal code
    setColor(hexColor);
  }

  // Function to generate a random RGB color code
  function handleCreateRandomRgbColor() {
    // Generate random values between 0 and 255 for red (r), green (g), and blue (b) components
    const r = randomColorUtility(256);
    const g = randomColorUtility(256);
    const b = randomColorUtility(256);

    // Update the color state with the generated RGB color code
    setColor(`rgb(${r},${g},${b})`);
  }

  // useEffect hook to run whenever the typeOfColor state changes
  useEffect(() => {
    // Check the current color format
    if (typeOfColor === "rgb") {
      // Generate an RGB color if the format is rgb
      handleCreateRandomRgbColor();
    } else {
      // Generate a hexadecimal color if the format is hex (default)
      handleCreateRandomHexColor();
    }
  }, [typeOfColor]); // Dependency array: Only runs when typeOfColor changes

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background: color,
      }}
    >
      {/* Button to set color format to HEX and generate a random hex color */}
      <button onClick={() => setTypeOfColor("hex")}>Create HEX Color</button>
      {/* Button to set color format to RGB and generate a random rgb color */}
      <button onClick={() => setTypeOfColor("rgb")}>Create RGB Color</button>
      {/* Button to generate a random color based on the current color format */}
      <button
        onClick={
          typeOfColor === "hex"
            ? handleCreateRandomHexColor
            : handleCreateRandomRgbColor
        }
      >
        Generate Random Color
      </button>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          fontSize: "60px",
          marginTop: "50px",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <h3>{typeOfColor === "rgb" ? "RGB Color" : "HEX Color"}</h3>
        <h1>{color}</h1>
      </div>
    </div>
  );
}
