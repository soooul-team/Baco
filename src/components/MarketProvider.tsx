import useLoginAccount from "@/hooks/useLoginAccount";
import useUser from "@/hooks/useUser";
import { createContext, useCallback, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { getLogicContract } from "@/hooks/useContract";
import { AccountType, ApiUserInfoType } from "@/types/styles.type";
import { calculateHash } from "@/helper/SHA256";
import { useRouter } from "next/router";

export const MarketContext = createContext<{
  account: AccountType;
  userInfo: ApiUserInfoType | undefined;
  userVid: string;
  hasMintPass: boolean;
  getCookies: () => void;
  updateGlobalUserInfo: (data: ApiUserInfoType) => void;
  updateGlobalAccount: (data: any) => void;
  clearAllCookies: () => void;
  fetchData: () => void;
}>({
  account: {
    id: "",
    user_view_id: "",
    account: "",
    password: "",
    status: 0,
    create_time: "",
    update_time: "",
  },
  userInfo: {
    id: "",
    view_id: "",
    email: "",
    first_name: "",
    end_name: "",
    pattern: "",
    token: "",
    remark: "",
    status: 0,
    create_time: "",
    update_time: "",
    payment_step: 0,
    wallet_address: "0x",
  },
  userVid: "",
  hasMintPass: false,
  getCookies: () => {},
  updateGlobalUserInfo: () => {},
  updateGlobalAccount: () => {},
  clearAllCookies: () => {},
  fetchData: () => {},
});
interface Cookies {
  [key: string]: string;
}

export const MarketProvider = ({ children }: { children: any }) => {
  const router = useRouter();
  const [trigger, setTrigger] = useState<boolean>(false);
  const [account, setAccount] = useState<any>();
  const [userInfo, setUserInfo] = useState<ApiUserInfoType>();
  const [userVid, setUserVid] = useState("");
  const { getUser, data } = useUser();
  const { getAccount, accountData } = useLoginAccount();
  const [hasMintPass, setHasMintPass] = useState<boolean>(false);

  const getAddressHasMintPass = useCallback(async () => {
    const contract = await getLogicContract();
    if (account?.account && account?.password) {
      const userName = account?.account;
      const password = account?.password;
      const hash = calculateHash(userName, password);
      //目前有:1234
      const hasMintPass = await contract?.hasMintPass(hash);
      setHasMintPass(hasMintPass);
    }
  }, [account]);
  function getCookies() {
    const cookiesString = document.cookie;
    const cookiesArray = cookiesString.split("; ");
    const cookies: Cookies = {};
    cookiesArray.forEach((cookie) => {
      const [key, value] = cookie.split("=");
      cookies[key] = value;
    });
    if (cookies.uvid) {
      setUserVid(cookies.uvid);
    }
  }
  function clearCookie(cookieName: string) {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
  function clearAllCookies() {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      const cookieName = cookie.split("=")[0];
      clearCookie(cookieName);
      setUserVid("");
    }
    if (router.pathname !== "/") router.push("/");
    else router.reload();
  }
  const updateGlobalUserInfo = useCallback((data: ApiUserInfoType) => {
    setUserInfo(data);
    setTrigger(!trigger);
  }, []);
  const updateGlobalAccount = useCallback((data: any) => {
    setAccount(data);
    setTrigger(!trigger);
  }, []);
  const fetchData = useCallback(async () => {
    setTrigger(!trigger);
  }, [trigger]);

  useEffect(() => {
    getCookies();
  }, []);

  useEffect(() => {
    if (userVid) {
      getAccount(userVid);
      getUser(userVid);
    }
  }, [userVid, trigger]);

  useEffect(() => {
    setAccount(accountData?.data.data);
    getAddressHasMintPass();
    setUserInfo(data);
  }, [data, accountData, account, trigger]);

  useEffect(() => {
    if (account) getAddressHasMintPass();
  }, [account]);

  return (
    <MarketContext.Provider
      value={{
        account,
        userInfo,
        userVid,
        hasMintPass,
        getCookies,
        clearAllCookies,
        updateGlobalUserInfo,
        updateGlobalAccount,
        fetchData,
      }}
    >
      {children}
    </MarketContext.Provider>
  );
};
