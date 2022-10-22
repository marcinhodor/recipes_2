import React, { Dispatch, SetStateAction } from "react";

const MiscContext = React.createContext({
  query: "",
  setQuery: (query: string) => {},
  chosenTags: <string[]>[],
  setChosenTags: (tags: (tags: []) => string[]) => {},
  clickedId: "",
  setClickedId: (id: string) => {},
  resetFilters: () => {},
});

export default MiscContext;
