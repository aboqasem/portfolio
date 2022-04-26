interface IProps {
  lg?: boolean;
}

const AvatarLink = ({ lg }: IProps) => {
  return (
    <a
      className="flex items-center text-black hover:underline"
      href="https://github.com/aboqasem"
      target="_blank"
      rel="noreferrer"
    >
      <img
        alt="Me"
        className={`block rounded-full ${lg ? 'h-10 md:h-12' : 'h-8 md:h-10'}`}
        src="https://github.com/aboqasem.png"
      />
      <p className={`ml-2 ${lg ? 'text-base md:text-xl' : 'text-sm md:text-lg'}`}>aboqasem</p>
    </a>
  );
};

export default AvatarLink;
