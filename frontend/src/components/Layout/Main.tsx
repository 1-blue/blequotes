type Props = {
  children: React.ReactNode;
};

const Main = ({ children }: Props) => {
  return <main className="min-h-[calc(100vh-144px)]">{children}</main>;
};

export default Main;
