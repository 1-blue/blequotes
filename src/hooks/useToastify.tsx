import { useEffect } from "react";
import { toast } from "react-toastify";

// type
import type { ToastOptions } from "react-toastify";

type Props = {
  doneMessage: string | null;
  errorMessage: string | null;
  callback?: () => void;
} & ToastOptions;

/**
 * "react-toastify"를 이용한 토스트 메시지 hook
 * @param doneMessage 성공 메시지
 * @param errorMessage 실패 메시지
 * @param callback 메시지 렌더링 후 실행할 함수 ( 메시지 초기화 )
 */
const useToastify = ({
  doneMessage,
  errorMessage,
  callback,
  ...options
}: Props) => {
  useEffect(() => {
    // 성공 메시지
    if (doneMessage) toast.success(doneMessage, { ...options });
    // 실패 메시지
    else if (errorMessage) toast.error(errorMessage, { ...options });

    // 리셋 메시지
    if (doneMessage || errorMessage) {
      if (typeof callback === "function") callback();
    }
  }, [doneMessage, errorMessage, options, callback]);
};

export default useToastify;
