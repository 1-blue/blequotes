import { useDispatch, useSelector } from "react-redux";

// store
import store from "@src/store/configureStore";

// type
import type { TypedUseSelectorHook } from "react-redux";

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

/**
 * 작성한 타입이 적용된 "useSelector()"
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
/**
 * 작성한 타입이 적용된 "useDispatch()"
 */
export const useAppDispatch: () => AppDispatch = useDispatch;
