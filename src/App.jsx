import { useState } from "react";
import { formatoMoneda } from "./helpers";
import houseLogo from "./assets/beach-house.png";

import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [numberOfDays, setNumberOfDays] = useState(1);
  const [isHighSeason, setIsHighSeason] = useState(false);
  const [hasCarRental, setHasCarRental] = useState(false);
  const [totalCost, setTotalCost] = useState(0);
  const [totalPeople, setTotalPeople] = useState(0);
  const [totalNoche, setTotalNoche] = useState(0);

  const handleNumberOfPeopleChange = (event) => {
    setNumberOfPeople(parseInt(event.target.value));
  };

  const handleNumberOfDaysChange = (event) => {
    setNumberOfDays(parseInt(event.target.value));
  };

  const handleIsHighSeasonChange = (event) => {
    setIsHighSeason(event.target.checked);
  };

  const handleHasCarRentalChange = (event) => {
    setHasCarRental(event.target.checked);
  };

  const mandarInfo = () => {

    const telefono = "4438650052"; // Número de teléfono de WhatsApp
    const mensaje = `El costo de su reserva por ${numberOfDays} noches, da un total de ${formatoMoneda(totalCost)}. Donde el precio por noche es de ${formatoMoneda(totalNoche)}, con un costo de persona por noche de ${formatoMoneda(totalPeople)}.`;

    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
    // window.location.href = url;
    window.open(url, '_blank');

  }

  const calculateTotalCost = () => {
    let baseCost = 0;
    if (numberOfPeople <= 2) {
      baseCost = 600;
    } else if (numberOfPeople === 3) {
      baseCost = 900;
    } else if (numberOfPeople === 4) {
      baseCost = 1200;
    } else if (numberOfPeople === 5) {
      baseCost = 1500;
    } else if (numberOfPeople === 6) {
      baseCost = 1800;
    }

    let seasonCost = 0;
    if (isHighSeason) {
      seasonCost = 800;
    } else {
      seasonCost = 700;
    }

    let carRentalCost = 0;
    if (hasCarRental) {
      carRentalCost = 500;
    }

    const totalCost =
      (baseCost + seasonCost + carRentalCost) * numberOfDays + 500;
    setTotalCost(totalCost);

    const totalPeople = totalCost / numberOfDays / numberOfPeople;
    setTotalPeople(totalPeople);

    const totalNoche = totalCost / numberOfDays;
    setTotalNoche(totalNoche);
  };

  return (
    <div className="App">
      <div>
        <a href="https://reactjs.org" target="_blank">
          <img src={houseLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className="text-white">Cotizador de Renta</h1>
      <div className="card p-4">
        <form className="m-4">
          {/* 2 column grid layout with text inputs for the first and last names */}
          <div className="row mb-4">
            <div className="col">
              <div className="form-outline">
                <input
                  type="number"
                  value={numberOfPeople}
                  min="1"
                  max="6"
                  id="people"
                  onChange={handleNumberOfPeopleChange}
                  className="form-control"
                />
                <label className="form-label" htmlFor="people">
                  Personas (1-6)
                </label>
              </div>
            </div>
            <div className="col">
              <div className="form-outline">
                <input
                  type="number"
                  value={numberOfDays}
                  min="1"
                  onChange={handleNumberOfDaysChange}
                  id="days"
                  className="form-control"
                />
                <label className="form-label" htmlFor="days">
                  Noches
                </label>
              </div>
            </div>
          </div>
          {/* Checkbox */}
          <div className="form-check d-flex justify-content-center mb-4">
            <input
              className="form-check-input me-2"
              type="checkbox"
              checked={isHighSeason}
              onChange={handleIsHighSeasonChange}
              id="checkHighSeason"
            />
            <label className="form-check-label" htmlFor="checkHighSeason">
              Temporada Alta
            </label>
          </div>
          {/* Checkbox 2*/}
          <div className="form-check d-flex justify-content-center mb-4">
            <input
              className="form-check-input me-2"
              type="checkbox"
              checked={hasCarRental}
              onChange={handleHasCarRentalChange}
              id="checkCarRent"
            />
            <label className="form-check-label" htmlFor="checkCarRent">
              Renta de Carro
            </label>
          </div>
        </form>

        {/* Submit button */}
        <button
          onClick={calculateTotalCost}
          type="submit"
          className="btn btn-primary mb-4 w-100"
        >
          Cotizar 🏖️
        </button>

        {totalCost !== 0 && (
          <p className="">
            Precio por persona x noche:{" "}
            <code className="">{formatoMoneda(totalPeople)}</code>
          </p>
        )}
        {totalCost !== 0 && (
          <p className="">
            Precio x noche:{" "}
            <code className="fs-5">{formatoMoneda(totalNoche)}</code>
          </p>
        )}
        {totalCost !== 0 && (
          <p className="font-monospace fw-bold fs-3">
            Total: <code>{formatoMoneda(totalCost)}</code>
          </p>
        )}

        {/* Submit button */}
        <button
          onClick={mandarInfo}
          type="submit"
          className="btn btn-primary mb-4 btn-success"
        >
          Mándar info por WA ✅
        </button>
      </div>
    </div>
  );
}

export default App;
