import React, { useState, Dispatch, SetStateAction } from "react";

interface NotifyModal {
  show: boolean;
  variant?: "success" | "warning";
  text?: string;
}

interface MiscContext {
  query: string;
  setQuery: (query: string) => void;
  chosenTags: string[];
  setChosenTags: Dispatch<SetStateAction<string[]>>;
  clickedId: string;
  setClickedId: (id: string) => void;
  resetFilters: () => void;
  showDeleteModal: boolean;
  setShowDeleteModal: (modifier: boolean) => void;
  showNotifyModal: NotifyModal;
  setShowNotifyModal: (modifier: NotifyModal) => void;
}

const MiscContext = React.createContext<MiscContext>({
  query: "",
  setQuery: (query: string) => {},
  chosenTags: [],
  setChosenTags: () => {},
  clickedId: "",
  setClickedId: (id: string) => {},
  resetFilters: () => {},
  showDeleteModal: false,
  setShowDeleteModal: (modifier: boolean) => {},
  showNotifyModal: { show: false },
  setShowNotifyModal: (modifier: NotifyModal) => {},
});

type Props = {
  children: React.ReactNode;
};

export const MiscContextProvider: React.FC<Props> = (props) => {
  const [query, setQuery] = useState("");
  const [chosenTags, setChosenTags] = useState<string[]>([]);
  const [clickedId, setClickedId] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showNotifyModal, setShowNotifyModal] = useState({ show: false });

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
    showDeleteModal,
    setShowDeleteModal,
    showNotifyModal,
    setShowNotifyModal,
  };

  return (
    <MiscContext.Provider value={contextValue}>
      {props.children}
    </MiscContext.Provider>
  );
};

export default MiscContext;
