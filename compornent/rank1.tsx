export default function Rank1(props): JSX.Element | null {
  if (props.members === null) return <></>;
  const { members } = props;
  console.log(members);

  const result = members.sort((a, b) => {
    return a.time > b.time ? -1 : 1;
  });

  console.log(result);

  return (
    <>
      <p></p>
    </>
  );
}
