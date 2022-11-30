import React, { useState, Dispatch, SetStateAction } from "react";

interface MiscContext {
  query: string;
  setQuery: (query: string) => void;
  chosenTags: string[];
  setChosenTags: Dispatch<SetStateAction<string[]>>;
  clickedId: string;
  setClickedId: (id: string) => void;
  resetFilters: () => void;
  showNoAccessModal: boolean;
  setShowNoAccessModal: (modifier: boolean) => void;
  showDeleteModal: boolean;
  setShowDeleteModal: (modifier: boolean) => void;
}

const MiscContext = React.createContext<MiscContext>({
  query: "",
  setQuery: (query: string) => {},
  chosenTags: [],
  setChosenTags: () => {},
  clickedId: "",
  setClickedId: (id: string) => {},
  resetFilters: () => {},
  showNoAccessModal: false,
  setShowNoAccessModal: (modifier: boolean) => {},
  showDeleteModal: false,
  setShowDeleteModal: (modifier: boolean) => {},
});

type Props = {
  children: React.ReactNode;
};

export const MiscContextProvider: React.FC<Props> = (props) => {
  const [query, setQuery] = useState("");
  const [chosenTags, setChosenTags] = useState<string[]>([]);
  const [clickedId, setClickedId] = useState("");
  const [showNoAccessModal, setShowNoAccessModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const resetFilters = () => {
    setQuery("");
    setChosenTags([]);
    setClickedId("");
  };

  const contextValue = {
    query,
    setQuery,
    chosenTags,
    setChosenTags,
    clickedId,
    setClickedId,
    resetFilters,
    showNoAccessModal,
    setShowNoAccessModal,
    showDeleteModal,
    setShowDeleteModal,
  };

  return (
    <MiscContext.Provider value={contextValue}>
      {props.children}
    </MiscContext.Provider>
  );
};

export default MiscContext;
