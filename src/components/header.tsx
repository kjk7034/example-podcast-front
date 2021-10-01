import React from "react";
import { isLoggedInVar, tokenVar } from "../apollo";
import { LOCALSTORAGE_TOKEN } from "../const";
import { Link, useHistory } from "react-router-dom";
import { useMe } from "../hooks/useMe";
import { UserRole } from "../__generated__/globalTypes";
import { useApolloClient } from "@apollo/client";

export const Header: React.FC = () => {
  const { data: meData } = useMe();
  const client = useApolloClient();

  const history = useHistory();
  const handleClick = () => {
    localStorage.removeItem(LOCALSTORAGE_TOKEN);
    tokenVar();
    isLoggedInVar(false);
    client.clearStore();
    history.replace("/");
  };
  return (
    <header className="py-4">
      <div className="w-full px-5 xl:px-0 max-w-screen-2xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-3xl">
          PodCast
        </Link>
        <div className="flex items-center">
          {meData?.me?.role === UserRole.Listener && (
            <>
              <Link to="/subscriptions">My Subscribe List</Link>
              <span className="m-3">|</span>
            </>
          )}
          <Link to="/edit-profile">Edit Profile</Link>
          <span className="m-3">|</span>
          <button type="button" onClick={handleClick}>
            logout
          </button>
        </div>
      </div>
    </header>
  );
};
