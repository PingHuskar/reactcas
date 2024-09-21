import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Detail = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      if (!(id > 0)) {
        setIsLoading(false);
        return;
      }
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        console.log(`finally`);
        setIsLoading(false);
        console.log(isLoading);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="text-3xl">Detail</div>
      {isLoading ? (
        <>Loading</>
      ) : (
        <div>
            <div className={`text-2xl uppercase bolder`}>
                {data?.name}
            </div>
          <img width={300} src={data?.sprites?.front_default} />
        </div>
      )}
    </>
  );
};

export default Detail;
