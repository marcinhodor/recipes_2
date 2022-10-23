import React, { Dispatch, SetStateAction } from "react";

interface MiscContext {
  query: string;
  setQuery: (query: string) => void;
  chosenTags: string[];
  setChosenTags: Dispatch<SetStateAction<string[]>>;
  clickedId: string;
  setClickedId: (id: string) => void;
  resetFilters: () => void;
}

const MiscContext = React.createContext<MiscContext>({
  query: "",
  setQuery: (query: string) => {},
  chosenTags: <string[]>[],
  setChosenTags: () => {},
  clickedId: "",
  setClickedId: (id: string) => {},
  resetFilters: () => {},
});

export default MiscContext;
