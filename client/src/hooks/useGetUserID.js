/*Hook para retornar o valor armazenado no local storage, referente ao userID */
export const useGetUserID = () => {
    return window.localStorage.getItem("userID");
}