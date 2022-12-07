const Spinner = () => {
  return (
    <aside
      className="fixed inset-1/2 w-40 h-40 -translate-x-1/2 -translate-y-1/2"
      style={{
        perspective: "400px",
        perspectiveOrigin: "top",
      }}
    >
      <img
        src="./logo.png"
        alt="로고 이미지"
        className="w-full h-full animate-spinner-rotate"
      />
    </aside>
  );
};

export default Spinner;
