import React, { useState, useEffect, ReactElement } from "react";
import { Layout } from "./Features/Layout";
import { GlobalNavBar } from "./Features/GlobalNavBar";
import { Stock } from "./Features/Stock";
import { getUserInfo, UserInfo } from "./service";
import { BuyModal } from "./Components/Buy/BuyModal";

export const App = (): ReactElement => {
  const [didInitiallyLoad, setDidInitiallyLoad] = useState<boolean>(false);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [view, setView] = useState<string>(() => {
    const hash: string = window.location.hash;
    if (hash?.length > 0 && hash[0] === "#") {
      return hash.substring(1);
    }

    return "home";
  });
  const [viewModal, setViewModal] = useState(false);
  useEffect(() => {
    window.history.replaceState(null, "", `#${view}`);
  }, [view]);

  useEffect(() => {
    const load = async (): Promise<void> => {
      try {
        const userInfo: UserInfo = await getUserInfo();
        setUser(userInfo);
      } catch (e) {
        setView("home");
        console.error(e);
      } finally {
        setDidInitiallyLoad(true);
      }
    };

    load();
  }, []);

  const openModal = () => setViewModal(!viewModal);

  const changeViewHandler = async (name: string): Promise<void> => {
    switch (name) {
      case "buy":
        openModal();
        break;
      default:
        setView(name);
        break;
    }
  };

  const renderContent = (): ReactElement | null => {
    if (!didInitiallyLoad) {
      return null;
    }

    switch (view) {
      case "stock":
        return <Stock />;
      case "home":
      default:
        return (
          <>
            <h2>Hello, {user?.login}</h2>
            <p>Have a nice day</p>
          </>
        );
    }
  };

  return (
    <Layout>
      <Layout.Header>
        <GlobalNavBar user={user} onChangeView={changeViewHandler} />
        {user && <div>{user?.balance} gold</div>}
      </Layout.Header>
      <Layout.Content>{renderContent()}</Layout.Content>
      <BuyModal showModal={viewModal} closeModal={openModal} user={user!} />
      <Layout.Footer />
    </Layout>
  );
};
App.displayName = "App";
