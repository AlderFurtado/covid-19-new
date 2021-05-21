import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [totalDeaths, setTotalDeaths] = useState([]);
  const [totalConfirmed, setTotalConfirmed] = useState([]);
  const [totalRecovered, setTotalRecovered] = useState([]);
  const [totalPopulation, setTotalPopulation] = useState([]);
  const [porcent, setPorcent] = useState(0);

  useEffect(() => {
    getAllCases();
  }, []);

  const getAllCases = async () => {
    const { data } = await axios.get(
      "https://covid-api.mmediagroup.fr/v1/cases"
    );
    console.log(data);
    convertAllCases(data);
    getTopContries(data);
  };

  const convertAllCases = (allCases) => {
    const casesConverted = Object.values(allCases);

    setTotalDeaths(getTotalDeaths(casesConverted));
    setTotalConfirmed(getTotalConfirmed(casesConverted));
    setTotalRecovered(getTotalRecovered(casesConverted));
    setTotalPopulation(getTotalPopulation(casesConverted));
  };

  const getTotalDeaths = (casesConverted) => {
    const totalDeaths = casesConverted.reduce((acc, cases) => {
      const deaths = cases.All.population ? cases.All.deaths : 0;
      return acc + deaths;
    }, 0);

    return totalDeaths;
  };

  const getTotalConfirmed = (casesConverted) => {
    const totalConfirmed = casesConverted.reduce((acc, cases) => {
      const confirmed = cases.All.population ? cases.All.confirmed : 0;
      return acc + confirmed;
    }, 0);

    return totalConfirmed;
  };

  const getTotalRecovered = (casesConverted) => {
    const totalRecovered = casesConverted.reduce((acc, cases) => {
      const recovered = cases.All.population ? cases.All.recovered : 0;
      return acc + recovered;
    }, 0);

    return totalRecovered;
  };

  const getTotalPopulation = (casesConverted) => {
    const totalPopulation = casesConverted.reduce((acc, cases) => {
      const population = cases.All.population ? cases.All.population : 0;
      return acc + population;
    }, 0);

    return totalPopulation;
  };

  const getTopContries = (allCases) => {
    const casesConverted = Object.entries(allCases);
    const topContries = [];
    casesConverted.map((data) => {
      console.log(data);
    });
  };

  const calcutePorcent = (population, base) => {
    const porcent = (base * 100) / population;
    setPorcent(porcent);
  };

  const convertPorcent = (porcent) => {
    return porcent.toFixed(2);
  };

  return (
    <div className="App">
      <pre>{totalDeaths}</pre>
      <pre>{totalConfirmed}</pre>
      <pre>{totalRecovered}</pre>
      <pre>{totalPopulation}</pre>

      <pre>
        <strong>{convertPorcent(porcent)}%</strong>
      </pre>

      <button onClick={() => calcutePorcent(totalPopulation, totalDeaths)}>
        Mortes
      </button>
      <button onClick={() => calcutePorcent(totalPopulation, totalConfirmed)}>
        Confirmados
      </button>
      <button onClick={() => calcutePorcent(totalPopulation, totalRecovered)}>
        Recuperados
      </button>
    </div>
  );
}

export default App;
