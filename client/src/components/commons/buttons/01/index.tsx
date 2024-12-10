interface IButtonProps {
  title: string;
  isActive: boolean;
}

export default function Button01(props: IButtonProps) {
  return (
    <button
      style={{ backgroundColor: props.isActive ? "yellow" : "" }}
      type="submit"
    >
      GRAPHGQL-API 요청하기
    </button>
  );
}
