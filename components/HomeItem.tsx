type HomeItemProps = {
  title: string;
  description: string[];
};

export const HomeItem = ({ description, title }: HomeItemProps) => {
  return (
    <li className="">
      <strong className="text-sm">{title}</strong>
      {description.map((item, i) => (
        <p className="text-xs text-gray-300" key={i}>
          {item}
        </p>
      ))}
    </li>
  );
};
