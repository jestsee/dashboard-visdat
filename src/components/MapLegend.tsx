const MapLegend = () => {
  return (
    <img
      src="map_legend.svg"
      alt="Map Legend"
      className="absolute flex items-center z-2 bg-white bg-opacity-50 hidden md:block"
      style={{ width: "8rem", bottom: '5rem', left: '2rem'}}
    />
  );
};

export default MapLegend;
