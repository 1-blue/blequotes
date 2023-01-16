type Props = {
  text: string;
};

const ColdOut = ({ text }: Props) => {
  return (
    <div className="flex bg-main-400 text-white px-2 py-2 w-full rounded-md before:content-['💡']">
      <p className="flex-1 font-semibold text-sm whitespace-pre-wrap">{text}</p>
    </div>
  );
};

export default ColdOut;
