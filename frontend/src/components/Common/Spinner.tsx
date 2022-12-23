// util
import { combineClassNames } from "@src/utils";

const Absolute = () => {
  return (
    <figure
      className="fixed inset-1/2 w-40 h-40 -translate-x-1/2 -translate-y-1/2"
      style={{ perspective: "400px", perspectiveOrigin: "top" }}
    >
      <img
        src="/logo.png"
        alt="로고 이미지"
        className="w-full h-full animate-spinner-rotate"
      />
    </figure>
  );
};

type RelativeProps = {
  outerClassName?: string;
  innerClassName?: string;
};
const Relative = ({ outerClassName, innerClassName }: RelativeProps) => {
  return (
    <figure
      className={outerClassName}
      style={{ perspective: "400px", perspectiveOrigin: "top" }}
    >
      <img
        src="/logo.png"
        alt="로고 이미지"
        className={combineClassNames(
          "w-20 h-20 animate-spinner-rotate",
          innerClassName ? innerClassName : ""
        )}
      />
    </figure>
  );
};

type SpinnerType = {
  Absolute: typeof Absolute;
  Relative: typeof Relative;
};
const Spinner: SpinnerType = {
  Absolute,
  Relative,
};

export default Spinner;
