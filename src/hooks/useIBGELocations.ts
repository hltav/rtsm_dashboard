import {
  IBGECity,
  IBGEState,
} from "@/modules/user/schemas/editableUserInfoProps.schema";
import { useState, useEffect } from "react";

export const useIBGELocations = (selectedState: string) => {
  const [states, setStates] = useState<IBGEState[]>([]);
  const [cities, setCities] = useState<IBGECity[]>([]);
  const [loadingStates, setLoadingStates] = useState(true);
  const [loadingCities, setLoadingCities] = useState(false);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await fetch(
          "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome"
        );
        const data = await response.json();
        setStates(data);
      } catch (error) {
        console.error("Erro ao carregar estados:", error);
      } finally {
        setLoadingStates(false);
      }
    };

    fetchStates();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      if (!selectedState) {
        setCities([]);
        return;
      }

      try {
        setLoadingCities(true);
        const response = await fetch(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedState}/municipios`
        );
        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.error("Erro ao carregar cidades:", error);
      } finally {
        setLoadingCities(false);
      }
    };

    fetchCities();
  }, [selectedState]);

  return {
    states,
    cities,
    loadingStates,
    loadingCities,
  };
};
