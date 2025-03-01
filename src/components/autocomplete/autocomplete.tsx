"use client";
import { useApi } from "@/utils/Api";
import React, { useEffect, useState } from "react";

const CityAutocompleteWithPost = () => {
  const [query, setQuery] = useState("");
  const [cities, setCities] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [getId, setGetId] = useState(0);

  const { response, loading, error, fetchData } = useApi({
    method: "POST",
    url: "/api/signup/get_city",
  });
  useEffect(() => {
    fetchData({ name: query }); // Pass your data here
  }, [query]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setShowDropdown(true);
  };
  const handleSelect = (id: number, city: string) => {
    setQuery(city); // Set the selected city
    setShowDropdown(false); // Close dropdown
    setGetId(id);
  };
  return (
    <>
      <div className="relative w-full max-w-md mx-auto">
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Enter city name"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <input
          name="cityId"
          className="hidden"
          value={getId}
          onChange={(e) => e}
        />

        {showDropdown && response?.data?.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-md max-h-60 overflow-y-auto">
            {response?.data?.map(
              (
                city: {
                  id: number;
                  cityName: string;
                  stateName: string;
                  countryName: string;
                },
                index: number
              ) => {
                return (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer border"
                    onClick={() => handleSelect(city.id, city.cityName)}
                  >
                    <div className="">
                      <span className="text-sm block">{`${city.cityName}`}</span>
                      <span className="text-xs text-gray-500 block">{`${city.stateName}, ${city.countryName}`}</span>
                    </div>
                    <div className="DocSearch-Hit-action"></div>
                  </li>
                );
              }
            )}
          </ul>
        )}
        {showDropdown && response?.data?.length === 0 && (
          <p className="absolute z-10 w-full px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-md text-gray-500">
            No cities found.
          </p>
        )}
      </div>
    </>
  );
};

export default CityAutocompleteWithPost;
