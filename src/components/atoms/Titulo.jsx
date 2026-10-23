export default function Titulo({ children, nivel = 2 }) {
  const Tag = `h${nivel}`;
  return <Tag>{children}</Tag>;
}