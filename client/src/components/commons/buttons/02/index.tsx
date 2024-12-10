interface IButtonProps {
  title?: string;
  isActive?: boolean;
}

export default function Button02(props: IButtonProps) {
  return (
    <button
      style={{ backgroundColor: props.isActive ? "yellow" : "" }}
      type="submit"
    >
      {props.title}
    </button>
  );
}
