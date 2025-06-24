import { type LoginDto, queryKeys } from "@dacodes/lib";
import queryClient from "@dacodes/shell/queryClient";
import { useMutation } from "@tanstack/react-query";
import { loginService } from "../services/login.service";

export function useLogin() {

  const authLogin = () =>
    useMutation({
      mutationKey: ["login"],
      mutationFn: (dto: LoginDto) => loginService.login(dto),
      onSuccess: (res) => {
        queryClient.setQueryData([queryKeys.auth], res);
      },
    });

  return {
    authLogin,
  };
}
