import MapComponent from "./components/Map/MapComponent";

function App() {
  return (
    <div>
      <h1>Welcome to My App</h1>
      <p>Find us at our location:</p>
      <MapComponent lat={12.9716} lng={77.5946} zoom={15} />
    </div>
  );
}

export default App;