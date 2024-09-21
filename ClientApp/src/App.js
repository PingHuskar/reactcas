import React, { useEffect, useReducer, useState } from "react";
import Button from "./components/Button";
import './App.css'
import axios from 'axios'
import {
  Collapse,
  Container,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  NavItem,
  NavLink,
} from "reactstrap";
import { Link } from "react-router-dom";

const reducer = (state, action) => {
  switch (action) {
    case "increase":
      state += 1;
      break;
    case "decrease":
      state -= 1;
      break;
  }
  return state;
};

const App = () => {
  const initialCounter = 1;
  const [counter, dispatchCounter] = useReducer(reducer, initialCounter);
  const [data, setData] = useState(null)
  const [results, setResults] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(false)
    if (counter <= 0) {
      setIsLoading(true);
      return
    }
    axios.get(`https://pokeapi.co/api/v2/pokemon/${counter}`)
    .then((res) => res.data)
    .then((data) => {
      setData(data)
      console.log(data)
    })
    .catch(e => {
      console.log(e)
    })
    .finally(() => {
      setIsLoading(true)
    });
  },[counter])

  // useEffect(() => {
  //   axios
  //     .get(`https://pokeapi.co/api/v2/pokemon/`)
  //     .then((res) => res.data)
  //     .then((data) => {
  //       setResults(data.results);
  //     });
  // },[])

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/`);
        console.log(response.data.results);
        setResults(response.data.results)
      } catch (error) {
        console.log(error)
      }
      finally {
        console.log(`finally`)
        setIsLoading(false)
        console.log(isLoading);
      }
    }
    fetchData()
  }, [])

  return (
    <div className="flex flex-col">
      {/* <NavItem>
        <NavLink tag={Link} className="text-dark list-none" to="/detail">
          Detail
        </NavLink>
      </NavItem> */}
      <div className="bg-green-500">Counter: {counter}</div>
      <div className="flex">
        <Button onClick={() => dispatchCounter(`increase`)}>+</Button>
        <Button onClick={() => dispatchCounter(`decrease`)}>-</Button>
      </div>
      {!isLoading ? (
        <>Loading</>
      ) : (
        <>
          {data && (
            <>
              {data.name}
              <img width={300} src={data.sprites?.front_default} />
            </>
          )}
          <table>
            <tbody>
              {results?.map((poke, id) => {
                return (
                  <tr key={id}>
                    <td className="capitalize">{poke.name}</td>
                    <td className="">
                      <div className="relative justify-center flex align-middle mx-auto">
                        <img
                          className="z-0"
                          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                            id + 1
                          }.png`}
                        />
                        <img
                          style={{ zIndex: `-2` }}
                          className="absolute bottom-2 left-56"
                          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${
                            id + 1
                          }.png`}
                        />
                      </div>
                    </td>

                    <Link to={`/pokemon/${id + 1}`}>
                      <td className="uppercase text-white rounded-xl px-4 py-2 bg-blue-400">
                        Detail
                      </td>
                    </Link>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default App;
